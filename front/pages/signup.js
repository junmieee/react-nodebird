
import React, { useCallback, useState, useEffect } from 'react'
import AppLayout from '../components/AppLayout'
import Head from 'next/head';
import { Form, Input, Checkbox, Button } from 'antd'
import styled from 'styled-components';
import useInput from '../components/hooks/useinput';
import Password from 'antd/lib/input/Password';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';
import Router from 'next/router';



const ErorrMessage = styled.p`
    color: red; 
    `

const signup = () => {
    const dispatch = useDispatch();
    const { signUpLoading, signUpDone, signUpError, logInDone } = useSelector((state) => state.user)
    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');
    const [passwordCheck, setpasswordCheck] = useState('');
    const [passwordError, setpasswordError] = useState(false);

    const onChangePasswordCheck = useCallback((e) => {
        setpasswordCheck(e.target.value);
        setpasswordError(e.target.value !== password)
    })

    const [term, setTerm] = useState('');
    const [termError, setTermError] = useState(false);

    //signup 완료되면 메인페이지로 돌아가게
    useEffect(() => {
        if (signUpDone) {
            Router.replace('/')
        }
    }, [signUpDone])


    useEffect(() => {
        if (logInDone) {
            Router.replace('/')
        }
    }, [logInDone])


    useEffect(() => {
        if (signUpError) {
            alert(signUpError);
        }
    }, [signUpError])
    const onChangeTerm = useCallback((e) => {
        setTermError(false)

        setTerm(e.target.checked);
    }, [term])

    const onSubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return setpasswordError(true);
        }
        if (!term) {
            return setTermError(true);
        }
        console.log(email, nickname, password);
        dispatch({
            type: SIGN_UP_REQUEST,
            data: { email, password, nickname },
        });
    }, [email, password, passwordCheck, term]);

    return (
        <>
            <AppLayout>

                <Head>
                    <title>회원가입 | NodeBird</title>
                </Head>
                <Form onFinish={onSubmit}>
                    <div>
                        <label htmlFor="user-email">이메일</label>
                        <br />
                        <Input name='user-email' type='email' value={email} required onChange={onChangeEmail} />
                    </div>
                    <div>
                        <label htmlFor="user-nickname">닉네임</label>
                        <br />
                        <Input name='user-nickname' value={nickname} required onChange={onChangeNickname} />
                    </div>
                    <div>
                        <label htmlFor="user-password">비밀번호</label>
                        <br />
                        <Input name='user-password' type='password' value={password} required onChange={onChangePassword} />
                    </div>
                    <div>
                        <label htmlFor="user-password-check">비밀번호체크</label>
                        <br />
                        <Input name='user-password-check' type='password' value={passwordCheck} required onChange={onChangePasswordCheck} />
                        {passwordError && <ErorrMessage>비밀번호가 일치하지 않습니다.</ErorrMessage>}
                    </div>
                    <div>
                        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>약관에 동의합니다.</Checkbox>
                        {termError && <ErorrMessage >약관에 동의하셔야 합니다.</ErorrMessage>}
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>

                    </div>


                </Form>

            </AppLayout>
        </>
    )
}

export default signup
