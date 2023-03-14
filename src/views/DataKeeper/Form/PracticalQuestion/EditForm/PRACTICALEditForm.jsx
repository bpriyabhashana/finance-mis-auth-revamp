import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import {
  Drawer,
  Classes,
  FormGroup,
  InputGroup,
  Button,
  Tooltip,
  Position,
  Switch,
  FileInput
} from "@blueprintjs/core";

import "./css/zoom.css";

import QuestionEditor from "./QuestionEditor";
import cloneDeep from "lodash/cloneDeep";
import { DateInput } from "@blueprintjs/datetime";

import axios from "axios";
import config from "../../../../../variables/Constants";

class PRACTICALEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      EditMode: false,
      uploading: false,
      imageData: this.props.data.OtherContent,
      data: cloneDeep(this.props.data)
    };

    this.toggleMode = () => {
      this.setState(
        {
          EditMode: !this.state.EditMode
        },
        () => {
          if (this.state.EditMode === false) {
            this.EditModeQuestionSet();
          }
        }
      );
    };

    this.toggleEditModePaperType = () => {
      this.setState({
        EditIsMultipleSelection: !this.state.EditIsMultipleSelection
      });
    };

    // set Eddit Mode Content
    this.setEditValue = content => {
      let data = this.state.data;
      data.Content = content;
      this.setState({
        data
      });
    };

    this.ChangeQuestion = (selectionID, evt) => {
      let data = this.state.data;
      // chnage Number of Answer Display
      if (selectionID === 1) {
        // data.NumberOfAnswer = ev;
      }
      this.setState({ data }, console.log(this.state.data));
    };
  }
  // Form Field Value bind with variable
  changeCreatedBy = value => {
    let data = this.state.data;
    data.CreatedBy = value;
    this.setState({
      data
    });
  };
  changeCreatedDate = value => {
    let data = this.state.data;
    data.CreatedDate = value;
    this.setState({
      data
    });
  };
  changeVerifiedBy = value => {
    let data = this.state.data;
    data.VerifiedBy = value;
    this.setState({
      data
    });
  };
  changeVerifiedDate = value => {
    let data = this.state.data;
    data.VerifiedDate = value;
    this.setState({
      data
    });
  };

  changeIsSample = () => {
    let data = this.state.data;
    data.IsSample = !this.state.data.IsSample;
    this.setState({
      data
    });
  };

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imageData: "data:image/jpeg;base64," + getBase64(reader.result)
      });
    };

    reader.readAsDataURL(file);
    console.log(this.state);
  }

  EditModeQuestionSet = () => {
    this.setState({
      data: cloneDeep(this.props.data)
    });
  };

  // Data Handle
  QuestionUpdate = () => {
    var updateData = {
      ID: this.state.data.ID,
      Content: this.state.data.Content,
      OtherContent: this.state.imageData,
      CreatedBy: this.state.data.CreatedBy,
      CreatedDate: this.state.data.CreatedDate,
      VerifiedBy: this.state.data.VerifiedBy,
      VerifiedDate: this.state.data.VerifiedDate,
      IsActive: this.state.data.IsActive === 1,
      IsSample: this.state.data.IsSample === 1
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
          config.BASE_PATH.QUESTION_SERVICE_BASE_PATH +
          "WholePRACTICALQuestionUpdate",
        updateData,
        axiosConfig
      )
      .then(res => {
        //console.log("RESPONSE RECEIVED: ", res);
        if (res.status === 200) {
          console.log("OK", res);
          //this.toggleMode();
          this.props.FetchQuestionData(0);
          this.props.Notification(
            "tr",
            "success",
            "Question Data Updated successfully",
            "pe-7s-speaker"
          );
          this.setState({ uploading: false });
        } else {
          console.log("Bad", res);
          this.setState({ uploading: false });
        }
      })
      .catch(err => {
        console.log("Error", err);
        this.setState({ uploading: false });
      });
  };

  componentDidMount() {
    this.setState({
      EditIsMultipleSelection: this.props.data.IsMultipleSelection === 1,
      data: cloneDeep(this.props.data)
    });
    this.EditModeQuestionSet();
  }
  componentWillReceiveProps() {
    this.EditModeQuestionSet();
  }

  render() {
    return (
      <div>
        <Drawer
          isOpen={this.props.isOpen}
          onClose={this.props.onClose}
          icon="info-sign"
          size="800px"
          title="MCQ Question Edit View"
        >
          <div className={Classes.DRAWER_BODY} style={{ overflowY: "scroll" }}>
            <div className={Classes.DIALOG_BODY}>
              <FormGroup label="Question Content" labelFor="text-input">
                <QuestionEditor
                  setEditValue={this.setEditValue}
                  content={this.state.data.Content}
                />
              </FormGroup>
              <FormGroup label="Question Image" labelFor="text-input">
                <Row>
                  <Col sm={6}>
                    <FileInput
                      text="Choose file..."
                      onInputChange={e => this._handleImageChange(e)}
                    />
                    <br />
                    {this.state.imageData !== "empty" && (
                      <img
                        className="zoom"
                        style={{
                          border: "1px solid #ddd",
                          border_radius: "4px",
                          width: "100px"
                        }}
                        alt="Question Other Content"
                        src={this.state.imageData}
                      />
                    )}
                  </Col>
                </Row>
              </FormGroup>
              <Row>
                <Col sm={12} md={3}>
                  <FormGroup
                    helperText="Created By , ex : John"
                    label="Created By"
                    labelFor="text-input"
                  >
                    <InputGroup
                      required={true}
                      placeholder="CreatedBy"
                      defaultValue={this.state.data.CreatedBy}
                      onChange={event =>
                        this.changeCreatedBy(event.target.value)
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
                        this.changeCreatedDate(formatDate(date))
                      }
                      parseDate={str => new Date(str)}
                      placeholder={"YYYY-MM-DD"}
                      defaultValue={new Date(this.state.data.CreatedDate)}
                      timePrecision={"none"}
                    />
                  </FormGroup>
                </Col>
                <Col sm={12} md={3}>
                  <FormGroup
                    helperText="Verified By , ex : Max/ John"
                    label="Verified By"
                    labelFor="text-input"
                  >
                    <InputGroup
                      required={true}
                      placeholder="Verified By"
                      defaultValue={this.state.data.VerifiedBy}
                      onChange={event =>
                        this.changeVerifiedBy(event.target.value)
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
                        this.changeVerifiedDate(formatDate(date))
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
                <Col sm={3}>
                  <Tooltip
                    content="If Enable this ,Question will save as a sample question , Then this question is never included in any genarated papers"
                    position={Position.TOP}
                  >
                    <Switch
                      defaultChecked={this.state.data.IsSample}
                      label="Sample Question"
                      onChange={this.changeIsSample}
                    />
                  </Tooltip>
                </Col>
              </Row>
            </div>
          </div>
          <div className={Classes.DRAWER_FOOTER}>
            <Tooltip content="Save Chnages" position={Position.RIGHT}>
              <Button
                onClick={this.QuestionUpdate}
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

export default PRACTICALEditForm;

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
