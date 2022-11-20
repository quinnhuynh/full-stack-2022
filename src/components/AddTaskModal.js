import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { AppBar, Toolbar } from '@mui/material';
import { Stack } from '@mui/system';
import { TextField } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import NotInterestedIcon from '@mui/icons-material/NotInterested';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '30%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    maxWidth: '200'
};

export default function AddTaskModal({
    isOpen,
    closeModal,
    addTaskHandler,
    modifyTaskHandler,
    isModify,
    title,
    description,
    deadline,
    priority,
    isComplete,
    submitValidation
}) {

    const [taskTitle, setTaskTitle] = React.useState(title);
    const [taskDescription, setTaskDescription] = React.useState(description);
    const [taskDeadline, setTaskDeadline] = React.useState(deadline);
    const [taskPriority, setTaskPriority] = React.useState(priority);
    const [isTitleValid, setIsTitleValid] = React.useState(true);
    const [isDescValid, setIsDescValid] = React.useState(true);
    const [titleErrMess, setTitleErrMess] = React.useState(undefined);
    const [descErrMess, setDescErrMess] = React.useState(undefined);

    const closingModal = () => {
        setTaskTitle(title);
        setTaskDescription(description);
        setTaskDeadline(deadline);
        setTaskPriority(priority);
        closeModal();
    }

    const submit = () => {

        let validatorObj = submitValidation({
            title: taskTitle,
            description: taskDescription
        });

        if (validatorObj.validTitle && validatorObj.validDesc) {
            if (!isModify) {
                addTaskHandler({
                    title: taskTitle,
                    description: taskDescription,
                    deadline: taskDeadline,
                    priority: taskPriority,
                    isComplete: isComplete,
                });

            }
            else {
                modifyTaskHandler({
                    title: taskTitle,
                    description: taskDescription,
                    deadline: taskDeadline,
                    priority: taskPriority,
                    isComplete: isComplete,
                });
            }
            closingModal();
        }
        else {
            setIsDescValid(validatorObj.validDesc);
            setIsTitleValid(validatorObj.validTitle);
            setDescErrMess(validatorObj.descErrorMessage);
            setTitleErrMess(validatorObj.titleErrorMessage);
        }
    }

    const cancel = () => {
        closingModal();
    }

    const getButtonStack = () => {
        let buttonStack = [];
        buttonStack.push(
            <Button key="cancel-button"
                onClick={() => cancel()}
                startIcon={<NotInterestedIcon></NotInterestedIcon>}
                sx={{ width: '30%', minWidth: 100 }}
                variant="contained"
                color="error">
                CANCEL
            </Button>);

        if (!isModify) {
            buttonStack.push(
                <Button key="add-button"
                    onClick={() => submit()}
                    startIcon={<AddCircleIcon></AddCircleIcon>}
                    sx={{ width: '30%', minWidth: 100 }}
                    variant="contained"
                    color="primary">
                    ADD
                </Button>
            );
        }
        else {
            buttonStack.push(
                <Button key="edit-button"
                    onClick={() => submit()}
                    startIcon={<DriveFileRenameOutlineIcon></DriveFileRenameOutlineIcon>}
                    sx={{ width: '30%', minWidth: 100 }}
                    variant="contained"
                    color="primary">
                    EDIT
                </Button>
            );
        }
        return buttonStack;
    }

    const getFormStack = () => {
        let formStack = [];
        if (!isModify) {
            formStack.push(
                <TextField key="title-edit"
                    error={!isTitleValid}
                    required
                    id="add-title"
                    label="Title"
                    value={taskTitle}
                    onChange={(e) => {
                        setTaskTitle(e.target.value);
                        if (e.target.value.length === 0) {
                            setIsTitleValid(false);
                            setTitleErrMess("Title is Required!");
                        }
                        else {
                            setIsTitleValid(true);
                            setTitleErrMess(undefined);
                        }
                    }}
                    helperText={titleErrMess}
                    type="text"
                />);
        }
        formStack.push(<TextField
        key="description-edit"
            error={!isDescValid}
            required
            id="add-description"
            label="Description"
            value={taskDescription}
            onChange={(e) => {
                setTaskDescription(e.target.value);
                if (e.target.value.length === 0) {
                    setIsDescValid(false);
                    setDescErrMess("Description is Required!");
                }
                else {
                    setIsDescValid(true);
                    setDescErrMess(undefined);
                }
            }}
            helperText={descErrMess}
            type="text"
        />);
        formStack.push(<TextField
        key="deadline-edit"
            required
            id="add-deadline"
            label="Deadline"
            value={taskDeadline}
            onChange={(e) => setTaskDeadline(e.target.value)}
            // helperText="Invalid Deadline"
            type="date"
        />);
        formStack.push(<FormControl key="priority-edit">
            <FormLabel id="add-priority">Priority</FormLabel>
            <RadioGroup
                row
                aria-labelledby="add-priority"
                name="add-priority-group"
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value)}
            >
                <FormControlLabel value={0} control={<Radio />} label="Low" />
                <FormControlLabel value={1} control={<Radio />} label="Medium" />
                <FormControlLabel value={2} control={<Radio />} label="High" />
            </RadioGroup>
        </FormControl>);
        return formStack;
    }

    return (<Modal
        open={isOpen}
        onClose={closingModal}
        aria-labelledby="add-task-modal"
        aria-describedby="a form to create a new task"
    >
        <Box sx={style}>
            <Stack spacing={1}>
                <AppBar position="sticky">
                    <Toolbar>
                        {isModify ?
                            <DriveFileRenameOutlineIcon></DriveFileRenameOutlineIcon>

                            :
                            <AddCircleIcon></AddCircleIcon>

                        }
                        {isModify ?
                            <Typography variant="h6" component="div">
                                EDIT TASK
                            </Typography>
                            :
                            <Typography variant="h6" component="div">
                                ADD TASK
                            </Typography>
                        }
                    </Toolbar>
                </AppBar>
                <Stack sx={{ padding: '5%' }} spacing={1}>
                    {getFormStack()}
                    <Stack direction="row-reverse" spacing={2}>
                        {getButtonStack()}
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    </Modal>)
}