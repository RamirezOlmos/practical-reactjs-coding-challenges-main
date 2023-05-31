import Button from "../Button"
import axios from "axios";
import Modal from "../Modal"
import "./style.scss"

interface PropDeleteModal {
  handleShowDeleteModal: (id: string) => void,
  idDeleteEdit: string
}

const DeleteModal: React.FC<PropDeleteModal> = ({
  handleShowDeleteModal,
  idDeleteEdit
}) => {

  const handleClickDeleteTask = async () => {
    try {
      await axios.delete(`http://localhost:3030/taskList/${idDeleteEdit}`);
      console.log('Object deleted successfully.');
    } catch (error) {
      console.log('Error:', error);
    }
    handleShowDeleteModal(idDeleteEdit);
  }

  return (
    <Modal>
      <div className="delete-modal">
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-modal__actions">
          <Button title="Delete" onClick={handleClickDeleteTask} />
          <Button title="Cancel" outline onClick={() => handleShowDeleteModal(idDeleteEdit)} />
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
