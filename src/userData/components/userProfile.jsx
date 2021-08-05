import React, { useState } from 'react';
import 'antd/dist/antd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap'
import { Form, Input, Button, Space, Radio } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const UserData = () => {

    const [value, setValue] = useState()
    const onFinish = values => {
        console.log('Received values of form:', values.users);
        console.log(value);
    };

    return (
        <div className="container">
            <br />
            <h5 className="text-muted lead">Personal Data</h5>
            <br />
            <div className="row">
                <hr />
                <div className="col-sm-3 mb-2">
                    <input type="text" className="form-control" placeholder="*Name" required />
                </div>
                <div className="col-sm-3 mb-2">
                    <input type="text" className="form-control" placeholder="*Surname" required />
                </div>
                <div className="col-sm-3 mb-2">
                    <input type="text" className="form-control" placeholder="Middle Name" />
                </div>
                <div className="col-sm-3 mb-2">
                    <input type="number" className="form-control" placeholder="*Personal Number" required />
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-sm-3 mb-2">
                    <input type="date" className="form-control" placeholder="BirthDate" required />
                </div>
                <div className="col-sm-3 mb-2">
                    <input type="text" className="form-control" placeholder="Birth Place" required />
                </div>
                <div className="col-sm-3 mb-2">
                    <input type="text" className="form-control" placeholder="Current Country" />
                </div>
                <div className="col-sm-3 mb-2">
                    <input type="text" className="form-control" placeholder="Born Country" required />
                </div>
            </div>
            <br />
            <div className="row">
                <div className="col-sm-3 mb-2">
                    <label htmlFor="">Gender</label>
                    <Radio.Group style={{ marginLeft: "50px" }}>
                        <Radio value={"Male"}>Male</Radio>
                        <Radio value={"Female"}>Female</Radio>
                    </Radio.Group>
                </div>
                <div className="col-sm-3 mb-2">
                    <input type="text" className="form-control" placeholder="Permanent Address" required />
                </div>
                <div className="col-sm-3 mb-2">
                    <PhoneInput
                        className="form-control"
                        placeholder="Phone Number"
                        value={value}
                        onChange={setValue} />
                </div>
                <div className="col-sm-3 mb-2">
                    <input type="text" className="form-control" placeholder="Permanent Address" required />
                </div>
            </div>
            <hr />
            <br />
        </div>
    );
};
export default UserData;