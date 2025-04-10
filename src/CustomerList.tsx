import { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ICellRendererParams, ModuleRegistry } from 'ag-grid-community';
import { ColDef } from "ag-grid-community";
import Button from "@mui/material/Button";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

//Base url
const BASE_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api';

//Define type for customer data
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

    //Use useEffect to call fetchCustomers function
    useEffect(fetchCustomers, []);

    return (
        <>
            <div style={{ width: 1500, height: 700 }}>
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