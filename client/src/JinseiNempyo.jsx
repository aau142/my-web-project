import React from 'react';
import './DotGothic16-Regular.ttf';

const JinseiNempyo = ({ timelineText }) => {
  return (
    <div style={styles.container}>
      <div style={styles.titleContainer}>
        <div style={styles.subTitle}>僕から見た君の</div>
        <div style={styles.mainTitle}>人生年表</div>
      </div>

      <div style={styles.timelineBox}>
        <div style={styles.timelineText}>
          {timelineText || 'ここにOpenAIからの人生年表テキストが入ります'}
        </div>
      </div>

      <div style={styles.footerText}>
        僕の分析は正しかったかな？<br />
        君の人生と比べてみて！
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: 'black',
    color: 'white',
    fontFamily: 'DotGothic16, sans-serif',
    height: '100vh',
    width: '100vw',
    position: 'relative',
    padding: '40px',
    boxSizing: 'border-box',
  },
  titleContainer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  subTitle: {
    fontSize: '20px',
  },
  mainTitle: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#ffcc66',
    textShadow: `
      -1px -1px 0 #66ccff,  
      1px -1px 0 #66ccff,
      -1px 1px 0 #66ccff,
      1px 1px 0 #66ccff
    `,
  },
  timelineBox: {
    margin: '0 auto',
    width: '70%',
    height: '50vh',
    backgroundColor: '#d9d9d9',
    borderRadius: '10px',
    border: '2px solid #99ccff',
    padding: '20px',
    boxSizing: 'border-box',
    overflowY: 'auto',
    color: 'black',
  },
  timelineText: {
    whiteSpace: 'pre-line',
    fontSize: '16px',
    lineHeight: '1.6',
  },
  footerText: {
    position: 'absolute',
    bottom: '40px',
    width: '100%',
    textAlign: 'center',
    fontSize: '25px',
    color: 'white',
  },
};

export default JinseiNempyo;
