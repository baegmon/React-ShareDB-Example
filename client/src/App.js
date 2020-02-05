import React from "react";
import ReactQuill, { Quill } from "react-quill";

// QuillJS Modules
import { ImageDrop } from "quill-image-drop-module";
import MagicUrl from "quill-magic-url";
import BlotFormatter from "quill-blot-formatter";

import Connection from "./Connection";

import "react-quill/dist/quill.snow.css";

const Editor = () => {
  Quill.register("modules/imageDrop", ImageDrop);
  Quill.register("modules/magicUrl", MagicUrl);
  Quill.register("modules/blotFormatter", BlotFormatter);

  const [data, setDelta] = React.useState({});
  const connection = Connection.get("examples", "richtext");

  const modules = {
    imageDrop: true,
    magicUrl: true,
    blotFormatter: {},
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      ["blockquote", "code-block"],
      [{ align: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      ["link", "image", "clean"]
    ]
  };

  const handleChange = (delta, oldDelta, source) => {
    if (source !== "user") {
      return;
    }
    connection.submitOp(delta);
  };

  React.useEffect(() => {
    connection.subscribe(function(error) {
      if (error) {
        console.log("Error:", error);
      }

      // set initial data of the document
      setDelta(connection.data);
      connection.on("op", function(op, source) {
        if (source === true) {
          return;
        }

        setDelta(op);
      });
    });
  }, [connection]);

  return (
    <div>
      <ReactQuill value={data} onChange={handleChange} modules={modules} />
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <Editor />
    </div>
  );
};

export default App;
