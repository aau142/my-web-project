import React from 'react';
import frameImg from './nenp.png'; // パスは適宜修正

const SevenMac = ({ url }) => {
  return (
    <div style={{
      position: 'relative',
    width: '100%',
    height: '100%',
      backgroundColor: 'black',
      fontFamily: 'DotGothic16',
      overflow: 'hidden',
    }}>
      {/* フレーム画像（吹き出し） */}
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

      {/* iframe を適切な位置に */}
      <iframe
        src={url}
        title="年表"
        style={{
          position: 'absolute',
          top: '42%',           // 位置微調整（画像中央のグレー枠に合わせて）
          left: '53%',
          transform: 'translate(-50%, -50%)',
          width: '60%',
          height: '50%',
          border: 'none',
          background: 'white',
          zIndex: 1,
          borderRadius: '8px',
          overflow: 'hidden'
        }}
      />
    </div>
  );
};

export default SevenMac;
