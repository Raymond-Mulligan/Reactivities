import React, { Fragment, useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { Container, Header, List } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';


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
      <Container>
        <List style={{marginTop : '7em'}}>
          {activities.map((activity) => (
            <List.Item key={activity.id}>
              {activity.title}
            </List.Item>
          ))}
        </List>
      </Container>
        
    </>
  );
}

export default App;
