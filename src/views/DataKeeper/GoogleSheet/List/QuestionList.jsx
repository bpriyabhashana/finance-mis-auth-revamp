import React from "react";
import { Row, Col } from "reactstrap";
import renderHTML from "react-render-html";
import { Tag } from "@blueprintjs/core";

class QuestionList extends React.Component {
  render() {
    var rows = [];
    this.props.data.map((ins, index) =>
      rows.push(
        <Col key={index} sm={12} md={12}>
          <div autoFocus className={"card"} style={{ width: "100%" }}>
            <div className="content">
              <Row>
                <Col sm={1}>
                  <h3 style={{ margin: "0px 20px", color: "#474747" }}>
                    {("0" + parseInt(index + 1, 10)).slice(-2)}
                  </h3>
                </Col>
                <Col sm={11}>
                  <Row>{renderHTML(ins.Question)}</Row>
                  <Row>
                    {this.props.IsMcq ? (
                      ins.IsMultiple ? (
                        <div>
                          <b>Type : </b>
                          <code>Multiple Selection</code>
                        </div>
                      ) : (
                        <div>
                          <b>Type : </b>
                          <code>Single Selection</code>
                        </div>
                      )
                    ) : (
                      <div />
                    )}
                  </Row>
                  <Row>
                    {ins.NumberOfAnswer ? (
                      <div>
                        <b>Display # Answer : </b>
                        {ins.NumberOfAnswer}
                      </div>
                    ) : (
                      <div />
                    )}
                  </Row>
                  <Row>
                    {ins.IsMultiple ? (
                      <Tag intent="success">Multiple Selection</Tag>
                    ) : (
                      <Tag intent="success">Single Selection</Tag>
                    )}
                  </Row>
                  <Row>
                    <Col style={{ padding: "0px" }} sm={5}>
                      {ins.CreatedBy ? (
                        <div>
                          <b>Created By : </b>
                          {ins.CreatedBy}
                        </div>
                      ) : (
                        <div />
                      )}
                    </Col>
                    <Col sm={7}>
                      {ins.DateCreated ? (
                        <div>
                          <b>Date Created : </b>
                          {ins.DateCreated}
                        </div>
                      ) : (
                        <div />
                      )}
                    </Col>
                  </Row>
                  <Row>
                    <Col style={{ padding: "0px" }} sm={5}>
                      {ins.VerifiedBy ? (
                        <div>
                          <b>Verified By : </b>
                          {ins.VerifiedBy}
                        </div>
                      ) : (
                        <div />
                      )}
                    </Col>
                    <Col sm={7}>
                      {ins.DateVerified ? (
                        <div>
                          <b>Date Verified : </b>
                          {ins.DateVerified}
                        </div>
                      ) : (
                        <div />
                      )}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            {this.props.QuestionType !== "PRACTICAL" && (
              <div className="footer">
                <hr />
                <div style={{ marginLeft: "40px" }}>
                  {ins.Answer.map((Answer, i) => (
                    <h5 key={i}>
                      {Answer.Position > 0 ? Answer.Position : "*"}) &nbsp;{" "}
                      {Answer.Answer}
                      &nbsp;
                      {Answer.IsCorrect && (
                        <i
                          style={{ color: "green" }}
                          className="fa fa-check "
                        />
                      )}
                      &nbsp;
                      {Answer.Position > 0 && (
                        <i
                          style={{ color: "#dd4837" }}
                          className="fa fa-lock"
                        />
                      )}
                    </h5>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Col>
      )
    );
    return (
      <Row>
        {rows.length > 0 ? (
          rows
        ) : (
          <Col sm={12}>
            <div className="bp3-non-ideal-state">
              <div className="bp3-non-ideal-state-visual">
                <span className="bp3-icon bp3-icon-folder-open" />
              </div>
              <h4 className="bp3-heading">No Questions</h4>
              <div>Check Your Google sheet</div>
            </div>
          </Col>
        )}
      </Row>
    );
  }
}

export default QuestionList;
