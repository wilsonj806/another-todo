import { Dispatch } from 'redux';
import TodoService from '../services/TodoService';

import {
  ReduxAction,
} from '../types';
import { errorResponse } from '../../server/types';

export const GET_TODOS_INIT = 'GET_TODOS_INIT'
export const GET_TODOS_FAIL = 'GET_TODOS_FAIL'
export const GET_TODOS_SUCCESS = 'GET_TODOS_SUCCESS'

const requestTodos = () : ReduxAction => ({
  type: GET_TODOS_INIT
})

// TODO type the JSON param
const receiveTodosSuccess = (json : unknown) : ReduxAction => ({
  type: GET_TODOS_SUCCESS,
  payload: json
})

const receiveTodosFail = (err : any) : any => ({
  type: GET_TODOS_FAIL,
  payload: err
})

// ----- NOTE Exported Redux Thunk action
const { getTodos } = TodoService
export const getAllTodos = () => {
  return async (dispatch: Dispatch) => {
    dispatch(requestTodos());
    try {
      const res = await getTodos();
      dispatch(receiveTodosSuccess(res))
    } catch (err) {
      dispatch(receiveTodosFail(err.message))
    }
  }
}