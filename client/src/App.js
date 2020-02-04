import React from "react";
import ReactQuill from "react-quill"; // ES6

import Connection from "./Connection";

import "react-quill/dist/quill.snow.css"; // ES6

const Editor = () => {
  const [data, setDelta] = React.useState({});
  const connection = Connection.get("examples", "richtext");

  const handleChange = (delta, oldDelta, source) => {
    console.log("Source:", source);
    if (source !== "user") {
      return;
    }
    connection.submitOp(delta);
    console.log("Delta:", data);
    console.log("oldDelta:", oldDelta);
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
      <ReactQuill value={data} onChange={handleChange} />
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
