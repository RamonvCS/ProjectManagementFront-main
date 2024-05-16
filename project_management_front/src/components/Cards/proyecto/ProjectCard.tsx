import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//Hooks utilizados

import '../css/style.css';

import Modal from '../../Modal/modal';
import ProjectForm from '../../../forms/projects/ProjectForm';
import ErrorModal from '../../Modal/ErrorModal';
// Componentes Utilizados

import { Project } from '../../../interfaces/Project';
interface ProjectProps {
  project: Project;
  fetchProjects: () => void;
}
// Interface de data objects y funciones utilizados en el componente

const ProjectCard: React.FC<ProjectProps> = ({ project, fetchProjects }) => {
  const navigate = useNavigate()
  // Navigate Hook inicializado para poder utilizarlo

  // Edit Modal Visibility Logic
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const openEditModal = () => setEditModalOpen(true);
  const handleCloseEditModal = () => setEditModalOpen(false);
  
  // Error Modal Visibility Logic
  const [errorMessage, setErrorMessage] = useState<string>('');  
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const handleCloseErrorModal = () => setIsErrorModalOpen(false);

  // Delete Modal Visibility Logic
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const openDeleteModal = () => setDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);

  const closeModal = () => {
    setEditModalOpen(false);
    setDeleteModalOpen(false);
  };
  


  const handleDelete = async () => { 
    const url = `http://172.16.5.78:5000/api/delete_project/${project.project_id}`
    setDeleteModalOpen(false)

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      const data = await response.json();

      if (response.ok) {
        console.log('Success deleting Project')
        fetchProjects()
        navigate('/blank');
        navigate(-1)
      } else {
        console.log('Error deleting Project')
        setErrorMessage(data.error);
        setIsErrorModalOpen(true);
      }

    } catch (error) {
      console.error('Failed to delete project:', error);

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred');
      }
      setIsErrorModalOpen(true);
    }
  }



  return (

    <>
<div className="card mb-4">
  <div className="card-body">
    <div className="row">
      <div className="col">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">{project.project_name}</h5>
          <div className="d-none d-md-block">
            <button className="btn edit-button me-2" onClick={openEditModal}><i className="fas fa-edit"></i> Edit</button>
            <button className="btn btn-danger" onClick={openDeleteModal}><i className="fas fa-trash"></i> Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div className="row d-md-none">
      <div className="col mt-3">
        <button className="btn edit-button mb-2 w-100" onClick={openEditModal}><i className="fas fa-edit"></i> Edit</button>
        <button className="btn btn-danger w-100" onClick={openDeleteModal}><i className="fas fa-trash"></i> Delete</button>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <hr className="d-none d-md-block" />
        <p className="card-text mt-3 text-color-one">Description: {project.description}</p>
        <p className="card-text text-color-one">Status: {project.status}</p>
        <Modal  isOpen={isEditModalOpen} onClose={handleCloseEditModal} >
          <ProjectForm 
            isEditing={true} 
            defaultValues={
                {
                  project_name: project.project_name, 
                  description: project.description, 
                  status: project.status, 
                  project_id: project.project_id
                }} 
            onSubmitSuccess={handleCloseDeleteModal}
            handleCloseEditModal={closeModal} 
            fetchProjects={fetchProjects}
            />
        </Modal>


        <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
  <div className="d-flex justify-content-center">
    <div style={{ backgroundColor: 'white', padding: '20px' }}>
      <div>
        <h1 className='text-color-two'>Delete Project</h1>
        <p className='text-color-two'>Are you sure you want to delete the project {project.project_name}?</p>
        <button className="btn btn-danger me-2" onClick={handleDelete} style={{ padding: '5px 10px', fontSize: '1.2rem' }}>
          <i className="fas fa-trash me-1"></i>Delete
        </button>
        <button className="btn btn-secondary " onClick={handleCloseDeleteModal} style={{ padding: '5px 10px', fontSize: '1.2rem' }}>
          Cancel
        </button>
      </div>
    </div>
  </div>
  
</Modal>

</div>
</div>
    </div>
</div>

<ErrorModal errorMessage={errorMessage} isOpen={isErrorModalOpen} onClose={handleCloseErrorModal} />
</> 
  );
};

export default ProjectCard;
