import axios from "axios";

const API_BASE_URL = "http://localhost:8070/api/tasks";

// Function to get tasks
export const getTasks = async () => {
    try {
        const response = await axios.get(API_BASE_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
};

// Function to add a new task
export const addTask = async (task) => {
    try {
        const response = await axios.post(API_BASE_URL, task);
        return response.data;
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
};

// Function to update task priority
export const updateTaskPriority = async (taskId, newPriority) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/${taskId}/priority`, { priority: newPriority }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating task priority:", error);
        throw error;
    }
};

// Function to update task text
export const updateTaskText = async (taskId, newText) => {
    try {
        const response = await axios.patch(`${API_BASE_URL}/${taskId}/text`, { text: newText }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error updating task text:", error);
        throw error;
    }
};

// Function to delete a task
export const deleteTask = async (taskId) => {
    try {
        await axios.delete(`${API_BASE_URL}/${taskId}`);
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};
