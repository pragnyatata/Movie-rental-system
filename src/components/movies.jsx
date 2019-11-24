import React, { Component } from "react";
import { getMovies, deleteMovie } from "../services/movieService";
import MoviesTable from "./moviesTable";
import Pagination from "./commons/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./commons/listGroup";
import { getGenres } from "../services/genreService";
import _ from "lodash";
import { Link } from "react-router-dom";
import SearchBox from "./searchBox";
import { toast } from "react-toastify";
class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    selectedGenre: null,
    sortColumn: { path: "title", order: "asc" },
    genres: []
  };
  async componentDidMount() {
    const { data } = await getGenres();
    const genres = [{ _id: "", name: "All Genres" }, ...data];

    const { data: movies } = await getMovies();
    this.setState({ movies, genres });
  }
  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      movies: allMovies,
      selectedGenre
    } = this.state;
    let filtered = allMovies;
    if (searchQuery)
      filtered = allMovies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    else if (selectedGenre && selectedGenre._id)
      filtered = allMovies.filter(m => m.genre._id === selectedGenre._id);

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
  handleDelete = async index => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter(c => c._id !== index._id);
    this.setState({ movies });

    try {
      await deleteMovie(index._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This movie was already deleted.");
      this.setState({ movies: originalMovies });
    }
  };
  handlePageChange = i => {
    this.setState({ currentPage: i });
  };
  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };
  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };
  handleSearch = query => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };
  render() {
    const { pageSize, currentPage, sortColumn } = this.state;
    const { user } = this.props;
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
            {user && (
              <Link to="/movies/new" className="btn btn-primary">
                New Movie
              </Link>
            )}
            <p>There are currently {totalCount} movies in the Database</p>
            <SearchBox
              value={this.state.searchQuery}
              onChange={this.handleSearch}
            ></SearchBox>
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
