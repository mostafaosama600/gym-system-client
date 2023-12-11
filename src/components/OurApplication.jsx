import svgcircle from "/circle.svg";
import date from "../data/clients-review.json";
import styles from "../scss/OurApplication.module.scss";
import Followus from "./Followus";
import AboutApplication from "./AboutApplication";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function OurApplication() {
  const { cards } = date;

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
    <>
      <AboutApplication />
      <div className={`container-fluid bg-white my-4 ${styles.container}`}>
        <br />
        <div className="text-center">
          <h3>بعض الحديث مع عملائنا</h3>
          <img src={svgcircle} className={styles.svgcircle} alt="circle" />
        </div>
        <div
          className={`row row-cols-1 row-cols-md-3 g-4 text-center pt-1 pb-4 mt-5 mx-auto`}
        >
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
                <div className={`my-3 ${styles.imagebox}`}>
                  <img
                    src={card.quotes}
                    className={styles.image}
                    alt={card.clientname}
                  />
                </div>
                <div className="card-body">
                  <p className={`card-text my-4 ${styles.text} gray-text`}>
                    {card.decription}
                  </p>
                  <div className={`${styles.clientbox}`}>
                    <img src={card.stars} alt={card.clientname} />
                    <div className="d-flex">
                      <div>
                        <h5 className="card-title fw-bold">
                          {card.clientname}
                        </h5>
                        <span className="card-title gray-text">
                          {card.role}
                        </span>
                      </div>
                      <img src={card.background} alt="background" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <Followus />
      </div>
    </>
  );
}
