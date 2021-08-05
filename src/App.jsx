import React, { useState } from 'react';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import UserData from './userData/components/userData';
import OpenJobList from './openjobs/components/openJobsList';
import {HashRouter as Router} from 'react-router-dom';
import Route from  'react-router-dom/Route';
import {Provider} from 'react-redux'
import openJobStore from './openjobs/reduxStore/reducers/store'
import OpenJobDetails from './openjobs/components/openJobDetails';
import InsertJob from './openjobs/components/insert_components/insertJob';
import EditOpenJobProgress from './openjobs/components/edit_components/editOpenJob';
const Demo = () => {
    return (
        <div className="container-fluid">
            <br />
            <Router>
                <Provider store={openJobStore}>
                    <Route path="/" exact strict render={() => <OpenJobList/>}/>
                    <Route path="/openJobDetail/:openJobID" exact strict render={
                        ({match}) => {
                            const openJobID = match.params.openJobID;
                            return (<OpenJobDetails openJobID={openJobID} />)
                        }
                    } />
                    <Route path="/insertJob" exact strict render={() => <InsertJob/>}/>
                    <Route path="/editJob/:openJobID" exact strict render={
                        ({match}) => {
                            const openJobID = match.params.openJobID;
                            return (<EditOpenJobProgress openJobID={openJobID} />)
                        }
                    } />
                </Provider>
            </Router>
        </div>
    );
};

export default Demo;