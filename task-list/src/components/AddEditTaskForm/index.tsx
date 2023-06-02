import React, { useEffect, useState } from "react";
import axios from "axios";
import classNames from "classnames";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import "./style.scss";
import { createStringId } from "../../helpers/createStringId";


interface PropAddEditTaskForm {
  handleShowAddEditModal: (isAddOrEdit: string, id: string) => void,
  idCounter: number,
  modalAddOrEdit: string,
  idDeleteEdit: string
}

const AddEditTaskForm: React.FC<PropAddEditTaskForm> = ({
  handleShowAddEditModal,
  idCounter,
  modalAddOrEdit,
  idDeleteEdit
}) => {
  const [highlightPriority, setHighlightPriority] = useState<string>('low');
  const [task, setTask] = useState<NewTask>({
    id: '',
    title: '',
    priority: 'low',
    status: 'To Do',
    progress: 0,
  });

  const getTask = async () => {
    try {
      if (modalAddOrEdit === 'Edit') {
        const response = await axios.get(`http://localhost:3030/taskList/${idDeleteEdit}`);
        const data = response.data;
        setTask(data);
        setHighlightPriority(data.priority);
      }
    } catch (error) {
      console.error('Error updating object:', error);
    }
  };

  useEffect(() => {
    getTask();
  }, [])

  const onChangeTaskInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setTask({
      ...task,
      title: event.target.value
    });
  }

  useEffect(() => {
    setTask({
      ...task,
      id: createStringId(idCounter)
    });
  }, [])


  const selectedPriority = (priority: string) => {
    setHighlightPriority(priority);
    setTask({
      ...task,
      priority: priority
    });
  }

  const handleClickNewTask2 = async () => {
    try {
      if (modalAddOrEdit === 'Add') {
        await axios.post('http://localhost:3030/taskList', task);
      }
      if (modalAddOrEdit === 'Edit') {
        await axios.put(`http://localhost:3030/taskList/${idDeleteEdit}`, task);
      }
    } catch (error) {
      console.log('Error:', error);
    }
  }

  return (
    <Modal>
      <form>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">
              {
                modalAddOrEdit === 'Add' ?
                  'Add Task' :
                  'Edit Task'
              }
            </span>
            <Close className="cp"
              onClick={() => handleShowAddEditModal('Add', '')}
            />
          </div>
          <Input label="Task"
            placeholder={
              modalAddOrEdit === 'Add' ?
                "Type your task here..." :
                ""
            }
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
            <Button title={
              modalAddOrEdit === 'Add' ?
                'Add' :
                'Edit'
            }
              onClick={handleClickNewTask2}
              disabled={!task.title}
            />
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default AddEditTaskForm;
