import type { Image } from "../main"

export const getImages = (): Image[] => {
    const images = localStorage.getItem("images");
    if(!images)
        return []
    else
        return JSON.parse(images);
}