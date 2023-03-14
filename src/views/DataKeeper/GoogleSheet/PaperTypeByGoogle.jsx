import React, { Component } from "react";
import { Input, Row, Col } from "reactstrap";

import ArrangedDataView from "./ArrangedDataView";
import axios from "axios";
import { Position, Drawer } from "@blueprintjs/core";

import config from "../../../variables/Constants";
import {
  Spinner,
  Icon,
  Button,
  Classes,
  Dialog,
  Tooltip
} from "@blueprintjs/core";

import {
  getValue,
  getMCQQuestion,
  getPRACTICALQuestion,
  getSCENARIOQuestion
} from "./helpers/util";

import gapi from "gapi-client";
var i3 = 0;
class PaperTypeByGoogle extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      signIn: false,
      visible: false,
      GoogleSheetID: "",
      RawData: null,
      loading: false,
      InOperation: false,
      OperationMessage: "",
      QuestionData: null,
      IsDataArranger: false,
      ArrangedData: null,
      dataInserting: false,
      IsErrorDataInsert: false,
      InsertErrorMessage: "",
      GoogleSheetIDError: true,
      GoogleSheetErrorMessage: "",
      // Handle Data Arrange Error
      ErrorDataArranger: false,
      ErrorMessageDateArrange: "",
      UpdatedValue: null
    };
  }

  // Verify data  Operation Handle
  VerifyData = () => {
    var VerifiedData = this.state.ArrangedData;

    let axiosConfig = {
      headers: {
        Accept: "application/json"
        // Authorization: "Basic S2FsYW5hOkthbGlmZUB3c28y"
      }
    };
    this.setState({
      dataInserting: true
    });
    console.log("----------------------");
    console.log(VerifiedData);
    console.log("----------------------");
    axios
      .post(
        config.HOST_CONFIG.BACK_END_API_MAPPER_URL +
          config.BASE_PATH.MODULE_SERVICE_BASE_PATH +
          "ByGoogleSheet/" +
          VerifiedData.DescriptionData.QuestionType,
        VerifiedData,
        axiosConfig
      )
      .then(res => {
        if (res.status === 201) {
          var data = [];
          for (const [googleSheetID, GenaratedID] of Object.entries(res.data)) {
            data.push({
              range: googleSheetID,
              values: [[GenaratedID]]
            });
          }
          var body = {
            data: data,
            valueInputOption: "USER_ENTERED"
          };

          Promise.resolve(
            gapi.client.sheets.spreadsheets.values.batchUpdate({
              spreadsheetId: this.state.GoogleSheetID,
              resource: body
            })
          )
            .then(function(response) {
              console.log(response.result);
              this.props.handleHide();
            })
            .catch(function(err) {
              console.log(err);
            });

          this.setState({
            dataInserting: false,
            IsErrorDataInsert: false,
            InsertErrorMessage: ""
          });

          //this.props.FetchPaperTypeData();
          console.log(res.data);
          this.props.Notification(
            "tr",
            "success",
            "Paper type data has been inserted successfully",
            "pe-7s-speaker"
          );
        } else {
          this.setState({
            dataInserting: false,
            IsErrorDataInsert: true,
            InsertErrorMessage: "Bad Request"
          });

          this.props.Notification(
            "tr",
            "Error",
            "Error Message",
            "pe-7s-speaker"
          );
          this.reset();
        }
      })
      .catch(
        function(err) {
          this.setState({
            dataInserting: false,
            IsErrorDataInsert: true,
            InsertErrorMessage: "Error Capture"
          });

          this.props.Notification(
            "tr",
            "Error",
            "Error Message",
            "pe-7s-speaker"
          );
          this.reset();
        }.bind(this)
      );
  };

  // event handler
  handleGoogleSheetIDChange = evt => {
    var matches = /\/([\w-_]{15,})\/(.*?gid=(\d+))?/.exec(evt.target.value);
    if (matches !== null) {
      this.setState({ GoogleSheetID: matches[1], GoogleSheetIDError: false });
    } else {
      this.setState({ GoogleSheetID: "", GoogleSheetIDError: true });
    }

    console.log(this.state.GoogleSheetID);
  };

  componentDidMount() {
    gapi.load("client:auth2", this.initClient);
    this.setState({
      dataInserting: false,
      IsErrorDataInsert: false,
      GoogleSheetIDError: true
    });
  }
  initClient = () => {
    gapi.client
      .init({
        apiKey: config.GOOGLE_SHEET_CONFIG.API_KEY,
        clientId: config.GOOGLE_SHEET_CONFIG.CLIENT_ID,
        discoveryDocs: config.GOOGLE_SHEET_CONFIG.DISCOVERY_DOCS,
        scope: config.GOOGLE_SHEET_CONFIG.SCOPES
      })
      .then(
        function() {
          this.stateSet(gapi.auth2.getAuthInstance().isSignedIn.get());
          this.setState({ visible: true });
        }.bind(this),
        function(error) {
          console.error("error gapi Inzializing :" + JSON.stringify(error));
        }
      );
  };
  stateSet = state => {
    this.setState({ signIn: state });
  };

  signIn = () => {
    Promise.resolve(
      gapi.auth2.getAuthInstance().signIn({
        scope:
          "https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/spreadsheets"
      })
    )
      .then(res => {
        this.setState({ signIn: true });
        this.callAfterLogin();
      })
      .catch(err => {
        console.log("Error Capture", err);
        this.signOut();
      });

    // gapi.auth2.getAuthInstance().signIn();
    // console.log("call signIn", gapi.auth2.getAuthInstance().isSignedIn.get());
  };
  signOut = () => {
    gapi.auth2.getAuthInstance().signOut();
    console.log("call signOut", gapi.auth2.getAuthInstance().isSignedIn.get());
    this.setState({ signIn: false });
  };

  reset = () => {
    this.setState({
      GoogleSheetID: "",
      RawData: null,
      loading: false,
      InOperation: false,
      OperationMessage: "",
      QuestionData: null,
      IsDataArranger: false,
      ArrangedData: null,
      dataInserting: false,
      IsErrorDataInsert: false,
      InsertErrorMessage: "",
      GoogleSheetIDError: true,
      GoogleSheetErrorMessage: "",
      ErrorDataArranger: false,
      ErrorMessageDateArrange: ""
    });
  };

  fetchData = () => {
    this.setState({ GoogleSheetErrorMessage: "" });
    if (!this.state.GoogleSheetIDError) {
      if (this.state.IsErrorDataInsert) {
        this.signOut();
      }
      this.signIn();
    } else {
      this.setState({ GoogleSheetErrorMessage: "Invalid Google Sheet ID" });
    }
  };

  callAfterLogin = () => {
    //console.log("Call" + this.state.GoogleSheetID);

    this.setState({
      loading: true,
      OperationMessage: "Data Loading...",
      InOperation: true
    });

    gapi.client.sheets.spreadsheets
      .get({
        spreadsheetId: this.state.GoogleSheetID,
        includeGridData: true
      })
      .then(
        function(response) {
          this.setState({ RawData: response.result.sheets });
          this.DataOperationHandler();
          console.log(response.result.sheets);
          this.setState({ loading: false });
        }.bind(this),
        function(response) {
          this.setState({ error: true, loading: false });
          console.log(response.result);
        }.bind(this)
      );
  };

  //-----------------------------------------------------------------------------------------------
  // Data Operation Handler
  DataOperationHandler = () => {
    let responce;
    this.setState({
      InOperation: true
    });
    responce = this.DataValidation();
    if (responce instanceof Error) {
      this.setState({
        ErrorDataArranger: true,
        ErrorMessageDateArrange: responce.message
      });
      return;
    }
    responce = this.DataArranger(responce);
    if (responce instanceof Error) {
      this.setState({
        ErrorDataArranger: true,
        ErrorMessageDateArrange: responce.message
      });
      return;
    }
  };

  // Data Validations Operations
  DataValidation = () => {
    //set State Message
    this.setState({
      OperationMessage: "Data Validating... "
    });
    //discription sheet Properties
    var disSheetProps = this.state.RawData[0].properties;
    if (this.state.RawData.length <= 1) {
      return new Error("No Data to Handle");
    }

    if (disSheetProps.title === "DESCRIPTION") {
      let VerifiedData = {};
      let disSheetData = this.state.RawData[0].data;
      // Capture Module Data
      let ModuleData = {
        ModuleID: this.props.ModuleID,
        Version: this.props.Version
      };
      // Capture Paper Data
      let DescriptionData = {
        ModuleID: parseInt(getValue(disSheetData, 2, 1), 10),
        ModuleIDGoogleSheetID: disSheetProps.title + "!A3",
        ModuleName: getValue(disSheetData, 2, 1),
        ProductID: parseInt(getValue(disSheetData, 4, 0), 10),
        ProductIDGoogleSheetID: disSheetProps.title + "!A5",
        ProductName: getValue(disSheetData, 4, 1),
        QuestionType: getValue(disSheetData, 4, 2),
        Versions: []
      };
      // Error check
      // if (this.props.ModuleName !== DescriptionData.ModuleName) {
      //   return new Error("Module Name is Not Match.");
      // }
      if (this.props.ProductName !== DescriptionData.ProductName) {
        return new Error("Product Name is Not Match.");
      }
      if (this.props.QuestionType !== DescriptionData.QuestionType) {
        return new Error(
          "This Module can be handle " +
            this.props.QuestionType +
            " Questions Pool Only. Check Your Question Pool Question Type."
        );
      }

      DescriptionData.ModuleID = this.props.ModuleID;
      DescriptionData.ProductID = this.props.ProductID;

      // capture VersionData
      for (let row = 0; ; row++) {
        if (getValue(disSheetData, 7 + row, 1) === null) {
          break;
        }
        let versionData = {
          VersionID: parseInt(getValue(disSheetData, 7 + row, 0), 10),
          Version: getValue(disSheetData, 7 + row, 1),
          GoogleSheetID: disSheetProps.title + "!A" + (row + 8)
        };
        DescriptionData.Versions[row] = versionData;
      }
      console.log(DescriptionData);
      // pass for Error check
      // ---> Implement function for handle Error

      return DescriptionData;
    } else {
      return new Error("Description Page Not Exist");
    }
  };

  // Data Arrange Operation
  DataArranger = DescriptionData => {
    let ArrangedData = {};
    // Similarity Data -------------------------------------------------------------
    let SimilarityData = [];
    var SimilaritySheetProps = this.state.RawData[1].properties;
    let SimilaritySheetData = this.state.RawData[1].data;
    if (SimilaritySheetProps.title === "SIMILARITY") {
      for (let row = 0; ; row++) {
        if (getValue(SimilaritySheetData, 1 + row, 1) === null) {
          break;
        }
        let TempSimilarity = {
          SimilarityID: parseInt(getValue(SimilaritySheetData, 1 + row, 0), 10),
          Similarity: getValue(SimilaritySheetData, 1 + row, 1),
          GoogleSheetID: SimilaritySheetProps.title + "!A" + (row + 2)
        };
        SimilarityData[row] = TempSimilarity;
      }
    } else {
      return new Error("SIMILARITY Page Not Exist");
    }

    // catch Category Data------------------------------------------------------
    let CategoryData = [];
    var CategorySheetProps = this.state.RawData[2].properties;
    let CategorySheetData = this.state.RawData[2].data;
    if (CategorySheetProps.title === "CATEGORIES") {
      // catch Category Data
      for (let row = 0; ; row++) {
        if (getValue(CategorySheetData, 1 + row, 1) === null) {
          break;
        }
        let TempCategory = {
          CategoryID: parseInt(getValue(CategorySheetData, 1 + row, 0), 10),
          Category: getValue(CategorySheetData, 1 + row, 1),
          Topics: [],
          GoogleSheetID: CategorySheetProps.title + "!A" + (row + 2)
        };
        CategoryData[row] = TempCategory;
      }
    } else {
      return new Error("CATEGORIES Page Not Exist");
    }

    // Catch Topic Data ------------------------------------------------------------
    var TopicsSheetProps = this.state.RawData[3].properties;
    let TopicsSheetData = this.state.RawData[3].data;
    if (TopicsSheetProps.title === "TOPICS") {
      for (let row = 0; ; row++) {
        if (getValue(TopicsSheetData, 1 + row, 1) === null) {
          break;
        }
        let TempTopics = {
          TopicID: parseInt(getValue(TopicsSheetData, 1 + row, 0), 10),
          Topic: getValue(TopicsSheetData, 1 + row, 2),
          GoogleSheetID: TopicsSheetProps.title + "!A" + (row + 2)
        };
        CategoryData.forEach(CategoryInstance => {
          if (
            CategoryInstance.Category === getValue(TopicsSheetData, 1 + row, 1)
          ) {
            CategoryInstance.Topics.push(TempTopics);
          }
        });
      }
    } else {
      return new Error("TOPICS Page Not Exist");
    }

    // catch Question Pool
    let QuestionsData = [];
    let GroupData = [];
    var QuestionPoolProps = this.state.RawData[4].properties;
    let QuestionPoolData = this.state.RawData[4].data;
    if (QuestionPoolProps.title === "QUESTION_POOL") {
      let QuestionPointer = 0;
      for (let row = 1; ; row++) {
        if (getValue(QuestionPoolData, row, 2) === null) {
          break;
        }
        //MCQ Quesiton Arranging
        if (DescriptionData.QuestionType === "MCQ") {
          let TempQuestion = getMCQQuestion(
            QuestionPoolData,
            row,
            QuestionPoolProps.title
          );
          if (TempQuestion instanceof Error) {
            return TempQuestion;
          }
          if (TempQuestion.State !== "CLOSE") {
            QuestionsData[QuestionPointer] = TempQuestion;
            QuestionPointer++;
          }
          if(DescriptionData.ProductName === "Solutions Architecture") {
            var GropusSheetProps = this.state.RawData[5].properties;
            let GroupsSheetData = this.state.RawData[5].data;
            if (GropusSheetProps.title === "GROUPS") {
              for (let row = 0; ; row++) {
                if (getValue(GroupsSheetData, 1 + row, 1) === null) {
                  break;
                }
                let TempGroups = {
                  GroupID: parseInt(getValue(GroupsSheetData, 1 + row, 0), 10),
                  Group: getValue(GroupsSheetData, 1 + row, 1),
                  GoogleSheetID: GropusSheetProps.title + "!A" + (row + 2)
                }
                GroupData[row] = TempGroups;
              }
            }
          }
        }

        // Practical Question Arranging
        if (DescriptionData.QuestionType === "PRACTICAL") {
          let TempQuestion = getPRACTICALQuestion(
            QuestionPoolData,
            row,
            QuestionPoolProps.title
          );
          if (TempQuestion instanceof Error) {
            return TempQuestion;
          }
          if (TempQuestion.State !== "CLOSE") {
            QuestionsData[QuestionPointer] = TempQuestion;
            QuestionPointer++;
          }
        }

        // Scenario Base Quesiton Arranging
        if (DescriptionData.QuestionType === "SCENARIO_BASE") {
          let TempQuestion = getSCENARIOQuestion(
            QuestionPoolData,
            row,
            QuestionPoolProps.title
          );
          if (TempQuestion instanceof Error) {
            return TempQuestion;
          }
          if (TempQuestion.State !== "CLOSE") {
            QuestionsData[QuestionPointer] = TempQuestion;
            QuestionPointer++;
          }
        }
      }
    } else {
      return new Error("QUESTION_POOL Page Not Exist");
    }

    // Scenarios Data -------------------------------------------------------------
    let ScenariosData = [];
    if (DescriptionData.QuestionType === "SCENARIO_BASE") {
      var ScenarioSheetProps = this.state.RawData[5].properties;
      let ScenarioSheetData = this.state.RawData[5].data;
      if (ScenarioSheetProps.title === "SCENARIOS") {
        for (let row = 0; ; row++) {
          if (getValue(ScenarioSheetData, 1 + row, 1) === null) {
            break;
          }
          let TempScenario = {
            ScenarioID: parseInt(getValue(ScenarioSheetData, 1 + row, 0), 10),
            Scenario: getValue(ScenarioSheetData, 1 + row, 1),
            ScenarioContent: getValue(ScenarioSheetData, 1 + row, 2),
            GoogleSheetID: ScenarioSheetProps.title + "!A" + (row + 2)
          };
          ScenariosData[row] = TempScenario;
        }

        ArrangedData["ScenarioData"] = ScenariosData;
      } else {
        return new Error("SCENARIOS Page Not Exist");
      }
    }

    ArrangedData["DescriptionData"] = DescriptionData;
    ArrangedData["SimilarityID"] = SimilarityData;
    ArrangedData["CategoryData"] = CategoryData;
    ArrangedData["GroupData"] = GroupData;
    ArrangedData["QuestionData"] = QuestionsData;

    this.setState({
      OperationMessage: "Data was Arranged "
    });
    this.setState({ ArrangedData: ArrangedData });
    this.setState({ IsDataArranger: true });
    return ArrangedData;
  };
  // Data Manager Operation Handle CRUD Operations
  DataManager = ArrangedData => {
    console.log(ArrangedData);
    this.setState({
      OperationMessage: "Data Uploading... "
    });
  };

  // end of Data Opearations
  //------------------------------------------------------------------------------------------------------------------
  render() {
    return (
      <Drawer
        icon="info-sign"
        position={Position.TOP}
        isOpen={this.props.show}
        onClose={() => {
          this.props.handleHide();
          this.reset();
        }}
        title="Question Pool"
        style={{ height: "90%" }}
        {...this.state}
      >
        <div className={Classes.DRAWER_BODY}>
          <div className={Classes.DIALOG_BODY}>
            {this.state.ErrorDataArranger === false ? (
              this.state.IsDataArranger === false ? (
                <div>
                  {this.state.InOperation !== true &&
                  this.state.IsDataArranger === false ? (
                    <div className={"content"}>
                      <Row>
                        <Col sm={12} md={12}>
                          <Row>
                            <Col sm={12}>
                              <Input
                                placeholder="Google Sheet URL"
                                onChange={this.handleGoogleSheetIDChange}
                                required
                              />
                            </Col>
                          </Row>
                          <br />

                          <Row>
                            <Col sm={12}>
                              <p className="category">
                                <b>Google Sheet ID : </b>
                                {this.state.GoogleSheetID === ""
                                  ? "Please insert valid google sheet URL"
                                  : this.state.GoogleSheetID}
                                {this.state.GoogleSheetID !== "" && (
                                  <i
                                    style={{ color: "green" }}
                                    className="fa fa-check"
                                  />
                                )}
                              </p>
                              <p
                                className="category"
                                style={{ color: "#ff3333" }}
                              >
                                {this.state.GoogleSheetErrorMessage}
                              </p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  ) : (
                    <div className={"content"}>
                      {!this.state.IsDataArranger && (
                        <LoadingMessage
                          OperationMessage={this.state.OperationMessage}
                        />
                      )}
                    </div>
                  )}
                </div>
              ) : (
                this.state.IsDataArranger && (
                  <ArrangedDataView
                    VerifyData={this.VerifyData}
                    ArrangedData={this.state.ArrangedData}
                    show={this.props.show}
                    // Module Data
                    ModuleName={this.props.ModuleName}
                    ModuleID={this.props.ModuleID}
                  />
                )
              )
            ) : (
              <ErrorMessage ErrorMessage={this.state.ErrorMessageDateArrange} />
            )}
          </div>
        </div>
        <div className={Classes.DRAWER_FOOTER}>
          <div className={Classes.DIALOG_FOOTER_ACTIONS}>
            {this.state.InOperation !== true &&
              this.state.IsDataArranger === false && (
                <Tooltip content="Fetch data from google sheet">
                  <Button
                    intent="primary"
                    disabled={this.state.loading || !this.state.visible}
                    onClick={this.fetchData}
                    loading={!this.state.visible}
                    text={"Fetch Data"}
                  />
                </Tooltip>
              )}
            {/* Show Verify Button After Data Arranged */}
            {this.state.IsDataArranger === true && (
              <Button
                loading={this.state.dataInserting}
                onClick={this.VerifyData}
                disabled={this.state.dataInserting}
                intent="success"
              >
                Verify
              </Button>
            )}

            <Button
              onClick={() => {
                this.reset();
                this.props.handleHide();
              }}
            >
              Close
            </Button>
          </div>
        </div>
      </Drawer>
    );
  }
}

export default PaperTypeByGoogle;

function LoadingMessage(props) {
  return (
    <center>
      <h5>
        <Spinner size={30} />
        {props.OperationMessage}
      </h5>
    </center>
  );
}

function ErrorMessage(props) {
  return (
    <center>
      <h5>
        <Icon icon="warning-sign" iconSize={25} intent="warning" />
        <p className="category">{props.ErrorMessage}</p>
      </h5>
    </center>
  );
}
