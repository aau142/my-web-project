import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import arrow from './arrow.png';
import onBtn from './on.png';
import offBtn from './off.png';


const Camera = () => {
  const navigate = useNavigate();
  const [pressed, setPressed] = useState('');

  const clickAudio = useRef(new Audio(process.env.PUBLIC_URL + '/sonota.mp3'));

  const playClick = () => {
    const audio = clickAudio.current;
    audio.currentTime = 0;
    audio.play();
  };

  const handleTap = (target, route) => {
    playClick();
    setPressed(target);
    setTimeout(() => {
      setPressed('');
      navigate(route);
    }, 150);
  };

  const getStyle = (target) => ({
    transform: pressed === target ? 'scale(0.9)' : 'scale(1)',
    transition: 'transform 0.01s ease-out'
  });

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      position: 'relative',
      background: '#F9FAFB',
      border: '20px solid #f57c2d',
      fontFamily: 'DotGothic16',
      boxSizing: 'border-box',
      overflow: 'hidden',
      touchAction: 'manipulation',
    }}>
      {/* 戻るボタン */}
      <img
        src={arrow}
        alt="back"
        style={{
          position: 'absolute',
          width: '93px',
          height: '81.37px',
          left: '59px',
          top: '67px',
          cursor: 'pointer',
          ...getStyle('back')
        }}
        onTouchStart={() => handleTap('back', '/1start')}
      />

      {/* カメラを起動する */}
      <div style={{
        position: 'absolute',
        width: '774px',
        height: '116px',
        left: 'calc(50% - 774px / 2)',
        top: '274px',
        fontWeight: 1000,
        fontSize: '80px',
        lineHeight: '116px',
        textAlign: 'center',
        color: '#000000',
        userSelect: 'none'
      }}>
        カメラを起動する
      </div>

      {/* ON / OFF ボタン */}
      <div style={{
        position: 'absolute',
              top: '557px',
  left: '50%',
  transform: 'translateX(-50%)',
  width: 'auto',
  height: 'auto',
  textAlign: 'center'
}}>
  <img
    src={onBtn}
    alt="on"
    style={{
      width: '350px',   // 好きなサイズに調整（ここを大きくする）
      height: 'auto',
      cursor: 'pointer',
      ...getStyle('on')
    }}
    onTouchStart={() => handleTap('on', '/3chui')}
  />
</div>
      
{/* カメラOFFアイコン */}
<div style={{
  position: 'absolute',
  bottom: '80px',
  right: '50px',
  textAlign: 'center'
}}>
  <img src={offBtn} alt="OFF" style={{
            width: '200px' , 
            cursor: 'pointer',
            ...getStyle('on')}}
    onTouchStart={() => handleTap('on', '/3chui')}
        />
</div>

      

      {/* 注意文 */}
      <div style={{
        position: 'absolute',
        width: '813px',
        height: '70px',
        left: 'calc(50% - 813px/2)',
        top: '909px',
        fontWeight: 500,
        fontSize: '48px',
        lineHeight: '70px',
        textAlign: 'center',
        color: '#000000',
        userSelect: 'none'
      }}>
        ※カメラの使用をお勧めします
      </div>
    </div>
  );
};

export default Camera;
