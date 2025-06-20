import React from 'react';
import frameImg from './nenp.png'; // フレーム画像のパス

const SevenMac = ({ url }) => {
  return (
    <div style={styles.root}>
      {/* 左側：動画エリア */}
      <div style={styles.left}>
        <video
          src="/movie.mp4"
          style={styles.video}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      {/* 右側：フレーム画像＋iframe年表 */}
      <div style={styles.right}>
        <img src={frameImg} alt="生成中フレーム" style={styles.genFrame} />

        <iframe
          src={url}
          title="年表"
          style={{
            position: 'absolute',
            top: '42%',
            left: '53%',
            transform: 'translate(-50%, -50%)',
            width: '60%',
            height: '70%',
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
