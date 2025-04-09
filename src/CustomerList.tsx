import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ColDef } from "ag-grid-community"

import { useEffect, useState } from "react";

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
    const [customers, setCustomers] = useState([]);



    //Function to fetch customer data
    const fetchCustomers = () => {
        fetch(`${BASE_URL}/customers`)
            .then(response => response.json())
            .then(data => setCustomers(data._embedded.customers))
            .catch(error => console.log(error));
    }


    //Define columns for table
    const [columnDefs] = useState<ColDef[]>([
        { field: "firstname", filter: true },
        { field: "lastname", filter: true },
        { field: "streetaddress", filter: true },
        { field: "postcode", filter: true },
        { field: "city", filter: true },
        { field: "email", filter: true },
        { field: "phone", filter: true }
    ])


    //Use useEffect to call fetchCustomers function
    useEffect(fetchCustomers, []);

    return (
        <>
            <div style={{ width: 1500, height: 700 }}>
                <AgGridReact<TCustomerData>
                    rowData={customers}
                    columnDefs={columnDefs}
                />
            </div>
        </>
    )
}

export default CustomerList; 