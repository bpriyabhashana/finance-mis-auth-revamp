import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import Card from "../../components/Card/Card";
import { iconsArray } from "../../variables/Variables.jsx";
import { Tabs, Tab, H3, Classes } from "@blueprintjs/core";
import Form from "./form";

class Icons extends Component {
  render() {
    return (
      <div className="content">
        {/* <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="202 Awesome Stroke Icons"
                ctAllIcons
                category={
                  <span>
                    Handcrafted by our friends from{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="http://themes-pixeden.com/font-demos/7-stroke/index.html"
                    >
                      Pixeden
                    </a>
                  </span>
                }
                content={
                  <Row>
                    {iconsArray.map((prop, key) => {
                      return (
                        <Col
                          lg={2}
                          md={3}
                          sm={4}
                          xs={6}
                          className="font-icon-list"
                          key={key}
                        >
                          <div className="font-icon-detail">
                            <i className={prop} />
                            <input type="text" defaultValue={prop} />
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                }
              />
            </Col>
          </Row>
        </Grid> */}
        <Tabs
          animate={true}
          id="TabsExample"
          key={"vertical"}
          // renderActiveTabPanelOnly={this.state.activePanelOnly}
          vertical={false}
        >
          {/* <Tab id="rx" title="React" /> */}
          <Tab id="ng" title="Paper Genarator" panel={<AngularPanel />} />
          <Tab
            id="mb"
            title="Paper Snap Manager"
            // panel={<EmberPanel />}
            panelClassName="ember-panel"
          />
        </Tabs>
      </div>
    );
  }
}

export default Icons;

const AngularPanel = () => (
  <div>
    <H3>Example panel: Angular</H3>
    <Form />
  </div>
);

// const BackbonePanel: React.SFC<{}> = () => (
//   <div>
//     <H3>Backbone</H3>
//   </div>
// );
