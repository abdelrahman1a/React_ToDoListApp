import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ModeIcon from "@mui/icons-material/Mode";
import CheckIcon from "@mui/icons-material/Check";
import "../App.css";

import { useContext } from "react";
import { TodosContext } from "../Contexts/todosContext";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useState } from "react";
import TextField from "@mui/material/TextField";

export default function Todo({ todo }) {
  const { todos, setTodos } = useContext(TodosContext);

  // Event Handlers
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      return t.id == todo.id ? { ...t, isCompleted: !t.isCompleted } : t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  function handleDeleteClick() {
    setAlertDelete(true);
  }
  function handleClose() {
    setAlertDelete(false);
  }
  function handleConfirmation() {
    const updatedTodos = todos.filter((t) => {
      return t.id != todo.id;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleEditClick() {
    setAlertEdit(true);
  }
  function handleEditClose() {
    setAlertEdit(false);
  }
  function handleConfirmationEdit() {
    const editedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        return {
          ...t,
          title: getEditedTask.title,
          details: getEditedTask.details,
        };
      }
      return t;
    });
    setTodos(editedTodos);
    setAlertEdit(false);
    localStorage.setItem("todos", JSON.stringify(editedTodos));
  }
  //End  Event Handlers

  // const open = false;
  const [showAlertDelete, setAlertDelete] = useState(false);
  const [showAlertEdit, setAlertEdit] = useState(false);
  const [getEditedTask, setEditedTask] = useState({
    title: todo.title,
    details: todo.details,
  });

  const card = (
    <>
      <CardContent
        sx={{
          textAlign: "right",
          backgroundColor: "blue",
          marginTop: "10px",
        }}
      >
        <Grid container spacing={2}>
          <Grid size={8}>
            <Typography
              variant="h5"
              sx={{
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              {todo.title}
            </Typography>
            <Typography variant="h6">{todo.details}</Typography>
          </Grid>
          <Grid
            size={4}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            {/* Start Check Icon */}
            <IconButton
              aria-label="delete"
              sx={{ background: todo.isCompleted ? "green" : "white" }}
              className="iconhover"
              onClick={() => {
                handleCheckClick();
              }}
            >
              <CheckIcon
                style={{
                  fontSize: "25px",
                  color: todo.isCompleted ? "white" : "#00e676",
                }}
              />
            </IconButton>
            {/*End Check Icon */}

            {/* Start Edit Icon */}
            <IconButton
              aria-label="delete"
              sx={{ background: "white" }}
              className="iconhover"
              onClick={handleEditClick}
            >
              <ModeIcon style={{ fontSize: "25px", color: "#2196f3" }} />
            </IconButton>
            {/* End Edit Icon */}

            {/* backgroundColor: "red" */}
            <IconButton
              aria-label="delete"
              sx={{ background: "white" }}
              className="iconhover"
              onClick={handleDeleteClick}
            >
              <DeleteIcon style={{ fontSize: "25px", color: "#ff3d00" }} />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </>
  );
  return (
    <>
      {/* Delete Dialog */}
      <Dialog
        open={showAlertDelete}
        // onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        dir="rtl"
      >
        <DialogTitle id="alert-dialog-title">
          هل تريد بالتأكيد حذف هذه المهمة؟
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>إغلاق</Button>
          <Button autoFocus onClick={handleConfirmation}>
            نعم، متأكد من الحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* End  Delete Dialog */}

      {/* Start Edit Dialog */}
      <Dialog open={showAlertEdit} onClose={handleEditClose} dir="rtl">
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          <DialogContentText></DialogContentText>
          <form id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="text"
              label="عنوان المهمة"
              type="text"
              fullWidth
              variant="standard"
              value={getEditedTask.title}
              onChange={(e) => {
                setEditedTask({ ...getEditedTask, title: e.target.value });
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="text"
              label="تفاصيل المهمة"
              type="text"
              fullWidth
              variant="standard"
              value={getEditedTask.details}
              onChange={(e) => {
                setEditedTask({ ...getEditedTask, details: e.target.value });
              }}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>الغاء</Button>
          <Button onClick={handleConfirmationEdit}>تأكيد التعديل</Button>
        </DialogActions>
      </Dialog>
      {/* End Edit Dialog */}

      <Card
        variant="outlined"
        sx={{
          border: "none",
          color: "white",
          margin: "10px",
        }}
      >
        {card}
      </Card>
    </>
  );
}
