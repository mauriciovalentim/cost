import styles from "./Project.module.css";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Container from "../layout/Container";
import Loading from "../layout/Loading";
import Message from "../layout/Message";

import ProjectForm from "../project/ProjectForm";
import ServiceForm from "../service/ServiceForm";

import { parse, v4 as uuidv4 } from "uuid";
import ServiceCard from "../service/ServiceCard";

function Project() {
  const { id } = useParams();

  const [project, setProject] = useState([]);
  const [services, setServices] = useState([]);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/projects/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setTimeout(() => {
          setProject(data);
          setServices(data.services);
        }, 500);
      })
      .catch((err) => console.log(err));
  }, [id]);

  function createService() {
    const lastService = project.services.at(-1);
    lastService.id = uuidv4();
    const lastServiceCost = lastService.cost;
    const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost);
    if (newCost > parseFloat(project.budget)) {
      setMessage("Service cost will make it bigger than budget");
      setType("error");
      project.services.pop();
      setTimeout(() => {
        setMessage("");
      }, 2000);
      return false;
    }

    project.cost = newCost;

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(project),
    })
      .then((resp) => resp.json)
      .then((data) => {
        setMessage("Service created!");
        setType("success");
        setTimeout(() => {
          setMessage("");
        }, 2000);
        setShowServiceForm(false);
      })
      .catch((err) => console.log(err));
  }

  function removeService(id, cost) {
    const servicesUpdated = project.services.filter(
      (service) => service.id !== id
    );
    const projectUpdated = project;
    projectUpdated.services = servicesUpdated;
    projectUpdated.cost = parseFloat(projectUpdated.cost) - parseFloat(cost);

    console.log(projectUpdated)

    fetch(`http://localhost:5000/projects/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(projectUpdated),
    })
      .then((resp) => resp.json)
      .then((data) => {
        setProject(projectUpdated)
        setServices(servicesUpdated)
        setMessage("Service removed!");
        setType("success");
        setTimeout(() => {
          setMessage("");
        }, 2000);
      })
      .catch((err) => console.log(err));
  }
  function toggleProjectForm() {
    setShowProjectForm(!showProjectForm);
  }
  function toggleServiceForm() {
    setShowServiceForm(!showServiceForm);
  }

  function updateProject(newProject) {
    setMessage("");

    if (project.budget < project.cost) {
      setMessage("Used budget bigger than total budget");
      setType("error");
      return false;
    }

    fetch(`http://localhost:5000/projects/${project.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(newProject),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProject(newProject);
        setShowProjectForm(false);
        setMessage("Project Updated!");
        setType("success");
        // setTimeout(() => {
        //   setMessage("");
        // }, 2000);
      })
      .catch((err) => console.log(err));
  }

  return (
    <>
      {project.name ? (
        <div className={styles.project_details}>
          <Container customClass={"column"}>
            {message && <Message type={type} msg={message} />}
            <div className={styles.details_container}>
              <h1>Project: {project.name}</h1>
              <button className={styles.btn} onClick={toggleProjectForm}>
                {!showProjectForm ? "Edit Project" : "Close"}
              </button>
              {!showProjectForm ? (
                <div className={styles.project_info}>
                  <p>
                    <span>Category: </span>
                    {project.category.name}
                  </p>
                  <p>
                    <span>Budget: </span>US${project.budget}
                  </p>
                  <p>
                    <span>Used: </span>US${project.cost}
                  </p>
                </div>
              ) : (
                <div className={styles.project_info}>
                  <ProjectForm
                    handleSubmit={updateProject}
                    btnText={"Edit"}
                    projectData={project}
                  />
                </div>
              )}
            </div>
            <div className={styles.service_form_container}>
              <h2>Adicionar um serviço:</h2>
              <button className={styles.btn} onClick={toggleServiceForm}>
                {!showServiceForm ? "Adicionar serviço" : "Fechar"}
              </button>
              <div className={styles.project_info}>
                {showServiceForm && (
                  <ServiceForm
                    handleSubmit={createService}
                    btnText={"Criar"}
                    projectData={project}
                  />
                )}
              </div>
            </div>
            <h2>Serviços</h2>
            <Container customClass="start">
              {services.length > 0 &&
                services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    id={service.id}
                    name={service.name}
                    cost={service.cost}
                    description={service.description}
                    handleRemove={removeService}
                  />
                ))}
              {services.length === 0 && <p>Não há serviços</p>}
            </Container>
          </Container>
        </div>
      ) : (
        <Container>
          <Loading />
        </Container>
      )}
    </>
  );
}

export default Project;
