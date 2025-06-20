import React from 'react';
import frameImg from './nenp.png'; // 適宜修正

const SevenMac = ({ url }) => {
  return (
    <div style={styles.root}>
      <div style={styles.left}>
        {/* 必要に応じて動画などを追加 */}
      </div>

      <div style={styles.right}>
        {/* 背景フレーム画像 */}
        <img src={frameImg} alt="生成中フレーム" style={styles.genFrame} />

        {/* 埋め込みiframe */}
        <iframe
          src={url}
          title="年表"
          style={{
            position: 'absolute',
            top: '42%',
            left: '53%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '50%',
            border: 'none',
            background: 'white',
            zIndex: 1,
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        />
      </div>
    </div>
  );
};

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
    background: 'black',
  },
  genFrame: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
};

export default SevenMac;
