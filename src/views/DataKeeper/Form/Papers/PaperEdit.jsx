import React, { Component } from "react";
import {
  Drawer,
  Classes,
  FormGroup,
  InputGroup,
  Button,
  Tooltip,
  Position,
  Spinner,
  Callout,
  Code
} from "@blueprintjs/core";
import axios from "axios";
import config from "../../../../variables/Constants";

class PaperEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Loading: false,
      Error: false,
      ErrorMessage: "",
      Uploading: false,
      ExamID: "",
      data: {
        ModuleID: this.props.ModuleID,
        NameOfPaper: "Sample Paper Name",
        NumberOfQuestions: 10,
        TimeForPaper: 10,
        VersionsData: [],
        VersionID: null,
        IsActive: true
      },
      error: {
        NameOfPaper: false,
        NumberOfQuestions: false,
        TimeForPaper: false,
        VersionID: false
      },
      errorMessage: {
        NameOfPaper: "",
        NumberOfQuestions: "",
        TimeForPaper: "",
        VersionID: ""
      }
    };
  }

  // reset Function
  reset = () => {
    this.setState(
      {
        Loading: false,
        Error: false,
        ErrorMessage: "",
        Uploading: false,
        ExamID: "",
        data: {
          ModuleID: this.props.ModuleID,
          NameOfPaper: this.props.SelectedPaperTypeData.NameOfPaper,
          NumberOfQuestions: this.props.SelectedPaperTypeData.NumberOfQuestions,
          TimeForPaper: this.props.SelectedPaperTypeData.TimeForPaper,
          VersionsData: [],
          VersionID: this.props.SelectedPaperTypeData.VersionID,
          IsActive: true
        },
        error: {
          NameOfPaper: false,
          NumberOfQuestions: false,
          TimeForPaper: false,
          VersionID: false
        },
        errorMessage: {
          NameOfPaper: "",
          NumberOfQuestions: "",
          TimeForPaper: "",
          VersionID: ""
        }
      },
      () => {
        this.fetchVersions();
      }
    );
  };

  // Chnage value
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
    let isDecimal = lastInputValue % 1 > 0;
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

  dropBoxValueChange = (e, key) => {
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
    var validation = {
      isEmailAddress: function(str) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return pattern.test(str); // returns a boolean
      },
      isNotEmpty: function(str) {
        var pattern = /\S+/;
        return pattern.test(str); // returns a boolean
      },
      isNumber: function(str) {
        var pattern = /^\d+$/;
        return pattern.test(str); // returns a boolean
      },
      isSame: function(str1, str2) {
        return str1 === str2;
      }
    };
    switch (type) {
      case "text":
        // Validate Module Name
        return {
          isValid: value.length === 0,
          Message: value.length === 0 ? "Paper Name connot be empty." : ""
        };
        break;
      case "number":
        // Validate Module Name
        return {
          isValid: !validation.isNumber(parseInt(value)),
          Message: !validation.isNumber(parseInt(value))
            ? "Please input a number"
            : ""
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

  submit = () => {
    var isValid = this.formValidator();
    if (isValid) {
      var postData = {
        ID: this.props.SelectedPaperTypeData.ID,
        ModuleID: this.props.ModuleID,
        VersionID: parseInt(this.state.data.VersionID, 10),
        NameOfPaper: String(this.state.data.NameOfPaper),
        NumberOfQuestions: parseInt(this.state.data.NumberOfQuestions, 10),
        TimeForPaper: parseInt(this.state.data.TimeForPaper, 10),
        ExamID: String(this.state.ExamID),
        IsActive: true
      };

      let axiosConfig = {
        headers: {
          Accept: "application/json"
        }
      };
      this.setState({ uploading: true });
      axios
        .put(
          config.HOST_CONFIG.BACK_END_API_MAPPER_URL +
            config.BASE_PATH.PAPER_TYPE_SERVICE_BASE_PATH,
          postData,
          axiosConfig
        )
        .then(res => {
          console.log("RESPONSE RECEIVED: ", res);
          if (res.status === 200) {
            this.props.handleHide();
            this.props.dataFetch();
            this.props.Notification(
              "tr",
              "success",
              "Data updated successfully",
              "pe-7s-speaker"
            );
            this.setState({ uploading: false });
          } else if (res.status === 400) {
            this.props.Notification(
              "tr",
              "error",
              "Inserted Data has been rejected by server Process ",
              "pe-7s-speaker"
            );
            this.setState({ Uploading: false });
          } else {
            this.setState({ Uploading: false });
          }
        })
        .catch(err => {
          this.props.dataFetch();
          this.props.Notification(
            "tr",
            "error",
            "Service have been gone offline. ",
            "pe-7s-speaker"
          );
          this.setState({ Uploading: false });
        });
    }
  };

  changeExamID = (event, key, type) => {
    // console.log("event " + event);
    // console.log("key " + key);
    // console.log("type " + type);
    let value = event.target.value;
    // let range = {};
    // set range
    // let max = parseInt(event.target.max);
    // let min = parseInt(event.target.min);
    
    if (value !== undefined && type !== undefined) {
      // let retValidator = this.validator(type, value, range);
      this.setState({ ExamID: value });
    } else {
      console.error("value and type should be set in target object.");
    }
  };

  fetchVersions = () => {
    let axiosConfig = {
      headers: {
        Accept: "application/json"
      }
    };
    this.setState({
      loading: true
    });

    axios
      .get(
        config.HOST_CONFIG.BACK_END_API_MAPPER_URL +
          config.BASE_PATH.PRODUCT_SERVICE_BASE_PATH +
          "Versions/" +
          this.props.ProductID,
        axiosConfig
      )
      .then(res => {
        if (res.status === 200) {
          if (res.data.length > 0) {
            this.setState(prevState => ({
              data: {
                ...prevState.data, // keep all other key-value pairs
                VersionsData: res.data
              },
              Loading: false
            }));
          } else {
            this.setState({
              Error: true,
              ErrorMessage: "No Verstion Found.",
              Loading: false
            });
          }
        } else {
          this.setState({
            Error: true,
            Loading: false
          });
        }
      })
      .catch(err => {
        this.setState({
          Error: true,
          Loading: false
        });
      });
  };

  componentWillReceiveProps() {
    if (this.props.SelectedPaperTypeData != null) {
      this.reset();
    }
  }

  render() {
    console.log();
    return (
      <div>
        {this.props.SelectedPaperTypeData && (
          <Drawer
            isOpen={this.props.show}
            onClose={this.props.handleHide}
            icon="info-sign"
            size="450px"
            title="Edit Paper"
          >
            {this.state.Error ? (
              <ErrorMessage ErrorMessage={this.state.ErrorMessage} />
            ) : this.state.Loading ? (
              <LoadingMessage />
            ) : (
              <div>
                <div className={Classes.DRAWER_BODY}>
                  <div className={Classes.DIALOG_BODY}>
                    <Callout
                      intent="success"
                      icon="info-sign"
                      title={"Interface for Quesitons Pool"}
                    >
                      This is the Description of this Form
                    </Callout>
                    <br />
                    <FormGroup
                      helperText={this.state.errorMessage.NameOfPaper}
                      label="Paper Name"
                      labelFor="text-input"
                      intent="danger"
                    >
                      <InputGroup
                        intent={
                          this.state.error.NameOfPaper ? "danger" : "success"
                        }
                        placeholder="ex : Paper Name"
                        type="text"
                        value={this.state.data.NameOfPaper}
                        onChange={event => {
                          this.changeValue(event, "NameOfPaper", "text");
                        }}
                      />
                    </FormGroup>
                    {/* // disable this part when paper type is used in paper snap */}
                    {this.props.SelectedPaperTypeData.PaperTypeState ===
                    "NOT_USED" ? (
                      <div>
                        <FormGroup
                          label="Number of Question"
                          labelFor="input"
                          helperText={this.state.errorMessage.NumberOfQuestions}
                          intent="danger"
                        >
                          <InputGroup
                            intent={
                              this.state.error.NumberOfQuestions
                                ? "danger"
                                : "success"
                            }
                            placeholder="ex : Paper Name"
                            type="number"
                            value={this.state.data.NumberOfQuestions}
                            onChange={event => {
                              this.changeValue(
                                event,
                                "NumberOfQuestions",
                                "number"
                              );
                            }}
                          />
                        </FormGroup>
                        <FormGroup
                          label="Time for Paper (minutes)"
                          labelFor="input"
                          helperText={this.state.errorMessage.TimeForPaper}
                          intent="danger"
                        >
                          <InputGroup
                            intent={
                              this.state.error.TimeForPaper
                                ? "danger"
                                : "success"
                            }
                            placeholder="ex : Paper Name"
                            type="number"
                            value={this.state.data.TimeForPaper}
                            onChange={event => {
                              this.changeValue(event, "TimeForPaper", "number");
                            }}
                          />
                        </FormGroup>
                        <FormGroup
                          helperText={this.state.errorMessage.Tags}
                          label="Product Version"
                          labelFor="text-input"
                          intent="danger"
                        >
                          <div className="bp3-select bp3-fill">
                            <select
                              value={this.state.data.VersionID}
                              onChange={event => {
                                this.dropBoxValueChange(event, "VersionID");
                              }}
                            >
                              {this.state.data.VersionsData.map(
                                (Instance, index) => {
                                  return (
                                    <option
                                      key={index}
                                      value={Instance.VersionID}
                                      onClick={event => {
                                        console.log(event);
                                      }}
                                    >
                                      {Instance.Version}
                                    </option>
                                  );
                                }
                              )}
                            </select>
                          </div>
                        </FormGroup>
                        <FormGroup
                          label="Exam ID"
                          labelFor="text-input"
                        >
                          <InputGroup                            
                            placeholder="ex : Exam Id in the SalesForce"
                            type="text"
                            value={this.state.ExamID}
                            onChange={event => {
                              this.changeExamID(
                                event,
                                "ExamID",
                                "text"
                              );
                            }}
                          />
                        </FormGroup>
                      </div>
                    ) : (
                      <Callout
                        intent="danger"
                        icon="info-sign"
                        title={"Restrict Editing"}
                      >
                        You can change paper type name only because of paper
                        type used in paper snap.
                      </Callout>
                    )}
                  </div>
                </div>
                <div
                  className={Classes.DRAWER_FOOTER}
                  style={{ position: "absolute", bottom: "0px", width: "100%" }}
                >
                  <Tooltip content="Save" position={Position.RIGHT}>
                    <Button
                      icon="saved"
                      type="submit"
                      text="save"
                      intent="primary"
                      onClick={this.submit}
                    />
                  </Tooltip>
                </div>
              </div>
            )}
          </Drawer>
        )}
      </div>
    );
  }
}

export default PaperEdit;

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

function ErrorMessage(props) {
  return (
    <center>
      <h4>
        <i className="fa fa-exclamation-triangle" />
        <p className="category">{props.ErrorMessage}</p>
      </h4>
    </center>
  );
}
