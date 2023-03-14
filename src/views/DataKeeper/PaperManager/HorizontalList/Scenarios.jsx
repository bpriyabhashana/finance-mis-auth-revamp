import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
import "./App.css";
import { Spinner, Tag } from "@blueprintjs/core";
const MenuItem = ({ Content, ScenarioID, selected, VersionList }) => {
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
              <small>
                {Content.slice(0, 40)} {Content.length > 40 && "..."}
              </small>
            </p>
            <p className="category">{"ID# " + ScenarioID}</p>
            {VersionList &&
              VersionList.split(",").map((value, index) => {
                return (
                  <Tag
                    style={{ marginRight: "3px" }}
                    minimal={true}
                    intent="success"
                    key={index}
                  >
                    {value}
                  </Tag>
                );
              })}
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

export const Menu = list =>
  list.map(el => {
    const { ScenarioID, Scenario, VersionList } = el;

    return (
      <MenuItem
        Content={Scenario}
        ScenarioID={ScenarioID}
        VersionList={VersionList}
        key={ScenarioID}
      />
    );
  });

class ScenarioList extends Component {
  state = {
    selected: 0
  };

  onSelect = key => {
    if (key === this.state.selected) {
      this.setState({ selected: 0 });
      this.props.setID(5, null);
    } else {
      this.setState({ selected: key });
      this.props.setID(5, key);
    }
  };

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.selectedCategoryID !== prevProps.selectedCategoryID) {
      this.setState({ selected: 0 });
    }
  }

  render() {
    const { selected } = this.state;
    // list of items
    const list = this.props.ScenarioData;

    // Create menu from items
    const menu = Menu(list, selected);

    return (
      <div style={{ height: "100%" }}>
        {this.props.loading ? (
          <center>
            <h4>
              <Spinner size={25} />
            </h4>
          </center>
        ) : this.props.ScenarioData.length === 0 ? (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p className="category">No Scenarios to display.</p>
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

export default ScenarioList;
