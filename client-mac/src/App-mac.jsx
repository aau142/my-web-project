import React, { useEffect, useState } from "react";
import QR2 from "./qr2";
import MacView from "./7mac";

const AppMac = () => {
  const [view, setView] = useState("qr2"); // 初期はQR2（生成中画面）
  const [timelineUrl, setTimelineUrl] = useState("");

  useEffect(() => {
    const ws = new WebSocket("wss://147.78.244.100:443"); // WebSocketサーバーのURLを環境に合わせて変更

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


    return () => {
      ws.close();
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
