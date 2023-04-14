import styles from "./ProjectCard.module.css";
import {Link} from 'react-router-dom'
import { BsPencil, BsFillTrashFill } from "react-icons/bs";

function ProjectCard({ id, name, budget, category, handleRemove }) {
  function remove(e) {
    e.preventDefault()
    handleRemove(id)
  }
  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Budget: </span> US${budget}
      </p>
      <p className={styles.category_text}><span></span>{category}</p>
      <div className={styles.project_card_actions}>
        <Link to={`/project/${id}`}><BsPencil/> <span>Edit</span></Link>
        <button onClick={remove}><BsFillTrashFill/> <span>Remove</span></button>
      </div>
    </div>
  );
}

export default ProjectCard;
