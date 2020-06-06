import React, { FunctionComponent, useState, useRef, useEffect } from 'react';

// filepond
// @ts-ignore
import { FilePond, registerPlugin } from 'react-filepond';

import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Import the Image EXIF Orientation and Image Preview plugins
// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation filepond-plugin-file-encode --save`
// @ts-ignore
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
// @ts-ignore
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// @ts-ignore
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileEncode);

interface ImgUploadComponentPropsI {
  label?: string;
}

export const ImgUploadComponent: FunctionComponent<ImgUploadComponentPropsI> = ({ label }) => {
  const [files, setFiles] = useState([]);
  const pondref = useRef();

  // @ts-ignore
  useEffect(() => pondref.current);

  const updateFiles = (files: any) => {
    const pond = pondref.current;
    /*
    needs a change in `/node_modules/filepond-plugin-file-encode/dist/filepond-plugin-file-encode.js`
    line: 69

    added:
      item.extend('getFileEncodeBase64String', function() {
        return base64Cache[item.id] ? base64Cache[item.id].data : base64Cache[item.id];
      });

    */
    files.map((file: any) => console.log('base64 value:\n', file.getFileEncodeBase64String()));
  };

  return (
    <div className="App">
      <FilePond
        ref={pondref}
        files={files}
        allowMultiple={true}
        onupdatefiles={updateFiles}
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
      <pre>{JSON.stringify(files[0], null, 2)}</pre>
    </div>
  );
};
