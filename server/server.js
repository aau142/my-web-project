// server/server.js
import fs from 'fs';
import https from 'https';
import { createServer } from "https";
import { WebSocketServer } from 'ws';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { analyzeText, analyzeImageBuffer, bucket } from './api.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// HTTPS 証明書の読み込み（絶対パスに修正）
const key = fs.readFileSync(path.join(__dirname, 'localhost.key'));
const cert = fs.readFileSync(path.join(__dirname, 'localhost.crt'));
const server = https.createServer({ key, cert }, app);

const wss = new WebSocketServer({ server });
// ミドルウェア
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


app.use(express.static(path.join(__dirname, '../client/build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});
app.use(cors());


// ✅ /api/analyze（photoの外）
app.post("/api/analyze", async (req, res) => {
  const { inputText, id } = req.body;
  console.log("📝 /api/analyze 受信:", inputText);

  try {
    const url = await analyzeText(inputText, id); // ← 修正
    res.json({ url }); // ← QRに使う公開URLを返す
  } catch (err) {
    console.error("❌ テキスト解析エラー:", err);
    res.status(500).json({ error: "テキスト解析に失敗しました" });
  }
});


// ✅ /api/photo（別ブロック）
app.post("/api/photo", async (req, res) => {
  console.log("📥 /api/photo へリクエスト受信");

  try {
    const base64 = req.body?.image?.split(',')[1];
    if (!base64) throw new Error("Base64が空");

    const buffer = Buffer.from(base64, "base64");
    const id = Math.random().toString(36).substring(2, 10); 
    const timelineText = await analyzeImageBuffer(buffer);// ランダムID

    const finalUrl = await analyzeText(timelineText, id);  // HTMLで保存＋URL取得

    console.log("✅ Vision解析完了 URL:", finalUrl);
    res.json({ id, url: finalUrl }); // ← これだけでOK！

  } catch (err) {
    console.error("❌ Vision解析失敗:", err);
    res.status(500).json({ error: true });
  }
});


wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const parsed = JSON.parse(data);
    if (parsed.type === 'show7mac') {
      wss.clients.forEach(client => {
        if (client.readyState === ws.OPEN) {
           client.send(JSON.stringify({ type: 'show7mac', url: parsed.url }));
        }
      });
    }
    if (parsed.type === 'showQR2') {
      wss.clients.forEach(client => {
        if (client.readyState === ws.OPEN) {
          client.send(JSON.stringify({ type: 'showQR2' }));
        }
      });
    }
  });
});


// サーバー起動
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ HTTPS server running at https://172.20.10.2:${PORT}`);
});
