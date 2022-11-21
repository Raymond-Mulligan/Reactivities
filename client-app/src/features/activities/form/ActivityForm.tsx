import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Segment } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';
import { v4 as uuid } from 'uuid';



export default observer(function ActivityForm() {
    const history = useNavigate(); //In react-router-dom v6 useHistory() is replaced by useNavigate() 
    const { activityStore } = useStore();
    const { createActivity, updateActivity, 
        loading, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{ id: string }>();

    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!))
    },[id, loadActivity]); //set dependancy to stop loop


    function handelSubmit() {
        if (activity.id.length === 0 ){
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history(`/activities/${newActivity.id}`))
        } else {
            updateActivity(activity).then(() => history(`/activities/${activity.id}`))
        }
    }


    function handelInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value })
    }
        
    if (loadingInitial) return <LoadingComponent content='Loading activity...' />

    return (
        <Segment clearing>
            <Form onSubmit={handelSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handelInputChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handelInputChange} />
                <Form.Input placeholder='Category' value={activity.category} name='category' onChange={handelInputChange} />
                <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={handelInputChange} />
                <Form.Input placeholder='City' value={activity.city} name='city' onChange={handelInputChange} />
                <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={handelInputChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
            </Form>
        </Segment>
    )
})