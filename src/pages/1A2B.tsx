import React, { useState, useEffect } from 'react';

function generateAnswer() {
  const digits = [];
  while (digits.length < 4) {
    const num = Math.floor(Math.random() * 10);
    if (!digits.includes(num)) {
      digits.push(num);
    }
  }
  return digits;
}

function checkGuess(answer, guess) {
  let A = 0;
  let B = 0;
  guess.forEach((digit, i) => {
    if (digit === answer[i]) {
      A++;
    } else if (answer.includes(digit)) {
      B++;
    }
  });
  return `${A}A${B}B`;
}

export default function OneA2BGame() {
  const [answer, setAnswer] = useState([]);
  const [guess, setGuess] = useState('');
  const [log, setLog] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    setAnswer(generateAnswer());
  }, []);

  const handleGuess = () => {
    if (guess.length !== 4 || new Set(guess).size !== 4) {
      setMessage('請輸入 4 位不重複的數字');
      return;
    }

    const guessDigits = guess.split('').map(Number);
    const result = checkGuess(answer, guessDigits);
    const newLog = [...log, { guess, result }];
    setLog(newLog);
    setMessage('');

    if (result === '4A0B') {
      setMessage(`🎉 恭喜你猜中了！答案是 ${guess}`);
    }
    setGuess('');
  };

  const resetGame = () => {
    setAnswer(generateAnswer());
    setGuess('');
    setLog([]);
    setMessage('');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>1A2B 猜數字遊戲 by ChatGPT</h1>
      <p>請輸入一個 4 位數字（不重複）來猜答案。</p>
      <input
        type="text"
        maxLength={4}
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="1234"
      />
      <button onClick={handleGuess} style={{ marginLeft: '1rem' }}>送出</button>
      <button onClick={resetGame} style={{ marginLeft: '0.5rem' }}>重新開始</button>
      <p style={{ color: 'red' }}>{message}</p>
      <ul>
        {log.map((entry, index) => (
          <li key={index}>
            第 {index + 1} 次猜：{entry.guess} → {entry.result}
          </li>
        ))}
      </ul>
    </div>
  );
}