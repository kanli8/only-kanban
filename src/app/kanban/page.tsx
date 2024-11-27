'use client';
import React, { useState,useEffect } from 'react';
import { Card, CardContent, Avatar, Tooltip, Button } from '@mui/material';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

type Task = {
  id: string;
  content: string;
};





type Column = {
  id: string;
  title: string;
  taskIds: string[];
};

type InitialData = {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
};

type ProjectData = {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
};

type longStoreData = {
  tasks: { [key: string]: Task };
  columns: { [key: string]: Column };
  columnOrder: string[];
};


const projects: ProjectData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'project Task 1' },
    'task-2': { id: 'task-2', content: 'project Task 2' },
    'task-3': { id: 'task-3', content: 'project Task 3' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2','task-3'],
    }
  },
  columnOrder: ['column-1'],
};


const initialData: InitialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Task 1' },
    'task-2': { id: 'task-2', content: 'Task 2' },
    'task-3': { id: 'task-3', content: 'Task 3' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To Do',
      taskIds: ['task-1', 'task-2', 'task-3'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In Progress',
      taskIds: [],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
};

const users = [
  { id: 'user-1', name: 'User 1', avatar: 'https://via.placeholder.com/40' },
  { id: 'user-2', name: 'User 2', avatar: 'https://via.placeholder.com/40' },
  { id: 'user-3', name: 'User 3', avatar: 'https://via.placeholder.com/40' },
];

const KanbanPage: React.FC = () => {
  const [data, setData] = useState<InitialData>(initialData);
  const [projectData, setProjectData] = useState<ProjectData>(projects);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  useEffect(() => {
    // Ensure the data is consistent between server and client
    setData(initialData);
  }, []);
  const onDragEnd = (result: { destination?: { droppableId: string; index: number } | null; source: { droppableId: string; index: number }; draggableId: string }) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setData(newState);
  };

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="w-full p-4 flex flex-row">
      {users.map((user) => (
              <Tooltip key={user.id} title={user.name}>
                <Avatar
                  src={user.avatar}
                  alt={user.name}
                  onClick={() => setSelectedUser(user.id)}
                  style={{
                    border: selectedUser === user.id ? '2px solid blue' : 'none',
                    cursor: 'pointer',
                  }}
                />
                
              </Tooltip>
            ))}  
      </div>
      <div className="w-full p-4 flex flex-row ">
        {/* project */}
      <div className="w-1/4 p-4">
        <h2 className="text-xl font-bold mb-4">project</h2>
        <DragDropContext onDragEnd={onDragEnd}>
          {projectData.columnOrder.map((columnId) => {
            const column = projectData.columns[columnId];
            const tasks = column.taskIds.map((taskId) => projectData.tasks[taskId]);

            return (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="mb-4"
                  >
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-2"
                          >
                            <CardContent>{task.content}</CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      </div>
      
      {/* long story  */}
      <div className="w-1/4 p-4">
        <h2 className="text-xl font-bold mb-4">long story</h2>
        <DragDropContext onDragEnd={onDragEnd}>
          {projectData.columnOrder.map((columnId) => {
            const column = projectData.columns[columnId];
            const tasks = column.taskIds.map((taskId) => projectData.tasks[taskId]);

            return (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="mb-4"
                  >
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-2"
                          >
                            <CardContent>{task.content}</CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      </div>

      <div className="w-3/4 p-4">
        <h2 className="text-xl font-bold mb-4">Tasks</h2>
        <DragDropContext onDragEnd={onDragEnd}>
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            return (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="mb-4"
                  >
                    <h3 className="text-lg font-semibold mb-2">{column.title}</h3>
                    {tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="mb-2"
                          >
                            <CardContent>{task.content}</CardContent>
                          </Card>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      </div>
      </div>
    </div>
  );
};

export default KanbanPage;