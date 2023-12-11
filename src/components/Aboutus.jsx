import styles from "../scss/About.module.scss";
import data from "../data/about-us.json";
import svgcircle from "/circle.svg";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function Aboutus() {
  const { cards } = data;

  const animation = useAnimation();
  const { ref, inView } = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      animation.start({
        opacity: 1,
        y: 0,
        transition: { type: "spring", stiffness: 50, damping: 20 },
      });
    }
  }, [animation, inView]);

  return (
    <div className={`container-fluid bg-white my-4 ${styles.container}`}>
      <br />
      <div className="text-center">
        <h3>من نحن؟</h3>

        <img src={svgcircle} className={styles.svgcircle} alt="circle" />
      </div>

      <div className={`row row-cols-1 row-cols-md-3 g-0 text-center pt-1 pb-4`}>
        {cards.map((card, index) => (
          <motion.div
            className={`col m-0 p-0`}
            key={card.id}
            initial={{ opacity: 0, y: 50 }}
            animate={animation}
            ref={ref}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 20,
              delay: index * 0.4,
            }}
          >
            <div className={`card p-4 mt-4 border-0 ${styles.card}`}>
              <div className="my-3">
                <img src={card.firstimage} alt={card.title} />
              </div>
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p className={`card-text ${styles.text}`}>{card.decription}</p>
                <img src={card.arrow} alt={card.title} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
