import React from 'react';

const SevenMac = ({ url }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      {url ? (
        <iframe
          src={url}
          title="Timeline"
          style={{
            width: "100%",
            height: "100%",
            border: "none"
          }}
        />
      ) : (
        <div style={{ textAlign: 'center', padding: '40px', fontSize: '2rem' }}>
          年表を読み込んでいます...
        </div>
      )}
    </div>
  );
};


export default SevenMac;
