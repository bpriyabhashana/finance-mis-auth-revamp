import React, { Component } from "react";
import { Row, Col } from "reactstrap";

import PaperList from "./HorizontalList/PaperList";
import CategoryList from "./HorizontalList/CategoryList";
import TopicsList from "./HorizontalList/TopicsList";
import ScenarioList from "./HorizontalList/Scenarios";

import QuestionManagerView from "./QuestionManager/QuestionManagerView";
import axios from "axios";
import renderHTML from "react-render-html";

import {
  Button,
  ButtonGroup,
  Popover,
  Position,
  Menu,
  MenuItem,
  Alert,
  Intent,
  Collapse,
  Divider
} from "@blueprintjs/core";

// Data insert Forms
import PaperTypeByGoogle from "../GoogleSheet/PaperTypeByGoogle";
import PaperInsert from "../Form/Papers/PaperInsert";
import PaperEdit from "../Form/Papers/PaperEdit";
import CategoryInsert from "../Form/Category/CategoryInsert";
import CategoryEdit from "../Form/Category/CategoryEdit";
import TopicInsert from "../Form/Topic/TopicInsert";
import TopicEdit from "../Form/Topic/TopicEdit";
// Data Edit Form
import ScenarioEdit from "../Form/Scenario/EditForm/EditForm";

// import Constants
import config from "../../../variables/Constants";

// // test
// import SortableComponent from "./QuestionManager/SortableAnswerList";

class PaperManagerView extends Component {
  constructor(props, prevState) {
    super(props, prevState);
    this.state = {
      isOpen: true,
      //shared data
      // function id 0
      selectedQuestionID: null,
      // function id 1
      selectedModuleID: this.props.ModuleID,
      // function id 2
      selectedCategoryID: null,
      // function id 3
      selectedTopicID: null,
      // function id 4
      selectedPaperID: null,
      // function id 5
      selectedScenarioID: null,

      // use for Show google sheet
      showGoogleMainModal: false,

      // data from remote location
      paperTypeData: [],
      categoryData: [],
      topicsData: [],
      questionData: [],
      ScenarioData: [],
      PaperInsertCardShow: false,

      // Delete Alert Handle
      PaperTypeDeleteAlertShow: false,

      // selected Data
      selectedPaperTypeData: null,
      selectedPaperCategoryData: null,
      selectedPaperTopicData: null,
      selectedScenarioData: null,

      // loading State Handle
      QuestionLoading: false,
      SelectedPaperType: null,

      // use for drawer visibility handle
      showPaperTypeInsertForm: false,
      showPaperTypeEditForm: false,
      showCategoryInsertForm: false,
      showCategoryEditForm: false,
      showScenarioEditForm: false,
      showTopicInsertForm: false,
      showTopicEditForm: false,

      // use for handle list Loading effect
      PaperTypeLoading: false,
      CategoryLoading: false,
      TopicLoading: false,
      ScenarioLoading: false,

      RowQuestionData: []
    };
    // Toggle View
    this.toggleGoogleSheetInsertModalShow = () => {
      this.setState({
        showGoogleMainModal: !this.state.showGoogleMainModal
      });
    };
    // Pape Type
    this.toggleShowPaperTypeInsertForm = () => {
      this.setState({
        showPaperTypeInsertForm: !this.state.showPaperTypeInsertForm
      });
    };
    this.toggleShowPaperTypeEditForm = () => {
      this.setState({
        showPaperTypeEditForm: !this.state.showPaperTypeEditForm
      });
    };
    // Category
    this.toggleShowCategoryInsertForm = () => {
      this.setState({
        showCategoryInsertForm: !this.state.showCategoryInsertForm
      });
    };
    this.toggleShowCategoryEditForm = () => {
      this.setState({
        showCategoryEditForm: !this.state.showCategoryEditForm
      });
    };
    // Topics
    this.toggleShowTopicInsertForm = () => {
      this.setState({
        showTopicInsertForm: !this.state.showTopicInsertForm
      });
    };
    this.toggleShowTopicEditForm = () => {
      this.setState({
        showTopicEditForm: !this.state.showTopicEditForm
      });
    };

    this.toggleShowScenarioEditForm = () => {
      this.setState({
        showScenarioEditForm: !this.state.showScenarioEditForm
      });
    };

    // Get Selected data by ID
    this.getSelectedData = ID => {
      if ((ID = 1)) {
        this.state.paperTypeData.forEach(element => {
          if (element.ID === this.state.selectedPaperID) {
            this.setState({
              selectedPaperTypeData: element,
              selectedPaperType: element.PaperType
            });
            //this.FetchSenarioData();
          }
        });
      }
      if ((ID = 2)) {
        this.state.categoryData.forEach(element => {
          if (element.CategoryID === this.state.selectedCategoryID) {
            this.setState({ selectedPaperCategoryData: element });
          }
        });
      }
      if ((ID = 3)) {
        this.state.topicsData.forEach(element => {
          if (element.TopicID === this.state.selectedTopicID) {
            this.setState({ selectedPaperTopicData: element });
          }
        });
      }
      if ((ID = 4)) {
        this.state.ScenarioData.forEach(element => {
          if (element.ScenarioID === this.state.selectedScenarioID) {
            this.setState({ selectedScenarioData: element });
          }
        });
      }
    };

    this.setID = (fucntionId, Id) => {
      if (fucntionId === 0) {
        this.setState({ selectedQuestionID: parseInt(Id, 10) });
      }
      if (fucntionId === 1) {
        this.setState({ selectedModuleID: parseInt(Id, 10) });
      }
      // Category ID Set ------
      if (fucntionId === 2) {
        this.setState(
          {
            selectedCategoryID: Id !== null ? parseInt(Id, 10) : null,
            selectedTopicID: null,
            selectedQuestionID: null,
            selectedPaperTopicData: null,
            selectedPaperCategoryData: null
          },
          () => {
            if (Id !== null) {
              this.FetchTopicData();
              this.FetchQuestionData(2);
              this.getSelectedData(2);
            } else {
              this.FetchQuestionData(0);
            }
          }
        );
      }
      // Topic ID ----- set
      if (fucntionId === 3) {
        this.setState({ selectedTopicID: parseInt(Id, 10) }, () => {
          this.FetchQuestionData(1);
          this.getSelectedData(3);
        });
      }
      // Paper ID ----- set
      if (fucntionId === 4) {
        this.setState(
          {
            selectedPaperID: Id !== null ? parseInt(Id, 10) : null
            // selectedCategoryID: null,
            // selectedTopicID: null,
            // selectedQuestionID: null,
            // selectedPaperCategoryData: null,
            // selectedPaperTopicData: null,
            // // selectedScenarioID: null,
            // // selectedScenarioData: null
          },
          () => {
            // this.FetchCategoryData();
            //this.FetchSenarioData();
            if (Id === null) {
              this.setState({ selectedPaperTypeData: null });
            } else {
              this.getSelectedData(1);
            }
            this.FetchQuestionData(0);
          }
        );
      }

      // Scenario ID ----- set
      if (fucntionId === 5) {
        this.setState(
          {
            selectedScenarioID: Id !== null ? parseInt(Id, 10) : null
          },
          () => {
            this.getSelectedData(4);
            this.FetchQuestionData(0);
          }
        );
      }
    };

  this.doPublish = () => {
      
        var postData = {
          selectedPaperID: this.state.selectedPaperID
        };
  
        let axiosConfig = {
          headers: {
            Accept: "application/json"
          }
        };
  
        axios
          .put(
            config.HOST_CONFIG.BACK_END_API_MAPPER_URL +
      config.BASE_PATH.PAPER_TYPE_SERVICE_BASE_PATH +
      "publish/",
            postData,
            axiosConfig
          )
          .then(res => {
            if (res.status === 200) {              
              this.props.Notification(
                "tr",
                "success",
                "Paper published successfully",
                "pe-7s-speaker"
              );
              
            }
            if (res.status === 400) {
              
              this.props.Notification(
                "tr",
                "error",
                "Error while publishing the paper ",
                "pe-7s-speaker"
              );
            }
          })
          .catch(err => {
            console.log("AXIOS ERROR: ", err);
            this.props.Notification(
              "tr",
              "error",
              "Service have been gone offline. ",
              "pe-7s-speaker"
            );
          })
          .finally(() => {
            // this.setState({
            //   uploading: true
            // });
          });
      // }
    };

    // Filter Question Data ------------------------------------------
    this.FilterQuestionData = QuestionList => {
      let questionData = [];
      
      let ScenarioID = this.state.selectedScenarioID;
      let Version =
        this.state.selectedPaperTypeData === null
          ? null
          : this.state.selectedPaperTypeData.Version;
      console.log(ScenarioID, Version);
      QuestionList.forEach(CurrentQuestion => {
        // notnull and null
        if (ScenarioID !== null && Version === null) {
          if (CurrentQuestion.ScenarioID === ScenarioID) {
            questionData.push(CurrentQuestion);
          }
        } else if (ScenarioID === null && Version !== null) {
          if (CurrentQuestion.VersionList.split(",").includes(Version)) {
            questionData.push(CurrentQuestion);
          }
        } else if (ScenarioID !== null && Version !== null) {
          if (
            CurrentQuestion.VersionList.split(",").includes(Version) &&
            CurrentQuestion.ScenarioID === ScenarioID
          ) {
            questionData.push(CurrentQuestion);
          }
        } else {
          console.log("Call");
          questionData.push(CurrentQuestion);
        }
      });
      this.setState({ questionData, QuestionLoading: false });
      console.log("-----------------------------------------");
    };
    // --------------------------------------------------------------
    // Fetch Data ---------------------------------------------------
    // PaperType
    this.FetchPaperTypeData = () => {
      let axiosConfig = {
        headers: {
          Accept: "application/json"
        }
      };
      let url =
        config.HOST_CONFIG.BACK_END_API_MAPPER_URL +
        config.BASE_PATH.PAPER_TYPE_SERVICE_BASE_PATH +
        this.state.selectedModuleID;
      this.setState({ PaperTypeLoading: true });
      axios
        .get(url, axiosConfig)
        .then(res => {
          console.log("RESPONSE RECEIVED: ", res);
          if (res.status === 200) {
            this.setState({
              paperTypeData: res.data.length === 0 ? [] : res.data,
              PaperTypeLoading: false
            });
          } else {
            this.setState({ PaperTypeLoading: false });
          }
        })
        .catch(err => {
          this.setState({ PaperTypeLoading: false });
        });
    };

    // Category Data
    this.FetchCategoryData = () => {
      let axiosConfig = {
        headers: {
          Accept: "application/json"
        }
      };
      let url =
        config.HOST_CONFIG.BACK_END_API_MAPPER_URL +
        config.BASE_PATH.CATEGORY_SERVICE_BASE_PATH +
        this.state.selectedModuleID;
      this.setState({ CategoryLoading: true });
      axios
        .get(url, axiosConfig)
        .then(res => {
          console.log("RESPONSE RECEIVED: ", res);
          if (res.status === 200) {
            this.setState({ categoryData: res.data, CategoryLoading: false });
          } else {
            this.setState({
              CategoryLoading: false
            });
          }
        })
        .catch(err => {
          this.setState({
            CategoryLoading: false,
            isError: true
          });
        });
    };
    // Topic Data
    this.FetchTopicData = () => {
      let axiosConfig = {
        headers: {
          Accept: "application/json"
        }
      };
      let url =
        config.HOST_CONFIG.BACK_END_API_MAPPER_URL +
        config.BASE_PATH.TOPIC_SERVICE_BASE_PATH +
        this.state.selectedModuleID +
        "/" +
        this.state.selectedCategoryID;
      this.setState({ TopicLoading: true });
      axios
        .get(url, axiosConfig)
        .then(res => {
          // console.log("RESPONSE RECEIVED: ", res);
          if (res.status === 200) {
            console.log(res.data.length);
            this.setState({
              topicsData: res.data,
              TopicLoading: false
            });
          } else {
            this.setState({ TopicLoading: false });
          }
        })
        .catch(err => {
          this.setState({ TopicLoading: false });
        });
    };

    // Question Data
    this.FetchQuestionData = value => {
      let axiosConfig = {
        headers: {
          Accept: "application/json"
        }
      };
      // use for refresh question after update
      if (value === 0) {
        if (this.state.selectedTopicID != null) {
          value = 1;
        } else if (this.state.selectedCategoryID != null) {
          value = 2;
        } else {
          value = 3;
        }
      }

      // Normal procedure
      let url =
        config.HOST_CONFIG.BACK_END_API_MAPPER_URL +
        config.BASE_PATH.QUESTION_SERVICE_BASE_PATH;

      // Topic Level Filter
      if (value === 1) {
        url =
          url +
          "Filter/Topics/" +
          this.state.selectedModuleID +
          "/" +
          this.state.selectedCategoryID +
          "/" +
          this.state.selectedTopicID +
          "/" +
          this.props.QuestionType;
      }
      // Category Level Filter
      if (value === 2) {
        url =
          url +
          "Filter/Category/" +
          this.state.selectedModuleID +
          "/" +
          this.state.selectedCategoryID +
          "/" +
          this.props.QuestionType;
      }
      // Module Level Filter
      if (value === 3) {
        url =
          url +
          "Filter/Module/" +
          this.state.selectedModuleID +
          "/" +
          this.props.QuestionType;
      }

      this.setState({ QuestionLoading: true });
      console.log(url);
      axios
        .get(url, axiosConfig)
        .then(res => {
          // console.log("RESPONSE RECEIVED: ", res);
          if (res.status === 200) {
            this.FilterQuestionData(res.data["Questions"]);
          } else {
            this.setState({ QuestionLoading: false });
            console.log("Some thing wrong");
          }
        })
        .catch(err => {
          console.log(err);
          this.setState({ QuestionLoading: false });
        });
    };

    // Scenario Fetching
    this.FetchSenarioData = () => {
      console.log("call this Fetch Senario data -------------------------");
      let axiosConfig = {
        headers: {
          Accept: "application/json"
        }
      };
      let url =
        config.HOST_CONFIG.BACK_END_API_MAPPER_URL +
        config.BASE_PATH.SCENARIO_SERVICE_BASE_PATH +
        "All/" +
        this.state.selectedModuleID;
      this.setState({
        ScenarioLoading: true
      });
      axios
        .get(url, axiosConfig)
        .then(res => {
          console.log("RESPONSE RECEIVED: ", res);
          if (res.status === 200) {
            this.setState(
              { ScenarioData: res.data, ScenarioLoading: false },
              () => {
                this.getSelectedData(4);
              }
            );
            this.console.log(res.data);
          } else {
            this.setState({
              ScenarioLoading: false
            });
          }
        })
        .catch(err => {
          this.setState({
            ScenarioLoading: false,
            isError: true
          });
        });
    };
  }

  // Remove Function
  // Paper Type Remove functions
  PaperTypeDeactive = PaperTypeID => {
    let axiosConfig = {
      headers: {
        Accept: "application/json"
      }
    };

    axios
      .get(
        config.HOST_CONFIG.BACK_END_API_MAPPER_URL +
          config.BASE_PATH.PAPER_TYPE_SERVICE_BASE_PATH +
          "Toggle/" +
          PaperTypeID,
        axiosConfig
      )
      .then(res => {
        //console.log("RESPONSE RECEIVED: ", res);
        if (res.status === 200) {
          this.setState(
            {
              // function id 2
              selectedCategoryID: null,
              // function id 3
              selectedTopicID: null,
              // function id 4
              selectedPaperID: null,
              PaperTypeDeleteAlertShow: false
            },
            () => {
              this.FetchPaperTypeData();
              console.log("Call Fetch");
            }
          );

          this.props.handleClick(
            "tr",
            "success",
            "Paper Type has been removed successfully",
            "pe-7s-speaker"
          );
        }
        if (res.status === 400) {
          this.setState({
            ToggleStateMessage: "Bad Request From Front End"
          });
        }
      })
      .catch(err => {
        this.setState({
          ToggleStateMessage:
            "Service down check the Server or Check your Connection  "
        });
      });
  };

  //Delete Alert Handle
  // use for Paper Type Alert
  PaperTypeDeleteAlertOpen = () =>
    this.setState({ PaperTypeDeleteAlertShow: true });

  PaperTypeDeleteAlertClose = () =>
    this.setState({ PaperTypeDeleteAlertShow: false });

  componentDidMount() {
    this.FetchCategoryData();
    this.FetchPaperTypeData();
    this.FetchSenarioData();
  }

  render() {
    return (
      <Col sm={12} md={12}>
        <PaperTypeByGoogle
          show={this.state.showGoogleMainModal}
          handleHide={this.toggleGoogleSheetInsertModalShow}
          Notification={this.props.Notification}
          dataFetch={this.dataFetch}
          //Module Details
          ModuleName={this.props.ModuleName}
          ModuleID={this.props.ModuleID}
          ProductID={this.props.ProductID}
          ProductName={this.props.ProductName}
          QuestionType={this.props.QuestionType}
          // -----------------function -----------
          FetchPaperTypeData={() => this.FetchPaperTypeData()}
        />

        {/* Paper Type Insert Drawer */}
        <PaperInsert
          show={this.state.showPaperTypeInsertForm}
          handleHide={this.toggleShowPaperTypeInsertForm}
          dataFetch={this.FetchPaperTypeData}
          Notification={this.props.Notification}
          ModuleID={this.props.ModuleID}
          ProductID={this.props.ProductID}
        />

        {/* Paper Type Edit Drawer */}
        <PaperEdit
          show={this.state.showPaperTypeEditForm}
          handleHide={this.toggleShowPaperTypeEditForm}
          dataFetch={this.FetchPaperTypeData}
          Notification={this.props.Notification}
          ModuleID={this.props.ModuleID}
          ProductID={this.props.ProductID}
          SelectedPaperTypeID={this.state.selectedPaperID}
          SelectedPaperTypeData={this.state.selectedPaperTypeData}
        />
        {/* Category Insert Edit Drawer */}
        <CategoryInsert
          show={this.state.showCategoryInsertForm}
          handleHide={this.toggleShowCategoryInsertForm}
          dataFetch={this.FetchCategoryData}
          Notification={this.props.Notification}
          ModuleID={this.props.ModuleID}
        />
        <CategoryEdit
          show={this.state.showCategoryEditForm}
          handleHide={this.toggleShowCategoryEditForm}
          dataFetch={this.FetchCategoryData}
          Notification={this.props.Notification}
          ModuleID={this.props.ModuleID}
          CategoryData={this.state.selectedPaperCategoryData}
        />
        <TopicInsert
          show={this.state.showTopicInsertForm}
          handleHide={this.toggleShowTopicInsertForm}
          dataFetch={this.FetchTopicData}
          Notification={this.props.Notification}
          ModuleID={this.props.ModuleID}
          CategoryID={this.state.selectedCategoryID}
        />
        <TopicEdit
          show={this.state.showTopicEditForm}
          handleHide={this.toggleShowTopicEditForm}
          dataFetch={this.FetchTopicData}
          Notification={this.props.Notification}
          ModuleID={this.props.ModuleID}
          TopicData={this.state.selectedPaperTopicData}
          CategoryID={this.state.selectedCategoryID}
        />

        <div autoFocus className={"card"}>
          <div className={"header"}>
            <div className="pull-left">
              <ul className="bp3-breadcrumbs">
                <li>
                  <a
                    className="bp3-breadcrumb"
                    onClick={this.props.TogglePaperWizadMode}
                  >
                    <small>Modules</small>
                  </a>
                </li>

                <li>
                  <a className="bp3-breadcrumb">
                    <small>{this.props.ModuleName}</small>
                  </a>
                </li>
              </ul>
            </div>
            <div className="pull-right">
              <Button
                minimal={true}
                icon={"cross"}
                onClick={this.props.TogglePaperWizadMode}
              />
            </div>
          </div>
          <div className={"content"}>
            <div
              className="row"
              style={{
                marginTop: "-10px",
                margin: "auto",

                background: "white"
              }}
            >
              <Col
                className="col-sm-12"
                style={{
                  paddingRight: "0px",
                  paddingLeft: "0px"
                }}
              >
                <div
                  style={{
                    width: "100%",
                    marginTop: "4px",
                    border: "1px solid lightgray",
                    background: "white",
                    borderRadius: "3px"
                  }}
                >
                  {/* Paper Type ------------------------------------------------------------------------------ */}
                  <div style={{ background: "#EFEEEE" }}>
                    <Row style={{ padding: "2px" }}>
                      {this.state.selectedModuleID != null && (
                        <Col sm={12}>
                          <PaperTypeDeleteAlert
                            isOpen={this.state.PaperTypeDeleteAlertShow}
                            handleCancel={this.PaperTypeDeleteAlertClose}
                            handleMoveConfirm={() =>
                              this.PaperTypeDeactive(this.state.selectedPaperID)
                            }
                            PaperTypeName={this.state.paperTypeData.NameOfPaper}
                          />
                          <ButtonGroup
                            minimal={true}
                            disabled={this.state.selectedModuleID === null}
                          >
                            <Button disabled={true} width="100px">
                              <h6 className=".bp3-heading .bp3-text-muted">
                                Papers
                              </h6>
                            </Button>
                            <Button
                              icon="add"
                              onClick={this.toggleShowPaperTypeInsertForm}
                            >
                              Add New
                            </Button>
                            <Button
                              icon="panel-table"
                              onClick={this.toggleGoogleSheetInsertModalShow}
                            >
                              Add Question Pool
                            </Button>
                            <Divider />
                            <Popover
                              content={
                                <Menu>
                                  {this.state.selectedPaperTypeData && (
                                    <MenuItem
                                      disabled={
                                        this.state.selectedPaperID === null
                                      }
                                      icon={
                                        this.state.selectedPaperTypeData
                                          .PublishState !== "PUBLISHED"
                                          ? "share"
                                          : "ban-circle"
                                      }
                                      intent={
                                        this.state.selectedPaperTypeData
                                          .PublishState === "PUBLISHED"
                                          ? "danger"
                                          : "success"
                                      }
                                      text={
                                        this.state.selectedPaperTypeData
                                          .PublishState !== "PUBLISHED"
                                          ? "Published"
                                          : "Unpublished"
                                      }
                                      onClick={this.doPublish}
                                    />
                                  )}
                                  <MenuItem
                                    disabled={
                                      this.state.selectedPaperID === null &&
                                      this.state.selectedPaperTypeData === null
                                    }
                                    onClick={this.toggleShowPaperTypeEditForm}
                                    icon="edit"
                                    text="Edit"
                                  />
                                  <MenuItem
                                    disabled={
                                      this.state.selectedPaperID === null
                                    }
                                    icon="trash"
                                    intent="danger"
                                    text="Delete"
                                    onClick={this.PaperTypeDeleteAlertOpen}
                                  />
                                </Menu>
                              }
                              position={Position.RIGHT_TOP}
                            >
                              <Button
                                icon="cog"
                                text="Setting"
                                rightIcon="caret-down"
                              />
                            </Popover>
                            <Button
                              icon="refresh"
                              onClick={this.FetchPaperTypeData}
                            >
                              Refresh
                            </Button>
                          </ButtonGroup>
                        </Col>
                      )}
                    </Row>
                    <Row>
                      <Col sm={12} style={{ height: "103px" }}>
                        <PaperList
                          selectedModuleID={this.state.selectedModuleID}
                          paperTypeData={this.state.paperTypeData}
                          setID={this.setID}
                          loading={this.state.PaperTypeLoading}
                        />
                      </Col>
                    </Row>
                  </div>
                  {/* End Paper Type ------------------------------------------------------------------ */}
                  <hr style={{ margin: "2px" }} />
                  {/* Category view----------------------------------------------------------------------- */}
                  <Row style={{ padding: "2px" }}>
                    <Col sm={12}>
                      <ButtonGroup minimal={true}>
                        <Button disabled={true}>
                          <h6 className=".bp3-heading .bp3-text-muted">
                            Categories
                          </h6>
                        </Button>
                        <Button
                          icon="add"
                          onClick={this.toggleShowCategoryInsertForm}
                        >
                          Add New
                        </Button>
                        <Popover
                          content={
                            <Menu>
                              <MenuItem
                                disabled={
                                  this.state.selectedCategoryID === null
                                }
                                onClick={this.toggleShowCategoryEditForm}
                                icon="edit"
                                text="Edit"
                              />
                              <MenuItem
                                disabled={
                                  this.state.selectedCategoryID === null
                                }
                                icon="trash"
                                intent="danger"
                                text="Delete"
                              />
                            </Menu>
                          }
                          position={Position.RIGHT_TOP}
                        >
                          <Button
                            icon="cog"
                            text="Setting"
                            rightIcon="caret-down"
                          />
                        </Popover>
                      </ButtonGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} style={{ height: "86px" }}>
                      <CategoryList
                        selectedModuleID={this.state.selectedModuleID}
                        categoryData={this.state.categoryData}
                        setID={this.setID}
                        loading={this.state.CategoryLoading}
                      />
                    </Col>
                  </Row>

                  {/* End Category ---------------------------------------------------------------- */}
                  <hr style={{ margin: "2px" }} />
                  {/* Topic View --------------------------------------------------------------------- */}
                  <Row style={{ padding: "2px" }}>
                    <Col sm={12}>
                      <ButtonGroup minimal={true}>
                        <Button disabled={true}>
                          <h6 className=".bp3-heading .bp3-text-muted">
                            Topics
                          </h6>
                        </Button>
                        <Button
                          icon="add"
                          disabled={this.state.selectedCategoryID === null}
                          onClick={this.toggleShowTopicInsertForm}
                        >
                          Add New
                        </Button>
                        <Popover
                          content={
                            <Menu>
                              <MenuItem
                                disabled={this.state.selectedTopicID === null}
                                icon="edit"
                                text="Edit"
                                onClick={this.toggleShowTopicEditForm}
                              />
                              <MenuItem
                                disabled={this.state.selectedTopicID === null}
                                icon="trash"
                                intent="danger"
                                text="Delete"
                              />
                            </Menu>
                          }
                          position={Position.RIGHT_TOP}
                        >
                          <Button
                            icon="cog"
                            text="Setting"
                            rightIcon="caret-down"
                          />
                        </Popover>
                      </ButtonGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12} style={{ height: "86px" }}>
                      <TopicsList
                        selectedPaperID={this.state.selectedPaperID}
                        selectedCategoryID={this.state.selectedCategoryID}
                        topicsData={this.state.topicsData}
                        setID={this.setID}
                        loading={this.state.TopicLoading}
                      />
                    </Col>
                  </Row>
                  {/* End Topic View */}

                  {/* Scenario View --------------------------------------------------------------------- */}
                  {this.props.QuestionType === "SCENARIO_BASE" && (
                    <div style={{ background: "#EFEEEE" }}>
                      <hr style={{ margin: "2px" }} />

                      <Row style={{ padding: "2px" }}>
                        <Col sm={12}>
                          <ButtonGroup minimal={true}>
                            <Button disabled={true} width="100px">
                              <h6 className=".bp3-heading .bp3-text-muted">
                                Scenarios
                              </h6>
                            </Button>
                            <Button icon="add" title="for add new Scenario">
                              Add New
                            </Button>
                            {/* <Button
                              title="More Inforomation"
                              icon="more"
                              disabled={this.state.selectedScenarioID === null}
                            /> */}
                          </ButtonGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col sm={12} style={{ height: "86px" }}>
                          <ScenarioList
                            selectedPaperID={this.state.selectedPaperID}
                            ScenarioData={this.state.ScenarioData}
                            setID={this.setID}
                            loading={this.state.ScenarioLoading}
                          />
                        </Col>
                      </Row>
                    </div>
                  )}
                  {/* Scenario End View--------------------------------------------------------------------- */}
                </div>
              </Col>
            </div>

            {this.state.selectedScenarioData !== null &&
              this.state.selectedScenarioID !== null && (
                <Col sm={12} md={12}>
                  <ScenarioEdit
                    show={this.state.showScenarioEditForm}
                    onClose={this.toggleShowScenarioEditForm}
                    data={this.state.selectedScenarioData}
                    ScenarioID={this.state.selectedScenarioID}
                    dataFetch={this.FetchSenarioData}
                    Notification={this.props.Notification}
                  />
                  {/* <ScenarioInsert
                    show={this.state.showScenarioForm}
                    onClose={this.toggleShowScenarioEditForm}
                    data={this.state.selectedScenarioData}
                    ScenarioID={this.state.selectedScenarioID}
                    dataFetch={this.FetchSenarioData}
                    Notification={this.props.Notification}
                  /> */}
                  <div className="row" style={{ paddingTop: "10px" }}>
                    <div autoFocus className={"card"}>
                      <div className={"header"}>
                        <div className="pull-left">
                          <p className="category"> Scenario Viewer</p>
                        </div>
                        <div className="pull-right">
                          <ButtonGroup>
                            <Button
                              minimal={true}
                              title=" For Edit Selected senario details"
                              icon={"edit"}
                              onClick={this.toggleShowScenarioEditForm}
                            />
                            <Button
                              minimal={true}
                              title=" For show Selected senario details"
                              icon={
                                this.state.isOpen
                                  ? "chevron-up"
                                  : "chevron-down"
                              }
                              onClick={() => {
                                this.setState({ isOpen: !this.state.isOpen });
                              }}
                            />
                          </ButtonGroup>
                        </div>
                      </div>
                      <br />
                      <Collapse isOpen={this.state.isOpen}>
                        <hr />
                        <div className="content">
                          <Row>
                            <Col sm={12}>
                              <b>Scenario: </b>
                            </Col>
                          </Row>
                          <Row>
                            <Col sm={12}>
                              {renderHTML(
                                this.state.selectedScenarioData.Scenario
                              )}
                            </Col>
                          </Row>
                          <br />
                          <Row>
                            <Col sm={12}>
                              {" "}
                              <b>Image:</b>
                            </Col>
                            <Col sm={12}>
                              {this.state.selectedScenarioData.OtherContent !==
                              null ? (
                                <img
                                  // className="zoom"
                                  style={{
                                    border: "1px solid #ddd",
                                    border_radius: "4px",
                                    width: "100px"
                                  }}
                                  alt="Question Other Content"
                                  src={
                                    this.state.selectedScenarioData.OtherContent
                                  }
                                />
                              ) : (
                                <p className="category">No Image Data</p>
                              )}
                            </Col>
                          </Row>
                        </div>
                      </Collapse>
                      <br />
                    </div>
                  </div>
                </Col>
              )}

            {/* Question View --------------------------------------------- */}
            <div className="row" style={{ paddingTop: "5px" }}>
              <div>
                <QuestionManagerView
                  questionData={this.state.questionData}
                  QuestionLoading={this.state.QuestionLoading}
                  FetchQuestionData={this.FetchQuestionData}
                  setID={this.setID}
                  selectedData={[
                    this.state.selectedPaperTypeData,
                    this.state.selectedPaperCategoryData,
                    this.state.selectedPaperTopicData
                  ]}
                  selectedIDs={[
                    this.state.selectedModuleID,
                    this.state.selectedPaperID,
                    this.state.selectedCategoryID,
                    this.state.selectedTopicID,
                    this.state.selectedScenarioID
                  ]}
                  ModuleID={this.props.ModuleID}
                  TopicID={this.state.selectedTopicID}
                  ProductID={this.props.ProductID}
                  //Identify PaperType
                  QuestionType={this.props.QuestionType}
                  // Notification Handle
                  Notification={this.props.Notification}
                />
              </div>
            </div>

            {/* End Question View ----------------------------------------- */}
          </div>
          <div className="clearfix" />
        </div>
      </Col>
    );
  }
}

export default PaperManagerView;

// Delete alert Message
function PaperTypeDeleteAlert(props) {
  return (
    <Alert
      cancelButtonText="Cancel"
      confirmButtonText="Move to Trash"
      icon="trash"
      intent={Intent.DANGER}
      isOpen={props.isOpen}
      onCancel={props.handleCancel}
      onConfirm={props.handleMoveConfirm}
    >
      <p>
        Are you sure you want to move <b>{props.PaperTypeName}</b> to Trash? You
        will be not able to restore it later.
      </p>
    </Alert>
  );
}
