import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor, EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const MyEditorComponent = (props: EditorProps) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    return (
        <Editor
            wrapperStyle={{ border: "1px solid #000" }}
            editorStyle={{ padding: "0px 12px", maxHeight: 300 }}
            {...props}
        />
    );
};

export default MyEditorComponent;
