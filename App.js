import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native';
import { render } from 'react-dom';
import { AntDesign } from '@expo/vector-icons'
import color from './Colors';
import tempData from './tempData';
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';
import fireBase from './fireBase';

export default class App extends React.Component {

  state = {
    addTodoVisible: false,
    lists: [],
    user: {},
    loading: true
  };

  componentDidMount() {
    firebase = new fireBase((error, user) => {
      if (error) {
        return alert("tout est faux");
      }

      firebase.getLists(lists => {
        this.setState({lists, user}, () => {
            this.setState({ loading: false });
        });
      });

      this.setState({ user });
    });
  }


  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = list => {
    return <TodoList list={list} updateList={this.updateList} />
  };

  addList = list => {
    this.setState({ lists: [...this.state.lists, {...list, id: this.state.lists.length + 1, todos: [] }] });
  };

  updateList = list => {
    this.setState({
      list: this.state.lists.map(item => {
        return item.id === list.id ? list : item;
      })
    });
  };


  render() {
    if (this.state.loading) {
      return (
        <View>
          <ActivityIndicator size="large" color={"#ffff00"} />
        </View>
      )
    }

    return (
      <View style={styles.container}>
          <Modal 
            animationType="slide" 
            visible={this.state.addTodoVisible} 
            onRequestClose={() => this.toggleAddTodoModal()}
          >
            <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList} />
              
          </Modal>
          <View>
            <Text>User: {this.state.user.uid}</Text>
          </View>
        <View style={{ flexDirection: "row"}}>
         <View style={styles.divider} />
         <Text style={styles.title}>
             Todo <Text style={{fontWeight: "bold", color: "#29DF45"}}>Lists</Text>
         </Text>
         <View style={styles.divider} />
        </View>
        <View style={{marginVertical: 48}}>

          <TouchableOpacity style={styles.addList} onPress={() => this.toggleAddTodoModal()}>
            <AntDesign name="plus" size={28} color= {"#000000"} />
          </TouchableOpacity>

              <Text style={styles.add}>Add List</Text>

              

        </View>
        <View style={{height: 275, paddingLeft: 32}}>
          <FlatList 
          data={this.state.lists} 
          keyExtractor={item => item.id.toString()} 
          horizontal={true} 
          showsHorizontalScrollIndicator={false} 
          renderItem={({item}) => this.renderList(item)}
          keyboardShouldPersistTaps="always"
          />
        </View>
      </View>
    );
  }
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: "#000000",
    height: 1,
    flex: 1,
    alignSelf: "center"
  },
  title: {
    fontSize: 38,
    fontWeight: "bold",
    color: "#000000",
    paddingHorizontal: 64
  },
addList: {
  borderWidth: 2,
  borderColor: "#000000",
  borderRadius: 4,
  padding: 16,
  alignItems: "center",
  justifyContent: "center"
},
add: {
  color: "#000000",
  fontWeight: "bold",
  fontSize: 14,
  marginTop: 8
}

});
