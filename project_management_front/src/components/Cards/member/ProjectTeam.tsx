import React, { useEffect, useState } from "react";
import '../css/style.css';

import MemberCard from "./MemberCard";
import Modal from "../../Modal/modal";
import MemberForm from "../../../forms/members/MemberForm";
// Componentes Utilizados En este archivo, Modal and MemberForm to handle adding member
// MemberCard to render each Members 

import { Member, MemberTeam } from "../../../interfaces/Member";
interface ProjectTeamProps {
  projectTeam: MemberTeam;
}
// Interfaces de los data Objects a utilizar


const ProjectTeam: React.FC<ProjectTeamProps> = ({ projectTeam }) => {
  const [members, setMembers] = useState<Member[]>([])
  // Constante que maneja el array de members

  const [isModalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  // Logica para manejar el formulario/Modal


  useEffect(() => {
    setMembers(projectTeam.members || []);
  }, [projectTeam.members]);
  // Al cargarse el componente se le asigna los miembros del projectTeam dta Object

  return (
    <div className="members">
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">{projectTeam.project_name}</h5>
          <div>
            <div className="d-lg-none">
              <button className="btn add-buttons" onClick={openModal}> Add Member </button>
            </div>
            <div className="d-none d-lg-block">
              <button className="btn add-buttons px-5" onClick={openModal} style={{ width: '190px' }}> Add Member </button>
            </div>
          </div>
        </div>
        <hr />
        <br></br>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <MemberForm isEditing={false} defaultValues={{project_id:projectTeam.project_id}} onSubmitSuccess={closeModal} handleCloseEditModal={closeModal}></MemberForm>
        </Modal>
        {/* 
          Modal Para agregar miembro asociado con el project_id Correcto
        */}
  
        <div>
          {members.map(member => (
            <MemberCard key={member.member_id} member={member}  project_id={projectTeam.project_id}/>
          ))}
          {/* 
            Renders memberCards for each members inside the members 
          */}
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default ProjectTeam