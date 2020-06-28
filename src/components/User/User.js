import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Skeleton, Result, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { Link, useHistory } from 'react-router-dom';


const User = (props) => {
  const history = useHistory();
  const { Meta } = Card;
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const id = props.match.params.id;

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
    const url = `https://reqres.in/api/users/${id}`;
    await axios.get(url)
      .then(response => setUser(response.data.data))
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

  if (loading || !user) {
    return <Skeleton avatar paragraph={{ rows: 4 }} />
  }

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={user.first_name} src={user.avatar} />}
      actions={[
        <EditOutlined onClick={() => history.push(`${id}/edit`)} key='edit' />,
      ]}
    >
      <Meta title={user.first_name + ' ' + user.last_name} description={user.email} />
    </Card>
  );
};

export default User;