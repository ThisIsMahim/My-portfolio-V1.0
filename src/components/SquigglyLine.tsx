import React from 'react';

interface SquigglyLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  color?: string;
  width?: number;
  animated?: boolean;
  delay?: number;
}

const SquigglyLine: React.FC<SquigglyLineProps> = ({
  startX,
  startY,
  endX,
  endY,
  color = "#CBB16A",
  width = 2,
  animated = true,
  delay = 0
}) => {
  const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
  const angle = Math.atan2(endY - startY, endX - startX);
  
  // Calculate the control points for the bezier curve to create the squiggle effect
  const midX = (startX + endX) / 2;
  const midY = (startY + endY) / 2;
  
  // Calculate perpendicular offset for the control points
  const perpX = -Math.sin(angle) * (length / 5);
  const perpY = Math.cos(angle) * (length / 5);
  
  // Define the path with multiple curves for a squiggly effect
  const path = `
    M ${startX},${startY}
    Q ${midX + perpX},${midY + perpY} ${midX},${midY}
    Q ${midX - perpX},${midY - perpY} ${endX},${endY}
  `;

  return (
    <svg
      className="absolute pointer-events-none z-10"
      style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'visible',
        animation: animated ? 'squiggle 3s ease-in-out infinite' : 'none',
        animationDelay: `${delay}s`
      }}
    >
      <path
        d={path}
        stroke={color}
        strokeWidth={width}
        fill="none"
        strokeDasharray="200"
        strokeDashoffset="200"
        style={{
          animation: 'dash 2s linear forwards',
          animationDelay: `${delay + 0.3}s`
        }}
      />
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </svg>
  );
};

export default SquigglyLine;
