import { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ICellRendererParams, ModuleRegistry } from 'ag-grid-community';
import { ColDef } from "ag-grid-community";
import Button from "@mui/material/Button";

import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";
import { Dayjs } from "dayjs";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

//Base url
const BASE_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api';

//Define type for customer data with links
export type TCustomerData = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
    _links: {
        self: {
            href: string;
        }
        customer: {
            href: string;
        }
        trainings: {
            href: string;
        }
    }
}

//Define type for plain customer data without links (fe. to add customer)
export type TCustomer = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
}

//Define type for training data, to add training to a customer
export type TTraining = {
    date: Dayjs | null;
    activity: string;
    duration: string;
    customer: string;
}

function CustomerList() {

    //Empty array for customers
    const [customers, setCustomers] = useState<TCustomerData[]>([]);

    //Define columns for table
    const [columnDefs] = useState<ColDef<TCustomerData>[]>([
        { field: "firstname", filter: true },
        { field: "lastname", filter: true },
        { field: "streetaddress", filter: true },
        { field: "postcode", filter: true },
        { field: "city", filter: true },
        { field: "email", filter: true },
        { field: "phone", filter: true },
        {
            cellRenderer: (params: ICellRendererParams) =>
                <AddTraining
                    addTraining={addTraining}
                    customerUrl={params.data._links.self.href}
                />

        },
        {
            cellRenderer: (params: ICellRendererParams<TCustomerData>) =>
                <EditCustomer
                    currentCustomer={params.data as TCustomerData}
                    updateCustomer={updateCustomer}
                />
        },
        {
            field: "_links.self.href",
            headerName: "",
            cellRenderer: (params: ICellRendererParams) => {
                return <Button onClick={() => confirmDelete(params.value)}>Delete</Button>
            }
        }
    ])


    //Function to fetch customer data
    const fetchCustomers = () => {
        fetch(`${BASE_URL}/customers`)
            .then(response => response.json())
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.log(error));
    }
    //Confirm customer deletion
    const confirmDelete = (url: string) => {
        if (window.confirm("Do you want to delete?")) {
            deleteCustomer(url);
        }
    }

    //Handle customer deletion
    const deleteCustomer = (url: string) => {
        const options = {
            method: "DELETE"
        };

        fetch(url, options)
            .then(() => fetchCustomers())
            .catch(error => console.log(error));
    }

    //Add customer. Function gets Customer Data from user. This function only does the fetch. Getting customer data done in another file
    const addCustomer = (customer: TCustomer) => {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer)
        };
        //Make post request
        fetch(`${BASE_URL}/customers`, options)
            .then(() => fetchCustomers()) //If add customer succeeds, fetch all customers
            .catch(error => console.log(error))
    }

    const updateCustomer = (customer: TCustomer, url: string) => {
        const options = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(customer)
        };

        fetch(url, options)
            .then(() => fetchCustomers())
            .catch(error => console.log(error));
    }

    //Addtraining function gets the added training's data as props
    const addTraining = (training: TTraining) => {
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(training)
        }

        fetch(`${BASE_URL}/trainings`, options)
            .then(() => fetchCustomers())
            .catch(error => console.log(error));

    }

    //Use useEffect to call fetchCustomers function
    useEffect(fetchCustomers, []);

    return (
        <>
            <AddCustomer addCustomer={addCustomer} />
            <div style={{ width: 2000, height: 700 }}>
                <AgGridReact<TCustomerData>
                    rowData={customers}
                    columnDefs={columnDefs}
                    getRowId={params => params.data._links.self.href} //Specify rowid for ag grid table. RowId is customers link to itself (that includes customerId). Without this couldn't render the table again after deletion
                />
            </div>
        </>
    )
}

export default CustomerList; 