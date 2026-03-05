import { useCallback } from "react";
import type { CreatePostPayload } from "../types";

export function useUpdatePost() {
    return useCallback(async (id: string, payload: CreatePostPayload) => {
        try {
            const response = await fetch(`http://localhost:5173/api/update-menu/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nama: payload.nama,
                    deskripsi: payload.deskripsi,
                    harga: payload.harga,
                    size: payload.size,
                    label: payload.label,
                    kategori: payload.kategori
                }),
            });

            if (!response.ok) throw new Error("Gagal memperbarui post");
            
            return await response.json();
        } catch (err) {
            console.error("Update error:", err);
            throw err;
        }
    }, []);
}