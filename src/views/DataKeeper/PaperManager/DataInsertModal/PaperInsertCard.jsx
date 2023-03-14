import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

export class PaperInsertCard extends Component {
  render() {
    return (
      <div
        className="card "
        style={{
          background: "#dddddd",
          margin: "0px",
          position: "absolute",
          zIndex: "99 ",
          width: "100%",
          height: "100%"
        }}
      >
        <div className={"header" + (this.props.hCenter ? " text-center" : "")}>
          <div className="pull-left">
            <h5 className="title">{this.props.title}</h5>
            <p className="category">{this.props.category}</p>
          </div>
        </div>
        <br />
        <div className="content">
          <Row>
            <Form>
              <Col sm={12} md={2}>
                <FormGroup>
                  <Input
                    name="Owner"
                    id="Owner"
                    placeholder="Paper Type Name  "
                    pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={2}>
                <FormGroup>
                  <Input
                    name="Owner"
                    id="Owner"
                    placeholder="Number Of Question"
                    pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={2}>
                <FormGroup>
                  <Input
                    name="Owner"
                    id="Owner"
                    placeholder="Time For Paper"
                    pattern="^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$"
                    required
                  />
                </FormGroup>
              </Col>
              <Col sm={12} md={3}>
                <FormGroup style={{ marginTop: "10px" }}>
                  <Input name="Check" id="check" type="checkbox" required />
                  <Label for="Check">
                    {"   "}
                    <b>
                      {" "}
                      This is MCQ Paper/(don't check this is Practical Paper)
                    </b>
                  </Label>
                </FormGroup>
              </Col>
              <Col sm={12} md={2}>
                <Button
                  onClick={this.handleSubmit}
                  color="white"
                  style={{ marginTop: "3px" }}
                >
                  Submit
                </Button>
              </Col>
            </Form>
          </Row>
        </div>
      </div>
    );
  }
}

export default PaperInsertCard;
