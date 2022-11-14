import React, { Fragment, useEffect, useState } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashBard from '../../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from 'uuid';
import agent from '../../api/agent';
import LoadingComponent from './LoadingComponent';


function App() {

  const [activities, setActivties] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    agent.Activities.list().then(response => {  
      let activities : Activity[] = [];     
      response.forEach (activity => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      })
      setActivties(activities);
      setLoading(false);
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
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then( () => {
        setActivties([...activities.filter(x => x.id !== activity.id), activity]) 
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivties([...activities, activity])
        setSelectedActivity(activity);
        setEditMode(false);
        setSubmitting(false);
      })
    }
    // activity.id 
    //   ?setActivties([...activities.filter(x => x.id !== activity.id), activity]) 
    //   :setActivties([...activities, {...activity, id:uuid()}]);
    //   setEditMode(false);
    //   setSelectedActivity(activity);
  }

  function handelDeleteActivity(id: string){
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivties([...activities.filter(x => x.id !== id)])
      setSubmitting(false);
    })
  }

  if (loading) return <LoadingComponent content='Loading App' />

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
        submitting={submitting}
        />
      </Container>        
    </>
  );
}

export default App;


