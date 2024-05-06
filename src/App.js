import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./components/getuser/User";
import Add from "./components/adduser/Add";
import Edit from "./components/updateuser/Edit";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<User />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/add" element={<Add />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
