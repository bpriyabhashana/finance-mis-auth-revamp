import React, { Component } from "react";

import { Row, Grid } from "react-bootstrap";

class PaperList extends Component {
  render() {
    return (
      <div className={"card"}>
        <div className={"header"}>
          <div className="pull-left">
            <h5 className="title">Paper List</h5>
          </div>
        </div>
        <div className="clearfix" />
        <div className={"content"}>
          {this.props.loadingPaper && <p className="category">loading ... </p>}
          <List
            data={this.props.selectedPaperList}
            changePaperID={this.props.changePaperID}
            PaperID={this.props.PaperID}
          />

          <div className="footer" />
        </div>
      </div>
    );
  }
}

export default PaperList;

class List extends Component {
  render() {
    var rows = [];

    this.props.data.map((PaperData, index) =>
      rows.push(
        <PaperListCard
          key={index}
          PaperData={PaperData}
          changePaperID={this.props.changePaperID}
          PaperID={this.props.PaperID}
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

class PaperListCard extends Component {
  render() {
    // handle Background Color
    var backStyle;
    if (this.props.PaperID === this.props.PaperData.ID) {
      backStyle = { background: "#f4fafc" };
    } else {
      backStyle = {};
    }
    return (
      <div onClick={() => this.props.changePaperID(2, this.props.PaperData.ID)}>
        <div className="card" style={backStyle}>
          <div className={"header"}>
            <div className="pull-left">
              <h6 className="title">{this.props.PaperData.NameOfPaper}</h6>
              <p className="category">ID# {this.props.PaperData.ID}</p>
              <code>{this.props.PaperData.PaperType}</code>
            </div>
          </div>
          <div className="clearfix" />
          <div className="content">{this.props.content}</div>
        </div>
      </div>
    );
  }
}
