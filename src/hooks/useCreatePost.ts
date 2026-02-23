import { useCallback } from "react";
import type { CreatePostPayload } from "../types"; 

export function useCreatePost() {
    return useCallback(async (payload: CreatePostPayload) => {
        try {
            const response = await fetch("http://localhost:5173/api/create-menu", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error("Gagal membuat post");
            
            return await response.json();
        } catch (error) {
            console.error("Error creating post:", error);
            throw error;
        }
    }, []);
}