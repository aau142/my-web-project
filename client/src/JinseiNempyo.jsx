import React from 'react';
import './DotGothic16-Regular.ttf';

const JinseiNempyo = ({ timelineText }) => {
  return (
    <div style={styles.timelineBox}>
      <div style={styles.timelineText}>
        {timelineText || 'ここにOpenAIからの人生年表テキストが入ります'}
      </div>
    </div>
  );
};

const styles = {
  timelineBox: {
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    backgroundColor: '#d9d9d9',
    borderRadius: '10px',
    border: '2px solid #99ccff',
    padding: '20px',
    boxSizing: 'border-box',
    overflowY: 'auto',
    color: 'black',
    fontFamily: 'DotGothic16, sans-serif',
  },
  timelineText: {
    whiteSpace: 'pre-line',
    fontSize: '16px',
    lineHeight: '1.6',
  },
};

export default JinseiNempyo;
