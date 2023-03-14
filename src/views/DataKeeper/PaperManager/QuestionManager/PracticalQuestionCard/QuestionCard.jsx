import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import renderHTML from "react-render-html";
import axios from "axios";
import config from "../../../../../variables/Constants";
import { ButtonGroup, Button, Tag, Classes } from "@blueprintjs/core";
import PRACTICALEditForm from "./../../../../DataKeeper/Form/PracticalQuestion/EditForm/PRACTICALEditForm";

import "./zoom.css";

class PracticalQuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EditMode: false,

      imageData: this.props.data.OtherContent
    };
    this.toggleMode = () => {
      this.setState({
        EditMode: !this.state.EditMode
      });
    };
  }

  QuestionDelete = ID => {
    var updateData = {
      id: this.props.data.ID
    };

    let axiosConfig = {
      headers: {
        Accept: "application/json"
      }
    };

    axios
      .post(
        config.HOST_CONFIG.BACK_END_API_MAPPER_URL +
          config.BASE_PATH.QUESTION_SERVICE_BASE_PATH +
          "Toggle",
        updateData,
        axiosConfig
      )
      .then(res => {
        //console.log("RESPONSE RECEIVED: ", res);
        if (res.status === 200) {
          console.log("OK", res);
          //this.toggleMode();
          this.props.FetchQuestionData(0);
          this.props.Notification(
            "tr",
            "error",
            "Question (Question ID: " +
              this.props.data.ID +
              ") Removed successfully",
            "pe-7s-speaker"
          );
        }
        if (res.status === 400) {
          console.log("Bad", res);
        }
      })
      .catch(err => {
        console.log("Error", err);
      });
  };

  // Handle Data

  render() {
    let loading = this.props.Loading;
    let LoadingStyle = loading ? Classes.SKELETON : "";
    const htmlContent = this.props.data.Content;
    return (
      <div>
        <PRACTICALEditForm
          onClose={this.toggleMode}
          isOpen={this.state.EditMode}
          data={this.props.data}
          {...this.props}
        />
        <Col sm={12} md={12}>
          <div autoFocus className={"card"} style={{ width: "100%" }}>
            <div className="content">
              <Row>
                <Col sm={12} md={1}>
                  <h3
                    className={LoadingStyle}
                    style={{ padding: "  20px", color: "#474747" }}
                  >
                    {("0" + parseInt(this.props.index + 1, 10)).slice(-2)}
                  </h3>
                </Col>
                <Col sm={12} md={11}>
                  <Row>
                    <Col sm={12}>
                      {/* Question ToolBar------------------- */}
                      <ButtonGroup minimal={true} className={LoadingStyle}>
                        <Button icon="edit" onClick={this.toggleMode}>
                          Edit
                        </Button>
                        <Button icon="flow-branch">Clone</Button>
                        <Button icon="trash" intent="danger">
                          Remove
                        </Button>
                      </ButtonGroup>
                      {/* End Question Tool Bar ------------------- */}
                    </Col>
                    <br />
                    <hr />
                    <Col sm={12} className={LoadingStyle}>
                      {renderHTML(htmlContent)}
                    </Col>
                  </Row>

                  {this.props.data.OtherContent !== null && (
                    <Row>
                      <img
                        className={LoadingStyle + " zoom"}
                        style={{
                          border: "1px solid #ddd",
                          border_radius: "4px",
                          width: "100px"
                        }}
                        alt="Question Other Content"
                        src={this.props.data.OtherContent}
                      />
                    </Row>
                  )}

                  <Row>
                    <hr />
                    <Col sm={12}>
                      <b>Compatible Versions </b> :
                      {this.props.data.VersionList.split(",").map(
                        (value, index) => {
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
                        }
                      )}
                    </Col>
                    <Col sm={6}>
                      <Row>
                        <Col md={6} sm={12} className={LoadingStyle}>
                          <b>Created By</b> :{this.props.data.CreatedBy}
                        </Col>
                        <Col md={6} sm={12} className={LoadingStyle}>
                          <b>Date Created</b> :{this.props.data.CreatedDate}
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} sm={12} className={LoadingStyle}>
                          <b>Verified By</b> :{this.props.data.VerifiedBy}
                        </Col>
                        <Col md={6} sm={12} className={LoadingStyle}>
                          <b>Date Verified </b> :{this.props.data.VerifiedDate}
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} sm={12} className={LoadingStyle}>
                          {this.props.data.IsSample === 1 && (
                            <Tag intent="success">Sample Question</Tag>
                          )}
                        </Col>
                      </Row>
                    </Col>
                    <Col sm={6}>
                      <Row>
                        <p className="category">
                          <b> ID </b>:{this.props.data.ID}
                        </p>
                        <p className="category">
                          {" "}
                          <b>CategoryID</b> :{this.props.data.CategoryID}
                        </p>
                        <p className="category">
                          {" "}
                          <b>TopicID</b> :{this.props.data.TopicID}
                        </p>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </div>
    );
  }
}

export default PracticalQuestionCard;
