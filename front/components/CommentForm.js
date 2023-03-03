import React, { useCallback, useState, useEffect } from 'react'
import { Form, Input, Button } from 'antd';
import useInput from './hooks/useinput';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post'
import { setContext } from 'redux-saga/effects';

const CommentForm = ({ post }) => {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.user?.id);
    const { addCommentDone, addCommentLoading } = useSelector((state) => state.post)
    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    useEffect(() => {
        if (addCommentDone) {
            setCommentText('');
        }
    }, [addCommentDone])

    const onSubmitComment = useCallback(() => {
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id },
        });
    }, [commentText, id]);

    return (
        <Form
            onFinish={onSubmitComment}>
            <Form.Item
                style={{ position: 'relative', margin: 0 }}
            >
                <Input.TextArea
                    onChange={onChangeCommentText}
                    rows={4}
                    value={commentText}
                />
                <Button style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1 }} type='primary' htmlType="submit"
                    loading={addCommentLoading}
                >삐약</Button>
            </Form.Item>
        </Form>
    );
};

CommentForm.PropTypes = {
    post: PropTypes.object.isRequired,
};

export default CommentForm
