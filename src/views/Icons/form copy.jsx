import React, { Component } from "react";
import { FormGroup, TagInput, InputGroup, Button } from "@blueprintjs/core";

class App extends Component {
  state = {
    data: { ModuleName: "", Number: 0, Tags: [], DropBoxValue: "Name" },
    error: { ModuleName: true, Number: true, Tags: true },
    errorMessage: { ModuleName: "", Number: "", Tags: "" },
    form_validate: false
  };
  // reset Function
  reset = () => {
    this.setState({
      data: { ModuleName: "", Number: 0, Tags: [] },
      error: { ModuleName: false, Number: false, Tags: false },
      errorMessage: { ModuleName: "", Number: "", Tags: "" },
      form_validate: false
    });
  };

  // Chnage value
  ChangeValue = (event, key, type) => {
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

  submit = () => {
    var isValid = this.formValidator();
    if (isValid) {
      alert("OK");
    }
  };

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
        <FormGroup
          helperText={this.state.errorMessage.ModuleName}
          label="Label A"
          labelFor="text-input"
          labelInfo="(required)"
          intent="danger"
        >
          <InputGroup
            intent={this.state.error.ModuleName ? "danger" : "success"}
            placeholder="Placeholder text"
            type="text"
            value={this.state.data.ModuleName}
            onChange={event => {
              this.ChangeValue(event, "ModuleName", "text");
            }}
          />
        </FormGroup>
        <FormGroup
          helperText={this.state.errorMessage.Number}
          label="Label A"
          labelFor="text-input"
          labelInfo="(required)"
          intent="danger"
        >
          <InputGroup
            intent={this.state.error.Number ? "danger" : "success"}
            placeholder="Placeholder text"
            value={this.state.data.Number}
            onChange={event => {
              this.ChangeValue(event, "Number", "number");
            }}
          />
        </FormGroup>
        <FormGroup
          helperText={this.state.errorMessage.Tags}
          label="Label A"
          labelFor="text-input"
          labelInfo="(required)"
          intent="danger"
        >
          <TagInput
            onChange={values => this.tagInput(values, "Tags")}
            intent={this.state.error.Tags ? "danger" : "success"}
            placeholder="Question Versions"
            rightElement={clearButton}
            values={this.state.data.Tags}
            separator=","
          />
        </FormGroup>

        <FormGroup
          helperText={this.state.errorMessage.Tags}
          label="Label A"
          labelFor="text-input"
          labelInfo="(required)"
          intent="danger"
        >
          <div className="bp3-select bp3-fill">
            <select
              value={this.state.DropBoxValue}
              onChange={this.dropBoxValueChange}
            >
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="4">Four</option>
            </select>
          </div>
        </FormGroup>

        <Button
          icon="refresh"
          intent="danger"
          text="Reset"
          onClick={this.reset}
        />
        <Button
          rightIcon="save"
          intent="success"
          text="Save"
          onClick={this.submit}
        />
      </div>
    );
  }
}

export default App;
