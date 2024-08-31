import React from "react";
import { updateTaskText, updateTaskStatus, deleteTask } from './taskService';

const Action = ({
  selectedTask,
  setSelectedTask,
  updateTask,
  removeTask
}) => {
  
  const handleUpdateText = async () => {
    const newText = prompt("Edit task text:", selectedTask.text);
    if (newText) {
      try {
        const updatedTask = await updateTaskText(selectedTask.id, newText);
        if (updatedTask) {
          updateTask(updatedTask); // Update the task in parent state
        }
      } catch (error) {
        console.error("Error updating task text:", error);
      }
    }
  };

  const handleUpdateStatus = async () => {
    const newStatus = prompt("Enter new status:", selectedTask.status);
    if (newStatus) {
      try {
        const updatedTask = await updateTaskStatus(selectedTask.id, newStatus);
        if (updatedTask) {
          updateTask(updatedTask); // Update the task in parent state
        }
      } catch (error) {
        console.error("Error updating task status:", error);
      }
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTask(selectedTask.id);
        removeTask(selectedTask.id); // Remove the task from parent state
        setSelectedTask(null); // Clear selected task
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  return (
    <div className="mt-2 space-x-2">
      <button className="btn btn-secondary" onClick={handleUpdateText}>
        Edit Text
      </button>
      <button className="btn btn-secondary" onClick={handleUpdateStatus}>
        Change Status
      </button>
      <button className="btn btn-secondary" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default Action;
