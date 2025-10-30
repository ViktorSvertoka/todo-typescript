"use client";

import React, { useEffect, useState } from "react";
import TaskItem from "../TaskItem/TaskItem";
import type { Task } from "../../types/Task";
import styles from "./TaskList.module.css";

const STORAGE_KEY = "tasks";

interface TaskListProps {
  tasks?: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks: propTasks }) => {
  const [tasks, setTasks] = useState<Task[]>(propTasks ?? []);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    if (!propTasks || propTasks.length === 0) {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setTasks(JSON.parse(stored));
    }
  }, [propTasks]);

  useEffect(() => {
    if (tasks.length > 0)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    else localStorage.removeItem(STORAGE_KEY);
  }, [tasks]);

  const addTask = () => {
    const value = newTask.trim();
    if (!value) return;
    const newItem: Task = { id: Date.now(), text: value, completed: false };
    setTasks((prev) => [...prev, newItem]);
    setNewTask("");
  };

  const removeTask = (id: number) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>Task List</h1>

      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          addTask();
        }}
      >
        <input
          type="text"
          className={styles.input}
          placeholder="Enter a new task…"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit" className={styles.addButton}>
          Add
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className={styles.empty}>No tasks to display</p>
      ) : (
        <ul className={styles.tasks}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onRemove={removeTask}
              onToggle={toggleTask}
            />
          ))}
        </ul>
      )}
    </section>
  );
};

export default TaskList;
