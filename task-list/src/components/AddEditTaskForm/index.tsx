import React, { useState } from "react";
import axios from "axios";
import classNames from "classnames";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import "./style.scss";


interface PropAddEditTaskForm {
  handleShowAddEditModal: () => void,
  newTask: NewTask,
  currentTaskList: NewTask[],
  handleForm: (task: NewTask) => void
}

const AddEditTaskForm: React.FC<PropAddEditTaskForm> = ({
  handleShowAddEditModal,
  newTask,
  handleForm
}) => {
  const [highlightPriority, setHighlightPriority] = useState<string>('low');
  const [task, setTask] = useState<NewTask>(newTask);


  const onChangeTaskInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTask({
      ...task,
      title: event.target.value
    });
  }

  const selectedPriority = (priority: string) => {
    setHighlightPriority(priority);
    setTask({
      ...task,
      priority: priority
    });
  }

  const handleClickNewTask2 = async () => {
    try {
      await axios.post('http://localhost:3030/taskList', task);
    } catch (error) {
      console.log('Error:', error);
    }
  }


  return (
    <Modal>
      <form>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">Add Task </span>
            <Close className="cp"
              onClick={handleShowAddEditModal}
            />
          </div>
          <Input label="Task" placeholder="Type your task here..."
            onChange={onChangeTaskInput}
            name="title" value={task.title}
          />
          <div className="modal-priority">
            <span>Priority</span>
            <ul className="priority-buttons">
              {["high", "medium", "low"].map((priority) => (
                <li key={priority}
                  className={
                    highlightPriority === priority ?
                      classNames(`${priority}-selected`, priority) :
                      `${priority}`
                  }
                  onClick={
                    () => selectedPriority(priority)
                  }
                >
                  {priority}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button title="Add"
              onClick={() => handleForm(task)}
              disabled={!task.title}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditTaskForm;
