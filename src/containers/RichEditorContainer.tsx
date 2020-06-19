import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { RichEditor } from '../components/EditorComponent/RichEditorComponent';
import { ViewPostComponent } from '../components/EditorComponent/ViewPostComponent';
import { useStore } from '../context/context';
import { SaveButton } from '../components/SaveButton';

import { EditorState, CompositeDecorator, ContentState, RawDraftContentState, convertFromRaw } from 'draft-js';

// @ts-ignore
import { stateToMarkdown } from 'draft-js-export-markdown';

export const Editor = observer(() => {
  const { editorStore } = useStore();

  const handleSave = () => {
    editorStore.updateEditorState(editorState);
    console.log('Saved editor values:', editorStore.value);
  };

  const savedState = '';
  const [editorState, setEditorState] = useState(initializeState(savedState));

  return (
    <>
      <RichEditor
        placeholder="What's on your mind?"
        onSave={handleSave}
        editorState={editorState}
        setEditorState={setEditorState}
      ></RichEditor>
      <SaveButton displayString="save" onClick={handleSave}></SaveButton>
      {editorStore.value.length > 0 && <ViewPostComponent savedState={editorStore.value}></ViewPostComponent>}
    </>
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
