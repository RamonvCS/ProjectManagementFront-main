import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
// Estas importaciones son referentes a Bootstrap y a una libreria de iconos


import React, { useEffect, useState } from 'react';
// Se importan los Hooks necesarios para la funcionalidad de nuestra aplicacion
// Con react estamos importando los hooks useEffect y useState
// 1- useState nos permite manejar los estados de las variables para ser reasignados de forma dinamica

// 2- useEffect nos permite realizar varias acciones una vez se haya montado el componente, en este archivo
// nos esto nos ayuda a llamar a la api en el momento indicado sin obstruir el orden de renderizado de la pagina.
// *Esto nos permite establecer 'placeholders' de carga*

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Para la navegacion de la pagina se implemento react-router-dom que nos facilita el manejo de las rutas,en una aplicacion SPA (Single Page Aplication)
import { Project } from './interfaces/Project';
// Interface del data object -Product

import ProjectsContainer from './components/Containers/ProjectContainer';
import MembersContainer from './components/Containers/MembersContainer';
import TasksContainers from './components/Containers/TasksContainers';
// Cada ruta posee un contenedor que manejara o los productos, members o tasks

import Navbar from './components/Navbar/Navbar';
import PlaceholderCard from './components/Cards/PlaceHolder';
import ErrorModal from './components/Modal/ErrorModal';
// Se importan componentes utilizados en esta pagina



function App() {
  const [projects, setProjects] = useState<Project[]>([]); 
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  // Se inicializaron las variables, producst y selectedProduct para definir los projectos 
  // y manjear el proyecto seleccionado que unicamente se mostrara entre las rutas de task/member/projects

  const [loading, setLoading] = useState<boolean>(true);
  // Se maneja un estado que indica que la data esta cargando

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const handleCloseErrorModal = () => setIsErrorModalOpen(false);
  // Se definieron varios estados y una funcion para manejar la logica 
  // de aparecer un modal cuando ocurra un error al llamar a la api

  useEffect(() => {
    fetchProjects();
  }, []);
  // Este fecth llama la api de get_all_products, mientras se procesa la solicitud carga una pantalla de cargar, de ocurrir un error lo
  // muestra en pantalla, de lo contrario asigna la data a la constante products
  const fetchProjects = () => {
    setLoading(true);
    fetch('http://172.16.5.78:5000/api/get_all_projects')
      .then(response => {
        if (!response.ok) {
          setErrorMessage('Network response was not ok');
          setIsErrorModalOpen(true);
        }
        return response.json();
      }).then(data => {
        if (Array.isArray(data.projects)) {
          setProjects(data.projects);
          console.log('Projects Fetch: ', data.projects);
        } else {
          setErrorMessage('An error ocurred while trying to connect to the Data Base');
          setIsErrorModalOpen(true);
        }
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
        setErrorMessage('There was a problem connecting to the server');
        setIsErrorModalOpen(true);
        setProjects([]);
      }).finally(() => setLoading(false));
  };


  // Este return renderiza los compponentes base para la navegacion, estableciendo las posibles rutas y llamando los contenedores correspondientes
  // A su vez carga el componente Navbar que maneja el enrutado de la pagina como el filtrado individual de proyectos
  // Ademaas este return muestra placeholder de carga y un modal de ocurrir un error
  return (
    <Router>
      <Navbar projects={projects} setSelectedProject={setSelectedProject} fetchProjects={fetchProjects}></Navbar>
        {loading ? (
          <div>
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
            <PlaceholderCard />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<ProjectsContainer selectedProject={selectedProject} projects={projects}  fetchProjects={fetchProjects}/>} />
            <Route path="/tasks" element={<TasksContainers selectedProject={selectedProject}/>} /> 
            <Route path="/members" element={<MembersContainer selectedProject={selectedProject} />} />
          </Routes>
        )}
        <ErrorModal errorMessage={errorMessage} isOpen={isErrorModalOpen} onClose={handleCloseErrorModal} />
    </Router>
  );
}

export default App;
