import React, { useEffect, useRef, useState } from 'react';
import './spaceshooter.css';

type Bullet = { x: number; y: number };
type EnemyType = 'normal' | 'fast' | 'tank' | 'boss';

type Enemy = {
  id: number;
  x: number;
  y: number;
  type: EnemyType;
  speed: number;
  hp: number;
  color: string;
  size: number;
  isBoss?: boolean;
};

export default function SpaceShooterBoss() {
  const [shipX, setShipX] = useState(220);
  const shipXRef = useRef(shipX);
  const [bullets, setBullets] = useState<Bullet[]>([]);
  const bulletsRef = useRef<Bullet[]>([]);
  const [enemies, setEnemies] = useState<Enemy[]>([]);
  const [score, setScore] = useState(0);
  const [playerHp, setPlayerHp] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [bossAppeared, setBossAppeared] = useState(false);
  const gameInterval = useRef<number | null>(null);

  useEffect(() => {
    shipXRef.current = shipX;
  }, [shipX]);

  useEffect(() => {
    bulletsRef.current = bullets;
  }, [bullets]);

  const moveShip = (dir: 'left' | 'right') => {
    setShipX(prev => {
      const newX = Math.max(0, Math.min(prev + (dir === 'left' ? -20 : 20), 440));
      shipXRef.current = newX;
      return newX;
    });
  };

  const fire = () => {
    if (!gameOver) {
      setBullets(prev => [...prev, { x: shipXRef.current + 15, y: 440 }]);
    }
  };

  const spawnEnemy = () => {
    if (!bossAppeared && score >= 15) {
      const boss: Enemy = {
        id: Date.now(),
        x: 150,
        y: 0,
        type: 'boss',
        speed: 1,
        hp: 20,
        color: 'black',
        size: 100,
        isBoss: true,
      };
      setEnemies(prev => [...prev, boss]);
      setBossAppeared(true);
      return;
    }

    const id = Date.now();
    const x = Math.floor(Math.random() * 440);
    const r = Math.random();
    let type: EnemyType = 'normal', speed = 3, hp = 1, color = 'red', size = 40;

    if (r < 0.6) {
      type = 'normal'; speed = 3; hp = 1; color = 'red'; size = 40;
    } else if (r < 0.85) {
      type = 'fast'; speed = 6; hp = 1; color = 'orange'; size = 30;
    } else {
      type = 'tank'; speed = 1.5; hp = 3; color = 'purple'; size = 50;
    }

    setEnemies(prev => [...prev, { id, x, y: 0, type, speed, hp, color, size }]);
  };

  const updateGame = () => {
    if (gameOver) return;

    setBullets(prev =>
      prev.map(b => ({ ...b, y: b.y - 10 })).filter(b => b.y > 0)
    );

    setEnemies(prevEnemies => {
      const updated: Enemy[] = [];

      prevEnemies.forEach(enemy => {
        let hit = false;

        for (const bullet of bulletsRef.current) {
          if (
            Math.abs(bullet.x - enemy.x) < enemy.size &&
            Math.abs(bullet.y - enemy.y) < enemy.size
          ) {
            hit = true;
            enemy.hp -= 1;
            if (enemy.hp <= 0) {
              setScore(s => s + (enemy.isBoss ? 10 : 1));
            }
            break;
          }
        }

        if (
          Math.abs(enemy.x - shipXRef.current) < enemy.size &&
          Math.abs(enemy.y - 470) < enemy.size
        ) {
          setPlayerHp(hp => {
            const newHp = hp - 1;
            if (newHp <= 0) setGameOver(true);
            return newHp;
          });
          return;
        }

        if (!hit || enemy.hp > 0) {
          updated.push({ ...enemy, y: enemy.y + enemy.speed });
        }
      });

      return updated.filter(e => e.y < 500);
    });
  };

  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (gameOver) return;
      if (e.code === 'ArrowLeft') moveShip('left');
      else if (e.code === 'ArrowRight') moveShip('right');
      else if (e.code === 'Space') fire();
    };

    window.addEventListener('keydown', handle);
    if (!gameOver) {
      gameInterval.current = window.setInterval(() => {
        updateGame();
        if (Math.random() < 0.05) spawnEnemy();
      }, 1000 / 30);
    }

    return () => {
      window.removeEventListener('keydown', handle);
      if (gameInterval.current) clearInterval(gameInterval.current);
    };
  }, [score, bossAppeared, gameOver]);

  return (
    <div className="game-container">
      <h1>🚀 打飛船 - Boss 戰 by 14th進階教學 (vide coding with ChatGPT)</h1>
      <div className="game-area">
        <div className="ship" style={{ left: shipX }} />
        {bullets.map((b, i) => (
          <div key={i} className="bullet" style={{ left: b.x, top: b.y }} />
        ))}
        {enemies.map((e) => (
          <div
            key={e.id}
            className="enemy"
            style={{
              left: e.x,
              top: e.y,
              backgroundColor: e.color,
              width: e.size,
              height: e.size,
              border: e.isBoss ? '4px solid gold' : 'none',
            }}
          />
        ))}
      </div>
      <div className="score">
        ❤️ 血量：{playerHp}　🎯 分數：{score}
      </div>
        {gameOver && (
          <div className="game-over">
            ☠️ GAME OVER ☠️<br />
            最終分數：{score}
          </div>
        )}
          <div className="touch-zone left" onClick={() => moveShip('left')} />
          <div className="touch-zone center" onClick={fire} />
          <div className="touch-zone right" onClick={() => moveShip('right')} />
    </div>
  );
}
