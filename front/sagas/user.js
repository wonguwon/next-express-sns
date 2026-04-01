import axios from 'axios';
import { all, call, fork, put, take, takeLatest,delay } from 'redux-saga/effects';
import {
    LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST,
    LOG_OUT_SUCCESS, LOG_OUT_FAILURE, LOG_OUT_REQUEST, 
    FOLLOW_SUCCESS, FOLLOW_FAILURE, FOLLOW_REQUEST,
     UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE, UNFOLLOW_REQUEST, 
     SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE,
} from '../reducers/user';

function logInAPI(data){
    return axios.post('/api/login', data);
}

function* logIn(action){
   
    try {
        //const result = yield call(logInAPI, action.data);
        yield delay(1000);
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data,
        })
    } catch(err){
        yield put({
            type: LOG_IN_FAILURE,
            data: err.response.data,
        })
    }
}

function logOutAPI(){
    return axios.post('/api/logout');
}

function* logOut(action){
    
    try {
        //const result = yield call(logOutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,

        })
    } catch(err){
        yield put({
            type: LOG_OUT_FAILURE,
            data: err.response.data,
        })
    }
}

function followAPI(){
    return axios.post('/api/follow');
}

function* follow(action){
    
    try {
        //const result = yield call(logOutAPI);
        yield delay(1000);
        yield put({
            type: FOLLOW_SUCCESS,
            data: action.data,

        })
    } catch(err){
        yield put({
            type: FOLLOW_FAILURE,
            data: err.response.data,
        })
    }
}

function unfollowAPI(){
    return axios.post('/api/unfollow');
}

function* unfollow(action){
    
    try {
        //const result = yield call(logOutAPI);
        yield delay(1000);
        yield put({
            type: UNFOLLOW_SUCCESS,
            data: action.data,

        })
    } catch(err){
        yield put({
            type: UNFOLLOW_FAILURE,
            data: err.response.data,
        })
    }
}

function signUpAPI(data){
    console.log(data);
    return axios.post('http://localhost:3065/user',data);
}

function* signUp(action){

    try {
        const result = yield call(signUpAPI, action.data);
        console.log(result);
        yield put({
            type: SIGN_UP_SUCCESS,
        })
    } catch (error) {
        yield put({
            type: SIGN_UP_FAILURE,
            data: error.response.data,
        })
    }
}

function* watchLogIn(){
    yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut(){
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchFollow(){
    yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnfollow(){
    yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}

export default function* userSaga(){
    console.log("?")
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchFollow),
        fork(watchUnfollow),
        fork(watchSignUp),       
    ])
}