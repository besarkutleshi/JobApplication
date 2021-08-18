import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import applicationController from '../controllers/application.controller';
import Loading from '../../loader/components/loader'
import { Switch } from 'antd';
import { addQuestions } from '../reduxStore/action'
import { bindActionCreators } from 'redux';
import {info} from 'react-icons-kit/icomoon/info'
import Icon from 'react-icons-kit'
const ApplicationQuestions = ({ applicationTypeId }) => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.login.user);
    const profile = useSelector((state) => state.profile.profile);
    const addQuestionsStore = bindActionCreators(addQuestions,dispatch);

    const [questions, setQuestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [applicantQuestions, setApplicantQuestions] = useState([]);
    

    const getApplicationQuestions = async () => {
        setIsLoading(true);
        let questionsRes = await applicationController.getQuestions(applicationTypeId);
        if (questionsRes && questionsRes.length > 0) {
            setQuestions(questionsRes);
            let array = [];
            questionsRes.forEach(element => {
                let obj = {id:0, ApplicationId:0, userId:user.userId, aplicantProfileId : profile.id, 
                    questionId: element.id, hasAnswer: 0, answer:'No', insertBy:user.userId, updateBy:user.userId};
                array.push(obj);
            });
            setApplicantQuestions(array);
            addQuestionsStore(array);
        }
        setIsLoading(false);
    }

    const updateApplicantQuestion = (questionId,answerE) => {
        applicantQuestions.forEach(element => {
            if(element.questionId === questionId){
                element.hasAnswer = answerE ? 1 : 0;
                element.answer = answerE ? "Yes" : "No";
            }
        });
        addQuestionsStore(applicantQuestions);
    }

    useEffect(() => {
        const getQuestions = async () => {
            await getApplicationQuestions(applicationTypeId);
        }
        getQuestions();
    }, []);

    if (isLoading) {
        return (
            <Loading />
        )
    }
    else if (questions.length > 0) {
        return (
            <div className="container">
                <div className="row p-2">
                    <div className="col-sm-12">
                      <Icon size={30} icon={info} />  <span className="ml-4">  Other Information </span>
                    </div>
                </div>
                <br />
                {
                    questions.map((element, key) => {
                        return (
                            <div className="row p-2" key={key}>
                                <div className="col-sm-6">
                                    <p style={{color:"black"}}> {element.question1} </p>
                                </div>
                                <div className="col-sm-6">
                                    <Switch onChange={(e) => updateApplicantQuestion(element.id,e)}> </Switch>
                                </div>
                                <br />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
    else {
        return (
            <div className="container-fluid">
                <br /><br />
                <div className="row">
                    <div className="col-sm-12 text-center">
                        Does not have any questions for this application type!
                    </div>
                </div>
            </div>
        )
    }

}

export default ApplicationQuestions;