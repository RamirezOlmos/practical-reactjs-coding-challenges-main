import classNames from "classnames";
import { useEffect, useState } from "react";
import axios from "axios";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import CircularProgressBar from "../CircularProgressBar";
import "./style.scss";

const TaskCard = ({
  task,
  handleShowDeleteModal,
  handleShowAddEditModal
}: any) => {
  const { id, title, priority, status, progress } = task
  const [newStatus, setNewStatus] = useState<string>(status);
  const [newProgress, setNewProgress] = useState<number>(progress);

  const editTask = async () => {
    let updatedTask = {
      id: id,
      title: title,
      priority: priority,
      status: newStatus,
      progress: newProgress,
    }
    try {
      await axios.put(`http://localhost:3030/taskList/${id}`, updatedTask);
    } catch (error) {
      console.error('Error updating object:', error);
    }
  };

  useEffect(() => {
    editTask();
  }, [newProgress, newStatus])


  const handleStatus = () => {
    switch (newStatus) {
      case 'To Do':
        setNewStatus('In Progress');
        setNewProgress(50);
        break;
      case "In Progress":
        setNewStatus('Done');
        setNewProgress(100);
        break;
      default:
        setNewStatus("To Do");
        setNewProgress(0);
    }
  }


  return (
    <div className="task-card">
      <div className="flex w-100">
        <span className="task-title">Task</span>
        <span className="task">{title}</span>
      </div>
      <div className="flex">
        <span className="priority-title">Priority</span>
        <span className={classNames(`${priority}-priority`, "priority")}>{priority}</span>
      </div>
      <div className="task-status-wrapper">
        <button className="status"
          onClick={handleStatus}
        >{newStatus}</button>
      </div>
      <div className="progress">
        <CircularProgressBar strokeWidth={2} sqSize={24} percentage={newProgress} />
      </div>
      <div className="actions">
        <EditIcon className="mr-20 cp"
          onClick={() => handleShowAddEditModal('Edit', id)}
        />
        <DeleteIcon className="cp"
          onClick={() => handleShowDeleteModal(id)}
        />
      </div>
    </div>
  )
}

export default TaskCard;
