import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface BackButtonProps {
  label?: string;
}

const BackButton: React.FC<BackButtonProps> = ({ label = 'Back' }) => {
  const navigate = useNavigate();

  return (
    <motion.button
      onClick={() => navigate(-1)}
      className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        className="text-blue-400"
        initial={{ x: 0 }}
        animate={{ x: [-2, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, repeatType: "reverse" }}
      >
        <ArrowLeft className="w-5 h-5" />
      </motion.div>
      <span className="text-sm font-medium">{label}</span>
    </motion.button>
  );
};

export default BackButton;
