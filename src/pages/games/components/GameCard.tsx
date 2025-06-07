import React from 'react';
import { motion } from 'framer-motion';
import './GameCard.css';

interface GameCardProps {
  title: string;
  description: string;
  link: string;
  maincolor: string;
}

export default function GameCard({ title, description, link, maincolor }: GameCardProps) {
  return (
    <motion.a
      href={link}
      className="game-card"
      whileHover={{ scale: 1.1, rotate: 1 }}
      whileTap={{ scale: 1 }}
      style={{
        border: 'outset',
         borderColor: maincolor 
        }}
    >
      <h2>{title}</h2>
      <p>{description}</p>
    </motion.a>
  );
}