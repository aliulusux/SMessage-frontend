import React from "react";
import { motion } from "framer-motion";

export default function Slide({ title, description }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center p-4 h-full"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </motion.div>
  );
}
