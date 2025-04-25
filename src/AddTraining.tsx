import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ChangeEvent, useState } from 'react';
import { TTraining } from './CustomerList';

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs, { Dayjs } from 'dayjs';

//AddTraining function takes the addTraining function and the customer url as props
type TAddTrainingProps = {
    addTraining: (training: TTraining) => void;
    customerUrl: string;
}


export default function AddTraining({ addTraining, customerUrl }: TAddTrainingProps) { //AddTraining function takes the addTraining function and the customer url as props
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState<TTraining>({ //Collect input data for training in training variable. In form all input types are string
        date: dayjs(), //save date to training variable as dayjs
        activity: "",
        duration: "",
        customer: ""
    })

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTraining({ ...training, [event.target.name]: event.target.value })
    }

    const handleDateChange = (dateValue: Dayjs | null) => {
        setTraining({ ...training, date: dateValue })
    }


    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add training
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();

                            addTraining({
                                ...training,
                                customer: customerUrl, //Set customerUrl as the customer value in training statevariable. CustomerUrl is passed as props from table, not as user input. 
                            })
                            handleClose();
                        },
                    },
                }}
            >
                <DialogTitle>Add training</DialogTitle>
                <DialogContent>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker
                            label="Date"
                            defaultValue={dayjs()}
                            value={training.date || dayjs()}
                            onChange={dateValue => handleDateChange(dateValue)}

                        />
                    </LocalizationProvider>

                    <TextField
                        required
                        margin="dense"
                        id="activity"
                        name="activity"
                        label="Activity"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={training.activity}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="duration"
                        name="duration"
                        label="Duration"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={training.duration}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add training</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
