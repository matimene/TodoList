import React from "react";
import Collapsible from "./CollapsibleTodo";

class TodoPanel extends React.Component {
  //Function to render all todosList from parent's state
  renderTodos() {
    //Itinerating through every list on state
    return this.props.todosLists.map((list) => {
      return (
        <div key={list.name}>
          {list.todos.map((todo) => {
            //Itinerating through every todo on the list
            return (
              <Collapsible
                description={todo.description}
                key={todo.id}
                id={todo.id}
                title={todo.title}
                deleteTodo={this.props.deleteTodo}
              />
            );
          })}
        </div>
      );
    });
  }

  render() {
    return <div className="todo-panel">{this.renderTodos()}</div>;
  }
}

export default TodoPanel;
