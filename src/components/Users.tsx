import { useState, useEffect } from 'react';
import { Typography, Table } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;

interface User {
    id: number;
    name: string;
    username: string;
    email: string;
}

const Users = () => {
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
                    localStorage.setItem('users', JSON.stringify(userData));
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
        setShowDetails(false);
    };

    return (
        <div className="users">
            <div className="users__content">
                <ul className="users__list">
                <Title className="users__title">Users:</Title>
                    {users.map((user) => (
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
                </ul>
                {showDetails && selectedUser && (
                    <div className="users__details">
                        <Title className="users__details-title">Detalles del User:</Title>
                        <Table className="users__details-table" columns={columns} dataSource={[selectedUser]} pagination={false} />
                        <button className="users__details-button" onClick={handleHideDetails}>Ver menos</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Users;