import React from "react";
import TodoPanel from "./TodoPanel";
import UiPanel from "./UiPanel";
import CollapsibleForm from "./CollapsibleForm";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todosLists: [
        {
          name: "Common",
          id: "Common",
          todoCounterIndex: 2,
          todos: [
            {
              title: "This is the first todo of list Common",
              description:
                "this is a sample description, here you could put whatever you want",
              id: "Common0",
              completed: false,
            },
            {
              title: "every todo is toggled to show its description",
              description:
                "the idea behind this project was to correctly brew a todo-app with react that was not THAT simple (even tho it is pretty simple)",
              id: "Common1",
              completed: false,
            },
          ],
        },
        {
          name: "Important",
          id: "Important",
          todoCounterIndex: 2,
          todos: [
            {
              title: "This is the first todo of list Important",
              description: "this is a description",
              id: "Important0",
              completed: false,
            },
            {
              title:
                "the bar with (+) button will toggle the form to add a new todo",
              description:
                "No man has the right to be an amateur in the matter of physical training. It is a shame for a man to grow old without seeing the beauty and strength of which his body is capable. // Socrates",
              id: "Important1",
              completed: false,
            },
          ],
        },
      ],
      //Showing ALL todos by default
      uiSelected: "All",
    };
    // Binding functions
    this.addNewTodo = this.addNewTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.addNewList = this.addNewList.bind(this);
    this.selectListFromUi = this.selectListFromUi.bind(this);
  }

  render() {
    return (
      <div className="container">
        <UiPanel
          todosLists={this.state.todosLists}
          addList={this.addNewList}
          selectListFromUi={this.selectListFromUi}
          uiSelected={this.state.uiSelected}
        />
        {this.renderVisibles()}
        <CollapsibleForm
          todosLists={this.state.todosLists}
          addTodo={this.addNewTodo}
        />
      </div>
    );
  }
  //Function to render todos on todopanel
  renderVisibles() {
    //Cheking if it should render ALL todos or just an specific list
    if (this.state.uiSelected === "All") {
      return (
        <TodoPanel
          todosLists={this.state.todosLists}
          deleteTodo={this.deleteTodo}
        />
      );
    } else {
      //Filtering the todosLists to only render the specific list
      let filteredTodosLists = this.state.todosLists.filter(
        (list) => list.name === this.state.uiSelected
      );
      return (
        <TodoPanel
          todosLists={filteredTodosLists}
          deleteTodo={this.deleteTodo}
        />
      );
    }
  }
  //Function to add new todo to a list
  addNewTodo(title, description, destination) {
    //Making a copy of state to then modify it
    const newState = this.state.todosLists;
    newState.forEach((list) => {
      //Cheking if the current list is the destination list by its name
      if (list.name === destination) {
        const newTodo = {
          title: `${title}`,
          description: `${description}`,
          id: `${list.name}${list.todoCounterIndex}`,
          completed: false,
        };
        list.todoCounterIndex++;
        list.todos.push(newTodo);
      } else {
        return;
      }
    });
    this.setState({ todosLists: newState });
  }
  //Function to add new List to the todosLists in state
  addNewList(name) {
    //Cheking if 'name' is available to use
    if (this.state.todosLists[name] === undefined) {
      let newList = {
        name: `${name}`,
        id: `list${name}`,
        todoCounterIndex: 0,
        todos: [],
      };
      //Adding list to copy of state
      const newListState = [...this.state.todosLists, newList];
      this.setState({ todosLists: newListState });
    } else {
      return;
    }
  }
  //Function to change the current UI-Panel item selected on the state, to then use it in child
  selectListFromUi(name) {
    this.setState({
      uiSelected: name,
    });
  }
  //Function to delete todo from state
  deleteTodo(id) {
    const newTodosLists = this.state.todosLists;
    newTodosLists.forEach((list) => {
      //Filtering current todo by its id from todos of list
      let filteredTodosArray = list.todos.filter((todo) => todo.id !== id);
      list["todos"] = filteredTodosArray;
    });
    this.setState({ todosLists: newTodosLists });
  }
}

// let bigCities = cities.filter(function (e) {
//   return e.population > 3000000;
// });

export default App;
