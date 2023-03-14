import React, { Component } from "react";
import PaperGenerator from "./PaperGenarator/PaperGenarator";
import PaperAnalyzer from "./PaperSnapAnalyzer/PaperSnapAnalyzer";
import { Row, Col } from "react-bootstrap";

class Tools extends Component {
  render() {
    return (
      <div className={"card"}>
        <div className={"header"}>
          <div className="pull-left">
            <p className="category">Admin Tools</p>
          </div>
        </div>
        <div className="clearfix" />
        <div className={"content"}>
          <Row>
            <Col lg={4} sm={12}>
              <PaperGenerator />
            </Col>
            <Col lg={8} sm={12}>
              <PaperAnalyzer />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Tools;
