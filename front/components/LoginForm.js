import React, { useState, useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, loginRequestAction } from '../reducers/user';
import useInput from '../components/hooks/useinput'

const ButtonWrapper = styled.div`
    margin-top: 10px;

`


const FromWrapper = styled(Form)`
    padding: 10px;
`


const LoginForm = () => {
    const { logInLoading, logInError } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [email, onChangeEmail] = useInput('');
    const [password, setPassword] = useState('');


    const onChangeIdPassword = useCallback((e) => {
        setPassword(e.target.value);

    }, []);

    const onSubmitForm = useCallback(() => {
        console.log(email, password);
        dispatch(loginRequestAction({ email, password }));

    }, [email, password]);

    //로그인 실패시 에러메세지 전달
    useEffect(() => {
        if (logInError) {
            alert(logInError);
        }

    }, [logInError])



    return (
        //onFinish는 antd design에서 preventDefault가 설정되어 있다. 
        <FromWrapper onFinish={onSubmitForm} >
            <div>
                <label htmlFor='user-email'>이메일</label>
                <br />
                <Input name="user-email" type='email' value={email} onChange={onChangeEmail} required />

            </div>
            <div>
                <label htmlFor='user-password'>비밀번호</label>
                <br />
                <Input name="user-password" type="password" value={password} onChange={onChangeIdPassword} required />

            </div>
            <ButtonWrapper >
                <Button type="primary" htmlType='submit' loading={logInLoading}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>

            </ButtonWrapper>

        </FromWrapper>

    )
}


export default LoginForm
