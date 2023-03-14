import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import "./App.css";
import { Spinner } from "@blueprintjs/core";
const MenuItem = ({ CategoryID, Name, key, selected }) => {
  return (
    <div
      className={"card"}
      style={{
        width: "auto",
        margin: "5px",
        background: selected ? "#dddddd" : ""
      }}
    >
      <div className={"header"}>
        <div className="pull-left">
          <div>
            <p className="title">
              <b>{Name}</b>
            </p>
            <p className="category">{"ID# " + CategoryID}</p>
          </div>
        </div>
      </div>
      <br />
      <div className="content">
        <br />
      </div>
    </div>
  );
};

// All items component
// Important! add unique key
export const Menu = list =>
  list.map(el => {
    const { CategoryID, Name } = el;

    return <MenuItem CategoryID={CategoryID} Name={Name} key={CategoryID} />;
  });

class CategotyList extends Component {
  state = {
    selected: 0
  };

  onSelect = key => {
    if (this.state.selected !== key) {
      this.setState({ selected: key });
      this.props.setID(2, key);
    } else {
      this.setState({ selected: 0 });
      this.props.setID(2, null);
    }
  };
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.loading !== prevProps.loading) {
      this.setState({ selected: 0 });
    }
  }

  render() {
    // list of items
    const list = this.props.categoryData;
    console.log("call inside", list);
    const { selected } = this.state;

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
        ) : this.props.categoryData.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p className="category">No category to display.</p>
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

export default CategotyList;
