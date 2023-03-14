import React, { Component } from "react";
import { Breadcrumb, BreadcrumbItem, Row, Col } from "reactstrap";

import {
  Drawer,
  Classes,
  FormGroup,
  InputGroup,
  Button,
  Tooltip,
  Position,
  Switch,
  FileInput,
  TagInput,
  Alert
} from "@blueprintjs/core";

import "./css/zoom.css";

import SortableComponent from "./SortableAnswerList";
import QuestionEditor from "./QuestionEditor";
import { DateInput } from "@blueprintjs/datetime";

import axios from "axios";
import config from "../../../../../variables/Constants";

class MCQAddForm extends Component {
  state = {
    EditMode: false,
    ShowSubmitError: false,
    SubmitModeError: "",
    // keep Answer List for Answer Edit Mode
    EditModeAnswer: [],
    // keep Remove Answer List
    RemoveList: [],
    data: {
      imageData: null,
      Content: "Sample Content",
      OtherContent: null,
      CreatedBy: "Sample Name",
      CreatedDate: "2019-9-9",
      VerifiedBy: "Name/ Name",
      VerifiedDate: "2019-9-10",
      IsActive: true,
      IsMultipleSelection: false,
      IsSample: false,
      DisplayAnswerLength: 4,
      Versions: ["2.6", "2.7"]
    },
    error: {
      Content: false,
      OtherContent: false,
      CreatedBy: false,
      CreatedDate: false,
      VerifiedBy: false,
      VerifiedDate: false,
      IsActive: false,
      IsMultipleSelection: false,
      IsSample: false,
      DisplayAnswerLength: false,
      Versions: false
    },
    errorMessage: {
      Content: "",
      OtherContent: "",
      CreatedBy: "",
      CreatedDate: "",
      VerifiedBy: "",
      VerifiedDate: "",
      IsActive: "",
      IsMultipleSelection: "",
      IsSample: "",
      DisplayAnswerLength: "",
      Versions: ""
    }
  };
  reset = () => {
    this.setState({
      EditMode: false,
      ShowSubmitError: false,
      SubmitModeError: "",
      // keep Answer List for Answer Edit Mode
      EditModeAnswer: [],
      // keep Remove Answer List
      RemoveList: [],
      data: {
        imageData: null,
        Content: "Sample Content",
        OtherContent: null,
        CreatedBy: "Sample Name",
        CreatedDate: "2019-9-9",
        VerifiedBy: "Name/ Name",
        VerifiedDate: "2019-9-10",
        IsActive: true,
        IsMultipleSelection: false,
        IsSample: false,
        DisplayAnswerLength: 4,
        Versions: ["2.6", "2.7"]
      },
      error: {
        Content: false,
        OtherContent: false,
        CreatedBy: false,
        CreatedDate: false,
        VerifiedBy: false,
        VerifiedDate: false,
        IsActive: false,
        IsMultipleSelection: false,
        IsSample: false,
        DisplayAnswerLength: false,
        Versions: false
      },
      errorMessage: {
        Content: false,
        OtherContent: false,
        CreatedBy: false,
        CreatedDate: false,
        VerifiedBy: false,
        VerifiedDate: false,
        IsActive: false,
        IsMultipleSelection: false,
        IsSample: false,
        NumberOfAnswer: false,
        AnswerListLength: false,
        DisplayAnswerLength: false,
        Versions: ""
      }
    });
  };

  // Chnage value
  changeContentandDate = (value, key, type) => {
    let retValidator = this.validator(type, value);
    this.setState(prevState => ({
      data: {
        ...prevState.data, // keep all other key-value pairs
        [key]: value // update the value of specific key
      },
      error: {
        ...prevState.error, // keep all other key-value pairs
        [key]: retValidator.isValid // update the value of specific key
      },
      errorMessage: {
        ...prevState.errorMessage, // keep all other key-value pairs
        [key]: retValidator.Message // update the value of specific key
      }
    }));
  };
  changeSwitch = key => {
    this.setState(prevState => ({
      data: {
        ...prevState.data, // keep all other key-value pairs
        [key]: !this.state.data[key] // update the value of specific key
      }
    }));
  };
  changeValue = (event, key, type) => {
    let value = event.target.value;
    let range = {};
    // set range
    let max = parseInt(event.target.max);
    let min = parseInt(event.target.min);
    console.log(min, max);
    if (type === "number_range") {
      if (!isNaN(max) && !isNaN(min)) {
        range["max"] = max;
        range["min"] = min;
      } else {
        console.error("min and max should be set in target object.");
        return;
      }
    }

    if (value !== undefined && type !== undefined) {
      let retValidator = this.validator(type, value, range);
      this.setState(prevState => ({
        data: {
          ...prevState.data, // keep all other key-value pairs
          [key]: value // update the value of specific key
        },
        error: {
          ...prevState.error, // keep all other key-value pairs
          [key]: retValidator.isValid // update the value of specific key
        },
        errorMessage: {
          ...prevState.error, // keep all other key-value pairs
          [key]: retValidator.Message // update the value of specific key
        }
      }));
    } else {
      console.error("value and type should be set in target object.");
    }
  };
  tagInput = (values, key) => {
    let lastInputValue = values[values.length - 1];
    let lastInputVersion = parseFloat(lastInputValue); // should be 2.6
    let isDecimal = lastInputValue % 1 >= 0;
    let remain = lastInputVersion * 10 - parseInt(lastInputVersion * 10); // use this invalidate 2.31 only one decimal point

    if (!isNaN(lastInputVersion) && remain == 0 && isDecimal) {
      this.setState(prevState => ({
        data: {
          ...prevState.data, // keep all other key-value pairs
          [key]: values // update the value of specific key
        },
        error: {
          ...prevState.error, // keep all other key-value pairs
          [key]: false // update the value of specific key
        },
        errorMessage: {
          ...prevState.error, // keep all other key-value pairs
          [key]: "" // update the value of specific key
        }
      }));
    } else {
      this.setState(prevState => ({
        data: {
          ...prevState.data, // keep all other key-value pairs
          [key]: values // update the value of specific key
        },
        error: {
          ...prevState.error, // keep all other key-value pairs
          [key]: true // update the value of specific key
        },
        errorMessage: {
          ...prevState.error, // keep all other key-value pairs
          [key]:
            values.length > 0
              ? "Invalid version, try again "
              : "Invalid Version try again / Version list cannot be empty" // update the value of specific key
        }
      }));
    }
  };
  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState(prevState => ({
        data: {
          ...prevState.data, // keep all other key-value pairs
          imageData: "data:image/jpeg;base64," + getBase64(reader.result)
        }
      }));
    };

    reader.readAsDataURL(file);
  }
  // toggle View
  toggleShowSubmitError = () => {
    this.setState({ ShowSubmitError: !this.state.ShowSubmitError });
  };

  dropBoxValueChange = (e, key = "DropBoxValue") => {
    let value = e.target.value;
    this.setState(prevState => ({
      data: {
        ...prevState.data, // keep all other key-value pairs
        [key]: value // update the value of specific key
      }
    }));
  };

  // Validator
  validator = (type, value, range) => {
    switch (type) {
      case "text":
        // Validate Module Name
        return {
          isValid: value.length === 0,
          Message: value.length === 0 ? "Connot be empty." : ""
        };
        break;
      case "Content":
        // Validate Module Name
        return {
          isValid: value === "<p><br></p>",
          Message: value === "<p><br></p>" ? "Connot be empty." : ""
        };
        break;
      case "date":
        // Validate Module Name
        return {
          isValid: value === null,
          Message: value === null ? "Connot be empty." : ""
        };
        break;
      case "number":
        // Validate Module Name
        return {
          isValid: isNaN(parseInt(value)),
          Message: isNaN(parseInt(value)) ? "Please input a number" : ""
        };
        break;
      case "number_range":
        // Validate Module Name
        if (isNaN(parseInt(value))) {
          return {
            isValid: isNaN(parseInt(value)),
            Message: isNaN(parseInt(value)) ? "Please input a number" : ""
          };
        } else {
          return {
            isValid: parseInt(value) > range.max || parseInt(value) < range.min,
            Message:
              parseInt(value) > range.max || parseInt(value) < range.min
                ? "Number should be in between [ " +
                  range.min +
                  " ," +
                  range.max +
                  "]"
                : ""
          };
        }

        break;

      default:
        break;
    }
  };

  // form Validator
  formValidator = () => {
    var obj = this.state.error;
    var found = Object.keys(obj).filter(function(key) {
      return obj[key] === true;
    });
    console.log(found);
    return !(found.length > 0);
  };
  DataSetValidator = () => {
    let AnswerCount = 0;
    this.state.EditModeAnswer.forEach(CurrentAnswer => {
      if (CurrentAnswer.IsCorrect) {
        AnswerCount += 1;
      }
    });

    if (AnswerCount === 0) {
      return { valid: false, ErrorMessage: "No Answer Found" };
    } else if (AnswerCount < 2 && this.state.data.IsMultipleSelection) {
      return {
        valid: false,
        ErrorMessage:
          "Add More Correct Answer, Hint: This Question is Multiple selection MCQ"
      };
    } else if (
      this.state.EditModeAnswer.length < this.state.data.DisplayAnswerLength
    ) {
      return { valid: false, ErrorMessage: "Number of Display answer error!" };
    } else {
      return { valid: true, ErrorMessage: "" };
    }
  };

  submit = () => {
    var isValid = this.formValidator();
    var isValidData = this.DataSetValidator();
    if (isValid && isValidData.valid) {
      var InsertData = {
        QuestionData: {
          ProductID: this.props.ProductID,
          ModuleID: this.props.ModuleID,
          TopicID: this.props.TopicID,
          Content: this.state.data.Content,
          OtherContent: this.state.data.imageData,
          CreatedBy: this.state.data.CreatedBy,
          CreatedDate: this.state.data.CreatedDate,
          VerifiedBy: this.state.data.VerifiedBy,
          VerifiedDate: this.state.data.VerifiedDate,
          IsActive: this.state.data.IsActive === 1,
          IsMultipleSelection: this.state.data.IsMultipleSelection === 1,
          IsSample: this.state.data.IsSample === 1,
          NumberOfAnswer: parseInt(this.state.data.DisplayAnswerLength,10),
          Versions: this.state.data.Versions
        },
        AnswerList: this.state.EditModeAnswer
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
            "WholeMCQQuestionInsert",
          InsertData,
          axiosConfig
        )
        .then(res => {
          //console.log("RESPONSE RECEIVED: ", res);
          if (res.status === 201) {
            console.log("OK", res);
            //this.toggleMode();
            this.props.FetchQuestionData(0);
            this.props.onClose();
            this.props.Notification(
              "tr",
              "success",
              "Question Data Updated successfully",
              "pe-7s-speaker"
            );
          } else {
            this.props.Notification(
              "tr",
              "error",
              "Error Occured",
              "pe-7s-speaker"
            );
          }
        })
        .catch(err => {
          console.log("Error", err);
        });
    } else {
      this.setState({ SubmitModeError: isValidData.ErrorMessage }, () => {
        this.toggleShowSubmitError();
      });
    }
  };
  componentWillReceiveProps() {
    if (this.props.isOpen === true) {
      this.reset();
    }
  }

  handleClear = () => this.tagInput(this.state.data.Tags.length > 0 ? [] : []);
  render() {
    const clearButton = (
      <Button
        disabled={false}
        icon={"cross"}
        minimal={true}
        onClick={this.handleClear}
      />
    );
    return (
      <div>
        <Alert
          confirmButtonText="Okay"
          isOpen={this.state.ShowSubmitError}
          onClose={this.toggleShowSubmitError}
        >
          <p>{this.state.SubmitModeError}</p>
        </Alert>
        <Drawer
          isOpen={this.props.isOpen}
          onClose={() => {
            this.props.onClose();
            this.reset();
          }}
          icon="info-sign"
          size="60%"
          title="Add New MCQ"
        >
          <div className={Classes.DRAWER_BODY} style={{ overflowY: "scroll" }}>
            <div className={Classes.DIALOG_BODY}>
              <div>
                <Breadcrumb>
                  <BreadcrumbItem>Module</BreadcrumbItem>
                  {this.props.selectedData[0] !== null && (
                    <BreadcrumbItem>
                      <a>{this.props.selectedData[0].NameOfPaper}</a>
                    </BreadcrumbItem>
                  )}
                  {this.props.selectedData[1] !== null && (
                    <BreadcrumbItem>
                      <a> {this.props.selectedData[1].Name}</a>
                    </BreadcrumbItem>
                  )}
                  {this.props.selectedData[2] !== null && (
                    <BreadcrumbItem active>
                      <a>{this.props.selectedData[2].TopicName}</a>
                    </BreadcrumbItem>
                  )}
                </Breadcrumb>
              </div>
              <FormGroup
                helperText={this.state.errorMessage.Content}
                label="Question"
                labelFor="text-input"
                intent="danger"
              >
                <QuestionEditor
                  setEditValue={this.changeContentandDate}
                  content={this.state.data.Content}
                />
              </FormGroup>
              <FormGroup
                helperText={this.state.errorMessage.Versions}
                label="Question Versions"
                labelFor="text-input"
                intent="danger"
              >
                <TagInput
                  onChange={values => this.tagInput(values, "Versions")}
                  intent={this.state.error.Versions ? "danger" : "success"}
                  placeholder="Question Versions"
                  rightElement={clearButton}
                  values={this.state.data.Versions}
                  separator=","
                  tagProps={{ intent: "success" }}
                />
              </FormGroup>
              <FormGroup label="Question Image" labelFor="text-input">
                <Row>
                  <Col sm={6}>
                    <FileInput
                      text="Choose file..."
                      onInputChange={e => this.handleImageChange(e)}
                    />
                    <br />
                    {this.state.data.imageData !== null && (
                      <img
                        // className="zoom"
                        style={{
                          border: "1px solid #ddd",
                          border_radius: "4px",
                          width: "100px"
                        }}
                        alt="Question Other Content"
                        src={this.state.data.imageData}
                      />
                    )}
                  </Col>
                </Row>
              </FormGroup>

              <Row>
                <Col sm={12} md={3}>
                  <FormGroup
                    helperText={this.state.errorMessage.CreatedBy}
                    label="Created By"
                    labelFor="text-input"
                    intent="danger"
                  >
                    <InputGroup
                      required={true}
                      placeholder="CreatedBy"
                      value={this.state.data.CreatedBy}
                      intent={this.state.error.CreatedBy ? "danger" : "success"}
                      onChange={event =>
                        this.changeValue(event, "CreatedBy", "text")
                      }
                    />
                  </FormGroup>
                </Col>

                <Col sm={12} md={3}>
                  <FormGroup
                    helperText="Created Date , ex : 2019-05-12"
                    label="Created Date"
                    labelFor="text-input"
                  >
                    <DateInput
                      formatDate={date => formatDate(date)}
                      onChange={date =>
                        this.changeContentandDate(
                          formatDate(date),
                          "CreatedDate",
                          "date"
                        )
                      }
                      parseDate={str => new Date(str)}
                      intent={
                        this.state.error.CreatedDate ? "danger" : "success"
                      }
                      placeholder={"YYYY-MM-DD"}
                      value={new Date(this.state.data.CreatedDate)}
                      timePrecision={"none"}
                    />
                  </FormGroup>
                </Col>

                <Col sm={12} md={3}>
                  <FormGroup
                    helperText={this.state.errorMessage.VerifiedBy}
                    label="Verified By"
                    labelFor="text-input"
                    intent="danger"
                  >
                    <InputGroup
                      required={true}
                      placeholder="Verified By"
                      value={this.state.data.VerifiedBy}
                      intent={
                        this.state.error.VerifiedBy ? "danger" : "success"
                      }
                      onChange={event =>
                        this.changeValue(event, "VerifiedBy", "text")
                      }
                    />
                  </FormGroup>
                </Col>
                <Col sm={12} md={3}>
                  <FormGroup
                    helperText="Verified Date , ex : 2019-12-13"
                    label="Verified Date"
                    labelFor="text-input"
                  >
                    <DateInput
                      formatDate={date => formatDate(date)}
                      onChange={date =>
                        this.changeContentandDate(
                          formatDate(date),
                          "VerifiedDate",
                          "date"
                        )
                      }
                      intent={
                        this.state.error.VerifiedDate ? "danger" : "success"
                      }
                      parseDate={str => new Date(str)}
                      placeholder={"YYYY-MM-DD"}
                      defaultValue={new Date(this.state.data.VerifiedDate)}
                      timePrecision={"none"}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={3}>
                  <FormGroup
                    label="Answer Display"
                    helperText={this.state.errorMessage.DisplayAnswerLength}
                    labelFor="input"
                  >
                    <InputGroup
                      intent={
                        this.state.error.DisplayAnswerLength
                          ? "danger"
                          : "success"
                      }
                      placeholder="Placeholder text"
                      type="number"
                      min={2}
                      max={10}
                      value={this.state.data.DisplayAnswerLength}
                      onChange={event => {
                        this.changeValue(
                          event,
                          "DisplayAnswerLength",
                          "number_range"
                        );
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={12}>
                  <hr />
                  <div className="footer" style={{ marginLeft: "40px" }}>
                    <div className="stats">
                      <SortableComponent
                        AnswerList={this.state.EditModeAnswer}
                        RemoveList={this.state.RemoveList}
                        answerLength={this.state.data.DisplayAnswerLength}
                        SetAnswerLength={this.ChangeAnswerLength}
                      />
                    </div>
                  </div>
                  <hr />
                  <Row>
                    <Col sm={12}>
                      <Row>
                        <Col sm={3}>
                          <Switch
                            defaultChecked={this.state.data.IsMultipleSelection}
                            label="Multiple Selection "
                            onChange={() =>
                              this.changeSwitch("IsMultipleSelection")
                            }
                          />
                        </Col>
                        <Col sm={3}>
                          <Tooltip
                            content="If Enable this ,Question will save as sample question , Then this question is never included in any genarated papers"
                            position={Position.TOP}
                          >
                            <Switch
                              defaultChecked={this.state.data.IsSample}
                              label="Sample Question"
                              onChange={() => this.changeSwitch("IsSample")}
                            />
                          </Tooltip>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <hr />
                </Col>
              </Row>
            </div>
          </div>
          <div className={Classes.DRAWER_FOOTER}>
            <Tooltip content="Save Chnages" position={Position.RIGHT}>
              <Button
                onClick={this.submit}
                type="submit"
                text="save"
                icon="saved"
                intent="primary"
              />
            </Tooltip>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default MCQAddForm;

function getBase64(fileResult) {
  let encoded = "Not Specified";
  if (fileResult) {
    encoded = fileResult.substr(fileResult.indexOf(",") + 1);
  }
  return encoded;
}

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
