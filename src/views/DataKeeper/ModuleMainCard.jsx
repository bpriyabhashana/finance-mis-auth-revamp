import React, { Component } from "react";

export class ModuleMainCard extends Component {
  render() {
    return (
      <div className={"card" + (this.props.plain ? " card-plain" : "")}>
        <div className={"header" + (this.props.hCenter ? " text-center" : "")}>
          <div className="pull-left">
            <h5 className="title">{this.props.title}</h5>
            <p className="category">{this.props.category}</p>
          </div>
          {this.props.showButton && (
            <div className="pull-right">{this.props.buttonSet}</div>
          )}
        </div>

        <div className="clearfix" />
        <div className={"content"}>
          {this.props.content}

          <div className="footer">
            {this.props.legend}

            <div className="stats">
              <i className={this.props.statsIcon} />{" "}
              <small>{this.props.stats}</small>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModuleMainCard;
