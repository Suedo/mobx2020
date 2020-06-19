import React, { FunctionComponent, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

import { ImgUploadComponent } from '../components/ImgUploadComponent';
import { UploadImage } from '../stores/ImagesStore';
import { useStore } from '../context/context';

export const ImgUploader = () => {
  const initialState: any[] = []; // to avoid state being set to 'never' type, https://stackoverflow.com/a/52423919/2715083
  const [images, setImages] = useState(initialState);
  const [uploading, setUploading] = useState(false);

  const { imagesStore } = useStore();

  const updateFiles = (updatedImagesFromChild: any[]) => {
    setImages((images) => updatedImagesFromChild);
  };

  /* 
  This way doesnt work. filestatus is always 2. Also, the `onprocessfiles` callback fires only when using `server` config
  useEffect(() => {
    // https://pqina.nl/filepond/docs/patterns/api/filepond-object/#filestatus-enum
    // https://github.com/pqina/filepond/issues/263#issuecomment-472621154
    const status = images.some((i) => i.status != 2); // Filepond.Filestatus of 2 == idle
    console.log('checking upload status', images.map((i) => i.status).join(','));
    setUploading((uploading) => status);
  }, [images]);
  */

  useEffect(() => {
    setUploading((uploading) => true);
    const timer = setTimeout(() => {
      // enable the upload button some time after the last upload triggered
      setUploading((uploading) => false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [images]);

  const updateImageStore = () => {
    console.log('updateImageStore:: updating store with image metadata');
    const updatedImages: UploadImage[] = images.map(getDataFromImage);
    imagesStore.updateImages(updatedImages);
    console.log(
      JSON.stringify(
        imagesStore.images.map((i) => i.fileName),
        null,
        2,
      ),
    );
  };

  return (
    <div>
      <ConfirmUpload confirmUpload={updateImageStore} imageUploading={uploading}></ConfirmUpload>
      <ImgUploadComponent
        onUpdateFiles={updateFiles}
        files={images}
        label="Drag & Drop images here, or click to open file browser!"
      ></ImgUploadComponent>
    </div>
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

interface ConfirmUploadPropsI {
  confirmUpload: () => void;
  imageUploading: boolean;
}

export const ConfirmUpload: FunctionComponent<ConfirmUploadPropsI> = ({ confirmUpload, imageUploading }) => {
  return (
    <>
      <Button disabled={imageUploading} variant="contained" color="primary" onClick={confirmUpload} disableElevation>
        Confirm Upload
      </Button>
    </>
  );
};
