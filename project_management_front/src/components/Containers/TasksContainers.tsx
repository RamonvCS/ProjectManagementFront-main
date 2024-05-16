import React, { useEffect, useState } from 'react';
import { Task, ProjectTasks } from '../../interfaces/Task';
import TasksProject from '../Cards/tasks/TaskProject';
import { Project } from '../../interfaces/Project';
import ErrorModal from '../Modal/ErrorModal';
import PlaceholderCard from '../Cards/PlaceHolder';

interface TasksContainerProps {
    selectedProject: Project | null;
}

const TasksContainers: React.FC<TasksContainerProps> = ({ selectedProject }) => {
    const [projectTasks, setProjectTasks] = useState<ProjectTasks[]>([]);


    const [loading, setLoading] = useState<boolean>(true);
    // Se maneja un estado que indica que la data esta cargando

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const handleCloseErrorModal = () => setIsErrorModalOpen(false);
    // Se definieron varios estados y una funcion para manejar la logica 
    // de aparecer un modal cuando ocurra un error al llamar a la api


    useEffect(() => {
        fetch('http://172.16.5.78:5000/api/get_all_tasks')
            .then(response => {
                if (!response.ok) {
                    setErrorMessage('Network response was not ok');
                    setIsErrorModalOpen(true);
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data.data)) {
                    setProjectTasks(data.data);
                    console.log('Task Fetch: ', data.data);
                } else {
                    setErrorMessage('An error ocurred while trying to connect to the Data Base');
                    setIsErrorModalOpen(true);
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                setErrorMessage('There was a problem connecting to the server');
                setIsErrorModalOpen(true);
                setProjectTasks([]);
            }).finally(() => setLoading(false));
    }, []);

    return (
        <>
            {loading ? (
                <div>
                    <PlaceholderCard />
                    <PlaceholderCard />
                    <PlaceholderCard />
                    <PlaceholderCard />
                    <PlaceholderCard />
                </div>
            ) : (projectTasks.filter(task =>
                selectedProject === null || task.project_id === selectedProject.project_id
            ).map(filteredTask => (
                <TasksProject key={filteredTask.project_id} projectTask={filteredTask} />
            ))
            )}
            <ErrorModal errorMessage={errorMessage} isOpen={isErrorModalOpen} onClose={handleCloseErrorModal} />
        </>
    );

};

export default TasksContainers;
