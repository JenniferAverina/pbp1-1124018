import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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

interface PostState {
    items: Post[]
}

const initialState: PostState = {
    items: [],
}

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts(state, action: PayloadAction<Post[]>) {
            state.items = action.payload;
        },
        deletePost(state, action: PayloadAction<string>) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updatePost(state, action: PayloadAction<Post>) {
            const index = state.items.findIndex(item => item.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        }
    }
});

export const { setPosts, deletePost, updatePost } = postSlice.actions;
export default postSlice.reducer;