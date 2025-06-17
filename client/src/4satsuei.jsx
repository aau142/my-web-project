import React, { useRef, useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import arrow from './arrow.png'; // 戻るボタン画像

const Satsuei = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [pressed, setPressed] = useState('');
  const navigate = useNavigate();

  // ✅ 自動撮影処理
  const takePicture = useCallback(async () => {
    const context = canvasRef.current.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, 640, 480);
    const imageData = canvasRef.current.toDataURL('image/jpeg');

      const forceTimeout = setTimeout(() => {
    navigate('/qr1?source=photo&timeout=true');
  }, 4000);
    
  try {
    const response = await fetch(`${process.env.REACT_APP_API_BASE}/api/photo`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: imageData })
    });

    const result = await response.json();

    if (response.ok && result.id) {
      clearTimeout(forceTimeout); // ✅ 成功したら強制遷移キャンセル
      window.macClient?.send(JSON.stringify({ type: 'result', data: result.result }));
      navigate(`/qr1?source=photo&id=${result.id}`, { state: { id: result.id } });
    } else {
      alert("解析に失敗しました");
    }
  } catch (err) {
    alert("エラーが発生しました");
  }
}, [navigate]);
  
  // ✅ カメラ起動して、すぐ撮影
  useEffect(() => {
    if (!canvasRef.current || !videoRef.current) return;

    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        // カメラ起動後に1秒だけ待ってから自動撮影
        setTimeout(() => {
          takePicture();
        }, 2000);
      })
      .catch(() => {
        alert("カメラを起動できませんでした。設定を確認してください。");
      });
  }, [takePicture]);

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

      {/* スキャンしています（ふわふわ） */}
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
        スキャンしています…
      </div>

      {/* 撮影ビュー枠 */}
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

      <canvas ref={canvasRef} width="640" height="480" style={{ display: 'none' }} />
    </div>
  );
};

export default Satsuei;
