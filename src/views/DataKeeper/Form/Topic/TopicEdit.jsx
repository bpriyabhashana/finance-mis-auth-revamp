import React, { Component } from "react";
import {
  Drawer,
  Classes,
  FormGroup,
  InputGroup,
  Callout,
  Tooltip,
  Position,
  Button
} from "@blueprintjs/core";
import axios from "axios";
import config from "../../../../variables/Constants";

class TopicEdit extends Component {
  state = {
    updating: false,
    data: { TopicName: "Sample Name" },
    error: { TopicName: false },
    errorMessage: { TopicName: "" }
  };
  // reset Function
  reset = () => {
    this.setState({
      updating: false,
      data: { TopicName: this.props.TopicData.TopicName },
      error: { TopicName: false },
      errorMessage: { TopicName: "" }
    });
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

  // Validator
  validator = (type, value, range) => {
    switch (type) {
      case "text":
        // Validate Module Name
        return {
          isValid: value.length === 0,
          Message: value.length === 0 ? "Topic Name connot be empty." : ""
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
    return !(found.length > 0);
  };

  submit = () => {
    var isValid = this.formValidator();
    if (isValid) {
      var postData = {
        TopicId: this.props.TopicData.TopicID,
        ModuleID: this.props.ModuleID,
        CategoryID: this.props.CategoryID,
        TopicName: String(this.state.data.TopicName),
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
            config.BASE_PATH.TOPIC_SERVICE_BASE_PATH,
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
              "Data inserted successfully",
              "pe-7s-speaker"
            );
            this.setState({ uploading: false });
          } else if (res.status === 400) {
            this.props.dataFetch();
            this.props.Notification(
              "tr",
              "error",
              "Inserted Data has been rejected by server Process ",
              "pe-7s-speaker"
            );
            this.setState({ uploading: false });
          } else {
            this.setState({ uploading: false });
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
          this.setState({ uploading: false });
        });
    }
  };
  componentWillReceiveProps() {
    if (this.props.TopicData != null) {
      this.reset();
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
          title="Edit Topic"
        >
          <div className={Classes.DRAWER_BODY}>
            <div className={Classes.DIALOG_BODY}>
              <Callout intent="success" icon="info-sign" title={"Topics"}>
                <small>Description</small>
              </Callout>
              <br />
              <FormGroup
                helperText={this.state.errorMessage.TopicName}
                label="Topic Name"
                labelFor="text-input"
                intent="danger"
              >
                <InputGroup
                  intent={this.state.error.TopicName ? "danger" : "success"}
                  placeholder="Placeholder text"
                  type="text"
                  value={this.state.data.TopicName}
                  onChange={event => {
                    this.changeValue(event, "TopicName", "text");
                  }}
                />
              </FormGroup>
            </div>
          </div>
          <div
            className={Classes.DRAWER_FOOTER}
            style={{ position: "absolute", bottom: "0px", width: "100%" }}
          >
            <Tooltip content="Save Chnages Topic" position={Position.RIGHT}>
              <Button
                icon="saved"
                intent="primary"
                text="Save"
                onClick={this.submit}
              />
            </Tooltip>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default TopicEdit;
