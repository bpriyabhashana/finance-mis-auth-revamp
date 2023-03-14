import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Spinner, H3 } from "@blueprintjs/core";

export class StatsCard extends Component {
  render() {
    return (
      <div className="card card-stats">
        <div className="content">
          <Row>
            <Col xs={5}>
              <div className="icon-big text-center icon-warning">
                {this.props.bigIcon}
              </div>
            </Col>
            <Col xs={7}>
              <div className="numbers">
                {this.props.error ? (
                  <small>
                    <i class="fa fa-exclamation-triangle text-danger" />
                  </small>
                ) : !this.props.loading ? (
                  <div>
                    <p className="category">{this.props.statsText}</p>
                    <H3 style={{ color: "gray" }}>{this.props.statsValue}</H3>
                  </div>
                ) : (
                  <div>
                    <p className="category">{this.props.statsText}</p>
                    <Spinner size={20} />
                  </div>
                )}
              </div>
            </Col>
          </Row>
          <div className="footer">
            {/* <hr />
            <div className="stats">
              {this.props.statsIcon} {this.props.statsIconText}
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default StatsCard;
