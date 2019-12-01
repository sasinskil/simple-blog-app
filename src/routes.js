import showBlogs from './components/showBlogs.vue';
import addBlog from './components/addBlog.vue';
import singleBlog from './components/singleBlog.vue';

export default [
    {
        path: '/',
        component: showBlogs
    },
    {
        path: '/add-blog',
        component: addBlog
    },
    {
        path: '/blog/:id',
        component: singleBlog
    },
    {
        path: '*',
        redirect: '/'
    }
]