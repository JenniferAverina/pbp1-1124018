import { useCallback, useMemo } from "react";
import { useAppDispatch } from "./useAppDispatch"; 
import { useAppSelector } from "./useAppSelector"; 
import { setPosts } from "../store/postSlice";

export function usePosts() {
    const dispatch = useAppDispatch();

    const items = useAppSelector((state) => state.posts.items) 

    const reload = useCallback(async () => {

        try {
            const response = await fetch("http://localhost:5173/api/list-menu")
            const data = await response.json()

            dispatch(setPosts(data))
        } catch (err) {
            console.error(err)
        }
    }, [dispatch])

  return useMemo(() => ({
    posts: items,
    reload,
}), [items, reload]); 
}