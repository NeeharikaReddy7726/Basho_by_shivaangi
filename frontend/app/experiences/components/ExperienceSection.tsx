import styles from "./ExperienceSection.module.css";

interface Props {
  title: string;
  tagline: string;
  description: string;
  image: string;
  duration: string;
  people: string;
  price: string;
  includes: string[];
  reverse?: boolean;
}

export default function ExperienceSection({
  title,
  tagline,
  description,
  image,
  duration,
  people,
  price,
  includes,
  reverse = false,
}: Props) {
  return (
    <section
      className={`${styles.section} ${reverse ? styles.reverse : ""}`}
    >
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} />
      </div>

      <div className={styles.content}>
        <span className={styles.tagline}>♡ {tagline}</span>
        <h2 className={styles.title}>{title}</h2>

        <p className={styles.description}>{description}</p>

        <div className={styles.meta}>
          <span>{duration}</span>
          <span>{people}</span>
          <span className={styles.price}>{price}</span>
        </div>

        <div className={styles.includes}>
          <h4>What’s Included:</h4>
          <ul>
            {includes.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>

        <button className={styles.button}>Book This Experience</button>
      </div>
    </section>
  );
}
