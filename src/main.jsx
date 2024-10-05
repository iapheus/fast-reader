import React from 'react'
import ReactDOM from 'react-dom/client'
import RoutedPage from './router/RoutedPage.jsx'
import './index.css'
import Navbar from './Components/Navbar.jsx'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
    <>
        <div className={`${localStorage.getItem('theme')}`}>
            <Provider store={store}>
                <Navbar/>
                <RoutedPage/>
            </Provider>
        </div>
    </>
)
