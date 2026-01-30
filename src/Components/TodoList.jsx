import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { useContext } from "react";
import { TodosContext } from "../Contexts/todosContext";
import { useEffect } from "react";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);

  const [tileInput, setTitleInput] = useState("");

  const [displayedTodosType, setdisplayedTodosType] = useState("all");

  // Event Handler
  function handleOnAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: tileInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }
  function handleDisplayChange(e) {
    setdisplayedTodosType(e.target.value);
  }
  // End of Event Handler
  const card = (
    <>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography variant="h3" gutterBottom>
          مهامي
        </Typography>
        <Divider variant="middle" />
        <ToggleButtonGroup
          color="primary"
          value={displayedTodosType}
          exclusive
          onChange={handleDisplayChange}
          aria-label="Platform"
          dir="ltr"
        >
          {/* Filter Tags */}
          <ToggleButton value="completed">المنجز</ToggleButton>
          <ToggleButton value="non-Completed">غير المنجز</ToggleButton>
          <ToggleButton value="all">الكل</ToggleButton>
          {/* End of Filter Tags */}
        </ToggleButtonGroup>
      </CardContent>
    </>
  );

  useEffect(() => {
    console.log("Calling UseEffect");
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);

  let todosToRender = todos;

  if (displayedTodosType == "completed") {
    todosToRender = todos.filter((t) => {
      return t.isCompleted;
    });
  } else if (displayedTodosType == "non-Completed") {
    todosToRender = todos.filter((t) => {
      return !t.isCompleted;
    });
  }

  // Mappping todos list to TodoComponent
  const todosjsx = todosToRender.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });
  return (
    <>
      <Container maxWidth="sm" style={{ height: "100vh" }}>
        <Card variant="outlined">
          {card}

          {/* All Todos */}
          {todosjsx}
          {/* End All Todos */}

          {/* Input + Add button */}
          <Grid container spacing={2} style={{ margin: "10px" }}>
            <Grid size={8}>
              <TextField
                fullWidth
                label="إضافة مهمة"
                id="fullWidth"
                value={tileInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              />
            </Grid>
            <Grid size={4}>
              <Button
                variant="contained"
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#ff3d00",
                  fontSize: "24px",
                }}
                disabled={tileInput.length == 0}
                onClick={() => {
                  handleOnAddClick();
                }}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>
          {/* End Input + Add button */}
        </Card>
      </Container>
    </>
  );
}
