import React, { useEffect, useRef, useState } from 'react';

interface Bullet {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

interface Enemy {
  x: number;
  y: number;
  hp: number;
  isBoss?: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

const canvasStyle: React.CSSProperties = {
  width: '400px',
  height: '500px',
  border: '2px solid white',
  background: '#111',
  borderRadius: '8px',
  boxShadow: '0 0 20px #0ff',
  display: 'block',
  margin: '0 auto',
};

const GameCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerX = useRef(180);
  const bullets = useRef<Bullet[]>([]);
  const enemies = useRef<Enemy[]>([]);
  const particles = useRef<Particle[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = 400;
    canvas.height = 500;

    let frame = 0;
    let animationId: number;
    let isRunning = true;

    const update = () => {
      if (!isRunning || gameOver) return;

      ctx.fillStyle = 'rgba(15, 20, 30, 0.5)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 玩家
      ctx.fillStyle = '#00ffff';
      ctx.fillRect(playerX.current, 450, 40, 30);

      // 子彈
      bullets.current = bullets.current.filter((b) => b.y > -10);
      bullets.current.forEach((b) => {
        b.y += b.vy;
        ctx.fillStyle = '#ffff00';
        ctx.fillRect(b.x, b.y, 4, 10);
      });

      // 敵人
      enemies.current.forEach((e, index) => {
        e.y += 1;
        const maxHp = e.isBoss ? 50 : 3;
        const hpRatio = e.hp / maxHp;
        const red = Math.floor(255 * hpRatio);
        const green = Math.floor(50 * hpRatio);
        const color = e.isBoss ? `rgba(${red},0,${red},0.8)` : `rgba(${red},${green},${green},0.8)`;

        ctx.fillStyle = color;
        ctx.fillRect(e.x, e.y, e.isBoss ? 80 : 30, e.isBoss ? 40 : 30);

        bullets.current.forEach((b) => {
          const ex = e.x;
          const ey = e.y;
          const ew = e.isBoss ? 80 : 30;
          const eh = e.isBoss ? 40 : 30;
          if (b.x > ex && b.x < ex + ew && b.y > ey && b.y < ey + eh) {
            e.hp -= 1;
            b.y = -100;
            createExplosion(b.x, b.y);
            if (e.hp <= 0) {
              enemies.current.splice(index, 1);
              setScore((s) => s + (e.isBoss ? 100 : 10));
            }
          }
        });

        if (e.y > 430 && Math.abs(e.x - playerX.current) < 30) {
          setGameOver(true);
          isRunning = false;
          cancelAnimationFrame(animationId);
        }
      });

      particles.current = particles.current.filter((p) => p.life > 0);
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 1;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.life / 30;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      if (frame % 100 === 0) {
        enemies.current.push({ x: Math.random() * 360, y: 0, hp: 3 });
      }

      if (score >= 100 && !enemies.current.some((e) => e.isBoss)) {
        enemies.current.push({ x: 160, y: 0, hp: 50, isBoss: true });
      }

      frame++;
      animationId = requestAnimationFrame(update);
    };

    const createExplosion = (x: number, y: number) => {
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const speed = Math.random() * 2;
        particles.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 30,
          color: `hsl(${Math.random() * 360}, 100%, 70%)`,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      playerX.current = e.clientX - rect.left - 20;
    };

    const shootInterval = setInterval(() => {
      if (!isRunning) return;
      bullets.current.push({ x: playerX.current + 18, y: 440, vx: 0, vy: -6 });
    }, 250);

    window.addEventListener('mousemove', handleMouseMove);
    update();

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(shootInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [score, gameOver]);

  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
      <h2 style={{ color: '#fff' }}>🚀 空戰遊戲</h2>
      <p style={{ color: '#0ff' }}>分數: {score}</p>
      {gameOver && <div style={{ color: 'red', fontSize: '2rem' }}>💀 Game Over</div>}
      <canvas ref={canvasRef} style={canvasStyle} />
    </div>
  );
};

export default GameCanvas;
