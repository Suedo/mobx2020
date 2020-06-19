import { observable } from 'mobx';

export class UploadImage {
  fileName: string;
  fileType: string;
  base64: string;

  constructor(name: string, type: string, base64: string) {
    this.fileName = name;
    this.fileType = type;
    this.base64 = base64;
  }
}

export const ImagesStore = () => {
  return {
    images: [] as UploadImage[],

    addImage(img: UploadImage) {
      this.images.push(img);
    },

    updateImages(newImages: UploadImage[]) {
      this.images = newImages;
    },

    // filepond images
    updateFromRaw(filepondImages: any[]) {
      console.log('Updating Image Store by extracting Filepond Image data');
      const updatedImages: UploadImage[] = filepondImages.map(getDataFromImage);
      this.updateImages(updatedImages);
    },
  };
};

// get data from Filepond Format, to update the store
const getDataFromImage = (filepondImage: any) => {
  const fileDataUrl: string = filepondImage.getFileEncodeDataURL(); // fails here
  const extractionRegex = /^data:image\/(\w+);base64,(.+)$/;
  const groups = fileDataUrl.match(extractionRegex);
  const newImage: UploadImage = {
    fileName: filepondImage.filename,
    fileType: (groups && groups[1]) || '',
    base64: (groups && groups[2]) || '',
  };
  return newImage;
};
