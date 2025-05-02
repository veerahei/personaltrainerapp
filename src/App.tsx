import './App.css'
import CustomerList from './CustomerList'
import TrainingList from './TrainingList'

import AppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import React from 'react'
import { CalendarView } from './CalendarView'



function App() {

  const [tabValue, setTabValue] = React.useState(0);


  return (
    <>

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">PersonalTrainer</Typography>
        </Toolbar>
      </AppBar>
      {/*Navigation for app */}
      <Tabs value={tabValue} onChange={(_, value) => setTabValue(value)}>
        <Tab label="Customers"></Tab>
        <Tab label="Trainings"></Tab>
        <Tab label="Calendar"></Tab>
      </Tabs>
      {
        tabValue === 0 && < CustomerList /> ||
        tabValue === 1 && < TrainingList /> ||
        tabValue === 2 && <CalendarView />
      }

    </>
  )
}

export default App
