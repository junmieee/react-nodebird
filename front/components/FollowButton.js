import React, { useCallback } from 'react'
import PropTypes from 'prop-types';
import { Button } from 'antd'
import useSelection from 'antd/lib/table/hooks/useSelection';
import { useDispatch, useSelector } from 'react-redux';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';

const FollowButton = ({ post }) => {
    const dispatch = useDispatch();
    const { user, followLoading, unfollowLoading } = useSelector((state) => state.user)
    //내가 팔로잉 하고 있는 시람의 목록 

    const isFollowing = user && user.Followings.find((v) => v.id === post.User.id);

    const onClickButton = useCallback(() => {
        if (isFollowing) {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data: post.User.id,
            });

        } else {
            dispatch({
                type: FOLLOW_REQUEST,
                data: post.User.id,
            })
        }

    }, [isFollowing])


    if (post.User.id == user.id) {
        return null
    }

    return (
        <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
            {isFollowing ? '언팔로우' : '팔로우'}
        </Button>
    )
}

FollowButton.propTypes = {
    post: PropTypes.object.isRequired,
}


export default FollowButton
