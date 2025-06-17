import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ageBox from './age-box.png';
import analyzeBtn from './analyze-btn.png';
import backArrow from './arrow.png';

const Nenrei = ({ setFormData }) => {
  const navigate = useNavigate();
  const [age, setAge] = useState(20);
  const [pressed, setPressed] = useState('');

  const handlePress = (target) => {
    setPressed(target);
    setTimeout(() => {
      setPressed('');
      if (target === 'back') {
        navigate(-1);
      } else {
        setFormData(prev => ({ ...prev, age: `${age}歳` }));
        const id = Math.random().toString(36).substring(2, 10);
        navigate('/qr1', { state: { id } });
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
      fontFamily: 'DotGothic16'
    }}>

      {/* Header */}
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
        width: '832px',
        height: '186px',
        left: '97px',
        top: '263px',
        fontSize: '62px',
        fontWeight: 'bold',
        lineHeight: '93px',
        textAlign: 'center',
        color: '#000000',
      }}>
        他者から何歳くらいに見える<br />と言われますか？
      </div>

      {/* 年齢ボックス */}
      <img src={ageBox} alt="年齢ボックス" style={{
        position: 'absolute',
        width: '569px',
        height: '305px',
        left: '223px',
        top: '520px'
      }} />

      {/* 歳ラベル */}
      <div style={{
        position: 'absolute',
        width: '128px',
        height: '93px',
        left: '606px',
        top: '687px',
        fontSize: '62px',
        fontWeight: 'bold',
        lineHeight: '93px',
        textAlign: 'center',
        color: '#000000',
      }}>
        さい
      </div>

      {/* スライダー */}
          <input type="range" min="0" max="80" value={age} onChange={(e) => setAge(e.target.value)}
        style={{
          position: 'absolute',
          width: '563px',
          left: '225px',
          top: '890px',
          appearance: 'none',
          height: '10px',
          backgroundColor: '#000',
          borderRadius: '0',
          outline: 'none'
        }}
      />
      {/* スライダー装飾スタイル */}
      <style>{`
        input[type=range]::-webkit-slider-thumb {
          appearance: none;
          width: 32px;
          height: 32px;
          background: #FF8636;
        }

        input[type=range]::-moz-range-thumb {
          width: 32px;
          height: 32px;
          background: #FF8636;
        }
      `}</style>

      {/* 数値表示 */}
      <div style={{
        position: 'absolute',
        width: '100px',
        height: '100px',
        left: '360px',
        top: '510px',
        fontSize: '200px',
        color: '#000',
        textAlign: 'center'
      }}>
        {age}
      </div>

      {/* 分析ボタン */}
      <img
        src={analyzeBtn}
        alt="分析する"
        onTouchStart={() => handlePress('analyze')}
        style={{
          position: 'absolute',
          width: '362px',
          height: '132px',
          left: '310px',
          top: '1000px',
          cursor: 'pointer',
          ...getStyle('analyze')
        }}
      />

      {/* 戻る */}
      <img
        src={backArrow}
        alt="戻る"
        onTouchStart={() => handlePress('back')}
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

export default Nenrei;
