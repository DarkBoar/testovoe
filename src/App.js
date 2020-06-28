import React, { useState } from 'react';
import './App.css';
import { NavLink, Route, Switch } from "react-router-dom";
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  TeamOutlined,
  ContactsOutlined,
} from '@ant-design/icons';
import Users from './components/Users/Users';
import AddUsers from './components/AddUsers/AddUsers';
import Main from './components/Main/Main';
import User from './components/User/User';
import ListItems from './components/ListColor/ListColor';
import UserEditor from './components/UserEditor/UserEditor';
import Color from './components/ListColor/Color/Color';


function App() {

  const { Header, Sider, Content } = Layout;

  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <Menu theme='dark' mode='inline'>
          <div className='logo'></div>
          <Menu.Item key='/' icon={<AppstoreOutlined />}>
            <NavLink to='/'>
              Главная
            </NavLink>
          </Menu.Item>

          <Menu.Item key='/users' icon={<TeamOutlined />}>
            <NavLink to='/users'>
              Список пользователей
            </NavLink>
          </Menu.Item>

          <Menu.Item key='/adduser' icon={<ContactsOutlined />}>
            <NavLink to='/adduser'>
              Добавить пользователя
            </NavLink>
          </Menu.Item>

          <Menu.Item key='/colors' icon={<FileTextOutlined />}>
            <NavLink to='/colors'>
              Список
            </NavLink>
          </Menu.Item>

        </Menu>
      </Sider>
      <Layout className='site-layout'>
        <Header className='site-layout-background' style={{ padding: '0 16px' }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className='site-layout-background'
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Switch>
            <Route path='/' exact component={Main} />
            <Route path='/users/:id' exact component={User} />
            <Route path='/users/:id/edit' exact component={UserEditor} />
            <Route path='/users' exact component={Users} />
            <Route path='/adduser' exact component={AddUsers} />
            <Route path='/colors/:id' exact component={Color} />
            <Route path='/colors' exact component={ListItems} />
          </Switch>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
