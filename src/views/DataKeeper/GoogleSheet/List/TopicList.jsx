import React from "react";
import { Tag } from "@blueprintjs/core";

class TopicList extends React.Component {
  render() {
    var rows = [];
    console.log(this.props.data);
    this.props.data.map((value, index) => {
      rows.push(
        <Tag
          key={index}
          style={{ cursor: "pointer", margin: "2px" }}
          intent={this.props.selectedIndex === index ? "success" : "none"}
          onClick={() => this.props.TopicNameAndIndex(value.Topic, index)}
        >
          {value.Topic}
        </Tag>
      );
    });
    return <div>{rows}</div>;
  }
}

export default TopicList;
