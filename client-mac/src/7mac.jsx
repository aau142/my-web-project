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
    }}
const styles = {
  root: {
    display: 'flex',
    width: '100vw',
    height: '100vh',
    background: 'black',
  },
  left: {
    flex: 1,
    background: 'black',
  },
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  right: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'black', // ←これ重要！
  },
    genFrame: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
        },
};
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
