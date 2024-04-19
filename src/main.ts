import { getImages } from "./api/getImages";

let currentImages = getImages();

const setImages = (arr: Image[]) => {
  const gallery = document.querySelector(".gallery")!
  gallery.innerHTML = "";

  if(!arr || arr.length == 0){
    const emptyMessage = document.createElement("h1");
    emptyMessage.classList.add("gallery__empty-message")
    emptyMessage.innerText = "Images go here!"

    gallery.append(emptyMessage)
  }

  arr.forEach(({name, dataUrl}) => {
    const image = document.createElement("img")
    image.classList.add("gallery__image");
    image.setAttribute("alt", name)
    if(typeof dataUrl == "string")
      image.setAttribute("src", dataUrl)
    gallery.append(image);
  })
      
}

export type Image = {
  name: string,
  size:  number,
  dataUrl: string | ArrayBuffer | null,
}

let file: File | undefined;

const reader = new FileReader();

reader.addEventListener("load", () => {
  const obj: Image = {
    name: file ? file.name : "",
    size: file ? file.size : 0,
    dataUrl: reader.result,
  }

  console.log(obj)

  let images: Image[] = getImages();
  console.log(images)
  images.push(obj);
  console.log(images)
  currentImages = images;
  localStorage.setItem("images", JSON.stringify(images))
  setImages(currentImages)

})

const fileInput = document.querySelector<HTMLInputElement>("#fileInput")!

fileInput?.addEventListener("change", () => {
  file = fileInput.files? fileInput.files[0] : undefined;
  if(!file)
    throw Error("Something went wrong...")
  else if(file.size > 100000)
    alert("Maximum file size exceeded. Try another photo.")
  else{
    reader.readAsDataURL(file)
  }
})

setImages(currentImages);

const placeFiles = document.querySelector<HTMLButtonElement>(".btn--place-files")
placeFiles?.addEventListener("click", () => {
  fileInput?.click();
})

const clearGallery = document.querySelector<HTMLButtonElement>(".btn--clear-gallery")
clearGallery?.addEventListener("click", () => {
  fileInput.files = null;
  currentImages = []
  localStorage.setItem("images", "[]");
  setImages(currentImages);
})

