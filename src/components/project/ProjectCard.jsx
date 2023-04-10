import styles from "./ProjectCard.module.css";
import {Link} from 'react-router-dom'
import { BsPencil, BsFillTrashFill } from "react-icons/bs";

function ProjectCard({ id, name, budget, category, handleRemove }) {
  return (
    <div className={styles.project_card}>
      <h4>{name}</h4>
      <p>
        <span>Budget: </span> US${budget}
      </p>
      <p className={styles.category_text}><span></span>{category}</p>
      <div className={styles.project_card_actions}>
        <Link to={"/"}><BsPencil/> <span>Edit</span></Link>
        <Link to={"/"}><BsFillTrashFill/> <span>Remove</span></Link>
      </div>
    </div>
  );
}

export default ProjectCard;
