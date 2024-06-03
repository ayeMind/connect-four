import React from 'react'
import ReactDOM from 'react-dom/client'
import './reset.css'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

import { App } from 'app'
import { Error404 } from 'pages/error-404'
import { GameWithComputer } from 'pages/game-with-computer'
import { GameWithFriend } from 'pages/game-with-friend'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error404 />
  },
  {
    path: '/computer',
    element: <GameWithComputer />
  },
  {
    path: '/friend',
    element: <GameWithFriend />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
