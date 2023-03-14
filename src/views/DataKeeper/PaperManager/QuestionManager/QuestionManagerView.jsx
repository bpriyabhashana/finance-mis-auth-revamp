import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import QuestionCard from "./MCQQuestionCard/QuestionCard";
import ScenarioQuestionCard from "./ScenarioQuestionCard/QuestionCard";
import PracticalQuestionCard from "./PracticalQuestionCard/QuestionCard";
import { Button, ButtonGroup } from "@blueprintjs/core";
import MCQAddForm from "../../Form/MCQQuestion/AddForm/AddQuestionForm";
import { Spinner } from "@blueprintjs/core";
class QuestionManagerView extends Component {
  state = { MCQAddMode: false };
  toggleMCQAddMode = () => {
    console.log("CALL--------------------");
    this.setState({ MCQAddMode: !this.state.MCQAddMode });
  };
  render() {
    console.log(this.props.ProductID);
    var rows = [];
    if (this.props.questionData !== undefined && !this.props.QuestionLoading) {
      this.props.questionData.map((instance, index) => {
        rows.push(
          <QuestionCardPointer
            key={index}
            QuestionType={this.props.QuestionType}
            data={instance}
            index={index}
            FetchQuestionData={this.props.FetchQuestionData}
            Notification={this.props.Notification}
            Loading={this.props.QuestionLoading}
            ProductID={this.props.ProductID}
          />
        );
      });
    }
    return (
      <div>
        {/* Question Insert Form  */}
        {/* MCQ */}
        {this.props.QuestionType === "MCQ" && (
          <MCQAddForm
            onClose={this.toggleMCQAddMode}
            isOpen={this.state.MCQAddMode}
            ProductID={this.props.ProductID}
            {...this.props}
          />
        )}

        <Col sm={12} md={12}>
          <div
            autoFocus
            className={"card"}
            style={{ width: "100%", background: "#EEEEE" }}
          >
            <div className={"header"}>
              <div className="pull-left">
                <p className="category">Question Manager</p>
              </div>
            </div>

            <div className="clearfix" />

            <div className="content">
              <div>
                <div>
                  <Breadcrumb>
                    <BreadcrumbItem>
                      <small>Module</small>
                    </BreadcrumbItem>
                    {this.props.selectedData[0] !== null && (
                      <BreadcrumbItem>
                        <a
                          onClick={() =>
                            this.props.setID(4, this.props.selectedData[0].ID)
                          }
                          style={{
                            cursor: "hand",
                            color:
                              this.props.selectedData[1] !== null
                                ? "#dddddd"
                                : "#999999"
                          }}
                        >
                          <small>
                            {this.props.selectedData[0].NameOfPaper}
                          </small>
                        </a>
                      </BreadcrumbItem>
                    )}
                    {this.props.selectedData[1] !== null && (
                      <BreadcrumbItem>
                        <a
                          onClick={() =>
                            this.props.setID(
                              2,
                              this.props.selectedData[1].CategoryID
                            )
                          }
                          style={{
                            cursor: "hand",
                            color:
                              this.props.selectedData[2] !== null
                                ? "#dddddd"
                                : "#999999"
                          }}
                        >
                          <small>{this.props.selectedData[1].Name}</small>
                        </a>
                      </BreadcrumbItem>
                    )}
                    {this.props.selectedData[2] !== null && (
                      <BreadcrumbItem active>
                        <a
                          style={{
                            cursor: "hand",
                            color: "#999999"
                          }}
                        >
                          <small>{this.props.selectedData[2].TopicName}</small>
                        </a>
                      </BreadcrumbItem>
                    )}
                  </Breadcrumb>
                </div>
                <div>
                  {/* Question ToolBar------------------- */}
                  {this.props.QuestionType === "MCQ" && (
                    <ButtonGroup minimal={true}>
                      <Button
                        icon="add"
                        intent="success"
                        disabled={this.props.selectedData[2] === null}
                        onClick={this.toggleMCQAddMode}
                      >
                        Add New
                      </Button>
                      <Button
                        icon="group-objects"
                        disabled={this.props.selectedData[0] === null}
                        // onClick={this.toggleMCQAddMode}
                      >
                        Arrange Similarity
                      </Button>
                      <Button icon="label">Details</Button>
                    </ButtonGroup>
                  )}
                  {this.props.QuestionType === "PRACTICAL" && (
                    <ButtonGroup minimal={true}>
                      <Button
                        icon="add"
                        intent="success"
                        disabled={this.props.selectedData[2] === null}
                        //onClick={this.toggleMCQAddMode}
                      >
                        Add New
                      </Button>
                      <Button
                        icon="group-objects"
                        disabled={this.props.selectedData[0] === null}
                      >
                        Arrange Similarity
                      </Button>
                      <Button
                        icon="group-objects"
                        disabled={this.props.selectedData[0] === null}
                      >
                        Arrange Question Order
                      </Button>
                      <Button icon="label">Details</Button>
                    </ButtonGroup>
                  )}
                  {this.props.QuestionType === "SCENARIO_BASE" && (
                    <ButtonGroup minimal={true}>
                      <Button
                        icon="add"
                        disabled={
                          this.props.selectedData[2] === null ||
                          this.props.selectedData[4] === null
                        }
                        onClick={this.toggleMCQAddMode}
                      >
                        Add New
                      </Button>
                      <Button
                        icon="group-objects"
                        disabled={this.props.selectedData[0] === null}
                        // onClick={this.toggleMCQAddMode}
                      >
                        Arrange Similarity
                      </Button>
                      <Button icon="label">Details</Button>
                    </ButtonGroup>
                  )}
                  {/* End Question Tool Bar ------------------- */}
                </div>
                <br />
                {this.props.QuestionLoading ? (
                  <LoadingMessage />
                ) : this.props.PaperType === "SCENARIO_BASE_PAPER" &&
                  this.props.selectedIDs[4] === null ? (
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <p className="category">
                      Select a Paper Scenario for Explore Questions
                    </p>
                  </div>
                ) : (
                  <Row>{rows}</Row>
                )}
              </div>
              {!this.props.QuestionLoading && rows.length === 0 && (
                <Row>
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <p className="category">No Question To Display.</p>
                  </div>
                </Row>
              )}
            </div>
          </div>
        </Col>
      </div>
    );
  }
}

export default QuestionManagerView;

function QuestionCardPointer(props) {
  if (props.QuestionType === "MCQ") {
    return (
      <QuestionCard
        key={props.index}
        data={props.data}
        FetchQuestionData={props.FetchQuestionData}
        index={props.index}
        ProductID={props.ProductID}
        Notification={props.Notification}
      />
    );
  } else if (props.QuestionType === "PRACTICAL") {
    return (
      <PracticalQuestionCard
        key={props.index}
        data={props.data}
        FetchQuestionData={props.FetchQuestionData}
        index={props.index}
        Notification={props.Notification}
        Loading={props.Loading}
      />
    );
  } else if (props.QuestionType === "SCENARIO_BASE") {
    return (
      <ScenarioQuestionCard
        key={props.index}
        data={props.data}
        FetchQuestionData={props.FetchQuestionData}
        index={props.index}
        Notification={props.Notification}
        ProductID={props.ProductID}
      />
    );
  } else {
    return <h1>{this.props.QuestionType}</h1>;
  }
}

function LoadingMessage(props) {
  return (
    <center>
      <h4>
        <Spinner size={30} />
        <p className="category">Loading...</p>
      </h4>
    </center>
  );
}
