import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
// Se importan los hooks necesarios, Link es un componente similar a la etiqueta ancord pero optimizado
// Al utilizar Link y navegamos mediante las rutas de react-router-dom nos permite renderizar  solo
// los elementos de cada ruta. (No el Navbar! ) Manteniendo el estado del proyecto seleccionado.

import "../Cards/css/style.css";
// Estilos Para el componente Navbar

import { Project } from "../../interfaces/Project"
// Data Object of Product

import Modal from "../Modal/modal";
import ProjectForm from "../../forms/projects/ProjectForm";
// Componente Modal que se le pasa un Formulario como hijo

interface NavbarProps {
    projects: Project[];
    setSelectedProject: (project: Project | null) => void;
    fetchProjects: () => void;
}
// Se le pasan los props de Project y SelectedProject ya que desde el navbar el usuario va a poder filtrar por un proyecto individual

const Navbar: React.FC<NavbarProps> = ({ projects, setSelectedProject, fetchProjects }) => {
    const [isModalOpen, setModalOpen] = useState(false);
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);
    // Estado y logica para manejar la visibilidad del modal(Crear Producto)

    const location = useLocation();

    const isActive = (path: string) => {
      // Get the current pathname from the location object

      const currentPath = location.pathname;
      console.log("aplicando estilos a ruta", currentPath)
      // If the current path starts with the provided path, it's considered active
      // Get the current pathname from the location object

      // Check if the current path exactly matches the provided path
      return currentPath === path;
      
  };

  
  
    // Se define una funcion que espera al ChangeEvent del Selection Task
    const handleProjectSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = event.target.value;
        //En el selection tag se muestra las opciones de All y el project name pero el valor esta atado al project_id de ese project Name
        // Se le asigna el valor del selection a esta variable para manejar la logica 

        if (selectedId === "all") {
            setSelectedProject(null);
        } else {
            const selectedProject = projects.find(project => project.project_id?.toString() === selectedId);
            if (selectedProject) {
                setSelectedProject(selectedProject);
            }
        }

        //Si el valor es All, no reasigna el estado de SelectedProject en el archivo App.tsx
        //De seleccionar un projecto y este coincida con un project_id existente en la lista de projectos obtenida de la
        // Base de datos, asigna el estado de la variable selectedProject al projecto Seleccionado.
    };


    return (
        <>
            <nav className="navbar navbar-expand-lg custom-navbar">
                <div className="container-fluid">
                <Link className="navbar-brand nav-text-color navbar-brand-bold custom-active-link" to="/">Project Organizer</Link>
                    <button className="navbar-toggler navbar-hamburger" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`custom-active-link nav-link nav-text-color ${isActive('/') ? 'is-active' : ''}`} aria-current="page" to="/">Projects</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`custom-active-link nav-link nav-text-color ${isActive('/members') ? 'is-active' : ''}`} aria-current="page" to="/members">Members</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`custom-active-link nav-link nav-text-color ${isActive('/tasks') ? 'is-active' : ''}`} aria-current="page" to="/tasks">Tasks</Link>
                            </li>
                            <li className="nav-item">
                                <select className="form-select" onChange={handleProjectSelect} aria-label="Select project">
                                    <option value="all">All Projects</option>
                                    {projects.map((project) => (
                                        <option key={project.project_id} value={project.project_id}>{project.project_name}</option>
                                    ))}
                                </select>
                            </li>
                        </ul>
                        <div className="row">
                            <div className="col-12">
                                <button className="btn add-project-btn w-100" onClick={openModal}>Add Project</button>
                                {/* //Si se clickea el boton de Add Project el modal se hace visible y muestra el formulario de Projectos */}
                                <Modal isOpen={isModalOpen} onClose={closeModal}>
                                    <ProjectForm isEditing={false} defaultValues={{ project_name: '', description: '', status: '' }} onSubmitSuccess={closeModal} fetchProjects={fetchProjects} />
                                    {/* Este Formulario espera varios props ya que puede manejar la logica de editar y crear proyecto, en este caso 
                                ambas props estan desactivadas (de manera logica), Tiene un props la funcion de onSubmitSuccess que cierra el 
                                modal una vez completado exitosamente el formulario
                            */}
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}


export default Navbar
