import { motion } from "framer-motion";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

const TextReveal = ({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.08,
  as: Tag = "h1",
}: TextRevealProps) => {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{
              duration: 0.7,
              delay: delay + i * staggerDelay,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

export default TextReveal;
