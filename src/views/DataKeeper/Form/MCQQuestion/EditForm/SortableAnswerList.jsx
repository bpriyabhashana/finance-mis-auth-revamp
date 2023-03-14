import React, { Component } from "react";
import "./css/non_Selectable.css";
import { Row, Col } from "reactstrap";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import renderHTML from "react-render-html";
import { ButtonGroup, Button, Divider, Callout } from "@blueprintjs/core";

import {
  SortableContainer,
  SortableElement,
  sortableHandle
} from "react-sortable-hoc";

const DragHandle = sortableHandle(() => (
  <span style={{ cursor: "ns-resize" }}>:::</span>
));
let Temp_EditedAnswer = "Value";
class SortableComponent extends Component {
  state = {
    items: this.props.AnswerList,
    editIndex: null,
    itemLength: this.props.AnswerList.length
    // this use for keep Edit Value of Answer
  };

  addNewAnswer = () => {
    var temp = this.state.items;
    // template Answer
    var newAdded = {
      QuestionID: this.props.QuestionID,
      Answer: "Insert Your Answer",
      IsCorrect: 0,
      Position: null
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

  ChangeTempAnswer = Temp_Answer => {
    Temp_EditedAnswer = Temp_Answer;
    var startChar = Temp_EditedAnswer.startsWith("<p>");
    var endChar = Temp_EditedAnswer.endsWith("</p>"); 
    var lengthOfString = Temp_EditedAnswer.length; 
    if(startChar){
      Temp_EditedAnswer=Temp_EditedAnswer.substring(3,lengthOfString);
    }
    lengthOfString = Temp_EditedAnswer.length; 
    if(endChar){
      Temp_EditedAnswer=Temp_EditedAnswer.substring(0,(lengthOfString-4));
    }
  };

  // use For change answer Position and IsCurrect State
  ChangeAnswerState = (index, selectionID, value) => {
    var temp = this.state.items;
    // Chnage Position
    if (selectionID === 1) {
      temp[index].Position = temp[index].Position === null ? index + 1 : null;
    }
    // Chnage IsCurrect
    if (selectionID === 2) {
      temp[index].IsCorrect = temp[index].IsCorrect ? 0 : 1;
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
        Temp_EditedAnswer = temp[index].Answer;
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
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(
      ({ items }) => ({
        items: array_move(items, oldIndex, newIndex)
      }),
      () => {
        var temp = this.state.items;
        temp.forEach((value, sortindex) => {
          if (value.Position !== null) {
            if (value.Position !== sortindex + 1) {
              temp[sortindex].Position = null;
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
  componentWillReceiveProps(prevProps, state) {
    if (prevProps.answerLength != this.props.answerLength) {
      console.log("Call --------->");
      var temp = this.state.items;
      temp.forEach((value, index) => {
        if (value.Position !== null) {
          if (index + 1 >= this.props.answerLength) {
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
  }

  render() {
    const SortableList = SortableContainer(({ items }) => {
      return (
        <div style={{ cursor: "hand" }}>
          {this.state.items !== undefined && this.state.items.length > 0 ?            
            (items.map((value, ind) => {
              return <SortableItem
                key={ind}
                keyIndex={ind}
                index={ind}
                instance={value}
                disabled={value.Position === ind + 1 ? true : false}
              />
            })
          ) : (
            <Callout intent="danger" icon="info-sign" title={"No Answer Found"}>
              Please Add Answer Set, At least two answer must
            </Callout>
          )}
        </div>
      );
    });

    const SortableItem = SortableElement(({ instance, keyIndex }) => (
      <Row className="noselect">
        <Col sm={2}>
          <ButtonGroup minimal={true}>
            <Button>
              {instance.Position > 0 ? <b> {instance.Position}</b> : "-"}
            </Button>

            <Button
              onClick={() => this.ChangeAnswerState(keyIndex, 2)}
              intent={instance.IsCorrect ? "success" : "danger"}
            >
              <i
                className={instance.IsCorrect ? "fa fa-check" : "fa fa-times"}
              />
            </Button>
            <Button disabled>
              <DragHandle />
            </Button>
            <Button
              disabled={keyIndex + 1 > this.props.answerLength}
              onClick={() => this.ChangeAnswerState(keyIndex, 1)}
              intent={instance.Position > 0 ? "danger" : "success"}
            >
              <i
                className={
                  instance.Position > 0 ? "fa fa-lock " : "fa fa-unlock"
                }
              />
            </Button>
          </ButtonGroup>
        </Col>
        <Col sm={8}>
          {this.state.editIndex === keyIndex ? (
            <ReactQuill
              value={Temp_EditedAnswer}
              formats={SortableComponent.formats}
              onChange={value => this.ChangeTempAnswer(value)}
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
          <div>
            <ButtonGroup minimal={true}>
              {this.state.editIndex === keyIndex && (
                <Button
                  icon="floppy-disk"
                  onClick={() => {
                    this.ChangeAnswerState(keyIndex, 3, Temp_EditedAnswer);
                    this.ChangeAnswerState(keyIndex, 5);
                  }}
                />
              )}
              {this.state.editIndex === keyIndex && <Divider />}
              
               <Divider />
              <Button
                icon={this.state.editIndex === keyIndex ? "cross" : "edit"}
                intent={this.state.editIndex === keyIndex ? "danger" : ""}
                onClick={() => this.ChangeAnswerState(keyIndex, 5)}
              />
              <Divider />
              <Button
                intent="danger"
                icon="trash"
                onClick={() => this.ChangeAnswerState(keyIndex, 4)}
              />
            </ButtonGroup>
          </div>
        </Col>
      </Row>
    ));
    return (
      <div>
        <ButtonGroup minimal={true}>
          <Button icon="add" onClick={() => this.addNewAnswer()}>
            <b>Add Answer</b>
          </Button>
        </ButtonGroup>
        <div>
          <SortableList
            items={this.state.items}
            onSortEnd={this.onSortEnd}
            useDragHandle={true}
          />
        </div>
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
