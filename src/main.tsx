import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router'
import { store } from './redux/store.ts'


const ListMenuPage = lazy(() => import('./pages/listMenu.tsx'));
// const MenuDetailPage = lazy(() => import('./pages/menuDetail.tsx'));


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  // <CssBaseline />
  // <ThemeProvider theme={theme}>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ListMenuPage />
        }></Route>
        {/* <Route path='/detail' element={
        <MenuDetailPage />
      }></Route> */}
      </Routes>
    </BrowserRouter>
  </Provider>
  // </ThemeProvider>
  // </StrictMode>,

)

export default ListMenuPage;
