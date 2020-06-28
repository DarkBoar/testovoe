import React from 'react';
import './App.css';
import { NavLink, Route, Switch, Redirect } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
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
import Error from './components/Error/Error';


function App() {

  const { Header, Content } = Layout;

  return (
    <Layout>
      <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        <Menu theme='dark' mode='horizontal' defaultSelectedKeys={[localStorage.getItem('key') || '1']} onSelect={({ key }) => {
          localStorage.setItem('key', key)
        }} >
          <Menu.Item key='1' icon={<AppstoreOutlined />}>
            <NavLink to='/'>
              Главная
             </NavLink>
          </Menu.Item>
          <Menu.Item key='2' icon={<TeamOutlined />}>
            <NavLink to='/users'>
              Список пользователей
             </NavLink>
          </Menu.Item>
          <Menu.Item key='3' icon={<ContactsOutlined />}>
            <NavLink to='/adduser'>
              Добавить пользователя
             </NavLink>
          </Menu.Item>
          <Menu.Item key='4' icon={<FileTextOutlined />}>
            <NavLink to='/colors'>
              Список цветов
             </NavLink>
          </Menu.Item>
        </Menu>
      </Header>
      <Content className='site-layout' style={{ padding: '25px', marginTop: 64, height: 'calc(100vh - 65px)' }}>
        <div className='site-layout-background' style={{ padding: 24, minHeight: '100%', height: '100%' }}>
          <Switch>
            <Route path='/' exact component={Main} />
            <Route path='/users/:id' exact component={User} />
            <Route path='/users/:id/edit' exact component={UserEditor} />
            <Route path='/users' exact component={Users} />
            <Route path='/adduser' exact component={AddUsers} />
            <Route path='/colors/:id' exact component={Color} />
            <Route path='/colors' exact component={ListItems} />
            <Route path='/error' exact component={Error} />
            <Redirect to='/error' />
          </Switch>
        </div>
      </Content>
    </Layout>
  );
}

export default App;
