import React, { Component } from "react";
import { FormGroup, TagInput, InputGroup, Button } from "@blueprintjs/core";

class App extends Component {
  state = {
    data: {
      ModuleName: "",
      Number: 0,
      Tags: [],
      QuestionType: "MCQ",
      ProductID: 0
    },
    error: { ModuleName: true },
    errorMessage: { ModuleName: "" }
  };
  // reset Function
  reset = () => {
    this.setState({
      data: { ModuleName: "", QuestionType: "MCQ" },
      error: { ModuleName: true },
      errorMessage: { ModuleName: "" }
    });
  };

  // Chnage value
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

  render() {
    return (
      <div>
        <FormGroup
          helperText={this.state.errorMessage.ModuleName}
          label="Module Name"
          labelFor="text-input"
          intent="danger"
        >
          <InputGroup
            intent={this.state.error.ModuleName ? "danger" : "success"}
            placeholder="ex : API Manager Level 01"
            type="text"
            value={this.state.data.ModuleName}
            onChange={event => {
              this.changeValue(event, "ModuleName", "text");
            }}
          />
        </FormGroup>

        <FormGroup
          helperText={this.state.errorMessage.Tags}
          label="Product"
          labelFor="text-input"
          intent="danger"
        >
          <div className="bp3-select bp3-fill">
            <select
              value={this.state.ProductID}
              onChange={event => {
                this.dropBoxValueChange(event, "ProductID");
              }}
            >
              <option value="2">Two</option>
              <option value="3">Three</option>
              <option value="4">Four</option>
            </select>
          </div>
        </FormGroup>

        <FormGroup
          helperText={this.state.errorMessage.Tags}
          label="Label A"
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
              <option value="PRACTICAL">Practical Questions</option>
              <option value="SCENARIO_BASE">Scenario Base Questions</option>
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
