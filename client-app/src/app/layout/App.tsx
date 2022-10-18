import React, { Fragment, useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashBard from '../../features/activities/dashboard/ActivityDashboard';


function App() {

  const [activities, setActivties] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {      
      setActivties(response.data);
    })
   
  },[])

  function handleSelectActivity(id: string) {
    setSelectedActivity(activities.find(x => x.id === id))
  }

  function handleCancelSelectedActivity(){
    setSelectedActivity(undefined);
  }

  function handelFormOpen(id?: string){
    id ? handleSelectActivity(id) : handleCancelSelectedActivity();
    setEditMode(true);
  }

  function handelFormClose(){
    setEditMode(false);
  }

  return (
    <>
      <NavBar openForm={handelFormOpen} />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashBard 
        activities={activities} 
        selectedActivity={selectedActivity}
        selectActivity={handleSelectActivity}
        cancelSelectedActivity={handleCancelSelectedActivity}
        editMode={editMode}
        openForm={handelFormOpen}
        closeForm={handelFormClose}
        />
      </Container>        
    </>
  );
}

export default App;
function find(arg0: (x: any) => boolean): any {
  throw new Error('Function not implemented.');
}

