import React, { Fragment, useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashBard from '../../features/activities/dashboard/ActivityDashboard';


function App() {

  const [activities, setActivties] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {      
      setActivties(response.data);
    })
   
  },[])

  return (
    <>
      <NavBar />
      <Container style={{marginTop: '7em'}}>
        <ActivityDashBard activities={activities} />
      </Container>        
    </>
  );
}

export default App;
