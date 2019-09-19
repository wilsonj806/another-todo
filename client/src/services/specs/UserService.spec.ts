import MockAdapter from 'axios-mock-adapter';
import axios from '../../axios';

import UserService from '../UserService';


const mock = new MockAdapter(axios);
describe('A service function for registering a new user', () => {
  const endpoint = '/user/register';

  afterEach(() => mock.reset())

  test('it should throw if required fields are missing', async (done) => {
    const reqObj = {
      username: 'guest',
      password: 'wasd',
      password2: ''
    };

    const response = await UserService.postLogin(reqObj)
    expect(response).toStrictEqual(
      expect.objectContaining({
        msg: expect.any(String),
        status: expect.stringContaining('FAILURE')
      })
    )
    done()
  })
test('it should return an obect with the user info if it succeeded', async (done) => {
    const reqObj = {
      username: 'guest',
      password: 'wasd',
      password2: 'wasd',
      email: 'guest@guest.com'
    };

    mock.onPost(endpoint).reply(
      200,
      { data: reqObj }
    );

    const response = await UserService.postNewUser(reqObj);

    expect(response).toStrictEqual({ payload:reqObj, status: 'SUCCESS' })
    done();

  })

  test('it should return an error object if it failed with a 4** error', async (done) => {
    const reqObj = {
      username: 'guest',
      password: 'your mom'
    };

    const mockResponse = {
      msg: 'testing failure',
    }
    mock.onPost(endpoint).reply(
      400,
      mockResponse
    );

    const response = await UserService.postNewUser(reqObj);
    expect(response).toStrictEqual(
      expect.objectContaining({
        msg: expect.any(String),
        status: expect.any(String)
      })
    )
    done();

  })
  test('it should return an error object if it failed with a 5** error', async (done) => {
    const reqObj = {
      username: 'guest',
      password: 'your mom'
    };

    const mockResponse = {
      msg: 'testing failure',
    }
    mock.onPost(endpoint).reply(
      500,
      mockResponse
    );

    const response = await UserService.postNewUser(reqObj);
    expect(response).toStrictEqual(
      expect.objectContaining({
        msg: expect.any(String),
        status: expect.any(String),
      })
    )
    done();
  })
})



describe('A service function for logging a client in', () => {
  const endpoint = '/user/login'

  afterEach(() => {
    // remove all onPost/ onGet/ etc handlers
    mock.reset();
  })


  test('it should throw if required fields are missing', async (done) => {
    const reqObj = {
      username: 'guest',
      password: ''
    };
    // NOTE need to ensure that the assertion block expects a Promise rejection
    const response = await UserService.postLogin(reqObj)
    expect(response).toStrictEqual(
      expect.objectContaining({
        msg: expect.any(String),
        status: expect.stringContaining('FAILURE')
      })
    )
    done()
  })
  test('it should return an obect with the user info if it succeeded', async (done) => {
    const reqObj = {
      username: 'guest',
      password: 'wasd'
    };

    const mockResponse = {
      msg: 'testing',
      data: reqObj
    };

    mock.onPost(endpoint).reply(
      200,
      mockResponse
    );

    const response = await UserService.postLogin(reqObj);

    expect(response).toStrictEqual({
      payload: reqObj,
      status: 'SUCCESS'
    })
    done();

  })

  test('it should return an error object if it failed with a 4** error', async (done) => {
    const reqObj = {
      username: 'guest',
      password: 'your mom'
    };

    const mockResponse = {
      msg: 'testing failure',
    }
    mock.onPost(endpoint).reply(
      400,
      mockResponse
    );

    const response = await UserService.postLogin(reqObj);
    expect(response).toStrictEqual(
      expect.objectContaining({
        msg: expect.any(String),
        status: expect.any(String),
      })
    )
    done();

  })
  test('it should return an error object if it failed with a 5** error', async (done) => {
    const reqObj = {
      username: 'guest',
      password: 'your mom'
    };

    const mockResponse = {
      msg: 'testing failure',
    }

    mock.onPost(endpoint).reply(
      500,
      mockResponse
    );

    const response = await UserService.postLogin(reqObj);
    expect(response).toStrictEqual(
      expect.objectContaining({
        msg: expect.any(String),
        status: expect.any(String),
      })
    )
    done();
  })
})

describe('A service function for logging a user out', () => {
  const endpoint = '/user/logout';

  afterEach(() => mock.reset())

  test('it should return an obect with a status key if it succeeded', async (done) => {
    mock.onPost(endpoint).reply(
      200,
      { msg: 'hi' }
    );

    const response = await UserService.postLogout();

    expect(response).toStrictEqual({status: 'SUCCESS', msg: 'hi'})
    done();
  })

  test('it should return an error object if it failed with a 5** error', async (done) => {
    const mockResponse = {
      msg: 'testing failure',
    }
    mock.onPost(endpoint).reply(
      500,
      mockResponse
    );

    const response = await UserService.postLogout();
    expect(response).toStrictEqual(
      expect.objectContaining({
        msg: expect.any(String),
        status: expect.any(String),
      })
    )
    done();
  })
})

describe('A service function for deleting a user', () => {
  const endpoint = '/user/delete';

  afterEach(() => mock.reset())

  test('it should return an obect with a status key if it succeeded', async (done) => {
    mock.onDelete(endpoint).reply(
      200,
      { msg: 'hi' }
    );

    const response = await UserService.deleteUser();

    expect(response).toStrictEqual({ status: 'SUCCESS' })
    done();
  })

  test('it should return an error object if it failed with a 5** error', async (done) => {
    const mockResponse = {
      msg: 'testing failure',
    }
    mock.onDelete(endpoint).reply(
      500,
      mockResponse
    );

    const response = await UserService.postLogout();
    expect(response).toStrictEqual(
      expect.objectContaining({
        msg: expect.any(String),
        status: expect.any(String),
      })
    )
    done();
  })

  test('it should return an error object if it failed with a 4** error', async (done) => {
    const mockResponse = {
      msg: 'testing failure',
    }
    mock.onDelete(endpoint).reply(
      400,
      mockResponse
    );

    const response = await UserService.postLogout();
    expect(response).toStrictEqual(
      expect.objectContaining({
        msg: expect.any(String),
        status: expect.any(String),
      })
    )
    done();
  })
})



export {}