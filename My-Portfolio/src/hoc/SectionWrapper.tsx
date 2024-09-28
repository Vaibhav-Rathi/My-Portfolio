import { motion } from "framer-motion";
import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";


// HOC definition with TypeScript
const StarWrapper = <P extends object>(
  Component: React.ComponentType<P>,
  idName: string
) =>
  function HOC(props: P) {
    return (
      <motion.section
        variants={staggerContainer(2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
      >
        <span className="hash-span" id={idName}>
          &nbsp;
        </span>

        {/* Pass the props down to the wrapped component */}
        <Component {...props} />
      </motion.section>
    );
  };

export default StarWrapper;
