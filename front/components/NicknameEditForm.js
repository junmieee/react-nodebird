import React, { useCallback } from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import useInput from './hooks/useinput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';




const FormWrapper = styled(Form)`
    margin-bottom: 28px;
    border: 1px solid #d9d9d9;
    padding: 20px;

`


const NicknameEditForm = () => {
    const { user } = useSelector((state) => state.user);
    const [nickname, onChangeNickname] = useInput(user?.nickname || '');
    const dispatch = useDispatch();


    const onSubmit = useCallback(() => {
        dispatch({
            type: CHANGE_NICKNAME_REQUEST,
            data: nickname,
        });
    }, [nickname]);


    return (
        <FormWrapper
        >
            <Input.Search
                value={nickname}
                onChange={onChangeNickname}
                addonBefore="닉네임"
                enterButton="수정"
                onSearch={onSubmit} />


        </FormWrapper>
    )
}

export default NicknameEditForm
