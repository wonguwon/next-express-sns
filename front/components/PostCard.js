import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import { Card, Popover, Button, Avatar, List, Comment} from "antd";
import { RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone } from "@ant-design/icons";
import {useDispatch, useSelector} from "react-redux";

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';
import FollowButton from './FollowButton';
import Form from 'antd/lib/form/Form';
import { deletePostRequestAction, DELETE_POST_REQUEST } from '../reducers/post';

const PostCard = ({ post }) => {
    const dispatch = useDispatch();
    const { me } = useSelector(state => state.user);
    const {deletePostLoading, changePostLoading} = useSelector(state => state.post);
    const [liked, setLiked] = useState(false);
    const [commentFormOpenend, setCommentFormOpened] = useState(false);
    const [changePostFormOpenend, setChangePostFormOpened] = useState(false);
    const onToggleLike = useCallback(() => {
        setLiked((prev) => !prev);
    }, []);

    const onToggleComment = useCallback(() => {
    
        setCommentFormOpened((prev) => !prev);
    }, []);

    const onDeletePost = useCallback(() =>{
    
        dispatch({
            type: DELETE_POST_REQUEST,
            data: post.id,
        });
    },[post]);


    //const { id } = useSelector(state => state.user.me);

    return (
        <div style={{ marginBottom: 20}}>
            <Card
                cover = {post.Images[0] && <PostImages images = {post.Images} />}
                actions = {[
                    <RetweetOutlined key = "retweet"/>,
                    liked
                        ? <HeartTwoTone twoToneColor = '#eb2f96' key = 'heart' onClick = {onToggleLike} />
                        : <HeartOutlined key = "heart" onClick = {onToggleLike}/>,
                    <MessageOutlined key = "comment" onClick = {onToggleComment}/>,
                    <Popover key = "more" content = {(
                        <Button.Group>
                            { me?.id && post.User.id === me.id ? (
                                <>
                                <Button loading={changePostLoading}>수정</Button>
                                <Button type = "danger" onClick = {onDeletePost} loading={deletePostLoading}>삭제</Button>
                                </>
                            ) : <Button>신고</Button> 
                             }
                        </Button.Group>
                    )}>
                        <EllipsisOutlined />
                    </Popover>,
                ]}
                extra = {me && <FollowButton post = { post }/>}
            >
                <Card.Meta
                    avatar = {<Avatar> { post.User.nickname[0]}</Avatar>}
                    title = {post.User.nickname}
                    description = {<PostCardContent postData={post.content}/>}
                />

            </Card>
            {commentFormOpenend && (
                <div>
                    <CommentForm post = {post}/>
                    <List
                        header = {`${post.Comments.length}개의 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.Comments}
                        renderItem={item => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </div>)}
            
        </div>
    );
};

PostCard.propTypes = {
    post : PropTypes.shape({
        id : PropTypes.number,
        User : PropTypes.object,
        content : PropTypes.string,
        createdAt : PropTypes.object,
        Comments : PropTypes.arrayOf(PropTypes.object),
        Images : PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
}

export default PostCard;
