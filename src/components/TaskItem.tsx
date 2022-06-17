import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { ItemWrapper } from './ItemWrapper';
import { Task } from './TasksList';
import Icon from 'react-native-vector-icons/Feather'

import trashIcon from '../assets/icons/trash/trash.png'
import penIcon from '../assets/icons/pen/pen.png';

interface TasksItemProps {
    item: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    index: number;
    editTask: (id:number, newTaskTitle: string) => void;
}


export function TaskItem({item, toggleTaskDone, removeTask, index, editTask} : TasksItemProps){
    const [editing, isEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(item.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing(){
      isEditing(true);
    }

    function handleCancelEditing(){
      setNewTitle(item.title);
      isEditing(false);
    }

    function handleSubmitEditing(){
      editTask(item.id, newTitle);
      isEditing(false);
    }

    useEffect(() => {
      if(textInputRef.current){
        if(editing){
          textInputRef.current.focus();
        }else{
          textInputRef.current.blur();
        }
      }
    }, [editing]);

    return (
        <ItemWrapper index={index}>
        <View>
          <TouchableOpacity
            testID={`button-${index}`}
            activeOpacity={0.7}
            style={styles.taskButton}
            onPress={() => {toggleTaskDone(item.id)}}
          >
            <View 
              testID={`marker-${index}`}
              style={item.done ? styles.taskMarkerDone : styles.taskMarker}
            >
              { item.done && (
                <Icon  
                  name="check"
                  size={12}
                  color="#FFF"
                />
              )}
            </View>

            <TextInput 
              style={item.done? styles.taskTextDone :styles.taskText}
              value={newTitle}
              onChangeText={setNewTitle}
              editable={editing}
              onSubmitEditing={handleSubmitEditing}
              ref={textInputRef}
            >
            </TextInput>
          </TouchableOpacity>
        </View>
        <View style={styles.iconGroup}>
          {
            editing ? 
                <TouchableOpacity
                  onPress={handleCancelEditing}
                >
                  <Icon  
                  name="x"
                  size={24}
                  color="#b2b2b2"
                />
                </TouchableOpacity>   
            :
            <TouchableOpacity
              onPress={handleStartEditing}
            >
              <Image source={penIcon} />
            </TouchableOpacity>
          }
          <View style={styles.iconDivider}/>
          <TouchableOpacity
            testID={`trash-${index}`}
            style={{ paddingHorizontal: 24 }}
            onPress={() => {removeTask(item.id)}}
            disabled={editing}
          >
            <Image source={trashIcon} style={{opacity: editing ? 0.2 : 1}}/>
          </TouchableOpacity>
        </View>
      </ItemWrapper>
    )
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    iconGroup: {
      flexDirection: 'row',


    },
    iconDivider: {
      width: 5,
      height: 24,
      color: 'rgba(196, 196, 196, 0.24)',
    }
  })