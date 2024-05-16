import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Hooks Utilizados

import '../css/style.css';
// Style

import Modal from "../../Modal/modal";
import TaskForm from "../../../forms/tasks/TaskForm";
//Componentes para el Formulario/Modal

import { Task } from "../../../interfaces/Task";
interface TasksProps {
  task: Task;
  project_id?: number | undefined;
}


const TaskCard: React.FC<TasksProps> = ({ task, project_id }) => {
  const navigate = useNavigate()
  //useNavugate hook inicializado en la variable navigate 


  //Edit Modal Logic  
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  //Delete Modal Logic
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const openDeleteModal = () => setDeleteModalOpen(true);
  const closeDeleteModal = () => setDeleteModalOpen(false);


  // Handle Delete Triggered by the Delete Modal
  const handleDelete = async () => {
    const url = `http://172.16.5.78:5000/api/delete_task/${task.task_id}`

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (response.ok) {
        console.log('Success deleting Task')
        
        // Simulate a page Reoload with the useNavigate Hook
        navigate('/blank');
        navigate(-1)
      } else {
        console.log('Error deleting Task')
      }

    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  }



  return (
    <>
<div className="card-body">
  <div className="row mb-4 align-items-start">
    <div className="col-md-2">
      <p className="card-text text-color-one"><strong>Name:</strong> {task.task_name}</p>
    </div>
    <div className="col-md-2">
      <p className="card-text text-color-one"><strong>Start Date:</strong> {task.start_date}</p>
    </div>
    <div className="col-md-2">
      <p className="card-text text-color-one"><strong>End Date:</strong> {task.end_date}</p>
    </div>
    <div className="col-md-2">
      <p className="card-text text-color-one"><strong>Member Name:</strong> {task.member_name}</p>
    </div>
    <div className="col-md-4 mt-3 p-0">
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn edit-button me-md-2 mb-2 mb-md-0" onClick={openModal}>
          <i className="fas fa-edit"></i> Edit
        </button>
        <button className="btn btn-danger" onClick={openDeleteModal}>
          <i className="fas fa-trash"></i> Delete
        </button>


</div>
</div>

        

<Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
  <div className="d-flex justify-content-center">
    <div style={{ backgroundColor: 'white', padding: '20px' }}>
      <div>
        <h1 className="text-color-two">Delete Task</h1>
        <p className="text-color-two">Are you sure you want to delete the task {task.task_name}, by the member {task.member_name}?</p>
        <button className="btn btn-danger btn-lg me-2" onClick={handleDelete} style={{ padding: '5px 10px', fontSize: '1.2rem' }}>
          <i className="fas fa-trash me-1"></i>Delete
        </button>
        <button className="btn btn-secondary btn-lg" onClick={closeDeleteModal} style={{ padding: '5px 10px', fontSize: '1.2rem' }}>
          Cancel
        </button>
      </div>
    </div>
  </div>
</Modal>
        </div>
      </div>
      <hr />

      {/* Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <TaskForm
          isEditing={true}
          defaultValues={{
            task: {
              task_name: task.task_name,
              start_date: task.start_date,
              end_date: task.end_date,
              task_id: task.task_id,
              member_id: task.member_id,
            },
            project_id: project_id
          }}
          onSubmitSuccess={closeModal}
          handleCloseEditModal={closeModal}
        />
      </Modal>
      
      <Modal isOpen={isDeleteModalOpen} onClose={closeDeleteModal}>
        <div className="d-flex justify-content-center">
          <div style={{ backgroundColor: 'white', padding: '20px' }}>
            <div>
              <h1>Delete Task</h1>
              <p>Are you sure to delete the task {task.task_name}, by the member {task.member_name}?</p>
              <button className="btn btn-danger btn-lg me-2" onClick={handleDelete} style={{ padding: '5px 10px', fontSize: '1.2rem' }}>
                <i className="fas fa-trash me-1"></i>Delete
              </button>
              <button className="btn btn-secondary btn-lg" onClick={closeDeleteModal} style={{ padding: '5px 10px', fontSize: '1.2rem' }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>

  );
};

export default TaskCard;