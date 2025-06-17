import React, { useEffect, useState, useRef } from "react";
import QR2 from "./qr2";
import MacView from "./7mac";

const AppMac = () => {
  const [view, setView] = useState("qr2"); // 初期はQR2（生成中画面）
  const [timelineUrl, setTimelineUrl] = useState("");
  const audioRef = useRef(null);


useEffect(() => {
  // ✅ BGMの準備
  const audio = new Audio(process.env.PUBLIC_URL + '/GB-Action-D06-1(Stage4).mp3');
  audio.loop = true;
  audio.volume = 0.5;
  audioRef.current = audio;

  // ✅ ユーザー操作で初回再生許可（クリックで音スタート）
  const tryPlay = () => {
    audio.play().catch(err => {
      console.warn('音声自動再生がブロックされました:', err);
    });
    document.removeEventListener('click', tryPlay);
  };
  document.addEventListener('click', tryPlay);

  // ✅ WebSocket 接続
  let ws;
  try {
    ws = new WebSocket("wss://147.78.244.100");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("WebSocket受信:", data);
      if (data.type === "show7mac") {
        setTimelineUrl(data.url || "");
        setView("7mac");
      } else if (data.type === "showQR2") {
        setView("qr2");
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocketエラー:", err);
    };

  } catch (e) {
    console.error("WebSocket接続失敗:", e);
  }

  // ✅ クリーンアップ処理（離脱時）
  return () => {
    if (ws) ws.close();
    audio.pause();
    audio.currentTime = 0;
    document.removeEventListener('click', tryPlay);
  };
}, []);

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* 左側に movie.mp4 を常に表示 */}
      <div style={{ flex: 0.8 }}>
        <video
          src="/movie.mp4"
          autoPlay
          loop
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* 右側は WebSocket によって qr2 または 7mac に切り替え */}
      <div style={{ flex: 1.2 }}>
       {view === "qr2" ? <QR2 /> : <MacView url={timelineUrl} />}
      </div>
    </div>
  );
};

export default AppMac;
