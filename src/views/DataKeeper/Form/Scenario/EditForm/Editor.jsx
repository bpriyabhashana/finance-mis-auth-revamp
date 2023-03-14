import React from "react";
import ReactQuill from "react-quill"; // ES6

import "react-quill/dist/quill.snow.css";
class Editor extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     htmlContent: this.props.content,
  //     responseList: []
  //   };
  //   this.receiveHtml = this.receiveHtml.bind(this);
  // }
  // receiveHtml(content) {
  //   this.props.setEditValue(content);
  // }
  // render() {
  //   return (
  //     <LzEditor
  //       active={true}
  //       importContent={this.state.htmlContent}
  //       cbReceiver={this.receiveHtml}
  //       image={false}
  //       video={false}
  //       audio={false}
  //       removeStyle={false}
  //       pasteNoStyle={false}
  //       lang="en"
  //     />
  //   );
  // }
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
          formats={Editor.formats}
          onChange={this.handleChange}
          modules={Editor.modules}
          theme="snow"
          style={{ height: "500px", paddingBottom: "60px" }}
        />
      </div>
    );
  }
}
Editor.modules = {
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
Editor.formats = [
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
export default Editor;
