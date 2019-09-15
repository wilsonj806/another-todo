import React from 'react'
import { DeepPartial } from 'redux'
import * as ReactRedux from 'react-redux'
import { HashRouter, Route, Redirect } from 'react-router-dom';


import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import renderWithRouter from "../../layouts/helpers/router.helper";


import configureStore from '../../store/configureStore'
import ReduxWrap from '../../layouts/helpers/ReduxWrap';
import RouteContainer from '../RouteContainer';
import { StoreShape } from '../../types';


// NOTE this is just a quick smoke test for RouteContainer

const unauthenticatedState : DeepPartial<StoreShape> = {
  authorizedUser : {
    userId : undefined,
    username : undefined
  },
  clientServerConnect : {
    isFetching : false
  }
}

const authenticatedState : DeepPartial<StoreShape> = {
  authorizedUser : {
    userId : '1111',
    username : 'guest'
  },
  clientServerConnect : {
    isFetching : false
  }
}

const unauthenticatedStore = configureStore(unauthenticatedState)
const authenticatedStore = configureStore(authenticatedState)

describe('A route container to handle client side routing', () => {
  afterEach(() => {
    cleanup()
  })

  test('it should render the login page when  unauthenticed and accessing the home page', () => {
    const { getAllByText } = renderWithRouter(
      <ReduxWrap store={ unauthenticatedStore }>
        <RouteContainer/>
      </ReduxWrap>
    )
    const LoginTextEles = getAllByText('Login', { exact: false })

    const assertLoginText = LoginTextEles.length > 0

    expect(assertLoginText).toBe(true)
  })

  test('it should render a page with a Nav when authenticated', () => {
    const { container } = renderWithRouter(
      <ReduxWrap store={ authenticatedStore }>
        <RouteContainer/>
      </ReduxWrap>
    )
    const assertNav = container.querySelector('nav')

    expect(assertNav).toBeTruthy()
  })
})