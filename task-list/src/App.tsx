import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./App.scss";
import { ReactComponent as Add } from "./assets/icons/add.svg";
import AddEditTaskForm from "./components/AddEditTaskForm";
import Button from "./components/Button";
import DeleteModal from "./components/DeleteModal";
import TaskCard from "./components/TaskCard";
import { taskList } from "./siteData/taskList";

const App = () => {
  const [newTask, setNewTask] = useState<NewTask>({
    id: '',
    title: '',
    priority: 'low',
    status: 'To Do',
    progress: 0,
  });
  const [currentTaskList, setCurrentTaskList] = useState<NewTask[]>(taskList);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [showAddEditModal, setShowAddEditModal] = useState<boolean>(false);
  const [id, setId] = useState<string>('');
  const updateCount = useRef(0);
  useEffect(() => {
    updateCount.current += 1;
  }, [updateCount.current])

  const handleShowAddEditModal = () => {
    setShowAddEditModal(!showAddEditModal);
  }

  const fetchData = async () => {
    try {

      const response = await axios.get('http://localhost:3030/taskList');
      const data = response.data;
      setCurrentTaskList(data);

    } catch (error) {
      console.log('Error:', error);
    }
  }

  const addIdNewTask = () => {
    if (currentTaskList.length < 9) {
      setId(`0${currentTaskList.length + 1}`);
    }
    else {
      setId(`${currentTaskList.length + 1}`);
    }

    setNewTask({
      ...newTask,
      id: id
    });
  }

  const handleForm = (task: NewTask) => {
    return setNewTask(task)
  }



  console.log(newTask);



  /* useEffect(() => { */
  /*   fetchData(); */
  /* }, []); */
  /**/
  /* useEffect(() => { */
  /*   addIdNewTask(); */
  /* }, [currentTaskList]); */

  const anyArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const numbersToMove = anyArray.slice(6).reverse();
  const changeArray = numbersToMove.concat(anyArray.slice(0, 6));
  /* console.log(changeArray); */

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button title="Add Task" icon={<Add />}
            onClick={handleShowAddEditModal}
          />
        </div>
        <div className="task-container">
          {currentTaskList.map((task) => (
            <TaskCard task={task} />
          ))}
        </div>
      </div>
      {
        showAddEditModal && (
          <AddEditTaskForm handleShowAddEditModal={handleShowAddEditModal}
            newTask={newTask}
            currentTaskList={currentTaskList}
            handleForm={handleForm}

          />
        )
      }
      {showDeleteModal && <DeleteModal />}
    </div>
  )
}

export default App;
