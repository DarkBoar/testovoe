import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classes from './Users.module.css';
import { Card, Spin } from 'antd';
import { NavLink } from 'react-router-dom';

const Users = () => {

  const { Meta } = Card;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch()
  }, [])

  const fetch = () => {
    let url = 'https://reqres.in/api/users?page=2';
    axios.get(url)
      .then(response => setUsers(response.data.data))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
  }

  const handleUserDelete = async (id) => {
    let url = `https://reqres.in/api/users/${id}`;
    await axios.delete(url)
      .then((response) => {
        if (response.status === 204) {
          const arr = users.filter((item) => item.id !== id);
          setUsers(arr)
        } else {
          console.error(response);
        }
      })
  }

  if (loading || !users) {
    return <div className='ant-spin-block'><Spin size="large" /></div>
  }

  return (
    <div>
      <ul className={classes.users}>
        {users.map((item) => {
          return (
            <li
              key={item.id}
            >
              <div
                className={classes.delete}
                onClick={() => handleUserDelete(item.id)}
              ></div>
              <NavLink to={`/users/${item.id}`}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt={item.first_name} src={item.avatar} />}
                >
                  <Meta title={item.first_name + ' ' + item.last_name} description={item.email} />
                </Card>
              </NavLink>
            </li>
          )
        }
        )}
      </ul>
    </div>
  );
};

export default Users;