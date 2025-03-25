import React from 'react';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div 
      className={`animate-pulse bg-gold/10 rounded-lg ${className}`}
    />
  );
};

export default Skeleton; 