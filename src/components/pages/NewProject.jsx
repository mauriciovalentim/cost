import ProjectForm from "../project/ProjectForm";
import styles from "./NewProject.module.css";
import { useNavigate } from "react-router-dom";
function NewProject() {
  const navigate = useNavigate();

  function createPost(project) {
    //Initialize cost and servers
    project.cost = 0;
    project.services = [];
    fetch("http://localhost:5000/projects", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/projects", {
          state: { message: "Projeto criado com sucesso!" },
        });
      })
      .catch((err) => console.log(err));
  }
  return (
    <div className={styles.NewProject_container}>
      <h1>Create Project</h1>
      <p>Create your project and then add services </p>
      <ProjectForm handleSubmit={createPost} btnText={"Criar Projeto"} />
    </div>
  );
}

export default NewProject;
