"use client";

import React from "react";
import type { Task } from "../../types/Task";
import styles from "./TaskItem.module.css";

interface TaskItemProps {
  task: Task;
  onRemove: (id: number) => void;
  onToggle: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onRemove, onToggle }) => {
  return (
    <li className={styles.item}>
      <div className={styles.left}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span
          className={`${styles.text} ${task.completed ? styles.completed : ""}`}
        >
          {task.text}
        </span>
      </div>
      <button className={styles.removeButton} onClick={() => onRemove(task.id)}>
        Remove
      </button>
    </li>
  );
};

export default TaskItem;
