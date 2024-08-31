import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { getTasks, addTask, updateTaskPriority, deleteTask, updateTaskText } from './taskService';

const TaskDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [textInput, setTextInput] = useState("");
    const [selectedPriority, setSelectedPriority] = useState("High");
    const [editingTask, setEditingTask] = useState(null);
    const [taskText, setTaskText] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            const tasksData = await getTasks();
            setTasks(tasksData);
        };

        fetchTasks();
    }, []);

    const handleTextInputChange = (event) => {
        setTextInput(event.target.value);
    };

    const handlePriorityChange = (event) => {
        setSelectedPriority(event.target.value);
    };

    const handleTaskSubmit = async () => {
        if (textInput.trim() === "") {
            return;
        }

        const newTask = {
            text: textInput,
            priority: selectedPriority,
        };

        const addedTask = await addTask(newTask);
        if (addedTask) {
            setTasks([...tasks, addedTask]);
            setTextInput("");
            setSelectedPriority("High");
        }
    };

    const handlePriorityUpdate = async (taskId, newPriority) => {
        try {
            const updatedTask = await updateTaskPriority(taskId, newPriority);
            if (updatedTask) {
                setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
            }
        } catch (error) {
            console.error("Error updating task priority:", error);
        }
    };

    const handleTextUpdate = async () => {
        if (editingTask && taskText.trim() !== "") {
            try {
                await updateTaskText(editingTask.id, taskText);
                setTasks(tasks.map(task => task.id === editingTask.id ? { ...task, text: taskText } : task));
                setEditingTask(null);
                setTaskText("");
            } catch (error) {
                console.error("Failed to update task text:", error);
            }
        }
    };

    const handleRemove = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error("Failed to delete task:", error);
        }
    };

    const getTasksByPriority = (priority) => {
        return tasks.filter((task) => task.priority === priority);
    };

    return (
        <div className="p-8">
            <div className="lg:flex grid gap-2 items-center font-main">
                <div>
                    <input
                        type="text"
                        value={textInput}
                        onChange={handleTextInputChange}
                        className="w-full lg:w-96 border rounded p-2"
                        placeholder="Enter task"
                    />
                </div>
                <div>
                    <select
                        value={selectedPriority}
                        onChange={handlePriorityChange}
                        className="w-full border rounded p-2"
                    >
                        <option value="High">High Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="Low">Low Priority</option>
                    </select>
                </div>
                <button onClick={handleTaskSubmit} className="btn btn-secondary">
                    Add Task
                </button>
            </div>

            <div className="mt-8 space-y-4 text-black">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Layout
                        tasks={getTasksByPriority("High")}
                        updateTask={handlePriorityUpdate}
                        removeTask={handleRemove}
                        editTask={(task) => {
                            setEditingTask(task);
                            setTaskText(task.text);
                        }}
                        saveEdit={handleTextUpdate}
                        editingTask={editingTask}
                        setEditingTask={setEditingTask}
                        taskText={taskText}
                        setTaskText={setTaskText}
                        level="High"
                    />
                    <Layout
                        tasks={getTasksByPriority("Medium")}
                        updateTask={handlePriorityUpdate}
                        removeTask={handleRemove}
                        editTask={(task) => {
                            setEditingTask(task);
                            setTaskText(task.text);
                        }}
                        saveEdit={handleTextUpdate}
                        editingTask={editingTask}
                        setEditingTask={setEditingTask}
                        taskText={taskText}
                        setTaskText={setTaskText}
                        level="Medium"
                    />
                    <Layout
                        tasks={getTasksByPriority("Low")}
                        updateTask={handlePriorityUpdate}
                        removeTask={handleRemove}
                        editTask={(task) => {
                            setEditingTask(task);
                            setTaskText(task.text);
                        }}
                        saveEdit={handleTextUpdate}
                        editingTask={editingTask}
                        setEditingTask={setEditingTask}
                        taskText={taskText}
                        setTaskText={setTaskText}
                        level="Low"
                    />
                </div>
            </div>
        </div>
    );
};

export default TaskDashboard;