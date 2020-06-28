import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spin, Space } from 'antd';
import { NavLink } from 'react-router-dom';

const ListItems = () => {

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch()
  }, [])

  const dataSource = list;

  const columns = [
    {
      title: 'Name color',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Pantone value',
      dataIndex: 'pantone_value',
      key: 'pantone_value',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size='middle'>
          <NavLink to={`/colors/${record.id}`}>
            More
          </NavLink>
        </Space>
      ),
    }
  ];

  const fetch = () => {
    let url = 'https://reqres.in/api/unknown';
    axios.get(url)
      .then(response => {
        response.data.data.forEach((item, index) => item.key = index);
        setList(response.data.data)
      })
      .finally(() => setLoading(false))
  }

  if (loading || !list) {
    return <div className='ant-spin-block'><Spin size='large' /></div>
  }

  return (
    <Table dataSource={dataSource} columns={columns} />
  );
};

export default ListItems;