// frontend/src/pages/PostPage.js
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API, { BACKEND_URL } from '../api/axios';

const PostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/posts/${id}`);
        setPost(data);
        
        // Fetch comments for this post
        const { data: commentsData } = await API.get(`/comments/post/${id}`);
        setComments(commentsData);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const { data } = await API.post('/comments', {
        body: newComment,
        postId: id,
      });
      setComments([...comments, data]);
      setNewComment('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post comment');
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await API.delete(`/comments/${commentId}`);
      setComments(comments.filter(c => c._id !== commentId));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete comment');
    }
  };

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await API.delete(`/posts/${id}`);
        navigate('/');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete post');
      }
    }
  };

  if (loading) return <div className='post-page'><p>Loading...</p></div>;
  if (!post) return <div className='post-page'><p className='error-msg'>{error || 'Post not found'}</p></div>;

  const isOwner = user?._id === post.author?._id;
  const isAdmin = user?.role === 'admin';
  const canEditDelete = isOwner || isAdmin;

  return (
    <div className='post-page'>
      <div className='post-header'>
        <h1>{post.title}</h1>
        <div className='post-meta'>
          <span className='author'>By {post.author?.name}</span>
          <span className='date'>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        {canEditDelete && (
          <div className='post-actions'>
            <button onClick={() => navigate(`/edit-post/${id}`)} className='edit-btn'>
              Edit
            </button>
            <button onClick={handleDeletePost} className='delete-btn'>
              Delete
            </button>
          </div>
        )}
      </div>

      {post.image && (
        <div className='post-image'>
          <img src={`${BACKEND_URL}/uploads/${post.image}`} alt={post.title} />
        </div>
      )}

      <div className='post-body'>
        <p>{post.body}</p>
      </div>

      {error && <p className='error-msg'>{error}</p>}

      <div className='comments-section'>
        <h3>Comments</h3>

        {user && (
          <form onSubmit={handleAddComment} className='comment-form'>
            <textarea
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder='Write a comment...'
              rows={3}
            />
            <button type='submit'>Post Comment</button>
          </form>
        )}

        <div className='comments-list'>
          {comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            comments.map(comment => (
              <div key={comment._id} className='comment'>
                <div className='comment-header'>
                  <strong>{comment.author?.name}</strong>
                  <span className='comment-date'>
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className='comment-body'>{comment.body}</p>
                {(user?._id === comment.author?._id || user?.role === 'admin') && (
                  <button
                    onClick={() => handleDeleteComment(comment._id)}
                    className='delete-comment-btn'
                  >
                    Delete
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPage;
