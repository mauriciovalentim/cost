import ProjectForm from '../Project/ProjectForm'
import styles from './NewProject.module.css'
function NewProject(){
    return (
        <div className={styles.NewProject_container}>
            <h1>Create Project</h1>
            <p>Create your project and then add services </p>
            <ProjectForm btnText={"Criar Projeto"}/>
        </div>
    )
}

export default NewProject