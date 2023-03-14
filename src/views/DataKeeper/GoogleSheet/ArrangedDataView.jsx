import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import CategoryList from "./List/CategoryList";
import TopicList from "./List/TopicList";
import ScenarioList from "./List/ScenarioList";
import VersionList from "./List/VersionList";
import QuestionList from "./List/QuestionList";
import {
  getQuestionSet,
  getQuestionSetScenario,
  getTopics
} from "./helpers/util";

import { Tag, Card, Elevation } from "@blueprintjs/core";

class ArrangedDataView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //-------
      CategoryName: null,
      CategoryIndex: null,
      // Topics Details
      TopicName: null,
      TopicIndex: null,
      // Scenario Details
      ScenarioName: null,
      ScenarioIndex: null,
      // Version Details
      VersionName: "All",
      VersionIndex: "All",
      // Question Data
      QuestionData: null,
      // Uploading
      Uploading: false,
      TopicList: []
    };
  }
  TopicNameAndIndex = (Name, Index) => {
    console.log(Name, Index, this.props.ArrangedData.QuestionData);
    this.setState(
      {
        QuestionData: getQuestionSet(
          this.props.ArrangedData.QuestionData,
          Name,
          this.state.VersionName
        ),
        TopicName: Name,
        TopicIndex: Index
        // ScenarioName: null,
        // ScenarioIndex: null
      },
      () => {
        console.log(this.state.QuestionData);
      }
    );
  };
  VersionNameAndIndex = (Name, Index) => {
    this.setState({
      VersionName: Name,
      VersionIndex: Index,
      QuestionData: getQuestionSet(
        this.props.ArrangedData.QuestionData,
        this.state.TopicName,
        Name
      )
    });
    console.log(Name, Index);
  };
  ScenarioIndexAndName = (Name, Index) => {
    this.setState({
      QuestionData: getQuestionSetScenario(
        this.props.ArrangedData.QuestionData,
        this.state.TopicName,
        Name
      ),
      ScenarioName: Name,
      ScenarioIndex: Index
    });
  };

  CategoryNameAndIndex = (Name, Index) => {
    this.setState({
      TopicList: getTopics(this.props.ArrangedData.CategoryData, Name),
      CategoryName: Name,
      CategoryIndex: Index,
      TopicName: null,
      TopicIndex: null,
      ScenarioName: null,
      ScenarioIndex: null
    });
  };
  VerifyData = () => {
    this.setState({
      Uploading: true
    });
    this.props.VerifyData();
    console.log(this.props.ArrangedData);
  };

  render() {
    return (
      <div className={"content"}>
        <Row>
          <Col sm={4}>
            <Card style={{ height: "250px", overflowY: "scroll" }}>
              <h5 className="bp3-heading">Question Pool Details</h5>
              <hr />
              <p className="category">
                <b>Module Name :</b>{" "}
                {this.props.ArrangedData.DescriptionData.ModuleName}
              </p>
              <p className="category">
                <b>Product :</b>{" "}
                {this.props.ArrangedData.DescriptionData.ProductName}
              </p>

              <p className="category">
                {this.props.ArrangedData.DescriptionData.QuestionType ===
                  "MCQ" && <Tag intent="success">MCQ</Tag>}
              </p>
              <p className="category">
                <b>Versions :</b>{" "}
              </p>
              <VersionList
                data={this.props.ArrangedData.DescriptionData.Versions}
                selectedIndex={this.state.VersionIndex}
                VersionNameAndIndex={this.VersionNameAndIndex}
              />
            </Card>
          </Col>
          <Col sm={4}>
            <Card style={{ height: "250px", overflowY: "scroll" }}>
              <h5 className="bp3-heading">Categories</h5>
              <hr />
              <CategoryList
                selectedIndex={this.state.CategoryIndex}
                CategoryNameAndIndex={this.CategoryNameAndIndex}
                data={this.props.ArrangedData.CategoryData}
              />
            </Card>
          </Col>
          <Col sm={4}>
            <Card style={{ height: "250px", overflowY: "scroll" }}>
              <h5 className="bp3-heading">Topics</h5>
              <hr />
              {this.state.CategoryName === null ? (
                <p className="category">Please select a category</p>
              ) : (
                <TopicList
                  data={this.state.TopicList}
                  selectedIndex={this.state.TopicIndex}
                  TopicNameAndIndex={this.TopicNameAndIndex}
                />
              )}
            </Card>
          </Col>
        </Row>

        {this.props.ArrangedData.DescriptionData.QuestionType ===
          "SCENARIO_BASE" && (
          <Row>
            <Col sm={6}>
              <hr />
              <h5>
                <b>
                  <u> SCENARIO</u>
                </b>
              </h5>
              {this.state.ScenarioName === null ? (
                <p className="category">Select a Scenario</p>
              ) : (
                this.props.ArrangedData.ScenarioData[this.state.ScenarioIndex]
                  .Scenario
              )}
              <hr />
            </Col>
            <Col sm={3}>
              <h5>
                <b>
                  <u>Scenario Details</u>
                </b>
              </h5>
              {this.state.TopicName === null ? (
                <p className="category">Please select a Topic</p>
              ) : (
                <ScenarioList
                  data={this.props.ArrangedData.ScenarioData}
                  selectedIndex={this.state.ScenarioIndex}
                  ScenarioIndexAndName={this.ScenarioIndexAndName}
                />
              )}
            </Col>
          </Row>
        )}
        <hr />
        <Row>
          <Col sm={12}>
            <Card
              style={{
                height: "450px",
                overflowY: "scroll",
                overflowX: "hidden",
                background: "#D3D3D3"
              }}
            >
              {this.props.ArrangedData.DescriptionData.QuestionType !==
              "SCENARIO_BASE" ? (
                this.state.TopicIndex === null ? (
                  <InfoMessage InfoMessage="Please select a topic" />
                ) : (
                  <QuestionList
                    data={this.state.QuestionData}
                    QuestionType={
                      this.props.ArrangedData.DescriptionData.QuestionType
                    }
                  />
                )
              ) : this.state.ScenarioIndex === null ? (
                <InfoMessage InfoMessage="Please select a scenario" />
              ) : (
                <QuestionList
                  data={this.state.QuestionData}
                  QuestionType={
                    this.props.ArrangedData.DescriptionData.QuestionType
                  }
                />
              )}
            </Card>
          </Col>
        </Row>
        <hr />
      </div>
    );
  }
}

export default ArrangedDataView;

function InfoMessage(props) {
  return (
    <center>
      <h4>
        <i className="fa fa-info-circle fa" />
        <p className="category">{props.InfoMessage}...</p>
      </h4>
    </center>
  );
}
