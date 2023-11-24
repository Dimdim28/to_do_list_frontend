import { FC, useState } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './FAQ.module.scss'

const FAQ: FC = () => {
  const { t } = useTranslation()

  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const FAQ_DATA = new Array(10).fill(1).map((_, i) => ({
    question: t(`question${i + 1}`),
    answer: t(`answer${i + 1}`),
  }))

  const toggleAccordion = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null)
    } else {
      setActiveIndex(index)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.accordion}>
        <h1>{t('faqBold')}</h1>
        {FAQ_DATA.map((item, index) => (
          <div
            key={index}
            className={`${styles.item} ${
              activeIndex === index ? styles.active : ''
            }`}
          >
            <div
              className={styles.question}
              onClick={() => toggleAccordion(index)}
            >
              {item.question}
            </div>
            {
              <div className={styles.answer}>
                <div className={styles.answerBackground}>{item.answer}</div>
              </div>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default FAQ
