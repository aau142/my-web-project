import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import startImage from './start.png';
import textImage from './text.png';

const Start = () => {
  const navigate = useNavigate();
  const [pressed, setPressed] = useState(false);
  const clickAudioRef = useRef(null);

  useEffect(() => {
    const socket = new WebSocket('wss://147.78.244.100');
    socket.onopen = () => {
      socket.send(JSON.stringify({ type: 'showQR2' }));
    };
    return () => socket.close();
  }, []);

  // ✅ 音声を事前にロードしておく（iOS最速対策）
  useEffect(() => {
    const audio = new Audio('/first.mp3');
    clickAudioRef.current = audio;
    // トリガーがあるまではplayできないので、ここでは設定だけ
  }, []);

  const handleTouchStart = () => {
    const audio = clickAudioRef.current;
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
    setPressed(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setPressed(false);
      navigate('/2camera');
    }, 100);
  };

  return (
    <div style={{
      minHeight: "100vh",
      width: "100vw",
      backgroundColor: "#ffffff",
      border: "20px solid #f57c2d",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "'DotGothic16', sans-serif",
      textAlign: "center",
      padding: "2rem",
      boxSizing: "border-box"
    }}>
      <img
        src={textImage}
        alt="説明テキスト"
        style={{
          width: "90%",
          maxWidth: "700px",
          marginBottom: "2rem"
        }}
      />
      <img
        src={startImage}
        alt="START"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          width: "50%",
          maxWidth: "400px",
          cursor: "pointer",
          transform: pressed ? "scale(0.9)" : "scale(1)",
          transition: "transform 0.05s ease-out"
        }}
      />
    </div>
  );
};

export default Start;
