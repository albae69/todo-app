import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';

// create an interface for todo
interface Todo {
  text: string;
  completed: boolean;
}

const App = () => {
  // state for input value
  const [value, setValue] = useState<string>('');
  // an array of all input value
  const [todo, setTodo] = useState<Todo[]>([]);
  // show error if value was empty
  const [error, setError] = useState<boolean>(false);

  // function for add todo
  const handleSubmit = (): void => {
    if (value.trim()) {
      // copy all existing todo and add a new todo
      setTodo([...todo, {text: value, completed: false}]);
      // set input value into empty string after function called
      setValue('');
    } else {
      // function to show error if input was empty
      setError(true);
    }
  };

  // function to remove a todo
  const removeItem = (index: number): void => {
    const newTodo = [...todo];
    newTodo.splice(index, 1);
    setTodo(newTodo);
  };

  // function to toggle complete todos
  const toggleComplete = (index: number) => {
    const newTodo = [...todo];
    newTodo[index].completed = !newTodo[index].completed;
    setTodo(newTodo);
  };

  return (
    <View style={style.container}>
      <Text style={style.title}>Todo List</Text>
      <View style={style.inputWrapper}>
        <TextInput
          style={style.inputBox}
          placeholder="enter your todo task.."
          value={value}
          onChangeText={(e) => {
            setValue(e);
          }}
        />
        <Button title="Add Task" onPress={handleSubmit} />
      </View>
      {error && <Text style={style.error}>Error : Input field is empty..</Text>}
      <Text style={style.subTitle}>Your Task :</Text>
      {todo.length === 0 && <Text>No to do task available</Text>}
      {todo.map((todo: Todo, index: number) => (
        <View style={style.listItem} key={`${index}_${todo.text}`}>
          <Text
            style={[
              style.task,
              {textDecorationLine: todo.completed ? 'line-through' : 'none'},
            ]}>
            {todo.text}
          </Text>
          <Button
            title={todo.completed ? 'Completed' : 'Complete'}
            onPress={() => toggleComplete(index)}
          />
          <Button title="X" onPress={() => removeItem(index)} color="crimson" />
        </View>
      ))}
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  container: {
    padding: 35,
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputBox: {
    width: 200,
    borderColor: 'purple',
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 8,
  },
  title: {
    fontSize: 40,
    marginBottom: 40,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 20,
    color: 'purple',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  addButton: {
    alignItems: 'flex-end',
  },
  task: {
    width: 200,
  },
  error: {
    color: 'red',
  },
});
