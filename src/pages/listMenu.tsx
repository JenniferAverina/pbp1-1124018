import { useNavigate } from 'react-router';
import { useEffect, useMemo, useState } from "react";
import {
    Card, CardHeader, CardContent, CardActions,
    Avatar, IconButton, Typography, Container,
    Box, Button, TextField, ButtonGroup, Paper,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreVertIcon from '@mui/icons-material/MoreVert';
// import type { Post } from '../types';
import DeleteIcon from '@mui/icons-material/Delete';


import { useDeletePost } from '../hooks/useDeletePost';
import { useCreatePost } from '../hooks/useCreatePost';
import { useUpdatePost } from '../hooks/useUpdatePost';
import { usePosts } from "../hooks/usePosts";

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

function ListMenuItem({ post, onDetail, onDelete, onEdit }: { post: Post, onDetail: (id: string) => void, onDelete: (id: string) => void, onEdit: (post: Post) => void }) {

    return (
        <Card sx={{ height: '240px', display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 2 }}>
            <CardHeader
                action={
                    <Box>
                        {/* TOMBOL EDIT (UPDATE) */}
                        <IconButton size="small" color="primary" onClick={() => onEdit(post)}>
                            <MoreVertIcon fontSize="small" /> {/* Bisa diganti EditIcon */}
                        </IconButton>
                        {/* TOMBOL DELETE */}
                        <IconButton size="small" color="error" onClick={() => onDelete(post.id)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                }
                title={<Typography variant="subtitle1" fontWeight="bold" noWrap>{post.nama}</Typography>}
                subheader={<Typography variant="caption">{new Date(post.createdAt).toLocaleDateString('id-ID')}</Typography>}
                isi={<Typography variant="caption" noWrap>{post.deskripsi}</Typography>}
            />
            <CardContent sx={{ flexGrow: 1, overflow: 'hidden', pt: 0 }}>
                <Typography variant="body2" color="text.secondary" sx={{
                    display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'
                }}>
                    {post.harga},{post.size},{post.label},{post.kategori}
                </Typography>
            </CardContent>
            <CardActions sx={{ borderTop: '1px solid #f0f0f0', justifyContent: 'space-between', px: 2, py: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton size="small" color="error"><FavoriteIcon fontSize="small" /></IconButton>
                </Box>
                <Button size="small" variant="outlined" onClick={() => onDetail(post.id)}>
                    Detail
                </Button>
            </CardActions>
        </Card>
    );
}


export default function listMenu() {

    const [posts, setPosts] = useState<Post[]>([]); // Nyimpen daftar postingan dari API
    const { reload } = usePosts();
    const deletePost = useDeletePost()
    const createPost = useCreatePost();
    const updatePost = useUpdatePost();

    const [open, setOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [formData, setFormData] = useState({ nama: "", deskripsi: "", harga: "", size: "", label: "", kategori: "" });

    const navigate = useNavigate();

    // Fungsi untuk pindah ke halaman detail postingan (yg postDetail ituh)
    const goToPost = (id: string) => navigate(`/list-menu/${id}`);

    useEffect(() => {
        const reloadPostList = async () => {
            try {
                const response = await fetch("http://localhost:5173/api/list-menu");
                if (response.status !== 200) {
                    alert("Failed to fetch post");
                    return;
                }
                const data = await response.json();
                setPosts(data);
                console.log(data); 
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        reloadPostList(); 
    }, []) 

    useEffect(() => {
        reload();
    }, [reload]);

        const handleOpenCreate = () => {
        setEditId(null);
        setFormData({ nama: "", deskripsi: "", harga: "", size: "", label: "", kategori: "" });
        setOpen(true);
    };

    const handleOpenEdit = (post: Post) => {
        setEditId(post.id);
        setFormData({ nama: post.nama, deskripsi: post.deskripsi, harga: post.harga, size: post.size, label: post.label, kategori: post.kategori });
        setOpen(true);
    };

    const handleSubmit = async () => {
        try {
            if (editId) {
                await updatePost(editId, formData);
            } else {
                await createPost(formData);
            }
            setOpen(false);
        } catch (err) {
            alert("Gagal menyimpan post");
        }
    };

    return (
        <Container sx={{ py: 6 }} maxWidth="lg">
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h3" fontWeight="900" sx={{ mb: 4, color: '#1976d2', textAlign: 'center' }}>
                    LIST MENU
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<MoreVertIcon />}
                    onClick={handleOpenCreate}
                >
                    Add Post
                </Button>
            </Box>

                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 4
                }}>
                </Box>
                    {posts.map((post) => (
                        <ListMenuItem
                            key={post.id} 
                            post={post}   
                            onDetail={goToPost} 
                            onDelete={() => deletePost(post.id)}
                            onEdit={handleOpenEdit}
                        />
                    ))}
    

            <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>{editId ? "Edit Post" : "Create New Post"}</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                    <TextField
                        label="nama" fullWidth value={formData.nama}
                        onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                    />
                    <TextField
                        label="deskripsi" fullWidth multiline rows={4} value={formData.deskripsi}
                        onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                    />
                    <TextField
                        label="harga" fullWidth multiline rows={4} value={formData.harga}
                        onChange={(e) => setFormData({ ...formData, harga: e.target.value })}
                    />
                    <TextField
                        label="size" fullWidth multiline rows={4} value={formData.size}
                        onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    />
                    <TextField
                        label="label" fullWidth multiline rows={4} value={formData.label}
                        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                    />
                    <TextField
                        label="kategori" fullWidth multiline rows={4} value={formData.kategori}
                        onChange={(e) => setFormData({ ...formData, kategori: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button variant="contained" onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );

}