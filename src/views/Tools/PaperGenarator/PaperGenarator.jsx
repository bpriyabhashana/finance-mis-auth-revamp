import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import axios from "axios";

// List Component
import ModuleList from "./ModuleList";
import PaperList from "./PaperList";

import PaperViewModal from "./PaperViewModal";
import { Button } from "@blueprintjs/core";

import config from "../../../variables/Constants";

class PaperGenarator extends Component {
  constructor(props, prevState, state) {
    super(props, prevState, state);
    this.state = {
      PaperShow: false,
      loadingModule: false,
      loadingPaper: false,
      // IDs
      selectedModuleID: null,
      selectedPaperID: null,
      //List Data
      selectedModuleList: [],
      selectedPaperList: [],
      GenaratedPaper: [],

      GenaratingPaper: false,

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
            <h5 className="title">Paper Genarator</h5>
            <p className="category">Test your module paper and verify</p>
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
              <Row>
                <Col sm={6}>
                  <ModuleList
                    selectedModuleList={this.state.selectedModuleList}
                    changeModuleID={this.setSelectionID}
                    ModuleID={this.state.selectedModuleID}
                  />
                </Col>

                <Col sm={6}>
                  <PaperList
                    selectedPaperList={this.state.selectedPaperList}
                    changePaperID={this.setSelectionID}
                    PaperID={this.state.selectedPaperID}
                    loadingPaper={this.state.loadingPaper}
                  />

                  <br />
                  <p className="category">{this.state.GenaratingMessage}</p>
                  <PaperViewModal
                    show={this.state.PaperShow}
                    handlePaperHide={this.handleHide}
                    ModuleID={this.state.selectedModuleID}
                    PaperID={this.state.selectedPaperID}
                    GenaratedPaper={this.state.GenaratedPaper}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm={6} />
                <Col sm={6}>
                  <Button
                    disabled={this.state.selectedPaperID === null}
                    loading={this.state.GenaratingPaper}
                    onClick={this.FetchGenaratedPaperData}
                    icon="cog"
                    intent="success"
                  >
                    Genarate
                  </Button>
                </Col>
              </Row>
            </div>
          )}
          <div className="footer" />
        </div>
      </div>
    );
  }
}

export default PaperGenarator;
