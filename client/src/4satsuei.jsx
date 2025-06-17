import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import arrow from './arrow.png';
import analyzeBtn from './analyze-btn.png';

const Satsuei = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [pressed, setPressed] = useState('');
  const navigate = useNavigate();

  const takePicture = useCallback(async () => {
    if (!canvasRef.current || !videoRef.current) {
      alert("カメラが初期化されていません");
      return;
    }

    const context = canvasRef.current.getContext('2d');
    if (!context) {
      alert("Canvas context が取得できません");
      return;
    }

    context.drawImage(videoRef.current, 0, 0, 640, 480);
    const imageData = canvasRef.current.toDataURL('image/jpeg');

    try {
      const response = await fetch(`${process.env.REACT_APP_API_BASE}/api/photo`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData })
      });

      const result = await response.json();

      if (response.ok && result.id) {
        window.macClient?.send(JSON.stringify({ type: 'result', data: result.result }));
        navigate(`/qr1?source=photo&id=${result.id}`, { state: { id: result.id } });
      } else {
        alert("解析に失敗しました");
      }
    } catch (error) {
      console.error(error);
      alert("エラーが発生しました");
    }
  }, [navigate]);

  useEffect(() => {
    if (!canvasRef.current || !videoRef.current) return;

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      })
      .catch(() => {
        alert("カメラを起動できませんでした。設定を確認してください。");
      });
  }, []);

  const handleBack = () => {
    setPressed('back');
    setTimeout(() => {
      setPressed('');
      navigate(-1);
    }, 150);
  };

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: '#F9FAFB',
      border: '20px solid #f57c2d',
      boxSizing: 'border-box',
      position: 'relative',
      fontFamily: 'DotGothic16'
    }}>
      {/* 戻るボタン */}
      <img
        src={arrow}
        alt="戻る"
        onTouchStart={handleBack}
        onClick={handleBack}
        style={{
          position: 'absolute',
          width: '93px',
          height: '81.37px',
          left: '59px',
          top: '67px',
          cursor: 'pointer',
          transform: pressed === 'back' ? 'scale(0.9)' : 'scale(1)',
          transition: 'transform 0.05s ease-out'
        }}
      />

      {/* スキャン文 */}
      <div className="scan-text" style={{
        position: 'absolute',
        width: '729px',
        height: '77px',
        left: 'calc(50% - 364.5px)',
        top: '147px',
        fontSize: '64px',
        fontWeight: 'bold',
        lineHeight: '93px',
        textAlign: 'center',
        color: '#000000'
      }}>
        撮影して解析します
      </div>

      {/* 撮影ビュー */}
      <div style={{
        position: 'absolute',
        width: '837px',
        height: '761px',
        left: '70px',
        top: '270px',
        border: '5px dashed #f57c2d',
        borderRadius: '50px',
        overflow: 'hidden',
        zIndex: 1
      }}>
        <video
          ref={videoRef}
          width="837"
          height="761"
          autoPlay
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '50px'
          }}
        />
      </div>

      {/* 撮影ボタン */}
      <img
        src={analyzeBtn}
        alt="撮影する"
        onTouchStart={takePicture}
        onClick={takePicture}
        style={{
          position: 'absolute',
          width: '600px',
          left: 'calc(50% - 300px)',
          bottom: '100px',
          cursor: 'pointer',
          zIndex: 2
        }}
      />

      <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
    </div>
  );
};

export default Satsuei;
