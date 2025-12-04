import { AnimatePresence, motion } from "framer-motion";
import styles from "./CenterModal.module.css";

const CenterModal = ({ styleModal = {}, children }) => {
  return (
    <AnimatePresence>
      <>
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          style={styleModal}
        >
          <div className={styles.content}>{children}</div>
        </motion.div>
      </>
    </AnimatePresence>
  );
};

export default CenterModal;
