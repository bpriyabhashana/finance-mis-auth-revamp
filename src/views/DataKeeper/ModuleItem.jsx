import React from "react";
import { ModuleCard } from "./ModuleCard";

class ModuleItem extends React.Component {
  render() {
    return (
      <ModuleCard
        handleCTShow={this.props.handleCTShow}
        statsIcon="fa fa-clock-o"
        CTicon="fa fa-sitemap fa-2x"
        editIcon="fa fa-edit fa-2x"
        BackIcon="fa fa-arrow-left fa-2x"
        BackIconSmall="fa fa-arrow-left"
        SubmitIcon="fa fa-upload   fa-2x"
        addPaper="fa fa-file-text-o fa-2x"
        dataFetch={this.props.dataFetch}
        id={this.props.repo.ModuleID}
        IsActive={this.props.repo.IsActive}
        repo={this.props.repo}
        checkValue={this.props.repo.IsActive}
        title={this.props.repo.ModuleName}
        category={"ID# " + this.props.repo.ModuleID}
        Product={this.props.repo.Product}
        Version={this.props.repo.Version}
        stats={this.props.repo.TimeStamp}
        ToggleModuleState={this.props.ToggleModuleState}
        PaperWizadIDSet={this.props.PaperWizadIDSet}
        PaperWizadID={this.props.PaperWizadID}
        PaperWizadModuleName={this.props.PaperWizadModuleName}
        // Notification Handle
        Notification={this.props.Notification}
      />
    );
  }
}
export default ModuleItem;
