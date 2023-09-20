// App.tsx
import React from 'react';
import Users from './components/Users';
import Comments from './components/Comments';
import './App.css';
import { Layout, Menu } from 'antd';

const { Sider, Content } = Layout;

function App() {
  const [activeTab, setActiveTab] = React.useState('users');

  const handleTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <Layout >
      <Sider className='slider' width={300} theme="light">
        <Menu
          mode="vertical"
          selectedKeys={[activeTab]}
          onClick={({ key }) => handleTabChange(key.toString())}
        >
          <Menu.Item key="users">Users</Menu.Item>
          <Menu.Item key="comments">Comments</Menu.Item>
        </Menu>
        
      </Sider>
      <Layout>
        <Content>
          <div className="container">
            {activeTab === 'users' ? <Users /> : <Comments />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;



