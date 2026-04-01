import React from 'react';
import { List, Button, Card } from 'antd';
import PropTypes from 'prop-types';
import { StopOutlined } from '@ant-design/icons';

const FollowerList = ({ header, data }) => {
    return (
        <List
            style = {{ marginBottom: 20}}
            grid = {{ gutter: 4, xs: 2, md: 3}}
            size = "small"
            header = {<div>{header}</div>}
            bordered
            loadMore = {<div style = {{ textAlign:'center', margin: '10px 0'}}><Button>더 보기</Button></div>}
            dataSource = {data}
            renderItem = {(item)=>{
                return <List.Item style = {{ marginTop: 20, textAlign: 'center'}}>
                    <Card actions = {[<StopOutlined />]}>
                        <Card.Meta description = {item.nickname} />
                    </Card>
                </List.Item>
            }}
        />
    );
};

FollowerList.propTypes = {
    header : PropTypes.string.isRequired,
    data : PropTypes.array.isRequired
}

export default FollowerList;