import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const PageTransition = ({ children }) => {
  const location = useLocation();

  return (
    <motion.div
      key={location.key}
      initial={{ x: "100%", opacity: 0 }} // Saindo para a direita
      animate={{ x: 0, opacity: 1 }} // Entrando
      exit={{ x: "-100%", opacity: 0 }} // Saindo para a esquerda
      transition={{ duration: 0.5 }} // Duração da animação
      style={{ position: "absolute", width: "100%", height: "100%" }} // Estilo para cobrir toda a área
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
