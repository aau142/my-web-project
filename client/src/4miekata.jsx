import React, { useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import cuteIcon from './cute.png';
import coolIcon from './cool.png';
import stylishIcon from './stylish.png';
import kindIcon from './kind.png';
import backArrow from './arrow.png';

const Miekata = ({ setFormData }) => {
  const navigate = useNavigate();
  const [pressed, setPressed] = useState('');
  
    const clickAudio = useRef(new Audio(process.env.PUBLIC_URL + '/sonota.mp3'));

  const playClick = () => {
    const audio = clickAudio.current;
    audio.currentTime = 0;
    audio.play();
  };

  const handlePress = (target, value) => {
    playClick();
    setPressed(target);
    setTimeout(() => {
      setPressed('');
      if (value === 'back') {
        navigate(-1);
      } else {
        setFormData(prev => ({ ...prev, perspective: value }));
        navigate('/5nenrei');
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
        width: '768px',
        height: '186px',
        left: '128px',
        top: '265px',
        fontSize: '62px',
        fontWeight: 'bold',
        lineHeight: '93px',
        textAlign: 'center',
        color: '#000000',
      }}>
        他者からどのイメージと<br />言われますか？
      </div>

      {/* Buttons and icons */}
      <img src={cuteIcon} alt="かわいい" onTouchStart={() => handlePress('cute', 'かわいい')} style={{ position: 'absolute', width: '354px', height: '300px', left: '115px', top: '525px', cursor: 'pointer', ...getStyle('cute') }} />

      <img src={coolIcon} alt="かっこいい" onTouchStart={() => handlePress('cool', 'かっこいい')} style={{ position: 'absolute', width: '354px', height: '300px', left: '506px', top: '525px', cursor: 'pointer', ...getStyle('cool') }} />

      <img src={stylishIcon} alt="おしゃれ" onTouchStart={() => handlePress('stylish', 'おしゃれ')} style={{ position: 'absolute', width: '354px', height: '300px', left: '115px', top: '875px', cursor: 'pointer', ...getStyle('stylish') }} />

      <img src={kindIcon} alt="やさしい" onTouchStart={() => handlePress('kind', 'やさしい')} style={{ position: 'absolute', width: '354px', height: '300px', left: '506px', top: '875px', cursor: 'pointer', ...getStyle('kind') }} />

      <img
         src={backArrow}
        alt="戻る"
        onTouchStart={() => handlePress('back', 'back')}
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

export default Miekata;
