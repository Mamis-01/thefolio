import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/axios';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const { data } = await API.get('/posts');
                setPosts(data);
            } catch (err) {
                console.error('Failed to load posts:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPosts();
    }, []);

    return (
        <main className="container">
            <section className="hero">
                <div className="hero-content">
                    <h2>Life is Better on the Court</h2>
                    <p>Welcome to my portfolio! I’m passionate about basketball, teamwork, and the community built through the game.</p>
                    <img src="/images/pic1.jpg" className="pic1.jpg" style={{ width: '700px', height: '500px' }} alt="Basketball court" />
                </div>
            </section>

            <section className="highlights">
                <h3>Why I Love the Game</h3>
                <ul>
                    <li><strong>Teamwork:</strong> Learning to communicate and trust my friends.</li>
                    <li><strong>Competition:</strong> Pushing myself to improve every day.</li>
                    <li><strong>Community:</strong> Meeting new people at the local park.</li>
                    <li><strong>Fast-paced action:</strong> The game's speed keeps you on the edge</li>
                    <li><strong>Teamwork makes it epic:</strong> 5 players, 1 goal – chemistry is key</li>
                    <li><strong>Comeback stories are inspiring:</strong> From down to up, it's possible</li>
                    <li><strong>Fitness + fun = win:</strong> Stay fit while having a blast</li>
                </ul>
            </section>

            <section className="previews">
                <div className="container">
                    <h3><strong>My Journey</strong></h3>
                    <p>Learn how I started playing and my favorite memories on the court.</p>
                    <img src="/images/pic5.jpeg" style={{ width: '500px', height: '300px' }} alt="My Basketball Journey" />
                </div>
            </section>
            
            <div>
                <section>
                    <Link to="/about">Read More &rarr;</Link>       
                </section>
            </div>

            <section className="posts-section">
                <h2>Latest Posts</h2>
                {loading ? (
                    <p>Loading posts...</p>
                ) : posts.length === 0 ? (
                    <p>No posts yet. Be the first to share!</p>
                ) : (
                    <div className="posts-grid">
                        {posts.map(post => (
                            <div key={post._id} className="post-card">
                                {post.image && (
                                    <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title} />
                                )}
                                <h3>{post.title}</h3>
                                <p className="post-author">By {post.author?.name}</p>
                                <p className="post-excerpt">{post.body.substring(0, 100)}...</p>
                                <Link to={`/posts/${post._id}`} className="read-more-btn">
                                    Read More →
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}