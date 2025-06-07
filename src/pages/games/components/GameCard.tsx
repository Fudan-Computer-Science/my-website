import React from 'react';
import { motion } from 'framer-motion';
import './GameCard.css';

interface GameCardProps {
  title: string;
  description: string;
  link: string;
}

export default function GameCard({ title, description, link }: GameCardProps) {
  return (
    <motion.a
      href={link}
      className="game-card"
      whileHover={{ scale: 1.1, rotate: 1 }}
      whileTap={{ scale: 0.95 }}
    >
      <h2>{title}</h2>
      <p>{description}</p>
    </motion.a>
  );
}