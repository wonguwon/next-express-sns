import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { Input, Form, Checkbox, Button} from 'antd';
import styled from 'styled-components';

import AppLayout from '../components/AppLayout';
import useInput from '../hooks/useInput';
import { SIGN_UP_REQUEST, SIGN_UP_SUCCESS } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
const ErrorMessage = styled.div`
    color: red
`;

const signup = () => {
    const dispatch = useDispatch();
    const { signUpLoading } = useSelector(state => state.user);
    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickName] = useInput('');
    const [password, onChangePassword] = useInput('');

    const [passwordCheck, setpasswordCheck] = useState('');
    const [passwordError, setpasswordError] = useState(false);
    const onChangePasswordCheck = useCallback((e) => {
        setpasswordCheck(e.target.value);
        setpasswordError(e.target.value !== password);
    },[password]);

    const [term, setTerm] = useState('');
    const [termError, settermError] = useState(false);
    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        settermError(false);
    },[password]);

    const onsubmit = useCallback((e) => {
        if(password !== passwordCheck) { 
            return setpasswordError(true);
        } 
        
        if(!term){
            return settermError(true);
        }

        dispatch({
            type: SIGN_UP_REQUEST,
            data: {email, password, nickname},
        })
    },[email, password, passwordCheck, term])



    return (
        <AppLayout>
            <Head>
                <title>회원가입 | Twiter</title>
            </Head>
            <Form onFinish = {onsubmit}>
                <div>
                    <label htmlFor = "user-email">이메일</label>
                    <br />
                    <Input name = "user-email" type = "email" value = {email} required onChange = {onChangeEmail} />
                </div>
                <div>
                    <label htmlFor = "user-nick">닉네입</label>
                    <br />
                    <Input name = "user-nick" value = {nickname} required onChange = {onChangeNickName} />
                </div>
                <div>
                    <label htmlFor = "user-password">비밀번호</label>
                    <br />
                    <Input name = "user-password" type = "password" value = {password} required onChange = {onChangePassword} />
                </div>
                <div>
                    <Input 
                        name = "user-password-check"
                        type = "password"
                        value = {passwordCheck}
                        required
                        onChange = {onChangePasswordCheck}
                    />
                    {passwordError && <ErrorMessage > 비밀번호가 일치하지 않습니다.</ErrorMessage>}
                </div>
                <div>
                    <Checkbox name="user-term" checked={term} onChange={onChangeTerm}> 동의합니다.</Checkbox>
                    {termError && <ErrorMessage>약관에 동의하세요.</ErrorMessage>}
                </div>
                <div style= {{marginTop: 10}}>
                    <Button type="primary" htmlType="submit" loading = {signUpLoading}>가입하기</Button>
                </div>
            </Form>
        </AppLayout>
    );
};

export default signup;