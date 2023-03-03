import React, { useState, useCallback, useEffect } from 'react';
import { Card, Button, Popover, Avatar, List, Comment } from 'antd';
import { RetweetOutlined, MessageOutlined, HeartOutlined, EllipsisOutlined, HeartTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import PostImages from './PostImages'
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import { LIKE_POST_REQUEST, REMOVE_POST_REQUEST, UNLIKE_POST_REQUEST, RETWEET_REQUEST } from '../reducers/post';
import FollowButton from './FollowButton';




const PostCard = ({ post }) => {
    const dispatch = useDispatch();
    const { removePostLoading, retweetError } = useSelector((state) => state.post)
    const [commentFormOpened, setCommentFormOpened] = useState(false);

    const id = user && user.id

    const liked = post.Likers.find((v) => v.id === id);

    // useEffect(() => {
    //     if (retweetError) {
    //         alert(retweetError);
    //     }
    // }, [retweetError])


    const onLiked = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.')

        }
        return dispatch({
            type: LIKE_POST_REQUEST,
            data: post.id
        })

    }, [id]);
    const onUnLike = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.')

        }
        return dispatch({
            type: UNLIKE_POST_REQUEST,
            data: post.id
        })

    }, [id]);

    const onToggleCommnet = useCallback(() => {
        setCommentFormOpened((prev => !prev))
    });


    const onRemovePost = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.')

        }
        return dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id,

        })
    }, [id]);

    const onRetweet = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.')

        }
        return dispatch({
            type: RETWEET_REQUEST,
            data: post.id,
        })
    }, [])

    //로그인을 한 상태일 때 조건문 만들기
    const { user } = useSelector((state) => state.user)

    return (
        <div style={{ marginBottom: 10 }}>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <RetweetOutlined key="retweet" onClick={onRetweet} />,
                    liked ? <HeartTwoTone twoToneColor="#eb2f96" onClick={onUnLike} /> : <HeartOutlined key="heart" onClick={onLiked} />,
                    <MessageOutlined key="comment" onClick={onToggleCommnet} />,
                    <Popover key="more" content={(
                        <Button.Group>
                            {/* 내 아이디가 있고 게시글 작성자 아이디가 나랑 같으면 수정 삭제버튼 보이고 다르면 신고버튼 보이게*/}
                            {id && post.User.id === id ? (
                                <>
                                    <Button>수정</Button>
                                    <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                                </>)
                                :
                                <Button>신고</Button>}


                        </Button.Group>
                    )}>
                        <EllipsisOutlined />
                    </Popover>
                ]}
                extra={id && <FollowButton post={post} />}

            >
                {post.RetweetId && post.Retweet
                    ? (
                        <Card
                            cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
                        >
                            <Card.Meta
                                avatar={<Avatar>{post.Retweet.User.nickname[0]}</Avatar>}
                                title={post.Retweet.User.nickname}
                                description={<PostCardContent postData={post.Retweet.content} />}
                            />
                        </Card>)
                    : (
                        <Card.Meta
                            avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                            title={post.User.nickname}
                            description={<PostCardContent postData={post.content} />}
                        />)}

            </Card>
            {commentFormOpened && (
                <div>
                    <CommentForm post={post} />
                    <List header={`${post.Comments.length}개의 댓글`}
                        itemLayout='horizontal'
                        // dataSource가 renderItem의 item으로 각각 들어간다
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />

                            </li>
                        )}
                    />
                </div>
            )}
            {/* <CommentForm />
            <Comments /> */}
        </div>

    )
}

export default PostCard
