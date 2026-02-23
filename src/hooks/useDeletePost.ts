import { useCallback } from "react";
import { useAppDispatch } from "./useAppDispatch";
import { deletePost } from "../store/postSlice";

export function useDeletePost() {
    const dispatch = useAppDispatch();

    return useCallback(async (id: string) => {
        // Tambahkan konfirmasi agar tidak sengaja terhapus
        if (!window.confirm("Apakah Anda yakin ingin menghapus postingan ini?")) return;

        try {
            const response = await fetch(`http://localhost:5173/api/delete-menu/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                console.log("Hapus di API sukses, sekarang hapus di Redux untuk ID:", id);
                dispatch(deletePost(id));
            } else {
                console.error("API gagal menghapus, status:", response.status);
            }
        } catch (err) {
            console.error(err);
        }
    }, [dispatch]);
}