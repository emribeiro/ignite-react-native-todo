import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task : Task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    };

    setTasks(oldState => [...oldState, task]);
  }

  function handleToggleTaskDone(id: number) {
    const task : Task | undefined = tasks.find(t => t.id === id);
    if(task){
      task.done = true;
    }
    setTasks(oldState => [...tasks]);
  }

  function handleEditTask(id:number, newTaskTitle: string){
    const task : Task | undefined = tasks.find(t => t.id === id);
    if(task){
      task.title = newTaskTitle;
    }
    setTasks(oldState => [...tasks]);
  }
  function handleRemoveTask(id: number) {

    Alert.alert(
      "Remover Item", 
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
        },
        { 
          text: "Sim",
          onPress: () => {
            const index = tasks.findIndex(t => t.id === id);
            tasks.splice(index, 1);
            setTasks(oldState => [...tasks]);
          }
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})