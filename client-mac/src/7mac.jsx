import React from 'react';
import frameImg from './frame1.png'; // ← パスは適宜修正

const SevenMac = ({ url }) => {
  return (
    <div style={{
      position: 'relative',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'black',
      fontFamily: 'DotGothic16',
      overflow: 'hidden',
    }}>
      {/* 吹き出し画像 */}
      <img
        src={frameImg}
        alt="フレーム"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          zIndex: 0,
        }}
      />

      {/* iframe */}
      <iframe
        src={url}
        title="年表"
        style={{
          position: 'absolute',
          top: '38%',   // 画像内のグレー部分に合わせて調整
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '55%',
          height: '48%',
          border: 'none',
          background: 'white',
          zIndex: 1,
          borderRadius: '10px',
        }}
      />
    </div>
  );
};

export default SevenMac;
