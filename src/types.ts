
export type Post = {
    createdAt: string;
    deskripsi: string;
    harga: string;
    id: string;
    kategori: Kategori;
    label: Label;
    nama: string;
    size: Size;
    updatedAt: string;
}

export type Label = 'vegan' | 'gluten_free' | 'halal' | 'low_cal';
export type Size = 'small' | 'medium' | 'large';
export type Kategori = 'minuman' | 'makanan';

export type CreatePostPayload = {
    nama: string
    deskripsi: string; 
    harga: string;
    size: string; 
    label: string
    kategori: string
};
