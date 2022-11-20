import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { Stack, Box } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

const PRIORITY_MAPPING = {
    0: "low",
    1: "med",
    2: "high"
}

export default function TaskRow({title, description, deadline, priority, isComplete, modifyIsComplete, modifyTaskHandler, removeTask}) {
    

    const [isChecked, setIsChecked] = React.useState(isComplete);
    const getDisplayDate = (date) => {
        
        return new Date(date).toLocaleDateString();
    }

    const getButtonStack = () => {

        let buttonStack = [];

        if (!isChecked) {
            buttonStack.push(
                <Box key="updateButton">
                    <Button
                        onClick={modifyTaskHandler}
                        startIcon={<DriveFileRenameOutlineIcon></DriveFileRenameOutlineIcon>}
                        variant="contained"
                        color="primary"
                        sx={{ width: '30%', minWidth: 100 }}>UPDATE</Button>
                </Box>
            );
        }
    
        buttonStack.push(
            <Box key="deleteButton">
                <Button
                    onClick={removeTask}
                    startIcon={<CancelRoundedIcon></CancelRoundedIcon>}
                    variant="contained"
                    color="error"
                    sx={{ width: '30%', minWidth: 100 }}>DELETE</Button>
            </Box>
        );
        return buttonStack;
    }

    

    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell align="center">{title}</TableCell>
            <TableCell align="center">{description}</TableCell>
            <TableCell align="center">{getDisplayDate(deadline)}</TableCell>
            <TableCell align="center">{PRIORITY_MAPPING[priority] ?? "N/A"}</TableCell>
            <TableCell align="center">
                <Checkbox
                    checked={isChecked}
                    onChange={(e) => {
                        setIsChecked(e.target.checked);
                        modifyIsComplete(e.target.checked);
                    }} />
            </TableCell>
            <TableCell align="center">
                <Stack>
                    {getButtonStack()}
                </Stack>

            </TableCell>
        </TableRow>
    )
}