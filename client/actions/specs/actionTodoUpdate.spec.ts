import thunk from 'redux-thunk';
import configureMockStore from '@jedmao/redux-mock-store';import MockAdapter from 'axios-mock-adapter';


import {
  updateTodo,
  PUT_TODO_INIT,
  PUT_TODO_FAIL,
  PUT_TODO_SUCCESS,
} from '../todoUpdate.action';
import axios from '../../axios';
import { PriorityTypes } from '../../types';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


const mock = new MockAdapter(axios);

describe('An action creator that handles async todo updates', () => {
  afterEach(() => mock.reset())
  const endpoint = '/api/todo/aaaa'
  const initUser = {
    username: 'guest',
    userId: 'aaaaa',
    todos: []
  }
  const mockTodo = {
    _id: 'aaaa',
    todo: 'test',
    priority: 'High' as PriorityTypes,
    isCompleted: false,
    userIndex: 0
  }

  const mockUpdate = {
    todo: 'testing'
  };
  const mockSuccess = { updatedTodo: { ...mockTodo } };
  const mockError = new Error('hi');

  test('it dispatches an action signifying that an Update Todo dispatch has been initiated', async (done) => {
    done()
  })

  test('it dispatches a todo success with a response object if the action succeeded', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: PUT_TODO_INIT },
      // TODO add the actual payload in
      { type: PUT_TODO_SUCCESS, payload: mockTodo },
    ]

    mock.onPut(endpoint).reply(
      200,
      mockSuccess
    );

    await store.dispatch<any>(updateTodo(mockTodo)(mockUpdate))

    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })

  test('it dispatches a todo failure with a response object if the action failed', async (done) => {
    const store = mockStore({ selectedUser: {}});
    const expectedActions = [
      { type: PUT_TODO_INIT },
      { type: PUT_TODO_FAIL, payload: mockError }
    ]

    mock.onPut(endpoint).reply(
      400,

      { errors: mockError.message }
    );

    await store.dispatch<any>(updateTodo(mockTodo)(mockUpdate))
    expect(store.getActions()).toStrictEqual(expectedActions);
    done()
  })
})