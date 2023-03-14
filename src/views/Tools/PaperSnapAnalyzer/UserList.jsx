import React, { Component } from "react";
import { Row, Grid } from "react-bootstrap";

class ModuleList extends Component {
  render() {
    return (
      <div className={"card"} style={{ padding: "10px", margin: "10px" }}>
        <div className="clearfix" />
        <div className={"content"}>
          {/* <List
            data={this.props.selectedModuleList}
            changeModuleID={this.props.changeModuleID}
            ModuleID={this.props.ModuleID}
          /> */}
          <div className="footer" />
        </div>
      </div>
    );
  }
}
export default ModuleList;

class List extends Component {
  render() {
    var rows = [];

    this.props.data.map((ModuleData, index) =>
      rows.push(
        <ModuleListCard
          key={index}
          ModuleData={ModuleData}
          changeModuleID={this.props.changeModuleID}
          ModuleID={this.props.ModuleID}
        />
      )
    );

    return (
      <div
        style={{
          height: "200px",
          overflowY: "scroll",
          overflowX: "hidden",
          padding: "0px"
        }}
      >
        {" "}
        <Row>{rows}</Row>
      </div>
    );
  }
}

class ModuleListCard extends Component {
  render() {
    // handle Background Color
    var backStyle;
    if (this.props.ModuleID === this.props.ModuleData.ModuleID) {
      backStyle = { background: "#f4fafc" };
    } else {
      backStyle = {};
    }
    return (
      <div
        onClick={() =>
          this.props.changeModuleID(1, this.props.ModuleData.ModuleID)
        }
      >
        <div className="card" style={backStyle}>
          <div className={"header"}>
            <div className="pull-left">
              <h6 className="title">{this.props.ModuleData.ModuleName}</h6>
              <p className="category">ID# {this.props.ModuleData.ModuleID}</p>
            </div>
          </div>
          <div className="clearfix" />
          <div className="content">{this.props.content}</div>
        </div>
      </div>
    );
  }
}
