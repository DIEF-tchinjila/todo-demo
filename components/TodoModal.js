import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { 
    View,
    Text,
    StyleSheet,
    SafeAreaView, 
    TouchableOpacity, 
    FlatList,
    KeyboardAvoidingView, 
    TextInput, 
    Keyboard
} from "react-native";
import { AntDesign } from '@expo/vector-icons'

export default class TodoModal extends React.Component {
    state = {
      newTodo: ""
    };
 
    toggleTodoCompleted = index => {
        let list = this.props.list;
        list.todos[index].completed = !list.todos[index].completed;
        
 
    };
    addTodo = () => {
        let list = this.props.list;
        list.todos.push({ title: this.state.newTodo, completed: false});

        this.setState({ newTodo: ""});
        Keyboard.dismiss();
    }

    renderTodo = (todo, index) => {
        const list = this.props.list;
        return (
            <View style={styles.todoContainer}>
                <TouchableOpacity onPress={() => this.toggleTodoCompleted(index)}>
                    <Ionicons
                        name={todo.completed ? "ios-square" : "ios-square-outline"}
                        size={24}
                        color={"#ff0000"} 
                        style={{width: 32}}
                    />
                </TouchableOpacity>
        <Text style={[styles.todo, { color: "#000000"}]}>{todo.title}</Text>

            </View>
        )
    }


    render() {
        const list = this.props.list

        const taksCount = list.todos.length
        const completedCount = list.todos.filter(todo => todo.completed).length
        return (
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
           <SafeAreaView style={styles.container}>
               <TouchableOpacity 
               style={{position: "absolute", top: 64, right: 32, zIndex: 10}}
               onPress={this.props.closeModal}
               >
                   <AntDesign name="close" size={24} color={"#000000"} />
               </TouchableOpacity>

               <View style={[styles.section, styles.header, { borderBottomColor: list.color}]}>
                   <Text style={styles.title}>{list.name}</Text>
                   <Text style={styles.taksCount}>
                        {completedCount} of {taksCount} taks
                   </Text>
               </View>

               <View style={styles.section, {flex: 3}}>
                    <FlatList 
                    data={list.todos} 
                    renderItem={({item, index}) => this.renderTodo(item, index)} 
                    keyExtractor={(_, index) => index.toString()} 
                    contentContainerStyle={{paddingHorizontal: 32, paddingVertical: 64}}
                    showsVerticalScrollIndicator={false}
                    />
               </View>

               <View style={[styles.section, styles.footer]} >
                    <TextInput style={[styles.input, {borderColor: list.color}]} onChangeText={text => this.setState({newTodo: text})}
                    value={this.state.newTodo}
                    />
                    <TouchableOpacity style={[styles.addTodo, { backgroundColor: list.color }]} onPress={() => this.addTodo()}>
                        <AntDesign name="plus" size={16} color={"#FFFFFF"} />
                    </TouchableOpacity>
               </View>
           </SafeAreaView>
        </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    section: {
        flex: 1,
    },
    header: {
        justifyContent: "flex-end",
        marginLeft: 64,
        borderBottomWidth: 3
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: "#000000"
    },
    taksCount: {
        marginLeft: 4,
        marginBottom: 16,
        color: "#ff0000"
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center"
    },
    input: {
        flex: 1,
        height: 48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    todoContainer: {
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center"
    },
    addList: {
        width:1,
        height: 1,
        borderWidth: 2,
        borderColor: "#000000",
        borderRadius: 4,
        padding: 8,

      },
      todo: {
          color: "#000000",
          fontWeight: "700",
          fontSize: 16
      }
});