import { useState, useEffect } from 'react';
import { Typography, Pagination, Spin } from 'antd';
import axios from 'axios';

const { Title, Text } = Typography;

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 6;

  useEffect(() => {
    setTimeout(() => {
      axios
        .get('https://jsonplaceholder.typicode.com/comments')
        .then((response) => {
          const commentData = response.data;
          setComments(commentData);
          setLoading(false);
          setError(null);
        })
        .catch((error) => {
          console.error('Error al obtener la información:', error);
          setLoading(false);
          setError('Error al cargar la información. Por favor, inténtelo de nuevo.');
        });
    }, 2000); 
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentCommentIndex((page - 1) * itemsPerPage);
  };

  return (
    <div className="comments">
      {loading ? (
        <div className="loading-container">
          <Spin size="large" />
        </div>
      ) : error ? (
        <div className="comments__error">{error}</div>
      ) : (
        <>
          <Title className="comments__title" style={{ color: '#fff' }}>Comments:</Title>
          <ul className="comments__list">
            {comments
              .slice(currentCommentIndex, currentCommentIndex + itemsPerPage)
              .map((comment) => (
                <div className="comments__item comment-box" key={comment.id}>
                  <div className="comments__content">
                    <Text className="comments__text">
                      <strong>Name:</strong> {comment.name}<br />
                      <strong>Email:</strong> {comment.email}<br />
                      <strong>Body:</strong> {comment.body}<br />
                    </Text>
                  </div>
                </div>
              ))}
          </ul>
          <Pagination
            className="comments__pagination"
            current={Math.floor(currentCommentIndex / itemsPerPage) + 1}
            total={comments.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            showSizeChanger={false}
          />
        </>
      )}
    </div>
  );
};

export default Comments;
