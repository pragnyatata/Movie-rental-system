import React, { Component } from "react";
class ListGroup extends Component {
  render() {
    const {
      items,
      textProperty,
      valueProperty,
      onItemSelect,
      selectedItem
    } = this.props;
    return (
      <ul className="list-group">
        {items.map(i => (
          <li
            onClick={() => onItemSelect(i)}
            key={i[valueProperty]}
            className={
              i === selectedItem ? "list-group-item active" : "list-group-item"
            }
          >
            {i[textProperty]}
          </li>
        ))}
      </ul>
    );
  }
}
ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
export default ListGroup;
