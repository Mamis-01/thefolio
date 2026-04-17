// frontend/src/pages/EditPostPage.js
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API, { BACKEND_URL } from '../api/axios';

const EditPostPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const { data } = await API.get(`/posts/${id}`);

        // Check if user is owner or admin
        const isOwner = user?._id === data.author?._id;
        const isAdmin = user?.role === 'admin';
        if (!isOwner && !isAdmin) {
          setError('You are not authorized to edit this post');
          navigate('/');
          return;
        }

        setTitle(data.title);
        setBody(data.body);
        setCurrentImage(data.image);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const fd = new FormData();
    fd.append('title', title);
    fd.append('body', body);
    if (image) fd.append('image', image);

    try {
      await API.put(`/posts/${id}`, fd);
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update post');
    }
  };

  if (loading) return <div className='edit-post-page'><p>Loading...</p></div>;

  return (
    <div className='edit-post-page'>
      <h2>Edit Post</h2>
      {error && <p className='error-msg'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder='Post title'
          required
        />
        <textarea
          value={body}
          onChange={e => setBody(e.target.value)}
          placeholder='Edit your post here...'
          rows={12}
          required
        />
        <div>
          <label>Cover Image:</label>
          {currentImage && (
            <div className='current-image'>
              <p>Current image:</p>
              <img src={`${BACKEND_URL}/uploads/${currentImage}`} alt='Current cover' className='preview-image' />
            </div>
          )}
          <input
            type='file'
            accept='image/*'
            onChange={e => setImage(e.target.files[0])}
          />
          {image && (
            <div className='new-image-preview'>
              <p>New image selected</p>
            </div>
          )}
        </div>
        <button type='submit'>Save Changes</button>
        <button type='button' onClick={() => navigate(`/posts/${id}`)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;
