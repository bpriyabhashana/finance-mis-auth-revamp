import React from "react";
import { Tag } from "@blueprintjs/core";

class CategoryList extends React.Component {
  render() {
    var rows = [];
    this.props.data.map((value, index) => {
      rows.push(
        <Tag
          key={index}
          style={{ cursor: "pointer", margin: "2px" }}
          intent={this.props.selectedIndex === index ? "primary" : "none"}
          onClick={() => this.props.CategoryNameAndIndex(value.Category, index)}
        >
          {value.Category}
        </Tag>
      );
    });

    return <div>{rows}</div>;
  }
}

export default CategoryList;
