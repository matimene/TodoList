import React from "react";

export default class TodoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      destination: props.todosLists[0].name,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div key="newtodoform">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              placeholder="Enter title of to do"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              onChange={this.handleChange}
              value={this.state.description}
            ></textarea>
          </div>
          <div className="form-group">
            <label>List destination</label>
            <select
              className="form-control"
              name="destination"
              onChange={this.handleChange}
            >
              {this.renderListsNames()}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </div>
    );
  }
  //Function to itinarate through list to extract it's name and make it an option on the form-select
  renderListsNames() {
    return this.props.todosLists.map((list) => {
      const keyOpt = `listOpt${list.name}`;
      return (
        <option key={keyOpt} value={list.name}>
          {list.name}
        </option>
      );
    });
  }

  handleChange(e) {
    //Get the event.target.name and use it to target the key on our 'state' object with the same name, using bracket syntax
    this.setState({ [e.target.name]: e.target.value });
  }
  //Function to call parent-function addTodo with the values of the current state, and once done clearing it
  handleSubmit(e) {
    e.preventDefault();
    this.props.addTodo(
      this.state.title,
      this.state.description,
      this.state.destination
    );
    this.setState({
      title: "",
      description: "",
      destination: this.props.todosLists[0].name,
    });
  }
}
