import { motion } from 'framer-motion';

interface CircularProgressProps {
  skill: string;
  percentage: number;
}

const CircularProgress = ({ skill, percentage }: CircularProgressProps) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-[120px] h-[120px] flex items-center justify-center">
      <svg className="transform -rotate-90 w-full h-full">
        {/* Background circle */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#1F1F1F"
          strokeWidth="8"
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          stroke="#FFD700"
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-sm text-white font-medium px-2">{skill}</span>
        <span className="text-gold text-sm font-bold">{percentage}%</span>
      </div>
    </div>
  );
};

export default CircularProgress; 