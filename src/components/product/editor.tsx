import React from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

export default function MyEditor() {
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty()
    );

    const editor = React.useRef(null);

    return (
        <div
            style={{
                border: "1px solid black",
                minHeight: "6em",
                padding: "10px",
                cursor: "text",
                borderRadius: "4px",
                outline: "none",
            }}
        >
            <Editor
                ref={editor}
                editorState={editorState}
                onChange={setEditorState}
            />
        </div>
    );
}
