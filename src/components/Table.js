import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import TaskRow from './TableRow';

export default function TaskTable({ tasks, modifyTaskHandler, removeTaskHandler, modifyTaskListHandler}) {

    return (
        <TableContainer component={Paper} >
            <Table sx={{ minWidth: 650 }} aria-label="task table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Title</TableCell>
                        <TableCell align="center">Description</TableCell>
                        <TableCell align="center">Deadline</TableCell>
                        <TableCell align="center">Priority</TableCell>
                        <TableCell align="center">Is Complete</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tasks.map((task, index) => 
                        <TaskRow {...task} 
                            key = {task.title}
                            modifyIsComplete= {(value) => {
                                tasks[index].isComplete = value;
                                // modifyIsComplete(index, value);
                                modifyTaskListHandler(tasks);
                            }}
                            modifyTaskHandler={() => {
                                modifyTaskHandler(index);
                            }}

                            removeTask={() => {
                                let title = tasks[index].title;
                                tasks.splice(index, 1);
                                removeTaskHandler(tasks, title);
                                
                            }}
                            ></TaskRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}