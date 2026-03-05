import { lazy, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import { CssBaseline } from '@mui/material'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router'
import { store } from './redux/store.ts'
import AppRoutes from './config/AppRoutes.tsx'
import { Layout } from './components/Layout.tsx'


// const ListMenuPage = lazy(() => import('./pages/listMenu.tsx'));
// const MenuDetailPage = lazy(() => import('./pages/menuDetail.tsx'));


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  // <CssBaseline />
  // <ThemeProvider theme={theme}>
  // <Provider store={store}>
  //   <BrowserRouter>
  //     <Routes>
  //       <Route path='/' element={
  //         <ListMenuPage />
  //       }></Route>
  //       <Route path="/list-menu/:id" element={<MenuDetailPage />} />
  //     </Routes>
  //   </BrowserRouter>
  // </Provider>
  // </ThemeProvider>
  // </StrictMode>,

    <StrictMode>
    <CssBaseline />
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </Provider>
  </StrictMode>


)

