import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import "./App.css";

import { Spinner } from "@blueprintjs/core";

// One item component
// selected prop will be passed
const MenuItem = ({ Name, TopicID, selected }) => {
  return (
    <div
      className={"card"}
      style={{
        width: "auto",
        margin: "5px",
        padding: "0px",
        background: selected ? "#dddddd" : ""
      }}
    >
      <div className={"header"}>
        <div className="pull-left">
          <div>
            <p className="title">
              <b>{Name}</b>
            </p>
            <p className="category">{"ID# " + TopicID}</p>
          </div>
        </div>
      </div>
      <br />
      <div className="content">
        <br />
      </div>
    </div>
  ); //<div className="menu-item">{text}</div>;
};

// All items component
// Important! add unique key
export const Menu = list =>
  list.map(el => {
    const { TopicID, TopicName } = el;

    return <MenuItem Name={TopicName} TopicID={TopicID} key={TopicID} />;
  });

class TopicsList extends Component {
  state = {
    selected: 0
  };

  onSelect = key => {
    if (this.state.selected !== key) {
      this.setState({ selected: key });
      this.props.setID(3, key);
    } else {
      this.setState({ selected: 0 });
      this.props.setID(3, null);
    }
  };
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.loading !== prevProps.loading) {
      this.setState({ selected: 0 });
    }
  }
  render() {
    const { selected } = this.state;
    // list of items
    const list = this.props.topicsData;

    // Create menu from items
    const menu = Menu(list, selected);

    return (
      <div>
        {this.props.loading ? (
          <center>
            <h4>
              <Spinner size={25} />
            </h4>
          </center>
        ) : this.props.selectedCategoryID === null ? (
          <div>
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <p className="category">Select a category.</p>
            </div>
          </div>
        ) : this.props.topicsData.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p className="category">No topics to display.</p>
          </div>
        ) : (
          <div className="App">
            <ScrollMenu
              data={menu}
              alignCenter={false}
              selected={selected}
              onSelect={this.onSelect}
            />
          </div>
        )}
      </div>
    );
  }
}

export default TopicsList;
