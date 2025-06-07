import React from 'react';
import Particles from 'react-tsparticles';
import GameCard from './GameCard';
import './GamePortal.css';
import { useColorMode } from '@docusaurus/theme-common';

const games = [
  {
    title: '🎯 1A2B 猜數字',
    description: '經典邏輯猜數字遊戲',
    link: '/homepage/games/1a2b',
    maincolor: ' #f87171',
  },
  {
    title: '🚀 打飛船',
    description: '射擊敵人拯救宇宙！',
    link: '/homepage/games/spaceshooter',
    maincolor: ' #34d399',
  },
  {
    title: '🚀 打飛船(新)',
    description: '射擊敵人拯救宇宙！',
    link: '/homepage/games/plane_shooting',
    maincolor: ' #60a5fa',
  },
];
export default function GamePortal() {
  const { isDarkTheme } = useColorMode();
  return (
    <div className="portal-container">
    <Particles
        options={{
          background: { color: (isDarkTheme?' #000000':'rgb(110, 136, 109)') },
          particles: {
            number: { value: 80 },
            size: { value: 100 },
            move: { speed: 1 },
          },
        }}
        style={{
          position: 'absolute',
          zIndex: 0,
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />

      <div className="portal-content">
        <h1 className="portal-title">🎮 小遊戲入口站</h1>
        <p className="portal-subtitle">選一款你喜歡的遊戲開始挑戰吧！</p>
        <div className="game-list">
          {games.map((g) => (
            <GameCard key={g.title} {...g} />
          ))}
        </div>
      </div>
    </div>
  );
}
