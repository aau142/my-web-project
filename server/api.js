import { OpenAI } from "openai";
import fs from "fs";
import path from "path";
import { Storage } from "@google-cloud/storage";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";
import admin from "firebase-admin";
import { fileURLToPath } from "url";

// ESM形式対応
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Firebase初期化
const keyFilename = path.join(__dirname, "serviceAccountKey.json");
const serviceAccount = JSON.parse(fs.readFileSync(keyFilename, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "openai-qr-host.firebasestorage.app",
});

dotenv.config();

const bucket = admin.storage().bucket();
const bucketName = "openai-qr-host.firebasestorage.app";
const storage = new Storage({ keyFilename });
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ✅ テキスト送信 → GPT 処理（背景画像テンプレートで年表生成）
export async function analyzeText(inputText, id) {
  const prompt = `
情報をもとに、提示された年齢までの人生年表を予想して書いてください。
絶対にユーモアを交え、人を傷つけない表現にしてください。

書き方は以下の形式にしてください：

0　　　　...
1　　　　...
2　　　　...
3　　　　...
...

※年表以外の情報や説明は一切不要です。
※必ず形式は守ってください。
${inputText}`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  const today = new Date().toISOString().slice(0, 10).replace(/-/g, "/");

  const timelineItems = completion.choices[0].message.content
    .split("\n")
    .filter((line) => line.trim() !== "")
    .map((line) => {
      const [age, ...desc] = line.trim().split(/\s+/);
      return `<div class="entry"><span class="age">${age}</span><span class="desc">${desc.join(" ")}</span></div>`;
    })
    .join("\n");

  const htmlWithMeta = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>人生年表</title>
  <link href="https://fonts.googleapis.com/css2?family=DotGothic16&display=swap" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 40px 0;
      background: #000000;
      font-family: 'DotGothic16', sans-serif;
      display: flex;
      justify-content: center;
    }
    .paper {
      background: white;
      width: 620px;
      padding: 60px 50px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      box-sizing: border-box;
    }
    .title {
      text-align: center;
      margin-bottom: 20px;
    }
    .title .small {
      font-size: 20px;
    }
    .title .main {
      font-size: 36px;
      font-weight: bold;
    }
    .dashed-line {
      border-bottom: 1px dotted #000;
      margin: 10px 0 20px 0;
    }
    .label-row {
  display: flex;
  font-size: 16px;
  margin-bottom: 10px;
  padding: 0 5px;
}

.label-row div:first-child {
  width: 80px;
  font-weight: bold;
    flex: 1;
  text-align: left;
  padding-left: 20px;
}

.label-row div:last-child {
  flex: 1;
  text-align: right;
  padding-right: 200px;
}
    .timeline {
      font-size: 16px;
      line-height: 1.6;
    }
.entry {
  display: flex;
  margin-bottom: 10px;
  font-size: 17px;
  line-height: 1.5;
}

.entry .age {
  width: 80px;
  font-weight: bold;
    text-align: left;     /* ← 右寄せ */
  padding-left: 30px; 
}

.entry .desc {
  flex: 1;
}
    .footer {
      margin-top: 30px;
      border-top: 1px dotted #000;
      padding-top: 10px;
      text-align: center;
      font-size: 14px;
    }
    .date {
      text-align: right;
      font-size: 14px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="paper">
    <div class="title">
      <div class="small">僕から見た君の</div>
      <div class="main">人生年表</div>
    </div>
    <div class="dashed-line"></div>
    <div class="label-row">
      <div>年齢</div><div>出来事</div>
    </div>
    <div class="timeline">
      ${timelineItems}
    </div>
    <div class="date">発行日時：${today}</div>
    <div class="footer">
      僕の予想は正しかったかな？<br />
      君の人生と比べてみて！
    </div>
  </div>
<script>
  window.onload = function() {
    const scrollStep = 1; // 1フレームで下がるpx数（小さいほど遅い）
    const delay = 20;     // フレーム間隔（ms）（大きいほど遅い）
    let pos = 0;
    const end = document.body.scrollHeight - window.innerHeight;

    function scrollDown() {
      if (pos < end) {
        pos += scrollStep;
        window.scrollTo(0, pos);
        setTimeout(scrollDown, delay);
      } else {
        window.scrollTo(0, end);
      }
    }

    scrollDown();
  };
</script>
</body>
</html>
`;

  const tmpFilePath = `/tmp/${id}.html`;
  fs.writeFileSync(tmpFilePath, htmlWithMeta);

  const destinationPath = `results/${id}.html`;
  await bucket.upload(tmpFilePath, {
    destination: destinationPath,
    metadata: {
      contentType: "text/html",
      metadata: {
        firebaseStorageDownloadTokens: id,
      },
    },
  });

  const encodedPath = encodeURIComponent(destinationPath);
  const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodedPath}?alt=media&token=${id}`;

  fs.unlinkSync(tmpFilePath);
  return publicUrl;
}


// ✅ 画像バッファ → GPT Vision 処理（カメラ用）
export async function analyzeImageBuffer(imageBuffer) {
  const base64Image = imageBuffer.toString("base64");
  const dataUrl = `data:image/jpeg;base64,${base64Image}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "image_url",
            image_url: { url: dataUrl },
          },
          {
            type: "text",
            text: `
画像を見て分かる特徴を具体的に取得してください。
その情報に沿って、想像される年齢までの人生年表を予想して書いてください。
ex)メガネをかけていたらメガネに関わる人生、帽子をかぶっていたら帽子に関わる人生など
絶対にユーモアを交え、人を傷つけない表現にしてください。

書き方は以下の形式にしてください：

0　　　　...
1　　　　...
2　　　　...
3　　　　...
...

※一文30字以内
※年表以外の情報や説明は絶対に一切不要です。
※必ず形式は守ってください。
`
          }
        ],
      },
    ],
    max_tokens: 1000,
  });

  const text = response.choices[0]?.message?.content || "画像解析に失敗しました。";
  return text;
}
export { bucket }; // ← これを一番最後に追加
