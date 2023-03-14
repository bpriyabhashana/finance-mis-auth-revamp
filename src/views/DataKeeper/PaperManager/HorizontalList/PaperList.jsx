import React, { Component } from "react";
import ScrollMenu from "react-horizontal-scrolling-menu";
//import { Button } from "react-bootstrap";
import "./App.css";

import { Spinner, Tag, Icon } from "@blueprintjs/core";

// import { Popover, Menu, MenuItem, Button, Position } from "@blueprintjs/core";

class MenuItem1 extends Component {
  state = { show: false };
  toggle = () => {
    this.setState({ show: !this.state.show });
  };
  render() {
    return (
      <div
        className="card .bp3-skeleton"
        style={{
          width: "auto",
          margin: "5px",
          padding: "0px",
          background: this.props.selected
            ? this.props.PaperState === "USED"
              ? "#e8dbd8"
              : "#dddddd"
            : this.props.PaperState === "USED"
            ? "#fff7f5"
            : ""
        }}
      >
        <div className={"header "}>
          <div className="pull-left">
            <div style={{ padding: "2px" }}>
              <p className="title">
                <b>{this.props.NameOfPaper}</b>
              </p>

              <p className="category">
                {"ID# " + this.props.ID} <b>Time For Paper:</b>{" "}
                {timeConvert(this.props.TimeForPaper)}
              </p>
            </div>
          </div>
          <div
            className="pull-right"
            title={
              this.props.PublishState === "PUBLISHED"
                ? "Paper is PUBLISHED"
                : "Paper is NOT_PUBLISHED"
            }
          >
            <Icon
              intent={
                this.props.PublishState === "PUBLISHED" ? "success" : "danger"
              }
              icon="dot"
              iconSize={30}
            />
          </div>
        </div>
        <br />
        <div className="content">
          <div className="pull-left">
            <div>
              {this.props.Version && (
                <div>
                  <Tag intent="success">
                    {"Version : " + this.props.Version}
                  </Tag>
                </div>
              )}
            </div>
          </div>
          <div>{this.props.PaperTypeState}</div>
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}

function timeConvert(n) {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  return rhours + " h " + rminutes + " mins";
}

// All items component
// Important! add unique key
export const Menu1 = (list, selected) =>
  list.map(el => {
    const {
      ID,
      IsActive,
      PaperType,
      NameOfPaper,
      NumberOFQuestions,
      TimeForPaper,
      Version,
      PublishState,
      PaperTypeState
    } = el;

    return (
      <MenuItem1
        ID={ID}
        NameOfPaper={NameOfPaper}
        PaperType={PaperType}
        IsActive={IsActive}
        NumberOFQuestions={NumberOFQuestions}
        TimeForPaper={TimeForPaper}
        Version={Version}
        PublishState={PublishState}
        PaperState={PaperTypeState}
        key={ID}
        selected={selected}
      />
    );
  });

class PaperList extends Component {
  constructor(props, prevProps) {
    super(props, prevProps);
    this.state = {
      selected: 0
    };
    this.onSelect = key => {
      if (this.state.selected !== key) {
        this.setState({ selected: key });
        this.props.setID(4, key);
      } else {
        this.setState({ selected: 0 });
        this.props.setID(4, null);
      }
    };
  }

  render() {
    // list of items
    const list = this.props.paperTypeData;
    console.log(list);
    const { selected } = this.state;
    // Create menu from items

    const menu = Menu1(list, selected);
    return (
      <div>
        <div>
          {this.props.loading ? (
            <center>
              <h4>
                <Spinner size={25} />
              </h4>
            </center>
          ) : this.props.selectedModuleID === null ? (
            <div>
              <h5> Module ID Error</h5>
            </div>
          ) : this.props.paperTypeData.length === 0 ? (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <p className="category">No papers to display.</p>
            </div>
          ) : (
            <div className="App">
              <ScrollMenu
                data={menu}
                alignCenter={false}
                selected={selected}
                onClick={e => {
                  console.log(e);
                }}
                onSelect={this.onSelect}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default PaperList;
