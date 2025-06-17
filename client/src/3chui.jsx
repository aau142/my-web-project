import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import agree from './monkey.png';
import arrow from './arrow.png';

const Chui = () => {
  const navigate = useNavigate();
  const [pressed, setPressed] = useState('');

  const handlePress = (target, route) => {
    setPressed(target);
    setTimeout(() => {
      setPressed('');
      if (route === -1) navigate(-1);
      else navigate(route);
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
      background: '#F9FAFB',
      border: '20px solid #f57c2d',
      boxSizing: 'border-box',
      position: 'relative',
      fontFamily: 'DotGothic16',
      overflow: 'hidden',
      touchAction: 'manipulation'
    }}>
      {/* 戻るボタン */}
      <img
        src={arrow}
        alt="back"
        onTouchStart={() => handlePress('back', -1)}
        style={{
          position: 'absolute',
          width: '93px',
          height: '81.37px',
          left: '59px',
          top: '67px',
          cursor: 'pointer',
          ...getStyle('back')
        }}
      />

      {/* 注意事項ボックス */}
      <div style={{
        position: 'absolute',
        width: '772px',
        height: '476px',
        left: '123px',
        top: '351px',
        background: '#FFF3CC',
        border: '8px dashed #000000',
        boxSizing: 'border-box'
      }} />

      {/* タイトル */}
      <div style={{
        position: 'absolute',
        width: '306px',
        height: '93px',
        left: '356px',
        top: '425px',
        fontSize: '75px',
        fontWeight: 1500,
        lineHeight: '93px',
        textAlign: 'center',
        color: '#000000',
        userSelect: 'none'
      }}>
        注意事項
      </div>

      {/* 本文 */}
      <div style={{
        position: 'absolute',
        width: '593px',
        height: '184px',
        left: '213px',
        top: '571px',
        fontSize: '32px',
        fontWeight: 1000,
        lineHeight: '40px',
        color: '#000000',
        userSelect: 'none'
      }}>
        ・実年齢をAIが予測するため実際の年齢と開きが生まれる可能性があります。<br /><br />
        ・AIに写真が送られます。　　　　　　使用された写真は即時削除されます。
         
      </div>

      {/* 同意ボタン画像 */}
      <img
        src={agree}
        alt="同意する"
        onTouchStart={() => handlePress('agree', '/4satsuei')}
        style={{
          position: 'absolute',
          width: '362px',
          height: '132px',
          left: 'calc(50% - 362px / 2)',
          top: '965px',
          cursor: 'pointer',
          ...getStyle('agree')
        }}
      />
    </div>
  );
};

export default Chui;
