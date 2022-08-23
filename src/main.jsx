// import React from 'react'
// import ReactDOM from 'react-dom/client'
import {createApp} from "vue"
import App from './App'
import './index.css'

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )

const app = createApp(App).mount('#root');
