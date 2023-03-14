import React from "react";
import ReactQuill from "react-quill"; // ES6

import "react-quill/dist/quill.snow.css";
class QuestionEditor extends React.Component {
  constructor(props) {
    super(props);

    this.state = { text: this.props.content }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState({ text: value });
    this.props.setEditValue(value);
    console.log(value);
  }
  render() {
    return (
      <div>
        <ReactQuill
          value={this.state.text}
          formats={QuestionEditor.formats}
          onChange={this.handleChange}
          modules={QuestionEditor.modules}
          theme="snow"
          style={{ height: "200px", paddingBottom: "60px" }}
        />
      </div>
    );
  }
}
QuestionEditor.modules = {
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
QuestionEditor.formats = [
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
export default QuestionEditor;
