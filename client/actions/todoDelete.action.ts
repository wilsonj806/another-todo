import { SetStateAction } from 'react'
import { Dispatch } from 'redux';
import TodoService from '../services/TodoService';

import { receiveUserUpdateSuccess } from './userUpdate.action';

import {
  ReduxAction,
  TodoShape,
  StoreShape
} from '../types';
import { errorResponse } from '../../server/types';

export const DELETE_TODO_INIT = 'DELETE_TODO_INIT'
export const DELETE_TODO_FAIL = 'DELETE_TODO_FAIL'
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'

const requestDeleteTodo = () : ReduxAction => ({
  type: DELETE_TODO_INIT
})

// ----- NOTE the input param is basically the entire store because we need to update the entire store with the updated User data
const receiveDeleteTodoSuccess = (json : TodoShape) : ReduxAction => ({
  type: DELETE_TODO_SUCCESS,
  payload: json
})

const receiveDeleteTodoFail = (err : any) : any => ({
  type: DELETE_TODO_FAIL,
  payload: err
})

export const deleteTodo = (todoId: string) =>
  async (dispatch: any) => {
    try {
      dispatch(requestDeleteTodo());
      // TodoService also fetches the updated user so we need to update our state with both
      const [todos, authorizedUser] = await TodoService.deleteTodo(todoId);

      dispatch(receiveDeleteTodoSuccess(todos));
      dispatch(receiveUserUpdateSuccess(authorizedUser));
    } catch(e) {
      dispatch(receiveDeleteTodoFail(e))
    }
  }