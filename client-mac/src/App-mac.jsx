import React, { useEffect, useState, useRef } from "react";
import QR2 from "./qr2";
import MacView from "./7mac";

const AppMac = () => {
  const [view, setView] = useState("qr2"); // 初期はQR2（生成中画面）
  const [timelineUrl, setTimelineUrl] = useState("");
  const audioRef = useRef(null);


useEffect(() => {
  const audio = new Audio(process.env.PUBLIC_URL + '/GB-Action-D06-1(Stage4).mp3');
  audio.loop = true;
  audio.volume = 0.5;
  audioRef.current = audio;

  const tryPlay = () => {
    audio.play().catch(err => {
      console.warn('自動再生できなかった:', err);
    });
    document.removeEventListener('click', tryPlay);
  };

  document.addEventListener('click', tryPlay);

  // WebSocket処理（そのままでOK）
  const ws = new WebSocket("wss://147.78.244.100");
  ws.onmessage = (event) => { /* ... */ };

  return () => {
    audio.pause();
    audio.currentTime = 0;
    ws.close();
    document.removeEventListener('click', tryPlay);
  };
}, []);


  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* 左側に movie.mp4 を常に表示 */}
      <div style={{ flex: 1 }}>
        <video
          src="/movie.mp4"
          autoPlay
          loop
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* 右側は WebSocket によって qr2 または 7mac に切り替え */}
      <div style={{ flex: 1 }}>
       {view === "qr2" ? <QR2 /> : <MacView url={timelineUrl} />}
      </div>
    </div>
  );
};

export default AppMac;
