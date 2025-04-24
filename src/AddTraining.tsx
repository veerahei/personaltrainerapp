import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ChangeEvent, useState } from 'react';
import { TTraining } from './CustomerList';

//Add training takes the function and the customer url as props
type TAddTrainingProps = {
    addTraining: (training: TTraining) => void;
    customerUrl: string;
}


export default function AddTraining({ addTraining, customerUrl }: TAddTrainingProps) { //Välitetään addTraining funktio jossa tehdään post pyyntö, tähän AddTraining funktioon, jossa lomake on. Välitetään myös customerUrl
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState({ //Collect input data for training in training variable. In form all input types are string
        date: "",
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
                                duration: Number(training.duration), //change duration from string to number
                                customer: customerUrl, //Asetetaan propsina saatu customerUrl customerin arvoksi. Sitä ei lisätä lomakkeella inputtina
                            })
                            handleClose();
                        },
                    },
                }}
            >
                <DialogTitle>Add training</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="date"
                        name="date"
                        label="Date"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={training.date}
                    />
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
