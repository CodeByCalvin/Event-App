import React, { useState, useEffect } from "react";
//Event Listener Code//
/* const App = (event) => {
  const handleKeyDown = (event) => {};
    
  return (
    <div className="container">
      <h1>Event Listener</h1>
    </div>
  );
}; */
//React List user can Update//
// const list = [
//   {
//     id: "a",
//     name: "Brunch",
//   },
//   {
//     id: "b",
//     name: "Meet x at z",
//   },
// ];

const App = () => {
  //API has a dummy list, this isn't needed//

  const [list, setList] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleAdd();
    }
  };

  const handleChange = (event) => {
    setName(event.target.value);
  };

  const handleAdd = () => {
    const newItem = {
      id: Date.now().toString(),
      name: name,
    };

    setList([...list, newItem]);
    setName("");
  };

  const handleDelete = (id) => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <h1>Event Listeners</h1>
      <div>
        <input type="text" value={name} onChange={handleChange} />
        <button type="button" onClick={handleAdd}>
          Add
        </button>
      </div>

      <ul>
        {list.map((event) => (
          <li key={event.id}>
            <span className="Event">{event.name}</span>
            <span className="Action" onClick={() => handleDelete(event.id)}>
              &#10007
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
