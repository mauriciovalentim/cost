import styles from "../project/ProjectCard.module.css";
import { BsFillTrashFill } from "react-icons/bs";

function ServiceCard({ id, name, description, cost, handleRemove }) {
  function remove(e) {
    e.preventDefault()
    handleRemove(id, cost)
  }
  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Cost: </span>
        US$ {cost}
      </p>
      <p>{description}</p>
      <div className={styles.project_card_actions}>
        <button onClick={remove}>
          <BsFillTrashFill /> <span>Remove</span>
        </button>
      </div>
    </div>
  );
}

export default ServiceCard;
