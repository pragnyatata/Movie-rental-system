import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import MoviesTable from "./moviesTable";
import Pagination from "./commons/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./commons/listGroup";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";
class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" },
    genres: getGenres()
  };
  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ genres });
  }
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      movies: allMovies,
      selectedGenre
    } = this.state;
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(i => i.genre._id === selectedGenre._id)
        : allMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, movies };
  };
  handleLike = movie => {
    console.log(movie);
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };
  handleDelete = index => {
    const movies = this.state.movies.filter(c => c._id !== index._id);
    this.setState({ movies });
  };
  handlePageChange = i => {
    this.setState({ currentPage: i });
  };
  handleGenreSelect = i => {
    this.setState({ selectedGenre: i, currentPage: 1 });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  render() {
    const { pageSize, currentPage, sortColumn } = this.state;
    if (this.state.movies.length === 0)
      return <p>Their are no movies in the Database</p>;

    const { totalCount, movies } = this.getPagedData();
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
            <p>There are currently {totalCount} movies in the Database</p>
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onLiked={this.handleLike}
              onDelete={this.handleDelete}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={pageSize}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Movies;
