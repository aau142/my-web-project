import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import maleImg from './male.png';
import femaleImg from './female.png';
import backArrow from './arrow.png';

const Danjo = ({ setFormData }) => {
  const navigate = useNavigate();
  const [pressed, setPressed] = useState('');

    const clickAudio = useRef(new Audio(process.env.PUBLIC_URL + '/sonota.mp3'));

  const playClick = () => {
    const audio = clickAudio.current;
    audio.currentTime = 0;
    audio.play();
  };

  const handlePress = (target, route) => {
    playClick();
    setPressed(target);
    setTimeout(() => {
      setPressed('');
      if (route === -1) navigate(-1);
      else {
        setFormData(prev => ({ ...prev, gender: route }));
        navigate('/4miekata');
      }
    }, 150);
  };

  const getStyle = (target) => ({
    transform: pressed === target ? 'scale(0.9)' : 'scale(1)',
    transition: 'transform 0.01s ease-out'
  });

  return (
    <div style={{
      boxSizing: 'border-box',
      position: 'relative',
      width: '100vw',
      height: '100vh',
      background: '#FFFFFF',
      border: '20px solid #FF8636',
      fontFamily: 'DotGothic16',
    }}>

      <div style={{
        position: 'absolute',
        width: '678px',
        height: '65px',
        left: '173px',
        top: '168px',
        fontSize: '32px',
        lineHeight: '46px',
        textAlign: 'center',
        color: '#000000'
      }}>
        自分の性格や雰囲気について
      </div>

      <div style={{
        position: 'absolute',
        width: '1046px',
        height: '279px',
        left: '-11px',
        top: '269px',
        fontSize: '64px',
        fontWeight: 'bold',
        lineHeight: '93px',
        textAlign: 'center',
        color: '#000000',
      }}>
        他者からどちらのイメージ<br />が強いと言われますか？
      </div>

      <img
        src={maleImg}
        alt="男性っぽい"
        onTouchStart={() => handlePress('male', '男性')}
        style={{
          position: 'absolute',
          width: '450px',
          height: '400px',
          left: '60px',
          top: '645px',
          cursor: 'pointer',
          ...getStyle('male')
        }}
      />

      <img
        src={femaleImg}
        alt="女性っぽい"
        onTouchStart={() => handlePress('female', '女性')}
        style={{
          position: 'absolute',
          width: '410px',
          height: '425px',
          left: '500px',
          top: '620px',
          cursor: 'pointer',
          ...getStyle('female')
        }}
      />

      <img
        src={backArrow}
        alt="戻る"
        onTouchStart={() => handlePress('back', -1)}
        style={{
          position: 'absolute',
          width: '93px',
          height: '81.37px',
          left: '59px',
          top: '67px',
          backgroundColor: 'transparent',
          cursor: 'pointer',
          ...getStyle('back')
        }}
      />
    </div>
  );
};

export default Danjo;
