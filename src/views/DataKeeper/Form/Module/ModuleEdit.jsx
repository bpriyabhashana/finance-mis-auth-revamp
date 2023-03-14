import React, { Component } from "react";
import {
  Drawer,
  Classes,
  FormGroup,
  InputGroup,
  Button,
  Tooltip,
  Position,
  Spinner
} from "@blueprintjs/core";

import App from "./form";
import axios from "axios";
import config from "./../../../../variables/Constants";
class ModuleEdit extends Component {
  constructor(prevProps, props) {
    super(prevProps, props);
    this.state = {
      // use for content handele  loading
      loading: false,
      Error: false,
      ErrorMessage: "",
      ProductData: [],
      uploading: false,
      ExamID: "",

      data: {
        ModuleName: this.props.ModuleName,
        ProductName: this.props.ProductName,
        QuestionType: this.props.QuestionType,
        ProductID: this.props.ProductID
      },
      error: { ModuleName: !this.props.ModuleName.length > 0 },
      errorMessage: { ModuleName: "" }
    };
  }
  reset = () => {
    this.setState({
      // use for content handele  loading
      loading: false,
      Error: false,
      ErrorMessage: "",
      ProductData: [],
      uploading: false,
      ExamID: this.state.data.ExamID,

      data: {
        ModuleName: this.props.ModuleName,
        ProductName: this.props.ProductName,
        QuestionType: this.props.QuestionType,
        ProductID: this.props.ProductID
      },
      error: { ModuleName: !this.props.ModuleName.length > 0 },
      errorMessage: { ModuleName: "" }
    });
  };

  changeValue = (event, key, type) => {
    let value = event.target.value;
    let range = {};
    // set range
    let max = parseInt(event.target.max);
    let min = parseInt(event.target.min);

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

  changeExamID = (event, key, type) => {

    let value = event.target.value;
    let range = {};
    if (value !== undefined && type !== undefined) {
      let retValidator = this.validator(type, value, range);
      this.setState({ ExamID: value });
    } else {
      console.error("value and type should be set in target object.");
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
    switch (type) {
      case "text":
        // Validate Module Name
        return {
          isValid: value.length === 0,
          Message: value.length === 0 ? "Module Name connot be empty." : ""
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

  // axios operation
  fetchProducts = () => {
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
          config.BASE_PATH.PRODUCT_SERVICE_BASE_PATH,
        axiosConfig
      )
      .then(res => {
        if (res.status === 200) {
          if (res.data.length > 0) {
            this.setState(prevState => ({
              ProductData: res.data,
              loading: false,
              data: {
                ...prevState.data, // keep all other key-value pairs
                ProductID: this.props.ProductID // update the value of specific key
              }
            }));
          } else {
            this.setState({
              Error: true,
              ErrorMessage: "No Product Data Found ",
              loading: false
            });
          }
        } else {
          this.setState({
            loading: false
          });
        }
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  };

  submit = () => {
    var isValid = this.formValidator();
    if (isValid) {
      this.setState({
        uploading: true
      });

      var postData = {
        ModuleID: this.props.ModuleID,
        ProductID: parseInt(this.state.data.ProductID, 10),
        ModuleName: String(this.state.data.ModuleName),
        QuestionType: String(this.state.data.QuestionType),
        ExamID: String(this.state.ExamID),
        IsActive: false
      };

      let axiosConfig = {
        headers: {
          Accept: "application/json"
        }
      };

      axios
        .put(
          config.HOST_CONFIG.BACK_END_API_MAPPER_URL +
            config.BASE_PATH.MODULE_SERVICE_BASE_PATH,
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
              "Module Data have been updated successfully [Please Change Module Name in Google Sheet]",
              "pe-7s-speaker"
            );
          }
          if (res.status === 400) {
            this.props.handleHide();
            this.props.dataFetch();
            this.props.Notification(
              "tr",
              "error",
              "Inserted Data has been rejected by server Process ",
              "pe-7s-speaker"
            );
          }
        })
        .catch(err => {
          console.log("AXIOS ERROR: ", err);
          this.props.handleHide();
          this.props.dataFetch();
          this.props.Notification(
            "tr",
            "error",
            "Service have been gone offline. ",
            "pe-7s-speaker"
          );
        })
        .finally(() => {
          this.setState({
            uploading: true
          });
        });
    }
  };

  componentWillReceiveProps(prevProps, props) {
    if (prevProps.show !== true) {
      this.reset();

      this.fetchProducts();
    }
  }

  render() {
    return (
      <div>
        <Drawer
          isOpen={this.props.show}
          onClose={this.props.handleHide}
          icon="info-sign"
          size="450px"
          title="Add new module"
        >
          {this.state.Error ? (
            <ErrorMessage ErrorMessage={this.state.ErrorMessage} />
          ) : this.state.loading ? (
            <LoadingMessage />
          ) : (
            <div>
              <div className={Classes.DRAWER_BODY}>
                <div className={Classes.DIALOG_BODY}>
                  <FormGroup
                    helperText={this.state.errorMessage.ModuleName}
                    label="Module Name"
                    labelFor="text-input"
                    intent="danger"
                  >
                    <InputGroup
                      intent={
                        this.state.error.ModuleName ? "danger" : "success"
                      }
                      placeholder="ex : API Manager Level 01"
                      type="text"
                      value={this.state.data.ModuleName}
                      onChange={event => {
                        this.changeValue(event, "ModuleName", "text");
                      }}
                    />
                  </FormGroup>
                  
                  {/* // display only it is Empty */}
                  {this.props.IsEmpty ? (
                    <div>
                      <FormGroup
                        helperText={this.state.errorMessage.Tags}
                        label="Product Name"
                        labelFor="text-input"
                        intent="danger"
                      >
                        <div className="bp3-select bp3-fill">
                          <select
                            value={this.state.data.ProductID}
                            onChange={event => {
                              this.dropBoxValueChange(event, "ProductID");
                            }}
                          >
                            {this.state.ProductData.map((Instance, index) => {
                              return (
                                <option
                                  key={index}
                                  value={Instance.ProductID}
                                  onClick={event => {
                                    console.log(event);
                                  }}
                                >
                                  {Instance.ProductName}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </FormGroup>

                      <FormGroup
                        helperText={this.state.errorMessage.Tags}
                        label="Question Type"
                        labelFor="text-input"
                        intent="danger"
                      >
                        <div className="bp3-select bp3-fill">
                          <select
                            value={this.state.QuestionType}
                            onChange={event => {
                              this.dropBoxValueChange(event, "QuestionType");
                            }}
                          >
                            <option value="MCQ">MCQ Questoins</option>
                            <option value="PRACTICAL">
                              Practical Questions
                            </option>
                            <option value="SCENARIO_BASE">
                              Scenario Base Questions
                            </option>
                          </select>
                        </div>
                      </FormGroup>
                    </div>
                  ) : (
                    <div className="bp3-callout .modifier">
                      <h4 className="bp3-heading">
                        You can modify Module Name only
                      </h4>
                      <b>Reason : </b>This is not a Empty Module.
                    </div>
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
                    text="Save changes"
                    intent="primary"
                    onClick={this.submit}
                  />
                </Tooltip>
              </div>
            </div>
          )}
        </Drawer>
      </div>
    );
  }
}

export default ModuleEdit;

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
