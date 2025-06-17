import React from 'react';
import genFrameImg from './cofeee.png'; // ← 新しく入れた画像

const QR2 = () => {
  return (
    <div style={styles.root}>
      {/* 左側：動画 */}
      <div style={styles.left}>
        <video
          src="/movie.mp4"
          autoPlay
          loop
          muted
          style={styles.video}
        />
      </div>

      {/* 右側：フレーム画像だけ表示 */}
      <div style={styles.right}>
        <img src={genFrameImg} alt="生成中フレーム" style={styles.genFrame} />
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
    background: 'black', // ←これ重要！
  },
    genFrame: {
    width: '100%',
    height: 'auto',
    objectFit: 'contain',
};

export default QR2;
