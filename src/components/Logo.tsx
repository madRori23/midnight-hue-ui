import { motion } from "framer-motion";
import { Dumbbell } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

const Logo = ({ size = "md", animate = true }: LogoProps) => {
  const sizeClasses = {
    sm: "text-3xl",
    md: "text-5xl",
    lg: "text-7xl"
  };

  const iconSizes = {
    sm: 32,
    md: 48,
    lg: 64
  };

  return (
    <motion.div
      initial={animate ? { opacity: 0, scale: 0.8 } : {}}
      animate={animate ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col items-center gap-4"
    >
      <motion.div
        animate={animate ? { rotate: [0, -10, 10, -10, 0] } : {}}
        transition={{ duration: 1.5, delay: 0.3 }}
        className="relative"
      >
        <div className="absolute inset-0 blur-xl bg-primary/30 rounded-full" />
        <Dumbbell size={iconSizes[size]} className="text-primary relative z-10" />
      </motion.div>
      <div className={`${sizeClasses[size]} font-bold flex flex-col items-center`}>
        <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Gym
        </span>
        <span className="text-foreground -mt-2">Buddies</span>
      </div>
    </motion.div>
  );
};

export default Logo;