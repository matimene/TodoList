import React from "react";
import ListItem from "./ListItem";

class UiPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { elements: [], newlist: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    //Get names of every UI element name and setting it on an array in state
    let elementsNames = ["All"];
    this.props.todosLists.forEach((list) => {
      elementsNames.push(list.name);
    });
    this.setState({ elements: elementsNames });
  }
  render() {
    return (
      <div className="lists-panel">
        {this.renderLists()}
        {this.renderInputAdd()}
      </div>
    );
  }
  //Function to render every UIPanel element
  renderLists() {
    return this.state.elements.map((element) => {
      return (
        <ListItem
          selectListFromUi={this.props.selectListFromUi}
          uiSelected={this.props.uiSelected}
          key={element}
          name={element}
        />
      );
    });
  }
  //Function to make the input to add new list to UI
  renderInputAdd() {
    return (
      <div className="add-new">
        <div>
          <input
            type="text"
            className="form-control"
            name="newlist"
            placeholder="New list name"
            onChange={this.handleChange}
          />
        </div>
        <div onClick={this.handleSubmit}>
          <i className="fas fa-plus-circle" />
        </div>
      </div>
    );
  }
  //Functions to handle the events of the ADD element
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  handleSubmit() {
    //Prevent from submitting blank list
    if (this.state.newlist.length > 1) {
      //Calling function from parent
      this.props.addList(this.state.newlist);
      //Adding new list name to elements(names) array
      let elementsNames = this.state.elements;
      elementsNames.push(this.state.newlist);
      this.setState({ elements: elementsNames, newlist: "" });
    } else {
      return;
    }
  }
}

export default UiPanel;
