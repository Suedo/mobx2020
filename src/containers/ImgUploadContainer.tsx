import React, { useState } from 'react';
import { ImgUploadComponent } from '../components/ImgUploadComponent';
import { UploadImage } from '../stores/ImagesStore';
import { useStore } from '../context/context';

export const ImgUploader = () => {
  const initialState: any[] = []; // to avoid state being set to 'never' type, https://stackoverflow.com/a/52423919/2715083
  const [images, setImages] = useState(initialState);

  const { imagesStore } = useStore();

  const updateFiles = (updatedImagesFromChild: any[]) => {
    setImages((images) => updatedImagesFromChild);
    // commenting out untill https://github.com/pqina/filepond-plugin-file-encode/issues/13 gets resolved
    // or a different flow comes to mind
    // const updatedImages: UploadImage[] = updatedImagesFromChild.map(getDataFromImage);
    // imagesStore.updateImages(updatedImages);
  };

  return (
    <ImgUploadComponent
      onUpdateFiles={updateFiles}
      files={images}
      label="Drag & Drop images here, or click to open file browser!"
    ></ImgUploadComponent>
  );
};

// image is the filepond file-encoded image
export const getDataFromImage = (image: any) => {
  const fileDataUrl: string = image.getFileEncodeDataURL(); // fails here
  const extractionRegex = /^data:image\/(\w+);base64,(.+)$/;
  const groups = fileDataUrl.match(extractionRegex);
  const newImage: UploadImage = {
    fileName: image.filename,
    fileType: (groups && groups[1]) || '',
    base64: (groups && groups[2]) || '',
  };
  return newImage;
};
