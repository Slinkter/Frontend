import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { EditTodoPage } from "./Edit/EditTodoPage";
import { HomePage } from "./Home/HomePage";
import { NewTodoPage } from "./New/NewTodoPage";

function App() {
  document.title = "React Router";
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/new" element={<NewTodoPage />} />
        <Route path="/edit/:id" element={<EditTodoPage />} />
        <Route path="/*" element={<p>Not found</p>} />
      </Routes>
    </HashRouter>
  );
}

export default App;
