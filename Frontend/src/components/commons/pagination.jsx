import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
class Pagination extends Component {
  render() {
    const { itemsCount, pageSize, currentPage, onPageChange } = this.props;
    console.log(currentPage);
    const pagesCount = Math.ceil(itemsCount / pageSize);
    if (pagesCount === 1) return null;
    const pages = _.range(1, pagesCount + 1);
    return (
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          {pages.map(i => (
            <li
              Key={i}
              className={i === currentPage ? "page-item active " : "page-item"}
            >
              <a className="page-link" onClick={() => onPageChange(i)}>
                {i}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}
Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};
export default Pagination;
