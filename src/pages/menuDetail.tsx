import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Post } from "../types";


export default function MenuDetail() {
    const { id } = useParams();
    const [post, setPosts] = useState<Post | undefined>(undefined);
    const [loading, setLoading] = useState(true); // Tambahkan state loading

    useEffect(() => {
        const getDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`/api/list-menu/${id}/`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                });

                const data = await response.json();

                if (!response.ok) {
                    alert("Failed to fetch menu: " + (data.message || "Unknown error"));
                    return;
                }

                setPosts(data);
            } catch (error) {
                console.error("Fetch error:", error);
                alert("Terjadi kesalahan koneksi ke server.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            getDetails();
        }
    }, [id]); // PENTING: Tambahkan id di sini!

    if (loading) return <div style={{ padding: "32px" }}>Loading data...</div>;
    if (!post) return <div style={{ padding: "32px" }}>Menu tidak ditemukan.</div>;

    return (
        <div style={{ paddingInline: "32px" }}>
            <h1>Menu Detail</h1>
            <br />
            <h2>Name: {post.nama}</h2>
            <p><strong>Desc:</strong> {post.deskripsi}</p>
            <p><strong>Price:</strong> {post.harga}</p>
            <p><strong>Size:</strong> {post.size}</p>
            <p><strong>Label:</strong> {post.label}</p>
            <p><strong>Category:</strong> {post.kategori}</p>
        </div>
    );
}