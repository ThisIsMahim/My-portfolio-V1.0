import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface AnimatedBackgroundProps {
  className?: string;
  children?: React.ReactNode;
}

export const AnimatedBackground = ({
  className,
  children,
}: AnimatedBackgroundProps) => {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <motion.div
        className={cn(
          'absolute inset-0 bg-gradient-to-br from-black via-zinc-900 to-black',
          className
        )}
        animate={{
          background: [
            'linear-gradient(to bottom right, rgb(0, 0, 0), rgb(24, 24, 27), rgb(0, 0, 0))',
            'linear-gradient(to bottom right, rgb(0, 0, 0), rgb(39, 39, 42), rgb(0, 0, 0))',
            'linear-gradient(to bottom right, rgb(0, 0, 0), rgb(24, 24, 27), rgb(0, 0, 0))',
          ],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
      />
      
      {/* Subtle noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}; 