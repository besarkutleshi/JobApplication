import React, { useState,Component } from 'react';
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
import RegisterUser from './authentication/components/registerUser'
import EmailConfirmation from './alerts/components/emailConfirmation';
import ForgotPassword from './authentication/components/forgotPassword';
import ResetPassword from './authentication/components/resetPassword';
import ForgotPasswordEmail from './alerts/components/forgotPasswordConfirmation';
const Demo = () => {

    const componentsMap = { OpenJobList,OpenJobDetails,InsertJob,EditOpenJobProgress };
    const user = useSelector((state) => state.login.user);
    const modulesStore = useSelector((state) => state.module.modules);
    const [modules, setModules] = useState(modulesStore ? modulesStore.length > 0 ? modulesStore : [] : []);

    const routes = modulesStore.map((element,key) => element.menus.map((menu, menuKey) => <ProtectedRoute path={`${menu.url}`} layout={Layout} 
                                    component={componentsMap[`${menu.menuName}`]} auth={user ? user.token != "" ? "true" : "false" : "false"}   />))
    
    return (
        <div>
            <Router>
                <Route path="/" exact strict render={() => <Login />} />
                <Route path="/login" exact strict render={() => <Login />} />
                <Route path="/registerUser" exact strict render={() => <RegisterUser />} />
                <Route path="/notAuthorized" exact strict render={() => <NotAuthorization />} />
                <Route path="/emailConfirmation" exact strict render={() => <EmailConfirmation />} />
                <Route path="/forgotPassword" exact strict render={() => <ForgotPassword />} />
                <Route path="/forgotPasswordConfirmation" exact strict render={() => <ForgotPasswordEmail />} />
                <Route path="/resetPassword/:username/:token" exact strict render={
                    ({match}) => {
                        const username = match.params.username;
                        const token = match.params.token;
                        return (<ResetPassword userName={username} token={token} />)
                    }
                }/>
                {
                    routes
                }
                {/* <ProtectedRoute path="/openJobs" layout={Layout} component={componentsMap['OpenJobList']} 
                    auth={user ? user.token != "" ? "true" : "false" : "false"}  />
                <ProtectedRoute path="/openJobDetail/:openJobID" layout={Layout} component={componentsMap['OpenJobDetails']}  
                    auth={user ? user.token != "" ? "true" : "false" : "false"} />
                <ProtectedRoute path="/insertJob" layout={Layout} component={componentsMap['InsertJob']}  
                    auth={user ? user.token != "" ? "true" : "false" : "false"}/>
                <ProtectedRoute path="/editJob/:openJobID" layout={Layout} component={componentsMap['EditOpenJobProgress']}  
                    auth={user ? user.token != "" ? "true" : "false" : "false"} /> */}
            </Router>
        </div>
    );
};

export default Demo;