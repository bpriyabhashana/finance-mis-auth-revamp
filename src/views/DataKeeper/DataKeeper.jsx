import React, { Component } from "react";
import { Grid, Row } from "react-bootstrap";
import { ModuleMainCard } from "./ModuleMainCard.jsx";
import { ModuleCard } from "./ModuleCard";
import axios from "axios";
import {
  Button,
  ButtonGroup,
  ControlGroup,
  InputGroup,
  HTMLSelect,
  Spinner,
  Divider
} from "@blueprintjs/core";
// import Constants
import config from "../../variables/Constants";
// import Modal
import ModuleInsert from "./Form/Module/ModuleInsert";

class DataKeeper extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      data: [],
      // handdle State
      loaded: false,
      error: false,
      errorMessage: "",
      time: null,

      // For Handle Button Set in ModuleMain card
      buttonSet: null,

      // handle Modal state
      showGoogleMainModal: false,
      paperWizadShow: false,
      PaperWizadID: null,

      showModuleInsertModal: false
    };

    this.PaperWizadIDSet = Value => {
      this.setState({ PaperWizadID: Value });
      console.log("change ", Value);
    };
    this.PaperWizadModuleName = Value => {
      this.setState({ PaperWizadModuleName: Value });
      console.log("change ", Value);
    };
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = () => {
      this.setState({ show: !this.state.show });
    };
    this.toggleshow = () => {
      this.setState({
        GoogleSheetInsertViewShow: !this.state.GoogleSheetInsertViewShow
      });
    };
    // handle CT Hide
    this.handleCTHide = () => {
      this.setState({ CTshow: false });
    };
    // handle CT Show
    this.handleCTShow = this.handleCTShow.bind(this);
  }
  ToggleGoogleSheetInsertView = () => {
    this.setState({
      GoogleSheetInsertViewShow: !this.state.GoogleSheetInsertViewShow
    });
  };
  handleCTShow = ModuleID => {
    this.setState({ CTshow: true, CTModuleID: ModuleID });
  };
  ToggleModuleState = ID => {
    let axiosConfig = {
      headers: {
        Accept: "application/json"
      }
    };

    axios
      .get(
        config.HOST_CONFIG.BACK_END_API_MAPPER_URL +
          config.BASE_PATH.MODULE_SERVICE_BASE_PATH +
          "Toggle/" +
          ID,
        axiosConfig
      )
      .then(res => {
        //console.log("RESPONSE RECEIVED: ", res);
        if (res.status === 200) {
          //this.dataFetch();
          this.props.handleClick(
            "tr",
            "success",
            "Module state has been toggled successfully",
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

  dataFetch = () => {
    let axiosConfig = {
      headers: {
        Accept: "application/json"
      }
    };
    this.setState({
      loaded: false,
      // capture Time
      time: Date(Date.now())
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
            data: res.data,
            loaded: true,
            error: false,
            errorMessage: ""
          });
          this.changeButtonSet(1);
        } else {
          this.setState({
            loaded: true,
            error: true,
            errorMessage: "Data Fetching Error Occured"
          });
          this.changeButtonSet(2);
        }
      })
      .catch(err => {
        this.setState({
          loaded: true,
          error: true,
          errorMessage: "Connection Error Occured"
        });
        this.changeButtonSet(2);
      });
  };

  // change Button Set
  changeButtonSet = selectionID => {
    var buttonSet;
    if (selectionID === 1) {
      buttonSet = (
        <AfterLoadedButtonSet
          handleShow={this.handleShow}
          fetchData={this.fetchData}
        />
      );
    }
    if (selectionID === 2) {
      buttonSet = <ErrorButtonSet fetchData={this.dataFetch} />;
    }
    this.setState({ buttonSet });
  };

  componentDidMount() {
    this.dataFetch();
  }
  handleShow = selectionID => {
    if (selectionID === 1) {
      this.setState({
        showModuleInsertModal: !this.state.showModuleInsertModal
      });
    }
    // Google Sheet Insert Modal View Toggle
    if (selectionID === 2) {
      this.setState({ showGoogleMainModal: !this.state.showGoogleMainModal });
    }
  };
  render() {
    var Content;
    if (this.state.error) {
      Content = <ErrorMessage ErrorMessage={this.state.errorMessage} />;
    } else if (!this.state.loaded) {
      Content = <LoadingMessage />;
    } else {
      Content =
        this.state.data.length > 0 ? (
          <ModuleList
            data={this.state.data}
            handleCTShow={this.handleCTShow}
            dataFetch={this.dataFetch}
            ToggleModuleState={this.ToggleModuleState}
            PaperWizadIDSet={this.PaperWizadIDSet}
            PaperWizadID={this.state.PaperWizadID}
            PaperWizadModuleName={this.PaperWizadModuleName}
            // Notification Handle
            Notification={this.props.handleClick}
          />
        ) : (
          <ModuleEmptyMessage />
        );
    }

    return (
      <div className="content">
        {/* Module Insert Drawer */}
        <ModuleInsert
          show={this.state.showModuleInsertModal}
          handleHide={() => this.handleShow(1)}
          dataFetch={this.dataFetch}
          handleClick={this.props.handleClick}
        />
        <Grid fluid>
          <Row>
            <ModuleMainCard
              title="Modules"
              category="Module Manager"
              content={Content}
              buttonSet={this.state.buttonSet}
              // update time
              stats={this.state.time}
              showButton={this.state.PaperWizadID === null}
            />
          </Row>
        </Grid>
      </div>
    );
  }
}

class ModuleList extends React.Component {
  render() {
    var rows = [];
    this.props.data.map((repo, index) =>
      rows.push(
        <ModuleCard
          key={index}
          handleCTShow={this.props.handleCTShow}
          dataFetch={this.props.dataFetch}
          id={repo.ModuleID}
          IsActive={repo.IsActive}
          repo={repo}
          checkValue={repo.IsActive}
          title={repo.ModuleName}
          ProductID={repo.ProductID}
          Product={repo.ProductName}
          QuestionType={repo.QuestionType}
          stats={repo.TimeStamp}
          ToggleModuleState={this.props.ToggleModuleState}
          PaperWizadIDSet={this.props.PaperWizadIDSet}
          PaperWizadID={this.props.PaperWizadID}
          PaperWizadModuleName={this.props.PaperWizadModuleName}
          dataFetch={this.props.dataFetch}
          // Notification Handle
          Notification={this.props.Notification}
        />
      )
    );
    return <Row>{rows}</Row>;
  }
}

ModuleList.defaultProps = {
  data: []
};

// Start Functional Component---------------------------------------
function LoadingMessage(props) {
  return (
    <center>
      <h4>
        <Spinner size={30} />
        <p className="category">Loading...</p>
      </h4>
    </center>
  );
}

function ErrorMessage(props) {
  return (
    <center>
      <h4>
        <i className="fa fa-exclamation-triangle" />
        <p className="category">{props.ErrorMessage}</p>
      </h4>
    </center>
  );
}
function ErrorButtonSet(props) {
  return (
    <Button minimal={true} onClick={() => props.fetchData()}>
      <i className="fa fa-refresh " title="Refresh" />
    </Button>
  );
}
function AfterLoadedButtonSet(props) {
  console.log(props.show);
  return (
    <div>
      <ControlGroup>
        <HTMLSelect options={["Module Name", "Product Name"]} />
        <InputGroup placeholder="Find filters..." />
        <Button
          icon="arrow-right"
          onClick={() => alert("feature comming soon")}
        />
        <Divider />
        <ButtonGroup minimal={true}>
          <Button icon="add" onClick={() => props.handleShow(1)}>
            Add
          </Button>
          <Button icon="refresh" onClick={props.fetchData}>
            Refresh
          </Button>
          <Button icon="help" onClick={() => alert("feature comming soon")} />
        </ButtonGroup>
      </ControlGroup>
    </div>
  );
}

function ModuleEmptyMessage(props) {
  return (
    <center>
      <h4>
        <i className="fa fa-search" />
        <p className="category">No Module Data To Display</p>
      </h4>
    </center>
  );
}
// End Functional Component -----------------------------------

export default DataKeeper;
