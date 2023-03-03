import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { logoutRequestAction } from '../reducers/user'




const UserProfile = () => {
    const dispatch = useDispatch();
    const { user, logOutLoading } = useSelector((state) => state.user);
    const onLogOut = useCallback(() => {
        dispatch(logoutRequestAction());
    }, []);
    return (
        <Card
            actions={[
                <div key="twit">Twit<br />{user.Posts.length}</div>,
                <div key="followings">팔로잉<br />{user.Followings.length}</div>,
                <div key="followers">팔로워<br />{user.Followers.length}</div>


            ]}

        >
            <Card.Meta
                avatar={<Avatar>{user.nickname[0]}</Avatar>}
                title={user.nickname}

            />
            <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>

        </Card>
    )
}

export default UserProfile
