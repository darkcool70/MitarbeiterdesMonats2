import { useState } from 'react';
import { uploadImage } from '../utils/storage';
import { useImageStore } from '../store/imageStore';
import type { TextStyle, TextPosition, Frame } from '../types';

interface SaveImageParams {
  imageFile: File;
  frame: Frame;
  title: string;
  name: string;
  titleStyle: TextStyle;
  nameStyle: TextStyle;
  titlePosition: TextPosition;
  namePosition: TextPosition;
  bannerColor: string;
  logoFile?: File;
  logoPosition?: { x: number; y: number };
  decorations?: Array<{ id: string; image: string; position: { x: number; y: number } }>;
}

export function useSupabaseImage() {
  const [loading, setLoading] = useState(false);
  const saveImage = useImageStore((state) => state.saveImage);

  const handleSaveImage = async ({
    imageFile,
    frame,
    title,
    name,
    titleStyle,
    nameStyle,
    titlePosition,
    namePosition,
    bannerColor,
    logoFile,
    logoPosition,
    decorations,
  }: SaveImageParams) => {
    setLoading(true);
    try {
      const imageUrl = await uploadImage(imageFile, 'images');
      if (!imageUrl) throw new Error('Failed to upload image');

      let logoUrl;
      if (logoFile) {
        logoUrl = await uploadImage(logoFile, 'logos');
      }

      const imageData = {
        image_url: imageUrl,
        frame_id: frame.id,
        title,
        employee_name: name,
        title_style: JSON.stringify(titleStyle),
        name_style: JSON.stringify(nameStyle),
        title_position: JSON.stringify(titlePosition),
        name_position: JSON.stringify(namePosition),
        banner_color: bannerColor,
        logo_url: logoUrl,
        logo_position: logoPosition ? JSON.stringify(logoPosition) : null,
        decorations: decorations ? JSON.stringify(decorations) : null,
      };

      const savedImage = await saveImage(imageData);
      return savedImage;
    } catch (error) {
      console.error('Error saving image:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveImage: handleSaveImage,
    loading,
  };
}