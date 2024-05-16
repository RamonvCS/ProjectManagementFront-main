import React, { useEffect, useState } from 'react';

import { Project } from '../../interfaces/Project';
import { MemberTeam } from '../../interfaces/Member';
// Interfaces de los data object de: Project / MemberTeam

import ProjectTeam from '../Cards/member/ProjectTeam';
import PlaceholderCard from '../Cards/PlaceHolder';
import ErrorModal from '../Modal/ErrorModal';
// Tarjeta que representa el equipo de miembros por Projecto

interface MembersContainerProps {
    selectedProject: Project | null;
}
// Para manejar la logica de filtrado por producto individual, se pasa este prop desde App hasta el renderizado de este componente


const MembersContainer: React.FC<MembersContainerProps> = ({ selectedProject }) => {
    const [members, setMembers] = useState<MemberTeam[]>([]);
    // Constante que maneja el estado y valor del array members

    const [loading, setLoading] = useState<boolean>(true);
    // Se maneja un estado que indica que la data esta cargando

    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const handleCloseErrorModal = () => setIsErrorModalOpen(false);
    // Se definieron varios estados y una funcion para manejar la logica 
    // de aparecer un modal cuando ocurra un error al llamar a la api


    //useEffect solicita a la api la data de get all members, hasta que se complete mantiene el estado de loading true, de ocurri un
    // error se muestra el modal, de lo contrario se asigna la data a la constante members
    useEffect(() => {
        fetch('http://172.16.5.78:5000/api/get_all_members')
            .then(response => {
                if (!response.ok) {
                    setErrorMessage('Network response was not ok');
                    setIsErrorModalOpen(true);
                }
                return response.json();
            })
            .then(data => {
                if (Array.isArray(data.members)) {
                    setMembers(data.members);
                    console.log('Members Fetch: ', data.members);
                } else {
                    setErrorMessage('An error ocurred while trying to connect to the Data Base');
                    setIsErrorModalOpen(true);
                }
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                setErrorMessage('There was a problem connecting to the server');
                setIsErrorModalOpen(true);
                setMembers([]);
            }).finally(() => setLoading(false));
    }, []);


    // El return devuelve un listado de los Project Teams cards segun la data que se haya obtenido de la solicitud 
    // En el proceso de cargar muestra unos placeholders, de ocurrir un error lo muestra en pantalla.
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
            ) : (
                members.filter(member =>
                    selectedProject === null || member.project_id === selectedProject.project_id
                ).map(filteredMember => (
                    <ProjectTeam key={filteredMember.project_id} projectTeam={filteredMember} />
                ))
            )}
            <ErrorModal errorMessage={errorMessage} isOpen={isErrorModalOpen} onClose={handleCloseErrorModal} />
        </>
    );
};

export default MembersContainer;
