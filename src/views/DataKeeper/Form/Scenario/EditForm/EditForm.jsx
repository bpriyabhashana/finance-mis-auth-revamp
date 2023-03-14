import React, { Component } from "react";
import {
  Drawer,
  Classes,
  FormGroup,
  InputGroup,
  Button,
  Tooltip,
  Position,
  FileInput,
  Intent
} from "@blueprintjs/core";
import { Row, Col } from "reactstrap";
import axios from "axios";
import config from "../../../../../variables/Constants";

import Editor from "./Editor";

class ScenarioEdit extends Component {
  constructor(props, prevProps) {
    super(props, prevProps);
    this.state = {
      uploading: false,
      Scenario: this.props.data.Scenario,
      ImageData: this.props.data.OtherContent,
      ScenarioID: this.props.ScenarioID
    };
    // set Eddit Mode Content
    this.setEditValue = Scenario => {
      this.setState({
        Scenario
      });
    };
  }

  // Data Handle
  ScenarioUpdate = () => {
    var updateData = {
      PaperScenarioID: this.state.ScenarioID,
      Scenario: this.state.Scenario,
      OtherContent: this.state.ImageData,
      IsActive: true
    };

    let axiosConfig = {
      headers: {
        Accept: "application/json"
      }
    };
    this.setState({ Uploading: true });
    axios
      .put(
        config.HOST_CONFIG.BACK_END_API_MAPPER_URL +
          config.BASE_PATH.SCENARIO_SERVICE_BASE_PATH,
        updateData,
        axiosConfig
      )
      .then(res => {
        //console.log("RESPONSE RECEIVED: ", res);
        if (res.status === 200) {
          this.props.dataFetch();
          this.props.onClose();
          this.props.Notification(
            "tr",
            "success",
            "Scenario Data Updated successfully",
            "pe-7s-speaker"
          );
          this.setState({ Uploading: false });
        }
        if (res.status === 400) {
          console.log("Bad", res);
          this.setState({ Uploading: false });
        }
      })
      .catch(err => {
        console.log("Error", err);
        this.setState({ Uploading: false });
      });
  };

  RemoveImage = () => {
    this.setState({
      ImageData: null
    });
  };

  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        ImageData: "data:image/jpeg;base64," + getBase64(reader.result)
      });
    };
    reader.readAsDataURL(file);
  }
  reset = () => {
    this.setState({
      uploading: false,
      Scenario: this.props.data.Scenario,
      ImageData: this.props.data.OtherContent
    });
  };

  componentDidUpdate(prevProps) {
    // Reset Value and set Value
    if (this.props.show !== prevProps.show) {
      this.setState({
        uploading: false,
        Scenario: this.props.data.Scenario,
        ImageData: this.props.data.OtherContent
      });
    }
  }

  render() {
    return (
      <div>
        <Drawer
          isOpen={this.props.show}
          onClose={this.props.onClose}
          icon="info-sign"
          size="900px"
          title="Edit Scenario Data "
        >
          <div className={Classes.DRAWER_BODY}>
            <div className={Classes.DIALOG_BODY}>
              <FormGroup label="Scenario" labelFor="text-input">
                <Editor
                  setEditValue={this.setEditValue}
                  content={this.state.Scenario}
                />
              </FormGroup>
              <FormGroup label="Scenario Image" labelFor="text-input">
                <Row>
                  <Col sm={12}>
                    <FileInput
                      text="Choose file..."
                      onInputChange={e => this._handleImageChange(e)}
                    />
                  </Col>

                  <Col sm={6}>
                    {this.state.ImageData !== null && (
                      <img
                        style={{
                          border: "1px solid #ddd",
                          border_radius: "4px",
                          width: "100px"
                        }}
                        alt="Other Content"
                        src={this.state.ImageData}
                      />
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    {this.state.ImageData !== null && (
                      <Button
                        icon="trash"
                        intent={Intent.DANGER}
                        minimal={true}
                        onClick={this.RemoveImage}
                      />
                    )}
                  </Col>
                </Row>
              </FormGroup>
            </div>
          </div>
          <div className={Classes.DRAWER_FOOTER}>
            <Tooltip content="Save Chnages" position={Position.RIGHT}>
              <Button
                onClick={this.ScenarioUpdate}
                text="save"
                icon="saved"
                intent="primary"
                loading={this.state.Uploading}
              />
            </Tooltip>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default ScenarioEdit;

function getBase64(fileResult) {
  let encoded = "Not Specified";
  if (fileResult) {
    encoded = fileResult.substr(fileResult.indexOf(",") + 1);
  }
  return encoded;
}
