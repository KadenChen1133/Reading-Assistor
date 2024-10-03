import React from 'react';
import {createRoot} from 'react-dom/client';
import './popup.css';
import Navbar from './conponents/navbar'
import Main from './conponents/main'

const popup = (
    <div className='popup-container'>
        <Navbar />
        <Main />
    </div>
        
    
)

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(popup)