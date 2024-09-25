/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./MyEditor.css"; // Custom CSS file for additional styling

const MyEditor = () => {
  const [content, setContent] = useState("");

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const handleSubmit = () => {
    // Submit `content` to the server
    console.log(content);
    // Implement your submit logic here
  };

  return (
    <div className="editor-container">
      <CKEditor
        editor={ClassicEditor}
        onChange={handleEditorChange}
        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "blockQuote",
            "MediaEmbed",
            "insertTable",
            "tableColumn",
            "tableRow",
            "mergeTableCells",
            "|",
            "undo",
            "redo",
          ],
          table: {
            contentToolbar: [
              "tableColumn",
              "tableRow",
              "mergeTableCells",
              "imageTextAlternative",
              "|",
              "imageStyle:full",
              "imageStyle:side",
            ],
          },
        }}
      />
      <button className="submit-button" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default MyEditor;
