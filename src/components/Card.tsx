import styles from './Card.module.scss'

interface cardProps {
  title: string;
  value: string | number;
}

const Card = ({ title, value }: cardProps) => {
  return (
    <div className={styles.small_card}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default Card;
