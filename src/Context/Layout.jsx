import React from "react";

const Layout = ({ tasks, updateTask, removeTask, editTask, saveEdit, editingTask, setEditingTask, taskText, setTaskText, level }) => {

    const handlePriorityChange = async (taskId, newPriority) => {
        try {
            await updateTask(taskId, newPriority); // Update task priority
        } catch (error) {
            console.error("Failed to update priority", error);
        }
    };

    const handleRemoveClick = (taskId) => {
        removeTask(taskId);
    };

    return (
        <div className="task-layout p-4 border rounded shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{level} Priority Tasks</h2>
            <ul className="list-none p-0">
                {tasks.map((task) => (
                    <li key={task.id} className="flex items-center justify-between mb-2 p-2 border-b">
                        {task.id === (editingTask && editingTask.id) ? (
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={taskText}
                                    onChange={(e) => setTaskText(e.target.value)}
                                    className="w-full border rounded p-2"
                                    placeholder="Edit task text"
                                />
                                <button className="btn btn-secondary" onClick={saveEdit}>
                                    Save
                                </button>
                                <button className="btn btn-cancel" onClick={() => setEditingTask(null)}>
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <div className="flex-1">{task.text}</div>
                        )}
                        <div className="flex space-x-2">
                            <select
                                value={task.priority}
                                onChange={(e) => handlePriorityChange(task.id, e.target.value)}
                                className="border rounded p-1"
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                            {task.id !== (editingTask && editingTask.id) ? (
                                <button className="btn btn-primary" onClick={() => editTask(task)}>
                                    Edit
                                </button>
                            ) : null}
                            <button className="btn btn-danger" onClick={() => handleRemoveClick(task.id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Layout;
