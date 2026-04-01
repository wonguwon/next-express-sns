import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Menu, Row, Col, Input } from 'antd';
import UserProfile from '../components/UserProfile';
import LoginForm from '../components/LoginForm';
import { useSelector } from 'react-redux';
import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
    .ant-row {
        margin-right: 0 !important;
        margin-left: 0 !important;
    }
    
    .ant-col:first-child {
        padding-left: 0 !important;
    }
    
    .ant-col:last-child {
        padding-right: 0 !important;
    }
`;

const AppLayout = ({ children }) => {
    const { me } = useSelector((state) => state.user);

    return (
        <div>
            <Global/>
            <Menu mode = 'horizontal'>
                <Menu.Item>
                    <Link href = '/'><a>twitter</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href = '/profile'><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Input></Input>
                </Menu.Item>
                <Menu.Item>
                    <Link href = '/signup'><a>회원가입</a></Link>
                </Menu.Item>
            </Menu>
            <Row gutter = {8}>
                <Col xs = {24} md = {6}>
                    {me ? <UserProfile /> : <LoginForm />}
                </Col>
                <Col xs = {24} md = {12}>
                    {children}
                </Col>
                <Col xs = {24} md = {6}>
                    <a href = "http://localhost:3000/" target = '_blank' rel = 'noreferrer noopner'>new window</a>
                </Col>
            </Row>
        </div>
    );
};

AppLayout.propTypes = {
    children: PropTypes.node.isRequired,
}



export default AppLayout;
