import React from 'react';

// 必要ならimportを使う or public配下なら直書きでOK
import frameImg from './frame.png';
import cupImg from './coffee.png';

const QR2 = () => {
  return (
    <div style={styles.root}>
      {/* 左側：movie.mp4 */}
      <div style={styles.left}>
        <video
          src="/movie.mp4"
          autoPlay
          loop
          muted
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>
      {/* 右側：生成中フレーム */}
      <div style={styles.right}>
        <img src={frameImg} alt="フレーム" style={styles.frame} />
        <div style={styles.textBlock}>
          <span style={styles.text}>人生年表を<br />生成するよ</span>
          <img src={cupImg} alt="カップ" style={styles.cup} />
        </div>
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'black',
  },
  video: {
    width: '95%',
    height: '95%',
    objectFit: 'contain',
    background: 'black',
    borderRadius: '1vw',
  },
  right: {
    flex: 1,
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'black',
  },
  frame: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    pointerEvents: 'none',
  },
  textBlock: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },
  text: {
    color: 'white',
    fontSize: '2.2rem',
    fontFamily: '"DotGothic16", sans-serif',
    textAlign: 'center',
    marginRight: '12px',
    lineHeight: '1.4',
  },
  cup: {
    width: '48px',
    height: '48px',
  },
};

export default QR2;
