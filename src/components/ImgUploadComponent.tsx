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
}

export const ImgUploadComponent: FunctionComponent<ImgUploadComponentPropsI> = ({ label }) => {
  const initialState: any[] = []; // to avoid state being set to 'never' type, https://stackoverflow.com/a/52423919/2715083
  const [files, setFiles] = useState(initialState);
  const pondref = useRef();

  // default value, obtained from flepond doc
  const disp = label || 'Drag & Drop your files or <span class="filepond--label-action">Browse</span>';

  // @ts-ignore
  const filedAdded = (err, file) => {
    if (err) {
      console.log('error on adding file');
    } else {
      console.log('filedAdded :: base64 value:\n', file.getFileEncodeBase64String());

      // Use of the wrapper function is highly encouraged so that the current state is accessed
      // when the re-render actually occurs, not at some other time.
      // https://medium.com/javascript-in-plain-english/how-to-add-to-an-array-in-react-state-3d08ddb2e1dc
      setFiles((files) => [...files, file]);
    }
  };

  return (
    <FilePond
      ref={pondref}
      files={files}
      allowMultiple={true}
      onaddfile={filedAdded}
      acceptedFileTypes={['image/png', 'image/jpeg']}
      fileValidateTypeLabelExpectedTypesMap={{
        'image/jpeg': '.jpg',
        'image/png': '.png',
      }}
      labelIdle={disp}
    />
  );
};
