import React from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashBard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import { Route, Routes, useLocation} from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import ActivityDetails from '../../features/activities/details/ActivityDetails';


function App() {  
  const location = useLocation();  
  return (
    <>
    {
      location.pathname !== "/" && <NavBar/>
    }      
      <Container style={{marginTop: '7em'}}>      
        <Routes>           
          <Route path='' element={<HomePage/>} />          
          <Route path='/activities' element={<ActivityDashBard/>}/>
          <Route path='/activities/:id' element={<ActivityDetails/>} />          
          <Route path='/createActivity' element={<ActivityForm key={location.key}/>} />
          <Route path='/manage/:id' element={<ActivityForm key={location.key}/>} />          
        </Routes>
      </Container>        
    </>
  );
}

export default observer(App);


