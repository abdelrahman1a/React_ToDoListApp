import "./App.css";
import AddAlertIcon from "@mui/icons-material/AddAlert";
import TodoList from "./Components/TodoList";
import { TodosContext } from "./Contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

const initialTodos = [
  {
    id: uuidv4(),
    title: "sdfd",
    details: "anyt hinsdgd",
    isCompleted: false,
  },
  {
    id: uuidv4(),
    title: "sdfd",
    details: "anyt hinsdgd",
    isCompleted: false,
  },

  {
    id: uuidv4(),
    title: "sdfd",
    details: "anyt hinsdgdssssssssssssssss",
    isCompleted: false,
  },
];

function App() {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TodosContext.Provider value={{ todos: todos, setTodos: setTodos }}>
        <TodoList />
      </TodosContext.Provider>
    </div>
  );
}

export default App;
