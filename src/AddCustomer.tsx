import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { ChangeEvent, useState } from "react";
import { TCustomer } from "./CustomerList";


type TAddCustomerProps = {
    addCustomer: (customer: TCustomer) => void;
}

export default function AddCustomer({ addCustomer }: TAddCustomerProps) {//Addcustomer takes the addCustomer function (with fetch) as props
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState({ //Collects input data
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        streetaddress: "",
        postcode: "",
        city: "",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //HandleChange saves the input. ChangeEvent<HTMLInputElement> is the type of input. 
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCustomer({ ...customer, [event.target.name]: event.target.value })
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen} style={{ margin: "1em 0" }}>
                Add customer
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            addCustomer({
                                ...customer,
                            })
                            handleClose();
                        },
                    },
                }}
            >
                <DialogTitle>Add customer</DialogTitle>
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
                    <Button type="submit">Add customer</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}