import React, { useState, useEffect } from 'react';
import { Typography, Table, Carousel } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

const Users: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [showDetails, setShowDetails] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUsers = localStorage.getItem('users');
        if (savedUsers) {
            setUsers(JSON.parse(savedUsers));
        } else {
            axios
            .get('https://jsonplaceholder.typicode.com/users')
            .then((response) => {
                const userData = response.data;
                setUsers(userData);
            })
                .catch((error) => {
                    console.error('Error al obtener datos de los usuarios:', error);
                });
        }
    }, []);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
    ];

    const handleShowDetails = (user: User) => {
        setSelectedUser(user);
        setShowDetails(true);
    };

    const handleHideDetails = () => {
        setSelectedUser(null);
        setShowDetails(false);
    };

    // Divide los usuarios en grupos de 5
    const usersChunks: User[][] = [];
    for (let i = 0; i < users.length; i += 5) {
        usersChunks.push(users.slice(i, i + 5));
    }

    return (
        <div className="users">
            <div className="users__content">
                <ul className="users__list">
                    <Title className="users__title" style={{ color: '#fff'}}>Usuarios:</Title>
                    <Carousel autoplay className="carousel">
                        {usersChunks.map((chunk, index) => (
                            <div key={index} className="users__carousel-group">
                                {chunk.map((user) => (
                                    <div className="users__item" key={user.id}>
                                        <Text className="users__text">
                                            <span className="users__id">{user.id}.</span>
                                            <span className="users__name">{user.name}</span>
                                            <button className="users__button" onClick={() => handleShowDetails(user)}>
                                                Ver Detalles
                                            </button>
                                        </Text>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </Carousel>

                    {showDetails && selectedUser && (
                        <div className="users__details">
                            <Title className="users__details-title" style={{ color: '#fff' }}>Detalles del usuario:</Title>
                            <Table 
                            className="users__details-table" 
                            columns={columns} 
                            dataSource={[selectedUser]} 
                            pagination={false} 
                            />
                            <button className="users__details-button" onClick={handleHideDetails}>
                                Ver menos
                            </button>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Users;
