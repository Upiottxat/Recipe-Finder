// hooks/useSlidingImages.ts
"use client";
import { useState, useEffect } from "react";

export const useSlidingImages = () => {
  const [images, setImages] = useState<string[]>([]);

  const fetchImages = async () => {
    try {
   
      const res = await fetch("/api/HeroHeaderSlides");
      const data = await res.json();
      setImages(data);
    } catch (err) {
      console.error("Failed to fetch sliding images", err);
    } finally {
    
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return { slidesImgs:images};
};
