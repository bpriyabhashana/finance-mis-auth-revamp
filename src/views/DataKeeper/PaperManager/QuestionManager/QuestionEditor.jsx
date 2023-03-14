import React from "react";
import LzEditor from "react-lz-editor";
class QuestionEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      htmlContent: this.props.content,
      responseList: []
    };
    this.receiveHtml = this.receiveHtml.bind(this);
  }
  receiveHtml(content) {
    this.props.setEditValue(content);
  }
  render() {
    //let policy = "";
    // const uploadProps = {
    //   action: "http://v0.api.upyun.com/devopee",
    //   onChange: this.onChange,
    //   listType: "picture",
    //   fileList: this.state.responseList,
    //   data: file => {},
    //   multiple: false,
    //   beforeUpload: this.beforeUpload,
    //   showUploadList: true
    // };
    return (
      <LzEditor
        active={true}
        importContent={this.state.htmlContent}
        cbReceiver={this.receiveHtml}
        image={false}
        video={false}
        audio={false}
        removeStyle={false}
        pasteNoStyle={false}
        lang="en"
      />
    );
  }
}
export default QuestionEditor;
