import React, { Component } from "react";
import { Col } from "react-bootstrap";
import {
  ButtonGroup,
  Switch,
  Popover,
  Menu,
  Button,
  Position,
  MenuItem,
  Classes,
  H5,
  Tag
} from "@blueprintjs/core";

import ModuleEdit from "./Form/Module/ModuleEdit";

import PaperManagerView from "./PaperManager/PaperManagerView";
// import Constants
import config from "../../variables/Constants";
export class ModuleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paperWizadShow: false,
      checked: false,
      showEditMode: false,
      ModuleName: this.props.repo.ModuleName,
      ModuleID: this.props.repo.ModuleID,
      ProductName: this.props.Product,
      ProductID: this.props.ProductID
    };

    this.TogglePaperWizadMode = () => {
      this.setState({ paperWizadShow: !this.state.paperWizadShow });

      this.props.PaperWizadIDSet(
        !this.state.paperWizadShow === true ? this.state.ModuleID : null
      );
      this.props.PaperWizadModuleName(this.state.ModuleName);
      //console.log(this.props.PaperWizadOpen);
    };
  }
  toggleEditMode = () => {
    this.setState({ showEditMode: !this.state.showEditMode });
  };

  render() {
    var ModuleCardView;

    if (!this.state.paperWizadShow) {
      if (this.props.PaperWizadID === null) {
        // View Mode

        ModuleCardView = (
          <Col sm={6} md={6} lg={4}>
            <div className={"card"}>
              <div className={"header"}>
                <div className="pull-left">
                  <H5 className="title">
                    <b>
                      {this.props.title.slice(0, 25)}
                      {this.props.title.length > 25 && "..."}
                    </b>
                  </H5>
                  <p className="category">{this.props.category}</p>
                </div>
                <div className="pull-right">
                  <ButtonGroup minimal={true}>
                    <Button
                      icon="database"
                      onClick={() => this.TogglePaperWizadMode()}
                    >
                      Paper Manager
                    </Button>
                    <Popover
                      content={<ModuleMenu OpenEdit={this.toggleEditMode} />}
                      position={Position.RIGHT_TOP}
                    >
                      <Button icon="cog" rightIcon="caret-down" />
                    </Popover>
                  </ButtonGroup>
                </div>
              </div>

              <div className="clearfix" />

              <div className="content">
                <div>
                  <h6>ID : {this.props.id}</h6>
                  <h6>Product : {this.props.Product}</h6>
                  <Tag intent="success">
                    {this.props.QuestionType + " Question Type"}
                  </Tag>
                </div>
                <br />
                <div className="footer">
                  <Switch
                    defaultChecked={this.props.IsActive === 1}
                    onChange={() =>
                      this.props.ToggleModuleState(this.state.ModuleID)
                    }
                  />
                </div>
              </div>
            </div>
          </Col>
        );
      }
    } else {
      ModuleCardView = (
        <PaperManagerView
          TogglePaperWizadMode={this.TogglePaperWizadMode}
          ModuleID={this.state.ModuleID}
          ModuleName={this.state.ModuleName}
          ProductName={this.props.Product}
          ProductID={this.props.ProductID}
          QuestionType={this.props.QuestionType}
          Notification={this.props.Notification}
        />
      );
    }

    return (
      <div>
        <ModuleEdit
          show={this.state.showEditMode}
          handleHide={this.toggleEditMode}
          dataFetch={this.props.dataFetch}
          handleClick={this.props.handleClick}
          // Module Info Pass for Edit Form
          ModuleID={this.state.ModuleID}
          ModuleName={this.props.repo.ModuleName}
          QuestionType={this.props.QuestionType}
          ProductName={this.props.Product}
          ProductID={this.props.repo.ProductID}
          IsEmpty={this.props.repo.IsEmpty}
          // for Motifiacation Handle
          Notification={this.props.Notification}
        />
        {ModuleCardView}
      </div>
    );
  }
}

export default ModuleCard;

function ModuleMenu(props) {
  return (
    <Menu className={Classes.ELEVATION_1}>
      <MenuItem icon="edit" onClick={props.OpenEdit} text="Edit" />
      <MenuItem icon="trash" intent="danger" text="Delete" />
    </Menu>
  );
}
