import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

type Post = {
    id: string;         
    nama: string;    
    deskripsi: string; 
    harga: string;
    size: string; 
    label: string
    kategori: string
    createdAt: string
    updatedAt: string
}

export default function PostDetail() {
    const { id } = useParams();
    const [ post, setPost ]   = useState<Post>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`/api/list-menu/${id}`)
            const data = await response.json();
            setPost(data);
        }
        fetchPost();
    }, [id])

    const back = () => {
        navigate(-1);
    }

    return <div>
        <div>title: {post?.nama}</div>
        <div>content: {post?.deskripsi}</div>
        <div>
            <button onClick={back}>Back</button>
        </div>
    </div>
}