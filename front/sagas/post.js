import { all, fork, take, call, put, takeEvery, takeLatest, throttle, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
    ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE,
    ADD_POST_REQUEST, ADD_POST_SUCCESS, ADD_POST_FAILURE, 
    DELETE_POST_REQUEST, DELETE_POST_SUCCESS, DELETE_POST_FAILURE, 
    CHANGE_POST_REQUEST, CHANGE_POST_SUCCESS, CHANGE_POST_FAILURE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE, generateDummyPost,
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';
import shortid from 'shortid';

function addPostAPI(data) {
    return axios.post('/api/post', data);
}

function* addPost(action) {
    console.log(action)
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        const id = shortid.generate();
        yield put({
            type: ADD_POST_SUCCESS,
            data: {
                ...action.data,
                id,
            }
        });
        yield put({
            type: ADD_POST_TO_ME,
            data: id
        })
    } catch (err) {
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data
        });
    }
}

function addCommentAPI(data) {
    return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* addComment(action) {
    try {
        // const result = yield call(addPostAPI, action.data);
        yield delay(1000);
        console.log("@@")
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data
        });
    }
}

function deletePostAPI(data) {
    return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* deletePost(action){
    try {
        yield delay(1000);
    
        yield put({
            type: DELETE_POST_SUCCESS,
            data: action.data
        });
        yield put({
            type: REMOVE_POST_OF_ME,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: DELETE_POST_FAILURE,
            data: err.response.data
        });
    }
}

function changePostAPI(data) {
    return axios.post(`/api/post/${data.postId}/comment`, data);
}

function* changePost(action){
    try {
        yield delay(1000);
        yield put({
            type: CHANGE_POST_SUCCESS,
            data: action.data
        })
    } catch (err) {
        yield put({
            type: CHANGE_POST_FAILURE,
            data: err.response.data
        });
    }
}

function loadPostAPI(data) {
    return axios.post('/api/posts');
}

function* loadPost(action){
    try {
        yield delay(1000);
        yield put({
            type: LOAD_POSTS_SUCCESS,
            data: generateDummyPost(10),
        })
    } catch (error) {
        yield put({
            type: LOAD_POSTS_FAILURE,
            data: error.response.data
        });
    }
}


function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchDeletePost() {
    yield takeLatest(DELETE_POST_REQUEST, deletePost);
}

function* watchChangePost() {
    yield takeLatest(CHANGE_POST_REQUEST, changePost);
}

function* watchLoadPosts() {
    yield takeLatest(LOAD_POSTS_REQUEST, loadPost);
}

export default function* postSaga() {

    yield all([
        fork(watchAddPost),
        fork(watchAddComment),
        fork(watchDeletePost),
        fork(watchChangePost),
        fork(watchLoadPosts),
    ])
}
