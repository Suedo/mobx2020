import React, { FunctionComponent, useState, useRef, KeyboardEvent } from 'react';

import { Editor, EditorState, CompositeDecorator, RawDraftContentState, convertFromRaw } from 'draft-js';

// @ts-ignore
import { stateToMarkdown } from 'draft-js-export-markdown';
import './RichEditor.css';

interface ViewPostPropsI {
  placeholder?: string;
  savedState: string;
}

export const ViewPostComponent: FunctionComponent<ViewPostPropsI> = ({ savedState = '', placeholder }) => {
  let className = 'RichEditor-editor';
  const onEditorChange = (newState: any) => {
    // do nothing
  };

  const editorState = initializeState(savedState);
  console.log('read only editor', stateToMarkdown(editorState.getCurrentContent()));

  return (
    <div className="RichEditor-root">
      <div className={className}>
        <Editor
          // @ts-ignore
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          onChange={onEditorChange}
          placeholder={placeholder}
          readOnly={true}
        />
      </div>
    </div>
  );
};

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};
const getBlockStyle = (block: any) => {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return null;
  }
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

const initializeState = (savedState: string) => {
  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);

  // dynamic stuff
  // let initialEditorState;
  // if (savedState.length > 0) {
  //   console.log('RichEditorComp: ', savedState);
  //   const deSerializedDraftState = JSON.parse(savedState) as RawDraftContentState;
  //   const savedContentState = convertFromRaw(deSerializedDraftState);
  //   initialEditorState = EditorState.createWithContent(savedContentState, decorator);
  //   console.log('RichEditorComp init:', stateToMarkdown(initialEditorState.getCurrentContent()));
  // } else {
  //   const initialBlankEditorContentState: ContentState = EditorState.createEmpty().getCurrentContent();
  //   initialEditorState = EditorState.createWithContent(initialBlankEditorContentState, decorator);
  // }

  const deSerializedDraftState = JSON.parse(savedState) as RawDraftContentState;
  const savedContentState = convertFromRaw(deSerializedDraftState);
  const initialEditorState = EditorState.createWithContent(savedContentState, decorator);

  return initialEditorState;
};
