import React from "react";
import { Button } from "reactstrap";

class ScenarioList extends React.Component {
  render() {
    var rows = [];
    this.props.data.map((ins, index) =>
      rows.push(
        <Button
          key={index}
          style={
            this.props.selectedIndex === index
              ? {
                  background: "#afaeae",
                  border: "0px",
                  margin: "3px",
                  padding: "6px"
                }
              : {
                  background: "#eaeaea",
                  border: "0px",
                  margin: "3px",
                  padding: "6px"
                }
          }
          size="sm"
          value={index}
          onClick={() => this.props.ScenarioIndexAndName(ins.Scenario, index)}
        >
          {ins.Scenario}
        </Button>
      )
    );
    return <div>{rows}</div>;
  }
}

export default ScenarioList;
