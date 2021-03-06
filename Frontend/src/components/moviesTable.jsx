import React, { Component } from "react";
import Like from "./commons/like";
import Table from "./commons/table";
import { Link } from "react-router-dom";
import auth from "../services/authService";
class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: index => <Link to={`/movies/${index._id}`}>{index.title}</Link>
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    {
      path: "Like",
      label: "Like",
      content: index => (
        <Like liked={index.liked} onLike={() => this.props.onLiked(index)} />
      )
    },
    { path: "dailyRentalRate", label: "Rate" }
  ];
  deleteColumn = {
    path: "Delete",
    label: "Delete",
    content: index => (
      <button
        onClick={() => this.props.onDelete(index)}
        className="btn btn-sm btn-danger m-2"
      >
        Delete
      </button>
    )
  };
  constructor() {
    super();
    const user = auth.getCurrentUser();
    if (user && user.isAdmin) this.columns.push(this.deleteColumn);
  }
  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        columns={this.columns}
        data={movies}
        sortColumn={sortColumn}
        onSort={onSort}
      ></Table>
    );
  }
}

export default MoviesTable;
