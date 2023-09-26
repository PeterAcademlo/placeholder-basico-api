import React from 'react';
import Users from './components/Users';
import Comments from './components/Comments';
import Form from './components/Form';
import './App.css';
import { Layout, Menu } from 'antd';

const { Sider, Content } = Layout;

function App() {
  const [activeTab, setActiveTab] = React.useState('users');

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <div className='menu'>
    <Layout>
      <div className='slider' >
        <Sider theme="light" >
          <Menu
            className='menu-container'
            mode="vertical"
            selectedKeys={[activeTab]}
            onClick={({ key }) => handleTabChange(key.toString())}
          >
            <Menu.Item className='menu-container__user' key="users">Users</Menu.Item>
            <Menu.Item className='menu-container__comments' key="comments">Comments</Menu.Item>
          </Menu>
        </Sider>
        </div>
      <Layout>
        <Content>
          <div className="container">
            {activeTab === 'users' ? (
              <>
                <Users />
                <Form />
              </>
            ) : activeTab === 'comments' ? (
              <Comments />
            ) : null}
          </div>
        </Content>
      </Layout>
    </Layout>
    </div>
  );
}

export default App;
