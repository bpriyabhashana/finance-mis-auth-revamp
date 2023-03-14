import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { Dialog, Classes } from "@blueprintjs/core";

import renderHTML from "react-render-html";

class PaperViewModal extends Component {
  render() {
    return (
      <Dialog
        icon="info-sign"
        isOpen={this.props.show}
        onClose={this.props.handlePaperHide}
        title="Genarated Paper"
        style={{ width: "80%", height: "90%", overflow: "scroll" }}
      >
        <div className={Classes.DIALOG_BODY}>
          <QuestionList data={this.props.GenaratedPaper} />
        </div>
      </Dialog>
    );
  }
}

export default PaperViewModal;

class QuestionList extends Component {
  render() {
    console.log("Render is Call");
    var data = this.props.data;

    let QuestionList = [];
    if (data.QuestionType === "PRACTICAL") {
      data.GenaratedQuestionSet.map(function(Question, index) {
        QuestionList.push(
          <PracticalCard key={index} index={index} Question={Question} />
        );
      });
      return <div>{QuestionList}</div>;
    } else if (data.QuestionType === "MCQ") {
      let count = 1;
      data.GenaratedQuestionSet.map(function(Question, index1) {
        Question.QuestionSet.map(function(Question, index2) {
          QuestionList.push(
            <QuestionCard key={count} index={count - 1} Question={Question} />
          );
          count += 1;
        });
      });
      return (
        <div>
          <div>Paper Name: {data.NameOfPaper}</div>
          <div>Number Of Questions: {data.NumberOfQuestion}</div>
          <div>Time For Paper: {data.TimeForPaper + "min"} </div>
          <div>PaperType: MCQ PAPER</div>
          <div>Genarated Question Count: {count - 1}</div>
          <hr />
          {QuestionList}
        </div>
      );
    } else if (data.QuestionType === "SCENARIO_BASE") {
      let count = 1;
      let Total_Count = 1;
      let QuestionBlocks = [];
      data.GenaratedQuestionSet.map(function(CategoryBlock, index1) {
        CategoryBlock.QuestionSet.map(function(Question, index2) {
          QuestionList.push(
            <QuestionCard key={count} index={count - 1} Question={Question} />
          );
          count += 1;
          Total_Count += 1;
        });
        // count = 1;
        QuestionBlocks.push(
          <div>
            &nbsp;&nbsp;&nbsp;<h4>{CategoryBlock.Name}</h4>
            <hr />
            {QuestionList}
          </div>
        );
        QuestionList = [];
      });
      return (
        <div>
          <div>Paper Name: {data.NameOfPaper}</div>
          <div>Number Of Questions: {data.NumberOfQuestion}</div>
          <div>Time For Paper: {data.TimeForPaper + "min"} </div>
          <div>PaperType: SCENARIO BASE PAPER</div>
          <div>Genarated Question Count: {Total_Count - 1}</div>
          <hr />
          <div>
            <b>Scenario:</b>
          </div>
          <div>{renderHTML(data.ScenarioContent)}</div>
          <div>
            <b>Scenario Image:</b>
          </div>
          <div>
            {data.ScenarioOtherContent ? (
              <img
                style={{
                  border: "1px solid #ddd",
                  border_radius: "4px",
                  width: "100px"
                }}
                alt="Other Content"
                src={data.ScenarioOtherContent}
              />
            ) : (
              <p className="category"> No Image Content</p>
            )}
          </div>
          <br />
          <hr />
          {QuestionBlocks}
        </div>
      );
    } else {
      return (
        <div>
          <center>Unkown Paper Type</center>
        </div>
      );
    }
  }
}

class QuestionCard extends Component {
  render() {
    var AnswerBlock = [];
    if (this.props.Question.AnswerList !== undefined) {
      this.props.Question.AnswerList.map((instance, index) =>
        AnswerBlock.push(
          <h5 key={index}>
            {index + 1}) &nbsp; {instance.Answer}
          </h5>
        )
      );
    }

    const htmlContent = this.props.Question.Content;
    return (
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
              <Col sm={10} style={{ padding: "10px" }}>
                <Row>{renderHTML(htmlContent)}</Row>
                <Row>
                  {this.props.Question.OtherContent && (
                    <img
                      className="zoom"
                      style={{
                        border: "1px solid #ddd",
                        border_radius: "4px",
                        width: "100px"
                      }}
                      alt="Question Other Content"
                      src={this.props.Question.OtherContent}
                    />
                  )}
                </Row>
              </Col>

              <Col sm={1} />
            </Row>
          </div>
          {this.props.Question.AnswerList !== undefined && (
            <div className="footer" style={{ background: "#fff9e5" }}>
              <hr />
              <div className="stats" style={{ marginLeft: "40px" }}>
                {AnswerBlock}
              </div>
            </div>
          )}
        </div>
      </Col>
    );
  }
}

class PracticalCard extends Component {
  render() {
    const htmlContent = this.props.Question.Content;
    return (
      <Col sm={12} md={12}>
        <div autoFocus className={"card"} style={{ width: "100%" }}>
          <div className="content">
            <Row>
              <Col sm={1}>
                <h3 style={{ margin: "0px 20px", color: "#474747" }}>
                  {("0" + parseInt(this.props.index + 1, 10)).slice(-2)}
                </h3>
              </Col>
              <Col sm={10} style={{ padding: "10px" }}>
                <Row>{renderHTML(htmlContent)}</Row>
                <Row>
                  {this.props.Question.OtherContent !== "empty" && (
                    <img
                      className="zoom"
                      style={{
                        border: "1px solid #ddd",
                        border_radius: "4px",
                        width: "100px"
                      }}
                      alt="Question Other Content"
                      src={this.props.Question.OtherContent}
                    />
                  )}
                </Row>
              </Col>

              <Col sm={1} />
            </Row>
          </div>
        </div>
      </Col>
    );
  }
}
