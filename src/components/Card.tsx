import styles from "./Card.module.scss";

interface cardProps {
  Total: string;
  TotalValue: string | number;
  Available: string | number;
  AvailableValue: string | number;
}

const Card = ({ Total, TotalValue, Available, AvailableValue }: cardProps) => {
  return (
    <div className={styles.small_card}>
      <div className= {styles.total}>
        <h3>{Total}</h3>
        <p>{TotalValue}</p>
      </div>
      <div className= {styles.Available}>
        <h3>{Available}</h3>
        <p>{AvailableValue}</p>
      </div>
    </div>
  );
};

export default Card;
