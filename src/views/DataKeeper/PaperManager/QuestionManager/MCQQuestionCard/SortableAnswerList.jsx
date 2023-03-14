import React, { Component } from "react";
import "./non_Selectable.css";
import { Row, Col } from "reactstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import renderHTML from "react-render-html";

import {
  SortableContainer,
  SortableElement,
  sortableHandle
} from "react-sortable-hoc";

const DragHandle = sortableHandle(() => (
  <span style={{ cursor: "ns-resize" }}>:::</span>
));

class SortableComponent extends Component {
  state = {
    items: this.props.AnswerList,
    editIndex: null,
    itemLength: this.props.AnswerList.length
  };

  addNewAnswer = () => {
    var temp = this.state.items;
    // template Answer
    var newAdded = {
      QuestionID: this.props.questionID,
      Answer: "Insert Your Answer",
      IsCorrect: 0,
      Position: null,
      IsActive: 1
    };
    temp.push(newAdded);
    let itemLength = temp.length;
    this.setState({ items: temp, itemLength });
  };

  RemoveAnswer(index) {
    var temp = this.state.items;
    var a = temp.splice(index, 1);
    if (a[0].ID !== undefined) {
      var tempRemove = { ID: a[0].ID };
      this.props.RemoveList.push(tempRemove);
    }
    let itemLength = temp.length;
    this.setState({ items: temp, itemLength });
  }

  // use For change answer Position and IsCurrect State
  ChangeAnswerState = (index, selectionID, value) => {
    var temp = this.state.items;
    // Chnage Position
    if (selectionID === 1) {
      temp[index].Position = temp[index].Position === null ? index + 1 : null;
    }
    // Chnage IsCurrect
    if (selectionID === 2) {
      temp[index].IsCorrect = temp[index].IsCorrect === 1 ? 0 : 1;
    }
    // Change Answer
    if (selectionID === 3) {
      temp[index].Answer = value;
      return;
    }
    if (selectionID === 4) {
      this.RemoveAnswer(index);
    }
    if (selectionID === 5) {
      let editIndex;
      if (this.state.editIndex === index) {
        editIndex = null;
      } else if (this.state.editIndex === null) {
        editIndex = index;
      } else {
        editIndex = index;
      }
      this.setState({
        editIndex
      });
    }
    this.setState({
      items: temp
    });
    console.log(this.state.items);
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(
      ({ items }) => ({
        items: array_move(items, oldIndex, newIndex)
      }),
      () => {
        var temp = this.state.items;
        temp.forEach((value, index) => {
          if (value.Position !== null) {
            if (value.Position !== index + 1) {
              temp[index].Position = null;
            }
          }
        });
        this.setState(
          {
            items: temp
          },
          () => {
            console.log(this.state.items);
          }
        );
      }
    );
  };

  render() {
    const SortableList = SortableContainer(({ items }) => {
      return (
        <div style={{ cursor: "hand" }}>
          {this.state.items !== undefined && this.state.items.length > 0 ? (
            items.map((value, index) => (
              <SortableItem
                key={index}
                index={index}
                instance={value}
                disabled={value.Position === index + 1 ? true : false}
              />
            ))
          ) : (
            <p className="category">No Answer to Display</p>
          )}
        </div>
      );
    });

    const SortableItem = SortableElement(({ instance, index }) => (
      <Row className="noselect">
        <Col sm={2}>
          <h5>
            <span className="fa-stack">
              <strong className="fa-stack">
                {instance.Position > 0 ? instance.Position : "* "}
              </strong>
            </span>
            <i
              onClick={() => this.ChangeAnswerState(index, 2)}
              style={{ color: instance.IsCorrect !== 1 ? "#dd4837" : "green" }}
              className={
                instance.IsCorrect === 1 ? "fa fa-check" : "fa fa-times"
              }
            />
            &nbsp;
            <DragHandle />
            &nbsp;
            {index + 1 <= this.props.answerLength ? (
              <i
                onClick={() => this.ChangeAnswerState(index, 1)}
                style={{ color: instance.Position > 0 ? "#dd4837" : "green" }}
                className={
                  instance.Position > 0 ? "fa fa-lock " : "fa fa-unlock"
                }
              />
            ) : (
              <i
                style={{ color: "gray", cursor: "not-allowed" }}
                className={"fa fa-ban "}
              />
            )}
          </h5>
        </Col>
        <Col sm={8}>
          {this.state.editIndex === index ? (
            <ReactQuill
              value={instance.Answer}
              formats={SortableComponent.formats}
              onChange={value => this.ChangeAnswerState(index, 3, value)}
              modules={SortableComponent.modules}
              theme="snow"
              style={{
                height: "200px",
                paddingBottom: "60px",
                display: "block"
              }}
            />
          ) : (
            <h5>{renderHTML(instance.Answer)}</h5>
          )}
        </Col>
        <Col sm={2}>
          <h5>
            &nbsp;
            <i
              onClick={() => this.ChangeAnswerState(index, 5)}
              className={
                this.state.editIndex === index ? "fa fa-times" : "fa fa-edit"
              }
            />
            &nbsp;
            <i
              onClick={() => this.ChangeAnswerState(index, 4)}
              style={{ color: "#dd4837" }}
              className={"fa fa-trash"}
            />
            &nbsp;
            {instance.ID === undefined && (
              <i style={{ color: "#6094f6" }} className={"fa fa-star"} />
            )}
          </h5>
        </Col>
      </Row>
    ));
    return (
      <div>
        <div>
          <SortableList
            items={this.state.items}
            onSortEnd={this.onSortEnd}
            useDragHandle={true}
          />
        </div>
        <h5>
          <i
            onClick={() => this.addNewAnswer()}
            style={{ color: "#999999", cursor: "Hand" }}
            className="fa fa-plus-circle "
          />
        </h5>
      </div>
    );
  }
}

SortableComponent.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["code"],
    ["clean"]
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false
  }
};
SortableComponent.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "code"
];

export default SortableComponent;

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing
}
