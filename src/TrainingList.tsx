import { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ICellRendererParams, ModuleRegistry } from 'ag-grid-community';
import { ColDef } from "ag-grid-community";

import dayjs from "dayjs";
import { Button } from "@mui/material";


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
                dayjs(params.value).format("DD.MM.YYYY hh:mm A")
        },
        { field: "duration", filter: true },
        { field: "activity", filter: true },
        {
            headerName: "Customer",
            filter: true,
            valueGetter: (params) =>
                params.data.customer.firstname + " " + params.data.customer.lastname
        },
        {
            field: "id",
            headerName: "",
            cellRenderer: (params: ICellRendererParams) => {
                return <Button onClick={() => confirmDelete(params.value)}>Delete</Button>
            } //Delete functionality uses id to get the specific training. In GET/gettrainings request the id is a plain value, not a link
        }
    ])

    const confirmDelete = (id: number) => {
        if (window.confirm("Do you want to delete?")) {
            deleteTraining(id);
        }
    }

    const deleteTraining = (id: number) => {
        const options = {
            method: "DELETE"
        };

        fetch(`${BASE_URL}/trainings/${id}`, options)
            .then(() => fetchTrainings())
            .catch(error => console.log(error))

    }


    //Use useEffect to call fetchTrainings function
    useEffect(fetchTrainings, []);

    return (
        <>
            <div style={{ width: 1500, height: 700 }}>
                <AgGridReact
                    rowData={trainings}
                    columnDefs={columnDefs}
                    getRowId={params => params.data.id}
                />
            </div>
        </>
    );
}

export default TrainingList; 