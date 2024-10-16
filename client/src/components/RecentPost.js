import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecentPosts = () => {
    const [recentPosts, setRecentPosts] = useState([]);

    const fetchRecentPosts = async () => {
        const response = await axios.get('http://localhost:5000/api/products');
        const sortedPosts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by createdAt, newest first
        setRecentPosts(sortedPosts.slice(0, 5)); // Get the 5 most recent posts
    };

    useEffect(() => {
        fetchRecentPosts();
    }, []);

    return (
        <div>
            <h2>Recent Posts</h2>
            <ul>
                {recentPosts.map(post => (
                    <li key={post._id}>
                        <h3>{post.title}</h3>
                        <p>{post.short_des}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentPosts;
