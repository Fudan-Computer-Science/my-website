import React from 'react';
import GameCard from './GameCard';
import './GamePortal.css';
import Particles from 'react-tsparticles';

const games = [
  {
    title: '🎯 1A2B 猜數字',
    description: '經典邏輯猜數字遊戲',
    link: '/homepage/games/1a2b',
  },
  {
    title: '🚀 打飛船',
    description: '射擊敵人拯救宇宙！',
    link: '/homepage/games/spaceshooter',
  },
];
export default function GamePortal() {
  return (
    <div className="portal-container">
<Particles
  id="tsparticles"
  options={{
    fullScreen: { enable: false },
    background: { color: "#000000" },
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        resize: true,
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
      },
    },
    particles: {
      color: { value: "#ffffff" },
      links: {
        color: "#ffffff",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: { enable: true },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: false,
        speed: 2,
        straight: false,
      },
      number: {
        density: { enable: true, area: 800 },
        value: 80,
      },
      opacity: { value: 0.5 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 5 } },
    },
    detectRetina: true,
  }}
  style={{
    position: "absolute",
    zIndex: 0,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
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
