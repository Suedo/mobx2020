import React, { FunctionComponent, useState, useRef, useEffect } from 'react';

// filepond
// @ts-ignore
import { FilePond, registerPlugin } from 'react-filepond';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// `yarn add filepond-plugin-image-preview filepond-plugin-image-exif-orientation filepond-plugin-file-encode filepond-plugin-file-validate-type`
// @ts-ignore
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
// @ts-ignore
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// @ts-ignore
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';

// Register the plugins
registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
  FilePondPluginFileValidateType,
);

interface ImgUploadComponentPropsI {
  label?: string;
  onUpdateFiles: (files: any) => void;
  files: any[];
}

export const ImgUploadComponent: FunctionComponent<ImgUploadComponentPropsI> = ({ label, files, onUpdateFiles }) => {
  const pondref = useRef();

  // default value, obtained from flepond doc
  const disp = label || 'Drag & Drop your files or <span class="filepond--label-action">Browse</span>';

  // PR merged, issue fixed : https://github.com/pqina/filepond-plugin-file-encode/pull/12
  // switching back to `onupdatefiles` , as it handles both add and remove conditions
  const filesUpdated = (newFiles: any) => {
    onUpdateFiles(newFiles);
  };

  const allDone = () => {
    console.log('all done');
  };

  return (
    <FilePond
      ref={pondref}
      files={files}
      allowMultiple={true}
      onupdatefiles={filesUpdated}
      acceptedFileTypes={['image/png', 'image/jpeg']}
      onprocessfiles={allDone}
      fileValidateTypeLabelExpectedTypesMap={{
        'image/jpeg': '.jpg',
        'image/png': '.png',
      }}
      labelIdle={disp}
    />
  );
};
