import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// Se importan los hooks que se utilizaran en este componente

import { Member } from "../../../interfaces/Member";
// Interfaz del data object Member

import Modal from "../../Modal/modal";
import MemberForm from "../../../forms/members/MemberForm";
import ErrorModal from "../../Modal/ErrorModal";
// Componentes a utilizar

interface MembersProps {
  member: Member;
  project_id?: number | undefined;
}
// Se definen los props a utilizar


const MemberCard: React.FC<MembersProps> = ({ member, project_id }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  // const para manejar y establecer el mensaje de error

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const handleCloseErrorModal = () => setIsErrorModalOpen(false);
  //Error Visibility Modal Logic

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const openEditModal = () => setEditModalOpen(true);
  const handleCloseEditModal = () => setEditModalOpen(false);
  // Edit Visibility Modal Logic

  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const openDeleteModal = () => setDeleteModalOpen(true);
  const handleCloseDeleteModal = () => setDeleteModalOpen(false);
  // Delete Visibility Modal Logic


  const navigate = useNavigate()
  // Inicializando el hook en la const navigate para utilizarlo 


  // Delete Fetch Triggered by the Modal
  const handleDelete = async () => {
    const url = `http://172.16.5.78:5000/api/delete_member/${member.member_id}`
    setDeleteModalOpen(false)
    // Se Oculta el Delete Modal 

    try {
      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      // Se realiza el fetch con todos los parapretos requeridos y se guarda su respuesta en el const response

      const data = await response.json();
      // Se asigma la data del response en formato json

      // If / else manejan el estado de la respuesta Succes/Failed
      if (response.ok) {
        console.log('Success deleting Member')
        navigate('/blank');
        navigate(-1)
        // Este patron simula una recarga de la pagina, navegando en a una pagina innexistente y volviendo a la actual

      } else {
        console.log('Error deleting Member')
        setErrorMessage(data.error);
        setIsErrorModalOpen(true);
        //De el response resultar falso se le asigna el error al const errorMessage y se hace visible el modal
      }

    } catch (error) {
      console.error('Failed to delete member:', error);
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred');
      }
      setIsErrorModalOpen(true);
    }
  }

  return (<>
<div className="card-body">
  <div className="row mb-4 ">
    <div className="col-md-4">
      <p className="card-text text-color-one"><strong>Name:</strong> {member.member_name}</p>
    </div>
    {/* <div className="col-md-3">
      <p className="card-text text-color-one"><strong>Id:</strong> {member.member_id}</p>
    </div> */}
    <div className="col-md-4 mb-2">
      <p className="card-text text-color-one"><strong>Role:</strong> {member.role}</p>
    </div>
    <div className="col-md-4">
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn edit-button me-md-2 mb-2 mb-md-0 " onClick={openEditModal}>
          <i className="fas fa-edit"></i> Edit
        </button>
        <button className="btn btn-danger " onClick={openDeleteModal}>
          <i className="fas fa-trash"></i> Delete
        </button>

 

          {/* Edit modal */}
          <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
            <div className="d-flex flex-column align-items-center w-100">
              <MemberForm
                isEditing={true} 
                defaultValues={{
                  member: {
                    member_id: member.member_id,
                    member_name: member.member_name,
                    role: member.role
                  },
                  project_id: project_id
                }}
                onSubmitSuccess={handleCloseEditModal} 
                handleCloseEditModal={handleCloseEditModal}
              />
            </div>
          </Modal>

          {/* Delete modal */}
          <Modal isOpen={isDeleteModalOpen} onClose={handleCloseDeleteModal}>
            <div className="d-flex justify-content-center">
              <div style={{ backgroundColor: 'white', padding: '20px' }}>
                <div>
                  <h1 className="text-color-two">Delete Member</h1>
                  <p className="text-color-two">Are you sure you want to delete the member {member.member_name}?</p>
                  <button className="btn btn-danger btn-lg me-2" onClick={handleDelete} style={{ padding: '5px 10px', fontSize: '1.2rem' }}>
                    <i className="fas fa-trash me-1"></i>Delete
                  </button>
                  <button className="btn btn-secondary btn-lg" onClick={handleCloseDeleteModal} style={{ padding: '5px 10px', fontSize: '1.2rem' }}>
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
     <hr />
    


<ErrorModal errorMessage={errorMessage} isOpen={isErrorModalOpen} onClose={handleCloseErrorModal} />

  </>
  );
};

export default MemberCard