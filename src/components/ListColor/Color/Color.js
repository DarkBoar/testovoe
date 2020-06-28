import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Spin, Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import classes from './Color.module.css';

const Color = (props) => {

  const { Meta } = Card;
  const [color, setColor] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const id = props.match.params.id;

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    const url = `https://reqres.in/api/unknown/${id}`;
    await axios.get(url)
      .then(response => setColor(response.data.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }

  if (error) {
    return (
      <Result
        status='404'
        title='404'
        subTitle='Sorry, the page you visited does not exist.'
        extra={<Link to='/'><Button type='primary'>Back Home</Button></Link>}
      />
    )
  }

  if (loading || !color) {
    return <div className='ant-spin-block'><Spin size='large' /></div>
  }

  return (
    <div className={classes.color}>
      <h2>{ color.name }</h2>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={<div style={{
          background: `${color.color}`,
          width: '100%',
          height: '250px',
        }} />}
      >
        <Meta title={`Color: ${color.color}`} description={`Year: ${color.year}`} />
      </Card>
    </div>
  );
};

export default Color;