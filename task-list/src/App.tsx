import { useEffect, useState } from "react";
import axios from "axios";
import "./App.scss";
import { ReactComponent as Add } from "./assets/icons/add.svg";
import AddEditTaskForm from "./components/AddEditTaskForm";
import Button from "./components/Button";
import DeleteModal from "./components/DeleteModal";
import TaskCard from "./components/TaskCard";
import { createStringId } from "../src/helpers/createStringId";


const App = () => {
  const [currentTaskList, setCurrentTaskList] = useState<NewTask[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showAddEditModal, setShowAddEditModal] = useState<boolean>(false);
  const [idCounter, setIdCounter] = useState<number>(0);
  const [idDeleteEdit, setIdDeleteEdit] = useState<string>('');
  const [modalAddOrEdit, setModalAddOrEdit] = useState<string>('');

  const handleShowAddEditModal = (isAddOrEdit: string, id: string) => {
    setShowAddEditModal(!showAddEditModal);
    setModalAddOrEdit(isAddOrEdit);
    setIdDeleteEdit(id);
  }

  const handleShowDeleteModal = (id: string) => {
    setShowDeleteModal(!showDeleteModal);
    setIdDeleteEdit(id);
  }

  const fetchData = async () => {
    try {

      const response = await axios.get('http://localhost:3030/taskList');
      const data = response.data.reverse();
      setCurrentTaskList(data);

    } catch (error) {
      console.log('Error:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [showDeleteModal]);

  useEffect(() => {
    let idToCheck = createStringId(currentTaskList.length);
    const isIdPresent = currentTaskList.some(
      (task) => task.id === idToCheck
    )

    if (isIdPresent) setIdCounter(currentTaskList.length + 1);
    else setIdCounter(currentTaskList.length);
  }, [currentTaskList]);

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button title="Add Task" icon={<Add />}
            onClick={() => handleShowAddEditModal('Add', '')}
          />
        </div>
        <div className="task-container">
          {currentTaskList.map((task) => (
            <TaskCard key={task.id} task={task}
              handleShowDeleteModal={handleShowDeleteModal}
              handleShowAddEditModal={handleShowAddEditModal}
            />
          ))}
        </div>
      </div>
      {
        showAddEditModal && (
          <AddEditTaskForm handleShowAddEditModal={handleShowAddEditModal}
            idCounter={idCounter}
            modalAddOrEdit={modalAddOrEdit}
            idDeleteEdit={idDeleteEdit}
          />
        )
      }
      {
        showDeleteModal && (
          <DeleteModal handleShowDeleteModal={handleShowDeleteModal}
            idDeleteEdit={idDeleteEdit}
          />
        )
      }
    </div>
  )
}

export default App;
