import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router";

const Menu = lazy(() => import('../pages/listMenu'));
const MenuDetail = lazy(() => import('../pages/menuDetail'));

export default function AppRoutes() {
    return (
        <Suspense>
            <Routes>
                <Route path="/" element={<Menu />} />
                <Route path="/list-menu/:id" element={<MenuDetail />} />
            </Routes>
        </Suspense>
    );
}