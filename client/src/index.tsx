import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { store } from './store'
import axiosConfig from './services/ApiService'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
)

axiosConfig.init()
axiosConfig.setHeaders()

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)

export type RootState = ReturnType<typeof store.getState>
