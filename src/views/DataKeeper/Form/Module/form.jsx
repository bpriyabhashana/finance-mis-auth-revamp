import React, { Component } from "react";
import { FormGroup, InputGroup } from "@blueprintjs/core";

class App extends Component {
  state = {
    data: { ModuleName: "" },
    error: { ModuleName: false },
    errorMessage: { ModuleName: "" },
    form_validate: false
  };
  ChangeValue = (index, value) => {
    switch (index) {
      case 1:
        let retValidator = this.validator(1, value);
        this.setState(prevState => ({
          data: {
            ...prevState.data, // keep all other key-value pairs
            ModuleName: value // update the value of specific key
          },

          error: {
            ...prevState.error, // keep all other key-value pairs
            ModuleName: retValidator.isValid // update the value of specific key
          },
          errorMessage: {
            ...prevState.error, // keep all other key-value pairs
            ModuleName: retValidator.Message // update the value of specific key
          }
        }));

        break;

      default:
        break;
    }
  };

  // Validator
  validator = (index, value) => {
    switch (index) {
      case 1:
        // Validate Module Name
        return {
          isValid: value.length === 0,
          Message: value.length === 0 ? "Module Name connot be empty." : ""
        };
        break;

      default:
        break;
    }
  };

  submit = () => {};

  render() {
    return (
      <FormGroup
        helperText={this.state.errorMessage.ModuleName}
        label="Label A"
        labelFor="text-input"
        labelInfo="(required)"
        intent="danger"
      >
        <InputGroup
          intent={this.state.error.ModuleName ? "danger" : "success"}
          id="text-input"
          placeholder="Placeholder text"
          value={this.state.data.ModuleName}
          onInput={event => {
            this.ChangeValue(1, event.target.value);
          }}
        />
      </FormGroup>
    );
  }
}

export default App;
