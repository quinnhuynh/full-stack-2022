import './App.css';
import ButtonAppBar from './components/NavBar';
import TaskTable from './components/Table';
import AddTaskModal from './components/AddTaskModal';
import * as React from 'react';
import { Snackbar, Alert } from '@mui/material';

function App() {

  const [taskList, setTaskList] = React.useState([]);
  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const [sampleTask, setSampleTask] = React.useState({
    title: "",
    description: "",
    deadline: new Date().toISOString().substring(0, 10),
    priority: 0,
    isComplete: false
  });
  const [isModifyMode, setIsModifyMode] = React.useState(false);
  const [editIndex, setEditIndex] = React.useState(undefined);
  const [isSnackBarOpen, setSnackBarOpen] = React.useState(false);
  const [snackInfo, setSnackInfo] = React.useState(undefined);
  const [snackPack, setSnackPack] = React.useState([]);

  React.useEffect(() => {
    if (snackPack.length && !snackInfo) {
      // Set a new snack when we don't have an active one
      setSnackInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));  
      setSnackBarOpen(true);
    } else if (snackPack.length && snackInfo && isSnackBarOpen) {
      // Close an active snack when a new one is added
      setSnackBarOpen(false);
    }
  }, [snackPack, snackInfo, isSnackBarOpen]);

  const submitTask = (task) => {
    taskList.push(task);
    setTaskList(taskList);
    setSnackPack((prev) => [...prev, { message: `${task.title} task submitted successfully!`, key: new Date().getTime() }]);
  };

  const handleSnackExit = () => {
    setSnackInfo(undefined);
  };

  const closeSnackBar = (event, reason) => {
    if(reason === 'clickaway') {
      return ;
    }
    setSnackBarOpen(false);
  }

  const validator = (task) => {
    let validatorObj = {};

    validatorObj.validTitle = true;
    validatorObj.validDesc = true;

    if (task.description.length <= 0) {
      validatorObj.validDesc = false;
      validatorObj.descErrorMessage = "Description is Required!";
    }

    if(!isModifyMode) {
      
      if(task.title.length <= 0) {
        validatorObj.validTitle = false;
        validatorObj.titleErrorMessage = "Title is Required!";
      }

      if(!taskList.every((e) => e.title !== task.title)) {
        validatorObj.validTitle = false;
        validatorObj.titleErrorMessage = "Title is repeated!";
      }
    }
    return validatorObj;
  }

  return (
    <div >
      <ButtonAppBar addTask={() => {
        setIsModifyMode(false);
        setAddModalOpen(true);
      }} ></ButtonAppBar>
      <TaskTable tasks={taskList}
        modifyTaskListHandler={(tasks) => { 
          setTaskList([...tasks]) ;
        }}
        removeTaskHandler={(tasks, title) => {
          setTaskList([...tasks]);
          setSnackPack((prev) => [...prev, { message: `${title} task deleted successfully!`, key: new Date().getTime() }]);
        }}
        modifyTaskHandler={(index) => {
          setIsModifyMode(true);
          setSampleTask(taskList[index]);
          setAddModalOpen(true);
          setEditIndex(index);
        }}
      ></TaskTable>
      <AddTaskModal
        key={sampleTask.title}
        
        isOpen={addModalOpen}
        closeModal={() => {
          setAddModalOpen(false);   
          setSampleTask({
            title: "",
            description: "",
            deadline: new Date().toISOString().substring(0, 10),
            priority: 0,
            isComplete: false
          });
        }}
        modifyTaskHandler={(task) => {
          taskList[editIndex] = task;
          setTaskList(taskList);
          setSnackPack((prev) => [...prev, { message: `${task.title} task modified successfully!`, key: new Date().getTime() }]);
        }}
        addTaskHandler={submitTask}
        {...sampleTask}
        isModify={isModifyMode}
        submitValidation={validator}
      ></AddTaskModal>
      <Snackbar 
      key={snackInfo ? snackInfo.key : undefined}
      open={isSnackBarOpen} 
      autoHideDuration={6000} 
      onClose={closeSnackBar}
      TransitionProps={{ onExited: handleSnackExit }}>
        <Alert onClose={closeSnackBar} severity="success" sx={{ width: '100%' }}>
          {snackInfo ? snackInfo.message : "placeholder"}
        </Alert>
      </Snackbar>
    </div>

  );
}

export default App;
