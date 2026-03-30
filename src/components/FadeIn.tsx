import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const FadeIn = ({ children, delay = 0, className = "" }: FadeInProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      duration: 0.8,
      delay,
      ease: [0.25, 0.1, 0.25, 1],
    }}
    className={className}
  >
    {children}
  </motion.div>
);

export default FadeIn;
