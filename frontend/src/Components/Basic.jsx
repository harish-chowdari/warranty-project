import React, { useState } from 'react';
import { motion } from 'framer-motion';

export const LayoutExample = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      layout
      drag   // Enables dragging
      dragConstraints={{ left: -100, right: 500, top: -100, bottom: 100 }} // Defines drag boundaries
      onClick={() => setIsOpen(!isOpen)}
      style={{
        background: 'lightgreen',
        padding: 20,
        width: 200,
        cursor: 'pointer',
      }}
    >
      <motion.svg width="200" height="200">
  <motion.circle
    cx="100"
    cy="100"
    r="80"
    stroke="blue"
    strokeWidth="4"
    fill="transparent"
    animate={{ pathLength: 1 }}
    initial={{ pathLength: 1 }}
    transition={{ duration: 2 }}
  />
</motion.svg>

    </motion.div>
  );
};
