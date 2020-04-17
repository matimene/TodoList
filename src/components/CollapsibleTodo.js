import React from "react";

export default class Collapsible extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.togglePanel = this.togglePanel.bind(this);
    this.capitalizeFirst = this.capitalizeFirst.bind(this);
  }

  render() {
    return (
      <div>
        <div className="list-group-item d-flex justify-content-between my-2">
          <h6>{this.capitalizeFirst(this.props.title)}</h6>
          <div className="todo-icon">
            <span
              className="mx-2 text-sucess"
              onClick={(e) => this.togglePanel(e)}
            >
              DESCRIPTION 
              <i className="fas fa-caret-square-down" />
            </span>
            <span
              className="mx-2 text-danger"
              onClick={() => this.props.deleteTodo(this.props.id)}
            >
              <i className="fas fa-trash" />
            </span>
          </div>
        </div>
        {this.state.open ? (
          //START OF ACTUAL CONTENT TO EXPAND
          <div className="todo-description">
            {this.capitalizeFirst(this.props.description)}
          </div>
        ) : //END OF CONTENT TO EXPAND
        null}
      </div>
    );
  }

  capitalizeFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  //Function to toggle(expand) and show description of todo
  togglePanel(e) {
    this.setState({ open: !this.state.open });
  }
}
