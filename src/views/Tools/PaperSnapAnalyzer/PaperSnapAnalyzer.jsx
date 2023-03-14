import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import axios from "axios";

import {
  Drawer,
  Classes,
  FormGroup,
  InputGroup,
  Tooltip,
  Position,
  Spinner,
  Callout,
  Code
} from "@blueprintjs/core";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// List Component
import ModuleList from "./UserList";
import PaperList from "./PaperSnapList";

import PaperViewModal from "./PaperViewModal";
import { Button } from "@blueprintjs/core";

import config from "../../../variables/Constants";

class PaperAnalyzer extends Component {
  constructor(props, prevState, state) {
    super(props, prevState, state);
    this.state = {
      PaperShow: false,
      loadingModule: false,
      loadingPaper: false,
      loadingResponse: false,
      // IDs
      selectedModuleID: null,
      selectedPaperID: null,
      //List Data
      selectedModuleList: [],
      selectedPaperList: [],
      GenaratedPaper: [],

      GenaratingPaper: false,
      ExamID: "",
      PaperSnapAnalyze: "",
      AnalyzeList: [],
      FullAnalyzeResponse: "",
      

      GenaratingMessage: ""
    };
  }

  handleHide = () => {
    this.setState({
      PaperShow: !this.state.PaperShow,
      GenaratingMessage: ""
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedModuleID !== this.state.selectedModuleID) {
      this.setState({ selectedPaperID: null, selectedPaperList: [] }, () =>
        this.fetchPaperList()
      );
    }
  }

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


  setSelectionID = (selectionID, ID) => {
    // chnage Module ID
    if (selectionID === 1) {
      this.setState({ selectedModuleID: ID });
    }
    // Chnage Paper ID
    if (selectionID === 2) {
      this.setState({ selectedPaperID: ID });
    }
  };

  FetchGenaratedPaperData = () => {
    let axiosConfig = {
      headers: {
        Accept: "application/json"
      }
    };
    let url =
      config.HOST_CONFIG.BACK_END_API_MAPPER_URL +
      config.BASE_PATH.PAPER_SERVICE_BASE_PATH +
      this.state.selectedModuleID +
      "/" +
      this.state.selectedPaperID;

    this.setState({ GenaratingPaper: true });
    axios
      .get(url, axiosConfig)
      .then(res => {
        // console.log("RESPONSE RECEIVED: ", res);
        if (res.status === 200) {
          if (res.data.GenaratedQuestionSet.length > 0) {
            this.setState({
              GenaratedPaper: res.data,
              GenaratingPaper: false,
              GenaratingMessage: "Generate a Paper"
            });
            this.handleHide();
            console.log(res.data);
          } else {
            this.setState({
              GenaratingPaper: false,
              GenaratingMessage: "Not enough Question Pool"
            });
          }
        } else {
          this.setState({
            GenaratingPaper: false,
            GenaratingMessage:
              "Not enough Question Pool/ or Some error has been occured"
          });
        }
      })
      .catch(err => {
        this.setState({
          GenaratingPaper: false,
          GenaratingMessage: "Not enough Question Pool"
        });
      });
  };

  submit = () => {
    console.log("Paper analyzer submitted ...............");
    let axiosConfig = {
      headers: {
        Accept: "application/json"
      }
    };
    let url =
      config.HOST_CONFIG.BACK_END_API_MAPPER_URL +
      config.BASE_PATH.PAPER_SNAP_SERVICE_BASE_PATH +
      "AdminVerification/" +
      this.state.ExamID;
    this.setState({
      loadingPaper: true
    });
    axios
      .get(url, axiosConfig)
      .then(res => {
        // console.log("RESPONSE RECEIVED: ", res);
        if (res.status === 200) {
          
          this.setState({
            FullAnalyzeResponse : res.data,
            AnalyzeList: res.data.PaperSynapRecords,
            loadingPaper: false,
            loadingResponse: true
          });

          console.log("AnalyzeList : " + this.state.AnalyzeList);
        }
        if (res.status === 400) {
          this.setState({
            selectedPaperList: [],
            loadingPaper: false,
            loadingResponse: false
          });
        }
      })
      .catch(err => {
        this.setState({
          selectedPaperList: [],
          loadingPaper: false,
          loadingResponse: false
        });
      });
  };

  fetchPaperList = () => {
    let axiosConfig = {
      headers: {
        Accept: "application/json"
      }
    };
    let url =
      config.HOST_CONFIG.BACK_END_API_MAPPER_URL +
      config.BASE_PATH.PAPER_TYPE_SERVICE_BASE_PATH +
      this.state.selectedModuleID;
    this.setState({
      loadingPaper: true
    });
    axios
      .get(url, axiosConfig)
      .then(res => {
        // console.log("RESPONSE RECEIVED: ", res);
        if (res.status === 200) {
          this.setState({
            selectedPaperList: res.data,
            loadingPaper: false
          });
        }
        if (res.status === 400) {
          this.setState({
            selectedPaperList: [],
            loadingPaper: false
          });
        }
      })
      .catch(err => {
        this.setState({
          selectedPaperList: [],
          loadingPaper: false
        });
      });
  };

  FertchModuleList = () => {
    let axiosConfig = {
      headers: {
        Accept: "application/json"
        // Authorization: "Basic S2FsYW5hOkthbGlmZUB3c28y"
      }
    };
    this.setState({
      loadingModule: true,
      GenaratingMessage: ""
    });
    axios
      .get(
        config.HOST_CONFIG.BACK_END_API_MAPPER_URL +
          config.BASE_PATH.MODULE_SERVICE_BASE_PATH,
        axiosConfig
      )
      .then(res => {
        if (res.status === 200) {
          this.setState({
            selectedModuleList: res.data,
            loadingModule: false
          });
          console.log(res.data);
        }
        if (res.status === 400) {
        }
      })
      .catch(err => {
        this.setState({
          ToggleStateMessage:
            "Service down check the Server or Check your Connection  "
        });
      });
  };

  componentDidMount() {
    this.FertchModuleList();
  }

  render() {
    return (
      <div className={"card"}>
        <div className={"header"}>
          <div className="pull-left">
            <h5 className="title">Paper Snap Analyzer</h5>
            <p className="category">Paper snap Analysing Tools</p>
          </div>
          <div className="pull-right">
            <Button minimal={true} onClick={() => this.FertchModuleList()}>
              <i className="fa fa-refresh " title="Refresh" />
            </Button>
          </div>
        </div>
        <div className="clearfix" />
        <div className={"content"}>
          {this.state.loadingModule && (
            <p className="category"> Data Fetching...</p>
          )}
          {!this.state.loadingModule && (
            <div>
                Paper Snap ID
              <FormGroup
                  label=""
                  labelFor="text-input"
                >
                  <InputGroup                            
                    placeholder="ex : Eneter Paper snap ID"
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

                  <Tooltip content="Analyze" position={Position.RIGHT}>
                    <Button
                      icon="saved"
                      type="submit"
                      text="Analyze"
                      intent="primary"
                      onClick={this.submit}
                    />
                  </Tooltip>

                  {this.state.loadingResponse ===
                    true ? (
                    <div>
                      <br/>
                      <br/>

                      <div><b>NumberOfQuestions : </b>{this.state.FullAnalyzeResponse.NumberOfQuestions}<br/>
                  <b>NumberOfCorrectAnswers : </b>{this.state.FullAnalyzeResponse.NumberOfCorrectAnswers}<br/>
                  <b>Marks : </b>{this.state.FullAnalyzeResponse.Marks}<br/>
                  <b>Result : </b>{this.state.FullAnalyzeResponse.Result}<br/><br/><br/>
                  </div>
                  <br/>

                 { this.state.AnalyzeList.map((row, i) => (                   
                  <p><b>{i+1}) Question : </b> {row.question}<br/><br/><b>Given Answer : </b>{row.givenAnswer}<br/><br/><b>Correct Answer : </b>{row.correctAnswer.toString()}<br/><br/><b>Displayed Answer : </b><p>{row.displayedAnswer.toString()}</p><br/><b>Is correct : </b>{row.isCorrect}<hr/></p>
                  
                ))}

                    </div>
                    ):(
                    <div></div>
                    )}              
            </div>
          )}
          <div className="footer" />
        </div>
      </div>
    );
  }
}

export default PaperAnalyzer;

function LoadingMessage() {
  return (
    <center>
      <h4>
      {/* {this.state.PaperSnapAnalyze !== undefined } */}
        <div>new div</div>
      
        <p >Test...</p>
      </h4>
    </center>
  );
}