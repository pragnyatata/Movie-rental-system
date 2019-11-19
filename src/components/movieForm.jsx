import React, { Component } from "react";
class MovieForm extends Component {
  handleSave = () => {
    this.props.history.replace("/movies");
  };
  render() {
    return (
      <div>
        <h1>Movie id: {this.props.match.params.id}</h1>
        <button className="btn btn-primary" onClick={this.handleSave}>
          Save
        </button>
      </div>
    );
  }
}

export default MovieForm;
