import React, { Fragment, useEffect, useState } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashBard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../../api/agent';


function App() {

  const [activities, setActivties] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {  
      let activities : Activity[] = [];     
      response.forEach (activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivties(activities);
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

  function handelCreateOrEditActivity(activity: Activity) {
    activity.id 
      ?setActivties([...activities.filter(x => x.id !== activity.id), activity]) 
      :setActivties([...activities, {...activity, id:uuid()}]);
      setEditMode(false);
      setSelectedActivity(activity);
  }

  function handelDeleteActivity(id: string){
    setActivties([...activities.filter(x => x.id !== id)])
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
        createOrEdit={handelCreateOrEditActivity}
        deleteActivity={handelDeleteActivity}
        />
      </Container>        
    </>
  );
}

export default App;


