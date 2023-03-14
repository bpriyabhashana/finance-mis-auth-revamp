import React from "react";
import { Tag, Button } from "@blueprintjs/core";

class VersionList extends React.Component {
  render() {
    let index = 0;
    var rows = [];
    rows.push(
      <Tag
        key={index}
        style={{ cursor: "pointer" }}
        intent={this.props.selectedIndex !== "All" ? "none" : "danger"}
        value={index}
        onClick={() => this.props.VersionNameAndIndex("All", "All")}
      >
        All
      </Tag>
    );

    index++;
    this.props.data.map((value, index) => {
      rows.push(
        <Tag
          key={index + 1}
          style={{ cursor: "pointer", marginLeft: "3px  " }}
          intent={this.props.selectedIndex !== index ? "none" : "danger"}
          value={index}
          onClick={() => this.props.VersionNameAndIndex(value.Version, index)}
        >
          {value.Version}
        </Tag>
      );
    });
    return <div>{rows}</div>;
  }
}

export default VersionList;
