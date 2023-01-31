import React from 'react';
import Post from './Post/Post';
// import { ThemeProvider } from '@mui/material/styles';

import theme from './styles';

const Posts = () => {
    return (
        <>
            <div>Posts</div>
            <Post />
            <Post />
        </>
    );
}

export default Posts;