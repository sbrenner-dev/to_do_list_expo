import React from 'react';
import Task from './Task'
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  Keyboard,
  ImageBackground,
} from 'react-native';

/**
 * Height and width components for the device this application
 * runs on
 */
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class App extends React.Component {

  /**
   * Constructs this App and initializes its state
   * @param {*} props props used to set up this component
   */
  constructor(props) {
    super(props); // super call
    // initializing stateful values
    this.state = {
      numTasks: 0,
      currID: 0,
      tasks: [],
      currTask: 'Enter a task!',
    }

    // keyboard activity listener for this application
    this.keyboardDidHideListener =
      Keyboard.addListener('keyboardDidHide',
        this.closeKeyboard);
  }

  /**
   * Handles a keyboard closure event
   * Submits any necessary data and resets the field data
   * Binded with =>
   */
  closeKeyboard = () => {
    let curr = this.state.currTask;
    if (curr != '') {
      this.addTask();
    }
    this.setState({
      currTask: 'Enter a task!',
    });
    this.refs.textInput.blur(); // unfocuses the textfeild 
  }

  /**
   * Deletes an object with title title from the internal list
   * Binded with => 
   * @param {String} title title for object to delete from internal list
   */
  deleteFromList = (title) => {
    let key = 0; // splice key
    let tmptasks = this.state.tasks; // temp list to traverse
    for (; key < tmptasks.length; key++) {
      if (tmptasks[key].title == title) {
        break; // found the correct key to splice on
      }
    }
    tmptasks.splice(key, 1); // splice list
    // reassign list and number of tasks
    this.setState({
      tasks: tmptasks,
      numTasks: this.state.numTasks - 1,
    });
  }

  /**
   * Adds a task to the internal list
   * Binded with =>
   */
  addTask = () => {
    let currTask = this.state.currTask;
    if (currTask != '' && currTask != 'Enter a task!') {
      let tmptasks = this.state.tasks; // temp list to modify
      // push a new item with unique ID and title of task
      tmptasks.push({
        id: this.state.currID.toString(), // transform int ID to String
        title: this.state.currTask, // title of task
      });
      // update state
      this.setState({
        numTasks: this.state.numTasks + 1, // inc. number of tasks
        tasks: tmptasks, // update tasks list
        currID: this.state.currID + 1, // increment element ID
        currTask: '', // reset entry box
      });
    }
  }

  /**
   * What is returned as a renderable object to the device's screen
   * Terenary operator w/ states
   */
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>To-Do List!</Text>
        {/*Below, "ref" is a usable reference to the TextInput component*/}
        <View style={styles.enterRow}>
          <View
            style={{
              justifyContent: 'center'
            }}
          >
            <Image
              source={require('./assets/write.png')}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </View>
          <TextInput
            onChangeText={(task) => this.setState({ currTask: task })}
            value={this.state.currTask}
            style={styles.enterfield}
            onFocus={() => { this.setState({ currTask: '' }) }}
            ref='textInput'
          >
          </TextInput>
        </View>
        <TouchableOpacity onPress={this.addTask}>
          {/*<Text style={styles.addButton}>Add Item</Text>*/}
          <Image
            source={require('./assets/add.png')}
            style={{
              borderWidth: 3,
              width: 40,
              height: 40,
            }}
          />
        </TouchableOpacity>
        <Text style={{ fontSize: 24, fontWeight: 'bold', }}>
          Things to do: {this.state.numTasks}
        </Text>
        <View style={styles.listView}>
          <ImageBackground
            source={require('./assets/paper.jpg')}
            style={{ width: WIDTH - 24, height: '100%', alignItems: 'center' }}
          >
            <FlatList
              data={this.state.tasks}
              renderItem={({ item }) => <Task task={item.title} delete={this.deleteFromList} />}
              keyExtractor={item => item.id}
            />
          </ImageBackground>
        </View>
        <Image
          source={require('./assets/icon.png')}
          style={{ width: 150, height: 150, paddingTop: 40, }}
        />
      </View>
    );
  }
}

/**
 * Longer styles for this app. 
 * Anything more than 3 lines included.
 * Anything 3 or less integrated in the code above
 */
const styles = StyleSheet.create({
  container: {
    // style for container for whole app
    backgroundColor: 'ivory',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: HEIGHT / 30,
    height: HEIGHT,
  },
  header: {
    // style for the header
    fontSize: 24,
    fontWeight: 'bold',
    borderColor: 'black',
    backgroundColor: 'palegoldenrod',
    borderWidth: 3,
    width: WIDTH - 20,
    height: HEIGHT / 20,
    textAlign: 'center',
    borderRadius: 10,
  },
  enterfield: {
    // style for text input field
    borderWidth: 1,
    width: WIDTH / 2,
    textAlign: 'center',
    borderRadius: 50,
    backgroundColor: 'whitesmoke',
  },
  listView: {
    // style for flatlist
    width: WIDTH - 20,
    height: '40%',
    borderColor: 'black',
    borderWidth: 2,
  },
  enterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: WIDTH / 2 + 50,
    paddingRight: 20,
  }
});