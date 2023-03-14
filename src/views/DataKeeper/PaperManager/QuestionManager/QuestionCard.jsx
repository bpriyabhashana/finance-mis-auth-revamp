import React, { Component } from "react";
import { Row, Col, Button } from "react-bootstrap";
import renderHTML from "react-render-html";
import QuestionEditor from "./QuestionEditor";
import axios from "axios";
// test
import cloneDeep from "lodash/cloneDeep";
import SortableComponent from "./SortableAnswerList";
import config from "../../../../variables/Constants";

import "./zoom.css";

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EditMode: false,

      // keep Answer List for Answer Edit Mode
      EditModeAnswer: [],
      // keep Remove Answer List
      RemoveList: [],
      AnswerLength: this.props.data.NumberOfAnswer,
      imageData: this.props.data.OtherContent,
      data: cloneDeep(this.props.data)
    };
    this.toggleMode = () => {
      this.setState(
        {
          EditMode: !this.state.EditMode
        },
        () => {
          if (this.state.EditMode === false) {
            this.EditModeAnswerSet();
          }
        }
      );
    };
    this.toggleEditModePaperType = () => {
      this.setState({
        EditIsMultipleSelection: !this.state.EditIsMultipleSelection
      });
    };
    // set Eddit Mode Content
    this.setEditValue = content => {
      var temp = this.state.data;
      temp.Content = content;
      this.setState({
        data: temp
      });
    };

    this.ChangeQuestion = (selectionID, evt) => {
      var temp = this.state.data;
      if (selectionID === 1) {
        const Owner = evt.target.value;
        temp.Owner = Owner;
      }
      if (selectionID === 2) {
        const NumberOfAnswer = evt.target.value;
        temp.NumberOfAnswer = NumberOfAnswer;
      }
      // use for chanage Other Content
      if (selectionID === 3) {
      }
      this.setState({ data: temp }, console.log(this.state.data));
    };
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imageData: "data:image/jpeg;base64," + getBase64(reader.result)
      });
    };

    reader.readAsDataURL(file);
    console.log(this.state);
  }

  EditModeAnswerSet = () => {
    this.setState({
      EditModeAnswer: this.props.IsMcq ? cloneDeep(this.props.data.Answer) : [],
      RemoveList: []
    });
  };

  // Data Handle
  QuestionUpdate = ID => {
    var updateData = {
      QuestionData: {
        ID: this.state.data.ID,
        CategoryID: this.state.data.CategoryID,
        ModuleID: this.state.data.ModuleID,
        TopicID: this.state.data.TopicID,
        SimilarityID: this.state.data.SimilarityID,
        PaperTypeID: this.state.data.PaperTypeID,
        Content: this.state.data.Content,
        OtherContent: this.state.imageData,
        IsActive: this.state.data.IsActive === 1,
        Owner: this.state.data.Owner,
        Arrange: this.state.data.Arrange,
        IsMultipleSelection: this.state.EditIsMultipleSelection,
        NumberOfAnswer: parseInt(this.state.data.NumberOfAnswer, 10)
      },
      AnswerList: this.state.EditModeAnswer,
      RemoveList: this.props.IsMcq ? this.state.RemoveList : []
    };
    console.log(updateData);

    let axiosConfig = {
      headers: {
        Accept: "application/json"
      }
    };

    axios
      .put(
        config.HOST_CONFIG.BACK_END_API_MAPPER_URL +
          config.BASE_PATH.QUESTION_SERVICE_BASE_PATH +
          "WholeQuestion",
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
            "success",
            "Question Data Updated successfully",
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

  componentDidMount() {
    this.setState({
      EditIsMultipleSelection: this.props.data.IsMultipleSelection === 1,
      data: cloneDeep(this.props.data)
    });
    this.EditModeAnswerSet();
  }

  render() {
    var AnswerBlock = [];
    console.log(this.state.data);

    if (this.state.data.Answer !== undefined) {
      this.state.data.Answer.map((instance, index) =>
        AnswerBlock.push(
          <h5 key={index}>
            {" "}
            {instance.Position > 0 ? instance.Position : "*"}) &nbsp;{" "}
            {instance.Answer}&nbsp;
            {instance.IsCorrect === 1 && (
              <i style={{ color: "green" }} className="fa fa-check " />
            )}
            &nbsp;
            {instance.Position > 0 && (
              <i style={{ color: "#dd4837" }} className="fa fa-lock" />
            )}
          </h5>
        )
      );
    }
    // end answer body

    // Answer Body
    const htmlContent = this.props.data.Content;
    return (
      <div>
        {!this.state.EditMode ? (
          // View Mode
          <Col sm={12} md={12}>
            <div autoFocus className={"card"} style={{ width: "100%" }}>
              <div className="content">
                <Row>
                  <Col sm={1}>
                    <h3 style={{ margin: "0px 20px", color: "#474747" }}>
                      {("0" + parseInt(this.props.index + 1, 10)).slice(-2)}
                    </h3>
                  </Col>
                  <Col sm={10}>
                    <Row>{renderHTML(htmlContent)}</Row>

                    {this.props.data.OtherContent !== "empty" && (
                      <Row>
                        <img
                          className="zoom"
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

                    <hr />
                    <Row>
                      <Col sm={6}>
                        <div>
                          <Row>
                            <b>Type</b> :
                            {this.props.data.IsMultipleSelection === 1 ? (
                              <code>Multiple Selection</code>
                            ) : (
                              <code>Single Selection</code>
                            )}
                          </Row>

                          <Row>
                            <b>Display answer</b> :
                            {this.props.data.NumberOfAnswer}
                          </Row>
                        </div>

                        <Row>
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
                          <Col md={6} sm={12} style={{ padding: "0px" }}>
                            <b>Created By</b> :{this.props.data.CreatedBy}
                          </Col>
                          <Col md={6} sm={12} style={{ padding: "0px" }}>
                            <b>Created Date</b> :{this.props.data.CreatedDate}
                          </Col>
                        </Row>
                        <Row>
                          <Col md={6} sm={12} style={{ padding: "0px" }}>
                            <b>Created By</b> :{this.props.data.CreatedBy}
                          </Col>
                          <Col md={6} sm={12} style={{ padding: "0px" }}>
                            <b>Created Date</b> :{this.props.data.CreatedDate}
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
                  <Col sm={1}>
                    {/* Delete Question  */}
                    {/* <Button
                      onClick={() => {
                        if (window.confirm("Delete the item?")) {
                          this.QuestionDelete();
                        }
                      }}
                      style={{
                        color: "#F08080",
                        border: "0px"
                      }}
                    >
                      <i
                        className="fa fa-trash fa-2x"
                        title="Delete Question"
                      />
                    </Button>
                    <Button
                      onClick={this.toggleMode}
                      style={{
                        border: "0px"
                      }}
                    >
                      <i className="fa fa-edit fa-2x" title="Edit Question" />
                    </Button> */}
                  </Col>
                </Row>
              </div>
              {this.props.IsMcq && (
                <div className="footer">
                  <hr />
                  <div className="stats" style={{ marginLeft: "40px" }}>
                    {AnswerBlock}
                  </div>
                </div>
              )}
            </div>
          </Col>
        ) : (
          // Edit Mode
          <Col sm={12} md={12}>
            <div autoFocus className={"card"} style={{ width: "100%" }}>
              <div className="content">
                <Row>
                  <Col sm={1}>
                    <Button
                      onClick={this.toggleMode}
                      style={{
                        border: "0px"
                      }}
                    >
                      <i className="fa fa-arrow-left fa-2x" title="Back" />
                    </Button>
                  </Col>
                  <Col sm={10}>
                    <Row>
                      <QuestionEditor
                        setEditValue={this.setEditValue}
                        content={htmlContent}
                      />
                    </Row>
                    <br />

                    <Row>
                      <Col>
                        {this.state.imageData !== "empty" && (
                          <img
                            className="zoom"
                            style={{
                              border: "1px solid #ddd",
                              border_radius: "4px",
                              width: "100px"
                            }}
                            alt="Question Other Content"
                            src={this.state.imageData}
                          />
                        )}
                      </Col>
                      <Col>
                        <input
                          className="fileInput"
                          type="file"
                          onChange={e => this._handleImageChange(e)}
                        />
                      </Col>
                    </Row>
                    <Row>
                      {/* Only display in MCQ Paper */}
                      {this.props.IsMcq && (
                        <Col sm={6} md={4}>
                          <div onClick={() => this.toggleEditModePaperType()}>
                            <b>Type</b> :
                            {this.state.EditIsMultipleSelection ? (
                              <code>Multiple Selection</code>
                            ) : (
                              <code>Single Selection</code>
                            )}
                          </div>
                        </Col>
                      )}
                      {/* Only display in MCQ Paper */}
                      {this.props.IsMcq && (
                        <Col sm={6} md={4}>
                          <b>Display answer</b> :
                          <input
                            type="number"
                            onChange={e => this.ChangeQuestion(2, e)}
                            value={this.state.data.NumberOfAnswer}
                            min="1"
                            max={this.state.EditModeAnswer.length}
                          />
                        </Col>
                      )}

                      <Col sm={6} md={4}>
                        <b>Owner Name </b> :
                        <input
                          type="text"
                          value={this.state.data.Owner}
                          pattern="/^[a-z ,.'-]+$/i"
                          onChange={e => this.ChangeQuestion(1, e)}
                        />
                      </Col>
                    </Row>

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
                  <Col sm={1}>
                    <Button
                      type="submit"
                      onClick={this.QuestionUpdate}
                      action="submit"
                      style={{
                        border: "0px"
                      }}
                    >
                      <i className="fa fa-upload fa-2x" title="Update" />
                    </Button>
                  </Col>
                </Row>
              </div>
              {this.props.IsMcq && (
                <div className="footer" style={{ background: "#dddddd" }}>
                  <hr />
                  <div className="stats" style={{ marginLeft: "40px" }}>
                    <SortableComponent
                      AnswerList={this.state.EditModeAnswer}
                      RemoveList={this.state.RemoveList}
                      answerLength={this.state.AnswerLength}
                      questionID={this.props.data.ID}
                    />
                  </div>
                </div>
              )}
            </div>
          </Col>
        )}
      </div>
    );
  }
}

export default QuestionCard;

function getBase64(fileResult) {
  let encoded = "Not Specified";
  if (fileResult) {
    encoded = fileResult.substr(fileResult.indexOf(",") + 1);
  }
  return encoded;
}
