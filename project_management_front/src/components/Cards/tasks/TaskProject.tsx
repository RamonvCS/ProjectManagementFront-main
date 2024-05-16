import React, { useEffect, useState } from "react";

import '../css/style.css';

import TaskCard from "./TaskCard";
import Modal from "../../Modal/modal";
import TaskForm from "../../../forms/tasks/TaskForm";
//COmponentes Utilizados

import { ProjectTasks, Task } from "../../../interfaces/Task";
//Data object Interfaces
interface ProjectTasksProps {
  projectTask: ProjectTasks;
}


const TasksProject: React.FC<ProjectTasksProps> = ({ projectTask }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  // const Representativo de las tareas en cada proyecto

  // Modal for create task Logic
  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  //Al montar el Componente se asignan las tareas al const tasks
  useEffect(() => {
    setTasks(projectTask.tasks);
  }, [projectTask.tasks]);


  return (
    <>
      <div className="tasks">
        <div className="card mb-4">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="card-title mb-0">{projectTask.project_name}</h5>
              <div>
                <div className="d-lg-none">
                  <button className="btn add-buttons" onClick={openModal}> Add Task </button>
                </div>
                <div className="d-none d-lg-block">
                  <button className="btn add-buttons px-5" onClick={openModal} style={{ width: '190px' }}> Add Task </button>
                </div>
              </div>
            </div>
            <hr />
            <br></br>
            <div>
              {/* Se renderizan todas las tareas del projecto */}
              {tasks.map(task => (
                <TaskCard key={task.task_id} task={task} project_id={projectTask.project_id} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for creating a task */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <TaskForm isEditing={false} defaultValues={{ project_id: projectTask.project_id }} onSubmitSuccess={closeModal} handleCloseEditModal={closeModal}></TaskForm>
      </Modal>
    </>
  );
};

export default TasksProject