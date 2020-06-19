import React, { FunctionComponent, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../context/context';

import { RichEditor } from '../components/EditorComponent/RichEditorComponent';
import { SaveButton } from '../components/SaveButton';
import { ImgUploadComponent } from '../components/ImgUploadComponent';

import { EditorState, CompositeDecorator, ContentState, RawDraftContentState, convertFromRaw } from 'draft-js';

// @ts-ignore
import { stateToMarkdown } from 'draft-js-export-markdown';

export const BlogCard = observer(() => {
  const { editorStore, imagesStore } = useStore();

  const savedState = ''; // when editing a published articled, this will have value of that article
  const [editorState, setEditorState] = useState(initializeState(savedState));

  const [images, setImages] = useState([] as any[]);
  const [uploading, setUploading] = useState(false);

  // save the data in the stores
  const handleSave = () => {
    // save image data
    imagesStore.updateFromRaw(images);
    console.log(
      'Saved Images:\n',
      imagesStore.images.map((i) => i.fileName),
    );

    // save editor data
    // manually update the global store when specifically instructed
    editorStore.updateEditorState(editorState);
  };

  useEffect(() => {
    setUploading((uploading) => true);
    const timer = setTimeout(() => {
      setUploading((uploading) => false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [images]);

  return (
    <div>
      <RichEditor
        placeholder="What's on your mind?"
        editorState={editorState}
        setEditorState={setEditorState}
      ></RichEditor>
      <ImgUploadComponent
        imagesUpdated={(newImages) => setImages((images) => newImages)}
        files={images}
        label="Drag & Drop images here, or click to open file browser!"
      ></ImgUploadComponent>
      <div className="card-toolbar">
        <SaveButton displayString="save" onClick={handleSave} loading={uploading}></SaveButton>
      </div>
    </div>
  );
});

const initializeState = (savedState: string) => {
  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);

  let initialEditorState;
  if (savedState.length > 0) {
    console.log('RichEditorComp: ', savedState);
    const deSerializedDraftState = JSON.parse(savedState) as RawDraftContentState;
    const savedContentState = convertFromRaw(deSerializedDraftState);
    initialEditorState = EditorState.createWithContent(savedContentState, decorator);
    console.log('RichEditorComp init:', stateToMarkdown(initialEditorState.getCurrentContent()));
  } else {
    const initialBlankEditorContentState: ContentState = EditorState.createEmpty().getCurrentContent();
    initialEditorState = EditorState.createWithContent(initialBlankEditorContentState, decorator);
  }

  return initialEditorState;
};

// https://stackoverflow.com/a/47509999/2715083
// @ts-ignore
function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
}

const Link = (props: any) => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return <a href={url}>{props.children}</a>;
};
