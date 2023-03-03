import AppLayout from "../components/AppLayout";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { useEffect } from 'react';
import { LOAD_POSTS_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Home = () => {


    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);



    useEffect(() => {
        dispatch({
            type: LOAD_MY_INFO_REQUEST,
        });
        dispatch({
            type: LOAD_POSTS_REQUEST,

        })

    }, []);

    useEffect(() => {
        function onScroll() {
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                if (hasMorePosts && !loadPostsLoading) {
                    const lastId = mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id;
                    dispatch({
                        type: LOAD_POSTS_REQUEST,
                        lastId,
                    });
                }
            }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, [hasMorePosts, loadPostsLoading, mainPosts]);

    return (
        <AppLayout>
            {user && <PostForm />}
            {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
        </AppLayout>
    )
}


export default Home; 