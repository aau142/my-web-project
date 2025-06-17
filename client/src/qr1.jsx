import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import arrow from './arrow.png';
import qrFrame from './qrframe.png';
import backBtn from './backbtn.png';

const QR1 = ({ formData }) => {
  const [qrUrl, setQrUrl] = useState('');
  const [searchParams] = useSearchParams();
  const [pressed, setPressed] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const source = searchParams.get('source'); // ← photo or null
    const idFromCamera = searchParams.get('id');

    const generateRandomID = () => Math.random().toString(36).substring(2, 10);

    const socket = new WebSocket("wss://147.78.244.100");
socket.onopen = () => {
  const id = idFromCamera;
  if (source === 'photo' && id) {
    const url = `https://firebasestorage.googleapis.com/v0/b/openai-qr-host.firebasestorage.app/o/results%2F${id}.html?alt=media&token=${id}`;
    socket.send(JSON.stringify({ type: "show7mac", url }));
  } else {
    socket.send(JSON.stringify({ type: "showQR2" }));
  }
};

    const cleanup = () => socket.close();

    if (source === 'photo' && idFromCamera) {
      // Vision経由：idをそのままQRに
      const url = `https://firebasestorage.googleapis.com/v0/b/openai-qr-host.firebasestorage.app/o/results%2F${idFromCamera}.html?alt=media&token=${idFromCamera}`;
      setQrUrl(url);
      return cleanup;
    } else {
      // テキスト入力経由
      const inputText = idFromCamera || `${formData?.gender || ''} ${formData?.perspective || ''} ${formData?.age || ''}`;
      const generatedId = generateRandomID();

const sendToOpenAI = async () => {
  try {
    const res = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ inputText, id: generatedId }),
    });

    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();
    setQrUrl(data.url);

    // ★ここを追加！(カメラOFF時も年表ができたらMacへshow7mac＋urlを送る)
    socket.send(JSON.stringify({ type: "show7mac", url: data.url }));
  } catch (err) {
    // エラー時は何もしない
  }
};


      sendToOpenAI();
      return cleanup;
    }
  }, [formData, searchParams]);

  const handlePress = (key, pathOrStep) => {
    setPressed(key);
    setTimeout(() => {
      setPressed('');
      if (pathOrStep === -1) navigate(-1);
      else navigate(pathOrStep);
    }, 150);
  };

  const pressStyle = (key) => ({
    transform: pressed === key ? 'scale(0.9)' : 'scale(1)',
    transition: 'transform 0.01s ease-out',
  });

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#F9FAFB',
      border: '20px solid #FF8636',
      boxSizing: 'border-box',
      position: 'relative',
      fontFamily: 'DotGothic16',
      overflow: 'hidden'
    }}>

      {/* タイトル */}
      <div style={{
        position: 'absolute',
        width: '564px',
        height: '94px',
        left: 'calc(50% - 282px)',
        top: '300px',
        fontSize: '80px',
        lineHeight: '116px',
        textAlign: 'center',
        color: '#000000'
      }}>
        保存用QRコード
      </div>

      {/* QRコードフレームとQR画像 */}
      <div style={{
        position: 'absolute',
        width: '380px',
        height: '380px',
        left: 'calc(50% - 190px)',
        top: '493px',
      }}>
        <img
          src={qrFrame}
          alt="QR枠"
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
          }}
        />
        {qrUrl && (
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrUrl)}&size=300x300`}
            alt="QRコード"
            style={{
              position: 'absolute',
              top: '40px',
              left: '40px',
              width: '300px',
              height: '300px'
            }}
          />
        )}
      </div>

      {/* はじめの画面に戻るボタン */}
      <img
        src={backBtn}
        alt="はじめの画面に戻る"
        onTouchStart={() => handlePress('restart', '/1start')}
        style={{
          position: 'absolute',
          width: '445px',
          height: '90px',
          left: 'calc(50% - 220px)',
          top: '950px',
          cursor: 'pointer',
          ...pressStyle('restart')
        }}
      />
    </div>
  );
};

export default QR1;
