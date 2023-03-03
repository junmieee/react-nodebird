import React, { useEffect } from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowerList from '../components/FollowerList';
import FollowList from '../components/FollowList';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST } from '../reducers/user';

const profile = () => {

    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch({
            type: LOAD_FOLLOWERS_REQUEST,


        });
        dispatch({
            type: LOAD_FOLLOWINGS_REQUEST,


        })

    }, [])

    useEffect(() => {
        if (!(user && user.id)) {
            Router.push('/')
        }
    }, [user && user.id])

    if (!user) {
        return null;
    }
    return (

        <>
            <Head>
                <title>내 프로필 | NodeBird</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉" data={user.Followings} />
                <FollowList header="팔로워" data={user.Followers} />

            </AppLayout>
        </>
    )
}

export default profile
