import { useState, useEffect } from 'react';
import { Button, Typography } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;

interface User {
    id: number;
    name: string;
}

const Users = () => {
    const [users, setUsers] = useState<User[]>([]);

    const savedCurrentUserIndex = localStorage.getItem('currentUserIndex');
    const initialCurrentUserIndex = savedCurrentUserIndex
        ? parseInt(savedCurrentUserIndex, 10)
        : 0;

    const [currentUserIndex, setCurrentUserIndex] = useState(initialCurrentUserIndex);

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
                    console.error('Error al obtener usuarios:', error);
                });
        }
    }, []);

    const handleShowMore = () => {
        if (currentUserIndex < users.length - 1) {
            setCurrentUserIndex(currentUserIndex + 1);
        }
    };

    const handleShowLess = () => {
        if (currentUserIndex > 0) {
            setCurrentUserIndex(currentUserIndex - 1);
        }
    };

    useEffect(() => {
        localStorage.setItem('currentUserIndex', currentUserIndex.toString());
    }, [currentUserIndex]);

    return (
        <div>
            <Title>Users:</Title>
            <ul>
                {users.slice(0, currentUserIndex + 1).map((user) => (
                    <div key={user.id}>
                        <Text>{user.name}</Text>
                    </div>
                ))}
            </ul>
            {currentUserIndex < users.length - 1 && (
                <Button onClick={handleShowMore}>Ver más</Button>
            )}
            {currentUserIndex > 0 && (
                <Button onClick={handleShowLess}>Ver menos</Button>
            )}
        </div>
    );
};

export default Users;
