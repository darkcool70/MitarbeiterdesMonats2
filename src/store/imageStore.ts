import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Image } from '../types/database.types';

interface ImageState {
  images: Image[];
  loading: boolean;
  error: string | null;
  fetchImages: () => Promise<void>;
  saveImage: (imageData: Partial<Image>) => Promise<Image | null>;
  deleteImage: (id: string) => Promise<void>;
}

export const useImageStore = create<ImageState>((set) => ({
  images: [],
  loading: false,
  error: null,

  fetchImages: async () => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('images')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      set({ images: data, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },

  saveImage: async (imageData) => {
    set({ loading: true });
    try {
      const { data, error } = await supabase
        .from('images')
        .insert([imageData])
        .select()
        .single();

      if (error) throw error;
      set((state) => ({ images: [data, ...state.images], error: null }));
      return data;
    } catch (error) {
      set({ error: (error as Error).message });
      return null;
    } finally {
      set({ loading: false });
    }
  },

  deleteImage: async (id) => {
    set({ loading: true });
    try {
      const { error } = await supabase
        .from('images')
        .delete()
        .match({ id });

      if (error) throw error;
      set((state) => ({
        images: state.images.filter((img) => img.id !== id),
        error: null,
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    } finally {
      set({ loading: false });
    }
  },
}));