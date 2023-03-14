import React, { Component } from "react";
import "./non_Selectable.css";

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
    items: this.props.AnswerList
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
    this.setState({ items: temp });
  };

  RemoveAnswer(index) {
    var temp = this.state.items;
    var a = temp.splice(index, 1);
    if (a[0].ID !== undefined) {
      var tempRemove = { ID: a[0].ID };
      this.props.RemoveList.push(tempRemove);
    }
    this.setState({ items: temp });
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
      <h5
        className="noselect"
        style={instance.IsCorrect === 1 ? { color: "green" } : {}}
      >
        {instance.Position > 0 ? instance.Position : "* "}) &nbsp;
        <i
          onClick={() => this.ChangeAnswerState(index, 2)}
          style={{ color: instance.IsCorrect !== 1 ? "#dd4837" : "green" }}
          className={instance.IsCorrect === 1 ? "fa fa-check" : "fa fa-times"}
        />
        &nbsp;
        <DragHandle />
        &nbsp;
        {index + 1 <= this.props.answerLength ? (
          <i
            onClick={() => this.ChangeAnswerState(index, 1)}
            style={{ color: instance.Position > 0 ? "#dd4837" : "green" }}
            className={instance.Position > 0 ? "fa fa-lock " : "fa fa-unlock"}
          />
        ) : (
          <i
            style={{ color: "gray", cursor: "not-allowed" }}
            className={"fa fa-ban "}
          />
        )}
        &nbsp;
        <input
          type="text"
          name=""
          defaultValue={instance.Answer}
          onChange={e => this.ChangeAnswerState(index, 3, e.target.value)}
          id=""
        />
        <i
          onClick={() => this.ChangeAnswerState(index, 5)}
          className={"fa fa-edit"}
        />
        <i
          onClick={() => this.ChangeAnswerState(index, 4)}
          style={{ color: "#dd4837" }}
          className={"fa fa-trash"}
        />
        {instance.ID === undefined && (
          <i style={{ color: "#6094f6" }} className={"fa fa-star"} />
        )}
      </h5>
    ));
    return (
      <div>
        <SortableList
          items={this.state.items}
          onSortEnd={this.onSortEnd}
          useDragHandle={true}
        />
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
