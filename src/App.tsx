import './App.css'
import CustomerList from './CustomerList'
import TrainingList from './TrainingList'

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import React from 'react'



function App() {

  const [tabValue, setTabValue] = React.useState(0);


  return (
    <>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">PersonalTrainer</Typography>
        </Toolbar>
      </AppBar>

      <Tabs value={tabValue} onChange={(_, value) => setTabValue(value)}>
        <Tab label="Customers"></Tab>
        <Tab label="Trainings"></Tab>
      </Tabs>
      {
        tabValue === 0 && < CustomerList /> ||
        tabValue === 1 && < TrainingList />
      }

    </>
  )
}

export default App
