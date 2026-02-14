
"use client";

import { useState } from "react";
import Image from "next/image";
import { Filter, Plus, MoreVertical } from "lucide-react";

// Simple Badge
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-600">
      {children}
    </span>
  );
}

type Task = {
  id: string;
  title: string;
  category: string;
  dueDate: string;
  comments: number;
  users: string[];
};

type Columns = {
  todo: Task[];
  inprogress: Task[];
  completed: Task[];
};

const initialData: Columns = {
  todo: [
    {
      id: "1",
      title: "Finish user onboarding",
      category: "Marketing",
      dueDate: "Tomorrow",
      comments: 1,
      users: [
        "https://randomuser.me/api/portraits/women/12.jpg",
        "https://randomuser.me/api/portraits/men/32.jpg",
      ],
    },
    {
      id: "2",
      title: "Solve the Dribble prioritization issue with the team",
      category: "Marketing",
      dueDate: "Tomorrow",
      comments: 2,
      users: [
        "https://randomuser.me/api/portraits/men/45.jpg",
        "https://randomuser.me/api/portraits/women/22.jpg",
      ],
    },
  ],
  inprogress: [
    {
      id: "3",
      title: "Work in Progress (WIP) Dashboard",
      category: "Template",
      dueDate: "Jan 8, 2027",
      comments: 2,
      users: [
        "https://randomuser.me/api/portraits/men/11.jpg",
        "https://randomuser.me/api/portraits/women/41.jpg",
      ],
    },
  ],
  completed: [
    {
      id: "4",
      title: "Make internal feedback",
      category: "Template",
      dueDate: "Jan 8, 2027",
      comments: 2,
      users: [
        "https://randomuser.me/api/portraits/men/14.jpg",
        "https://randomuser.me/api/portraits/women/44.jpg",
      ],
    },
  ],
};

export default function TodoTable() {
  const [columns, setColumns] = useState<Columns>(initialData);

  // Drag state
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDrop = (columnKey: keyof Columns) => {
    if (!draggedTask) return;

    // Remove from old column
    const newColumns: Columns = {
      todo: [],
      inprogress: [],
      completed: [],
    };

    for (const key of Object.keys(columns) as (keyof Columns)[]) {
      newColumns[key] = columns[key].filter((t) => t.id !== draggedTask.id);
    }

    // Add to new column
    newColumns[columnKey].push(draggedTask);

    setColumns(newColumns);
    setDraggedTask(null);
  };

  const renderTask = (task: Task) => (
    <div
      key={task.id}
      draggable
      onDragStart={() => handleDragStart(task)}
      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white dark:bg-white/[0.03] dark:border-white/10 cursor-grab"
    >
      <div className="flex items-center gap-4">
        <input type="checkbox" className="h-4 w-4" />

        <div>
          <h3 className="font-medium text-gray-800 dark:text-white/90">
            {task.title}
          </h3>

          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 dark:text-gray-400">
            <Badge>{task.category}</Badge>
            <span>{task.dueDate}</span>
            <span>{task.comments} comments</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          {task.users.map((user, index) => (
            <div
              key={index}
              className="w-8 h-8 overflow-hidden border-2 border-white rounded-full dark:border-gray-900"
            >
              <Image
                width={32}
                height={32}
                src={user}
                alt="User"
                className="object-cover"
              />
            </div>
          ))}
        </div>

        <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <MoreVertical size={18} />
        </button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button className="font-semibold text-gray-800 dark:text-white">
            All Tasks (
            {columns.todo.length +
              columns.inprogress.length +
              columns.completed.length}
            )
          </button>
          <button className="text-gray-500 dark:text-gray-400">
            To do ({columns.todo.length})
          </button>
          <button className="text-gray-500 dark:text-gray-400">
            In Progress ({columns.inprogress.length})
          </button>
          <button className="text-gray-500 dark:text-gray-400">
            Completed ({columns.completed.length})
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-300">
            <Filter size={16} />
            Filter & Sort
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
            <Plus size={16} />
            Add New Task
          </button>
        </div>
      </div>

      {/* COLUMNS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* TODO */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop("todo")}
        >
          <h2 className="font-semibold text-gray-800 dark:text-white mb-3">
            Todo ({columns.todo.length})
          </h2>
          <div className="space-y-3">
            {columns.todo.map(renderTask)}
          </div>
        </div>

        {/* IN PROGRESS */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop("inprogress")}
        >
          <h2 className="font-semibold text-gray-800 dark:text-white mb-3">
            In-Progress ({columns.inprogress.length})
          </h2>
          <div className="space-y-3">
            {columns.inprogress.map(renderTask)}
          </div>
        </div>

        {/* COMPLETED */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop("completed")}
        >
          <h2 className="font-semibold text-gray-800 dark:text-white mb-3">
            Completed ({columns.completed.length})
          </h2>
          <div className="space-y-3">
            {columns.completed.map(renderTask)}
          </div>
        </div>
      </div>
    </div>
  );
}
