import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate} from 'react-router-dom';
// Hooks y modulos necesarios

import { projectSchema } from './SchemaValidation';
import {Project} from '../../interfaces/Project';
// Schema e Interfaz Utilizada 

interface ProjectFormProps {
  defaultValues: Project;
  isEditing: boolean;
  onSubmitSuccess: () => void; // Call Back
  handleCloseEditModal?: () => void;
  fetchProjects: () => void;
}
// Props logicas para la funcionalidad del form


const ProjectForm: React.FC<ProjectFormProps> = ({ defaultValues, isEditing , onSubmitSuccess, handleCloseEditModal, fetchProjects}) => {
  const navigate = useNavigate()


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Project>({
    resolver: zodResolver(projectSchema),
    defaultValues
  });
  //Inicializacion de la funcionalidades de react-hook-form


  React.useEffect(() => {
    console.log('Resetting form with defaultValues:', defaultValues);
    reset(defaultValues);
  }, [defaultValues, reset]);
  // Al momneto de montar el componente se asignan los default values al editar 


  const onSubmit: SubmitHandler<Project> = async data => {
    console.log('Attempting to submit form', data);

    const url = isEditing ? `http://172.16.5.78:5000/api/update_project/${defaultValues.project_id}` : 'http://172.16.5.78:5000/api/new_project';
    const method = isEditing ? 'PUT' : 'POST';

    console.log('Making API request to:', url);

    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) throw new Error('Network response was not ok.');

        const api_response = await response.json();  
        console.log('Success:', api_response);
        onSubmitSuccess();
        fetchProjects();
        navigate('/blank');
        navigate(-1);

    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error procesando tu solicitud.');
    }

    

  };

  console.log('Form errors:', errors);


  //Inputs que se asocial a la validacion de SchemaValidation de zod resolver con react-hook-form
  return (
    <>
  <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
  <h1 className="mb-4 text-center text-color-two">{isEditing ? 'Updating Project' : 'Create Project'}</h1>
  <div className="mb-3">
    <label htmlFor="project_name" className="form-label text-color-two">Project Name</label>
    <input {...register('project_name')} type="text" className={`form-control ${errors.project_name ? 'is-invalid' : ''}`} id="project_name" />
    {errors.project_name && <div className="invalid-feedback">{errors.project_name.message}</div>}
  </div>

  <div className="mb-4">
    <label htmlFor="description" className="form-label text-color-two">Description</label>
    <textarea {...register('description')} className={`form-control ${errors.description ? 'is-invalid' : ''}`} id="description" rows={4}></textarea>
    {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
  </div>

  <div className="mb-3">
    <label htmlFor="status" className="form-label text-color-two">Status</label>
    <select {...register('status')} className={`form-select ${errors.status ? 'is-invalid' : ''}`} id="status">
      <option value="Completed">Completed</option>
      <option value="In progress">In progress</option>
      <option value="Not Started">Not Started</option>
    </select>
    {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
  </div>

  <div className="mt-3">
    <input type="submit" className="btn btn-primary me-3 btn-lg" onClick={() => console.log('Submit clicked')}></input>
    <button onClick={handleCloseEditModal} className="btn btn-secondary me-3 btn-lg">Cancel</button>
  </div>
</form>

  </>
  );
};

export default ProjectForm;
