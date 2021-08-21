import React, {useState,useEffect} from 'react'
import kedsAcademy from '../../images/kedsacademy.jpg';
import Icon from 'react-icons-kit'
import {plusSquareO} from 'react-icons-kit/fa/plusSquareO'
import $ from 'jquery'
import {fileText} from 'react-icons-kit/fa/fileText'
import { useSelector } from 'react-redux'
const KedsAcademy = () => {

    
    const user = useSelector((state) => state.login.user);

    const redirectToApplyPage = () => {
        if(user){
            if(user.token){
                if(user.profile){
                    window.location.hash = `/apply/0/3`
                    return;
                }
                window.location.hash = `/createProfile`;
                return;
            }
        }
        window.location.hash = `/login/kedsAcademy/3`;
    }

    return(
        <div className="container">
            {/* <div className="row">
                <div className="col-sm-12">
                    <img src={kedsAcademy} height="100px"/>
                </div>
            </div>
            <br /> */}
            <div className="container card p-4">
                <div className="row">
                    <div className="col-sm-12 mb-4 d-flex justify-content-between">
                        <a href="https://www.keds-energy.com/eng/csr/keds-academy/" target="_blank" className="lead">Learn more about KEDS Academy</a>
                        <button onClick={() => redirectToApplyPage()} className="btn btn-info"><Icon icon={fileText}/> Apply Online</button>
                    </div>
                    <div className="col-sm-12 mb-4">
                        <p style={{color:"#252834",fontWeight:"400",fontSize:"1.125em"}}>KEDS Academy is the most important program in the education sector in Kosovo in 
                            terms of Corporate Social Responsibility activities.
                        </p>
                    </div>
                    <div className="col-sm-12" id="readmore">
                        <p style={{color:"#252834",fontWeight:"400",fontSize:"1.125em"}}>
                        Established by KEDS in 2013, the academy offers interactive training for students of higher education institutions and for students of technical high schools in Kosovo.
                        <br /><br />
                        In close collaboration with the University of Prishtina and Boğaziçi University of Istanbul, one of the most prestigious in the world, KEDS Academy offers advanced training and internship focusing on the electrical engineering sector.
                        <br /><br />
                        Only students and pupils of the last years of studies, the most distinguished in lessons, can apply to this academy. Recipients are trained both theoretically and practically, engaging in various departments of the company, including the field activities and familiarity with energy assets.
                        <br /><br />
                        KEDS Academy serves the participants as a life orientation of their activity, thus becoming a strong basis for their professional and life building.
                        <br /><br />
                        So, the goal of KEDS Academy is to prepare professional staff, in order to help students become successful leaders of tomorrow.
                        <br /><br />
                        Since the beginning of its operation, the Academy has trained hundreds of students and pupils, and some of them have now taken senior management responsibilities in our company, in the energy sector in general, or in other sectors of the country. At the same time, the academy is also helping to alleviate unemployment in the country as it is training participants for the labor market inside and outside Kosovo.
                        <br /><br />
                        KEDS Academy has crossed the borders of Kosovo. The evaluation for this program has been done by many world famous centers. The Academy has received awards in Paris, Washington, Istanbul, London and other countries for the extremely positive impact it has had on Kosovar youth.
                        <br /><br />
                        The academy, as a sustainable project of the company, continues to make a great contribution to the professional education of dozens of young people every year and is considered one of the most advanced programs in the country and further for their preparation for the labor market.
                        <br /><br />
                        KEDS Academy is a bright opportunity for the energetic youth of the country!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default KedsAcademy;