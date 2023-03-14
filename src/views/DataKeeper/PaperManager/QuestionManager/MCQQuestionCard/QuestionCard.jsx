import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import renderHTML from "react-render-html";
import { ButtonGroup, Button, Tag, Classes, Popover, PopoverInteractionKind, Position, Intent } from "@blueprintjs/core";
import MCQEditForm from "./../../../../DataKeeper/Form/MCQQuestion/EditForm/MCQEditForm";
import config from "../../../../../variables/Constants";
import axios from "axios";
import "./zoom.css";

class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EditMode: false,
      IsRemove: false
    };
    this.toggleMode = () => {
      this.setState({
        EditMode: !this.state.EditMode
      });
    };
  }

  removeButtonAction = () => {
      console.log("remove button Executed................");
      // this.dialog.show({
      //   title: 'Greedings',
      //   body: 'How are you?',
      //   actions: [
      //     Dialog.CancelAction(),
      //     Dialog.OKAction()
      //   ],
      //   bsSize: 'small',
      //   onHide: (dialog) => {
      //     dialog.hide()
      //     console.log('closed by clicking background.')
      //   }
      // });

      // Dialog.OKAction(() => {
      //   console.log('OK was clicked!')
      // }); //https://www.npmjs.com/package/react-bootstrap-dialog

    let axiosConfig = {
      headers: {
        Accept: "application/json"
      }
    };
    let url =
      config.HOST_CONFIG.BACK_END_API_MAPPER_URL +
      config.BASE_PATH.QUESTION_SERVICE_BASE_PATH +
      "UpdateQuestionInActive/" +
      this.props.data.ID;
    this.setState({
      loadingPaper: true
    });
    axios
      .put(url, axiosConfig)
      .then(res => {
        // console.log("RESPONSE RECEIVED: ", res);
        if (res.status === 200) {
          
          this.setState({
            IsRemove: true
          });

          console.log("Question made inacive........ ");
        }
        if (res.status === 400) {
          this.setState({
            IsRemove: false
          });
        }
      })
      .catch(err => {
        this.setState({
          IsRemove: false
        });
      });
  };

  render() {
    var AnswerBlock = [];
    if (this.props.data.Answer !== undefined) {
      this.props.data.Answer.map((instance, index) =>
        AnswerBlock.push(
          <h5 key={index}>
            {" "}
            {instance.Position > 0 ? instance.Position : "*"}) &nbsp;{" "}
            {renderHTML(instance.Answer)}&nbsp;
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

  //   {this.state.IsRemove == true && (

  //     <Popover
  //         interactionKind={PopoverInteractionKind.CLICK}
  //         popoverClassName="bp3-popover-content-sizing"
  //         position={Position.LEFT}
  //     >
  //         <div>
  //       <div key="text" style={{ padding:'10px' }}>
  //             <h5>Deleted</h5>
  //             <p>Successfully Deleted</p>
  //             <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 15 }}>                  
  //                 <Button className={Classes.POPOVER_DISMISS}>
  //                     OK
  //                 </Button>
  //             </div>
  //         </div>
  //     </div>
  //     </Popover>
  //   )
  //   }
  // // {this.setState({
  // //   IsRemove: false
  // // });}

    return (
      
      <div>
        <MCQEditForm
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
                  <h3 style={{ padding: "  20px", color: "#474747" }}>
                    {("0" + parseInt(this.props.index + 1, 10)).slice(-2)}
                  </h3>
                </Col>

                <Col sm={12} md={11}>
                  <Row>
                    <Col sm={12}>
                      {/* Question ToolBar------------------- */}
                      <ButtonGroup minimal={true}>
                        <Button
                          icon="edit"
                          onClick={this.toggleMode}
                          disabled={this.props.data.QuestionState === "USED"}
                          title={
                            this.props.data.QuestionState === "USED"
                              ? "Question can't edit this question is used in paper snap."
                              : "Question edit view"
                          }
                        >
                          Edit
                        </Button>
                        <Button icon="flow-branch">Clone</Button>                        
                        {/* <Button icon="trash" onClick={this.removeButtonAction} intent="danger">
                          Remove
                        </Button> */}

                          <Popover
                              interactionKind={PopoverInteractionKind.CLICK}
                              popoverClassName="bp3-popover-content-sizing"
                              position={Position.LEFT}
                          >
                              <Button className={Classes.MINIMAL} icon="trash" text="Remove"/>
                              <div key="text" style={{ padding:'10px' }}>
                                  <h5>Confirm deletion</h5>
                                  <p>Are you sure you want to remove this?</p>
                                  <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 15 }}>
                                      <Button className={Classes.POPOVER_DISMISS} style={{ marginRight: 10 }}>
                                          Cancel
                                      </Button>
                                      <Button intent={Intent.DANGER} onClick={this.removeButtonAction} className={Classes.POPOVER_DISMISS}>
                                          Ok
                                      </Button>
                                  </div>
                              </div>
                          </Popover>
                      </ButtonGroup>
                      {/* End Question Tool Bar ------------------- */}
                    </Col>
                    <br />
                    <hr />
                    <Col sm={12}>{renderHTML(htmlContent)}</Col>
                  </Row>

                  {this.props.data.OtherContent !== null && (
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

                  <Row>
                    <hr />
                    <Col sm={6}>
                      <Row>
                        <Col sm={12}>
                          <b>Type</b> :
                          {this.props.data.IsMultipleSelection === 1 ? (
                            <Tag intent="danger" minimal={true}>
                              MULTIPLE SELECTION
                            </Tag>
                          ) : (
                            <Tag intent="danger" minimal={true}>
                              SINGLE SELECTION
                            </Tag>
                          )}
                        </Col>

                        <Col sm={12}>
                          <b>Display answer</b> :
                          {this.props.data.NumberOfAnswer}
                        </Col>
                        {this.props.data.VersionList && (
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
                        )}
                      </Row>

                      <Row>
                        <Col md={6} sm={12}>
                          <b>Created By</b> :{this.props.data.CreatedBy}
                        </Col>
                        <Col md={6} sm={12}>
                          <b>Created Date</b> :{this.props.data.CreatedDate}
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} sm={12}>
                          <b>Verified By</b> :{this.props.data.VerifiedBy}
                        </Col>
                        <Col md={6} sm={12}>
                          <b>Verified Date</b> :{this.props.data.VerifiedDate}
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6} sm={12}>
                          {this.props.data.IsSample === 1 && (
                            <Tag intent="success">Sample Question</Tag>
                          )}
                        </Col>
                      </Row>
                      <Row>
                        {this.props.data.QuestionState === "NOT_USED" && (
                          <Col md={6} sm={12}>
                            <Tag intent="success">NOT USED IN PAPER</Tag>
                          </Col>
                        )}
                        {this.props.data.QuestionState === "USED" && (
                          <Col md={6} sm={12}>
                            <Tag intent="danger">USED IN PAPER</Tag>
                          </Col>
                        )}
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
            <div className="footer" style={{ background: "#FFFBE1 " }}>
              <hr />
              <div className="stats" style={{ marginLeft: "40px" }}>
                {AnswerBlock}
              </div>
            </div>
          </div>
        </Col>
      </div>
    );
  }
}

export default QuestionCard;
