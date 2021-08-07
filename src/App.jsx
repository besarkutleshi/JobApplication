import React, { useState } from 'react';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import OpenJobList from './openjobs/components/openJobsList';
import {HashRouter as Router} from 'react-router-dom';
import Route from  'react-router-dom/Route';
import OpenJobDetails from './openjobs/components/openJobDetails';
import InsertJob from './openjobs/components/insert_components/insertJob';
import EditOpenJobProgress from './openjobs/components/edit_components/editOpenJob';
import Login from './authentication/components/login';
import Layout from './layout/layout';
import ProtectedRoute from './protectRoute'
import { useSelector } from 'react-redux'
import NotAuthorization from './errorComponents/components/notAuthorization';
const Demo = () => {

    const user = useSelector((state) => state.login.user);

    return (
        <div>
            <Router>
                <Route path="/login" exact strict render={() => <Login />} />
                <ProtectedRoute path="/openJobs" layout={Layout} component={OpenJobList} auth={user.token != "" ? "true" : "false"}  />
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
                <Route path="/notAuthorized" exact strict render={() => <NotAuthorization />} />
            </Router>
        </div>
    );
};

export default Demo;