import { useState, useEffect } from 'react';
import { Button, Typography } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography

// Define la interfaz para la estructura de datos de los comentarios
interface Comment {
    id: number;
    name: string;
    // Otras propiedades si las hay
}

const Comments = () => {
    const [comments, setComments] = useState<Comment[]>([]); // Usamos la interfaz Comment

    // Obtener el índice actual del localStorage al cargar el componente
    const savedCurrentCommentIndex = localStorage.getItem('currentCommentIndex');
    const initialCurrentCommentIndex = savedCurrentCommentIndex
        ? parseInt(savedCurrentCommentIndex, 10)
        : 0;

    const [currentCommentIndex, setCurrentCommentIndex] = useState(initialCurrentCommentIndex);

    useEffect(() => {
        // Intentar cargar los comentarios desde el localStorage al cargar el componente
        const savedComments = localStorage.getItem('comments');
        if (savedComments) {
            setComments(JSON.parse(savedComments));
        } else {
            // Si no hay datos en el localStorage, hacer una solicitud para obtener la lista de comentarios
            axios
                .get('https://jsonplaceholder.typicode.com/comments')
                .then((response) => {
                    const commentData = response.data;
                    setComments(commentData);
                    // Guardar los comentarios en el localStorage
                    localStorage.setItem('comments', JSON.stringify(commentData));
                })
                .catch((error) => {
                    console.error('Error al obtener comentarios:', error);
                });
        }
    }, []);

    const handleShowMore = () => {
        // Mostrar el siguiente comentario
        if (currentCommentIndex < comments.length - 1) {
            setCurrentCommentIndex(currentCommentIndex + 1);
        }
    };

    const handleShowLess = () => {
        // Mostrar el comentario anterior
        if (currentCommentIndex > 0) {
            setCurrentCommentIndex(currentCommentIndex - 1);
        }
    };

    // Guardar el índice actual en el localStorage al cambiarlo
    useEffect(() => {
        localStorage.setItem('currentCommentIndex', currentCommentIndex.toString());
    }, [currentCommentIndex]);

    return (
        <div>
            <Title>Comments:</Title>
            <ul>
                {comments.slice(0, currentCommentIndex + 1).map((comment) => (
                    <div key={comment.id} style={{ marginBottom: '8px' }}>
                        <Text>{comment.name.startsWith('-') ? comment.name : `-${comment.name}`}</Text>
                    </div>
                ))}
            </ul>
            {currentCommentIndex < comments.length - 1 && (
                <Button onClick={handleShowMore}>Ver más</Button>
            )}
            {currentCommentIndex > 0 && (
                <Button onClick={handleShowLess}>Ver menos</Button>
            )}
        </div>
    );
};

export default Comments;
