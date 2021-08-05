import React, { useState } from 'react';
import { Form, Input, Button, Space,Switch } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const fieldsA = [{name:"Institution",fieldKey:1}]

const UserExperience = () => {


    const onFinish = () => {

    }


    return(
        <div className="container">
            <div className="row">
                <br />
                <hr />
                <h5 className="text-muted lead">Të dhënat për përvojen e punës</h5>
                <br />
                <br />
                <Form name="dynamic_form_nest_item" onFinish={onFinish} autoComplete="on">
                    <Form.List name="Experience">
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, fieldKey, ...restField }) => (
                                    <Space key={key} style={{ display:"block" ,marginBottom: 8,marginLeft:30 }} align="center">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'Institution']}
                                            fieldKey={[fieldKey, 'Institution']}
                                            rules={[{ required: true, message: 'Missing Institution' }]}
                                        >
                                            <Input className="form-control" placeholder="Institution" required/>
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'Position']}
                                            fieldKey={[fieldKey, 'Position']}
                                            rules={[{ required: true, message: 'Missing Position' }]}
                                        >
                                            <Input className="form-control" placeholder="Position" required />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'City']}
                                            fieldKey={[fieldKey, 'City']}
                                            rules={[{ required: true, message: 'Missing City' }]}
                                        >
                                            <Input className="form-control" placeholder="City" required />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'Country']}
                                            fieldKey={[fieldKey, 'Country']}
                                            rules={[{ required: true, message: 'Missing Country' }]}
                                        >
                                            <Input className="form-control" placeholder="Country" required />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            label={"Start Date"}
                                            name={[name, 'StartDate']}
                                            fieldKey={[fieldKey, 'StartDate']}
                                            rules={[{ required: true, message: 'Missing Start Date' }]}
                                        >
                                            <Input type="date" className="form-control" placeholder="Start Date" required />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'EndDate']}
                                            label={"End Date"}
                                            fieldKey={[fieldKey, 'EndDate']}
                                            rules={[{ required: true, message: 'Missing End Date' }]}
                                        >
                                            <Input type="date" className="form-control" placeholder="End Date" required />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'Status']}
                                            fieldKey={[fieldKey, 'Status']}
                                            rules={[{ required: true, message: 'Missing Status' }]}
                                        >
                                            <Switch checkedChildren="OnGoing" unCheckedChildren="NotGoing" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'Description']}
                                            fieldKey={[fieldKey, 'Description']}
                                            rules={[{ required: false }]}
                                        >
                                            <TextArea  className="form-control" placeholder="Responsibilites of this work" />
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Form.Item>
                                    </Space>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Shto Përvojen e punës
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <hr />
            </div>
        </div>
    )


}

export default UserExperience;