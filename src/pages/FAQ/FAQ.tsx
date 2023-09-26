import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import styles from "./FAQ.module.scss";


const FAQ: FC = () => {
  const faqData = [
    {
      question: i18next.t("question1"),
      answer: i18next.t("answer1"),
    },
    {
      question: i18next.t("question2"),
      answer: i18next.t("answer2"),
    },
    {
      question: i18next.t("question3"),
      answer: i18next.t("answer3"),
    },
    {
      question: i18next.t("question4"),
      answer: i18next.t("answer4"),
    },
    {
      question: i18next.t("question5"),
      answer: i18next.t("answer5"),
    },
    {
      question: i18next.t("question6"),
      answer: i18next.t("answer6"),
    },
    {
      question: i18next.t("question7"),
      answer: i18next.t("answer7"),
    },
    {
      question: i18next.t("question8"),
      answer: i18next.t("answer8"),
    },
    {
      question: i18next.t("question9"),
      answer: i18next.t("answer9"),
    },
    {
      question: i18next.t("question10"),
      answer: i18next.t("answer10"),
    },
  ];

  const { t } = useTranslation();
  
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.accordion}>
        <h1>{t("faqBold")}</h1>
        {faqData.map((item, index) => (
          <div
            key={index}
            className={`${styles.item} ${
              activeIndex === index ? styles.active : ""
            }`}
          >
            <div
              className={styles.question}
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
            </div>
            {activeIndex === index && (
              <div className={styles.answer}>
                <div className={styles.answerBackground}>{item.answer}</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
