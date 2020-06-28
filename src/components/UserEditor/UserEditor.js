import React, { useState } from 'react';
import { Form, Input, Button, Result } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import axios from 'axios';
import { Link } from 'react-router-dom';
import classes from './UserEditor.module.css';

const UserEditor = (props) => {

  const [success, setSuccess] = useState(false);

  const layout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 18,
    },
  };
  const tailLayout = {
    wrapperCol: { offset: 6, span: 18 },
  };

  const onFinish = values => {
    const id = props.match.params.id;
    const url = `https://reqres.in/api/users/${id}`;
    const user = {
      job: values.Job,
      name: values.name,
    }

    axios.put(url, user)
      .then((response) => {
        if (response.status === 200) {
          console.log(response);
          setSuccess(true);
        }
      })
  };

  const field = (name, label, rules, input) => {
    return (
      <Form.Item
        label={label}
        name={name}
        rules={rules}
      >
        {input || <Input />}
      </Form.Item>
    )
  };

  if (success) {
    return (
      <Result
        icon={<SmileOutlined />}
        title='Great, we have done all the operations!'
        extra={<Link to='/users'><Button type='primary'>Back to user list</Button></Link>}
      />
    )
  }

  return (
    <Form
      {...layout}
      name='basic'
      className={classes.form}
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item {...tailLayout}>
        <h1>User editor</h1>
      </Form.Item>
      {field(
        'name',
        'Name',
        [{ required: true, message: 'Please input your name!' }])
      }
      {field(
        'Job',
        'Job',
        [{ required: true, message: 'Please input your job!' }])
      }
      <Form.Item {...tailLayout}>
        <Button type='primary' htmlType='submit'>
          Edit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserEditor;