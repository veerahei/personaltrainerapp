import { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import { ColDef } from "ag-grid-community";

import dayjs from "dayjs";


// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

const BASE_URL = 'https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api';


function TrainingList() {

    //Empty array for trainings
    const [trainings, setTrainings] = useState([]);


    //Function to fetch training data
    const fetchTrainings = () => {
        fetch(`${BASE_URL}/gettrainings`)
            .then(response => response.json())
            .then(data => setTrainings(data))
            .catch(error => console.log(error))
    };


    //Define columns for table
    const [columnDefs] = useState<ColDef[]>([
        {
            field: "date",
            filter: true,
            valueFormatter: (params) =>
                dayjs(params.value).format("DD.MM.YYYY hh:mm")
        },
        { field: "duration", filter: true },
        { field: "activity", filter: true },
        {
            headerName: "Customer",
            filter: true,
            valueGetter: (params) =>
                params.data.customer.firstname + " " + params.data.customer.lastname

        }
    ])

    //Use useEffect to call fetchTrainings function
    useEffect(fetchTrainings, []);

    return (
        <>
            <div style={{ width: 1500, height: 700 }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                />
            </div>
        </>
    );
}

export default TrainingList; 