import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ChangeEvent, useState } from 'react';

import { TCustomer, TCustomerData } from './CustomerList';

//Props for EditCustomer function
type TEditCustomerProps = {
    currentCustomer: TCustomerData;
    updateCustomer: (customer: TCustomer, url: string) => void;
}


export default function EditCustomer({ currentCustomer, updateCustomer }: TEditCustomerProps) {//EditCustomer function gets currentCustomer and updateCustomer function as props
    const [open, setOpen] = useState(false);

    //Fill form data with currennt customer's data
    const [customer, setCustomer] = useState({
        firstname: currentCustomer.firstname,
        lastname: currentCustomer.lastname,
        email: currentCustomer.email,
        phone: currentCustomer.phone,
        streetaddress: currentCustomer.streetaddress,
        postcode: currentCustomer.postcode,
        city: currentCustomer.city,
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }

    return (
        <>
            <Button onClick={handleClickOpen}>
                Edit customer
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            updateCustomer({ //updateCustomer function (with fetch) gets modified customer data and current customer's url
                                ...customer,

                            }, currentCustomer._links.self.href)
                            handleClose();
                        },
                    },
                }}
            >
                <DialogTitle>Edit customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="firstname"
                        name="firstname"
                        label="First name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={customer.firstname}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="lastname"
                        name="lastname"
                        label="Last name"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={customer.lastname}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="email"
                        name="email"
                        label="Email"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={customer.email}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="phone"
                        name="phone"
                        label="Phone"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={customer.phone}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="streetaddress"
                        name="streetaddress"
                        label="Street address"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={customer.streetaddress}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="postcode"
                        name="postcode"
                        label="Postcode"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={customer.postcode}
                    />
                    <TextField
                        required
                        margin="dense"
                        id="city"
                        name="city"
                        label="City"
                        type="text"
                        fullWidth
                        variant="standard"
                        onChange={handleChange}
                        value={customer.city}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Update</Button>
                </DialogActions>
            </Dialog>

        </>
    );
}