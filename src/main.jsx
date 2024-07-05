import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux'
import { CartStore } from './Redux/Store/CartStore.jsx'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ChakraProvider>
      <Provider store={CartStore}>
        <App />
      </Provider>
    </ChakraProvider>
  </BrowserRouter>
)