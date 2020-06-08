import React, { FunctionComponent, useState, useRef, KeyboardEvent } from 'react';

import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  Modifier,
  CompositeDecorator,
  ContentState,
} from 'draft-js';

// @ts-ignore
import { stateToMarkdown } from 'draft-js-export-markdown';
import './RichEditor.css';
import { BlockStyleControls } from './BlockStyleControls';
import { InlineStyleControls } from './InlineStyleControls';
import { StyleButton } from './StyleButton';

interface RichEditorPropsI {
  placeholder?: string;
}

export const RichEditor: FunctionComponent<RichEditorPropsI> = ({ placeholder }) => {
  const decorator = new CompositeDecorator([
    {
      strategy: findLinkEntities,
      component: Link,
    },
  ]);

  const initialEditorContentState: ContentState = EditorState.createEmpty().getCurrentContent();

  const initialEditorState = EditorState.createWithContent(initialEditorContentState, decorator);
  const [editorState, setEditorState] = useState(initialEditorState);

  const editorRef = useRef();

  let className = 'RichEditor-editor';

  const { handleKeyCommand, onTab, toggleBlockType, toggleInlineStyle } = RichUtils;
  const { hasCommandModifier } = KeyBindingUtil;

  const addLink = () => {
    console.log('in addlink');
    const selectionState = editorState.getSelection();
    const link = window.prompt('Paste your link: ');
    if (!link) {
      // onEditorChange(RichUtils.toggleLink(editorState, selectionState, null));
      return;
    }
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
      url: link,
    });

    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const contentStateWithLink = Modifier.applyEntity(contentStateWithEntity, selectionState, entityKey);
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithLink,
    });

    onEditorChange(RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey));
    return;
  };

  // https://draftjs.org/docs/advanced-topics-key-bindings
  // state changes should be done in handle key part
  const customKeyBindingFn = (e: KeyboardEvent<{}>) => {
    if (e.keyCode === 9 /* TAB */) {
      // exception, changing tate here as need access to event
      const newEditorState = onTab(e, editorState, 4 /* maxDepth */);
      setEditorState(newEditorState);
      return 'editor-tab';
    }
    // Key keycode of each key: https://keycode.info/
    else if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
      return 'editor-save';
    } else if (e.keyCode === 66 /* `B` key */ && hasCommandModifier(e)) {
      return 'editor-toggle-bold';
    } else if (e.keyCode === 73 /* `I` key */ && hasCommandModifier(e)) {
      return 'editor-toggle-italic';
    } else if (e.keyCode === 85 /* `U` key */ && hasCommandModifier(e)) {
      return 'editor-toggle-underline';
    } else if (e.keyCode === 75 /* `k` key */ && hasCommandModifier(e)) {
      return 'editor-toggle-link';
    }
    return getDefaultKeyBinding(e);
  };

  const customHandleKeyCommand = (command: any, editorState: any) => {
    switch (command) {
      case 'editor-tab':
        return 'handled';

      case 'editor-save':
        console.log('customHandleKeyCommand:: editor-save');
        console.log(stateToMarkdown(editorState.getCurrentContent()));
        return 'handled';

      case 'editor-toggle-bold':
        customToggleInlineStyle('BOLD');
        return 'handled';

      case 'editor-toggle-italic':
        customToggleInlineStyle('ITALIC');
        return 'handled';

      case 'editor-toggle-underline':
        customToggleInlineStyle('UNDERLINE');
        return 'handled';

      case 'editor-toggle-link':
        addLink();
        return 'handled';

      default:
        return 'not-handled';
    }
  };

  const customToggleBlockType = (blockType: any) => {
    const newState = toggleBlockType(editorState, blockType);
    setEditorState((editorState) => newState);
  };

  const customToggleInlineStyle = (blockType: any) => {
    const newState = toggleInlineStyle(editorState, blockType);
    setEditorState((editorState) => newState);
  };

  const onEditorChange = (newState: any) => {
    setEditorState((editorState) => newState);
  };

  return (
    <div className="RichEditor-root">
      <BlockStyleControls editorState={editorState} onToggle={customToggleBlockType} />
      <InlineStyleControls editorState={editorState} onToggle={customToggleInlineStyle} />
      <StyleButton key="Link" label="Link" onToggle={addLink} style="LINK" className={'RichEditor-styleButton'} />
      {/* <div className={className} onClick={this.focus}> */}
      <div className={className}>
        <Editor
          // @ts-ignore
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={customHandleKeyCommand}
          keyBindingFn={customKeyBindingFn}
          onChange={onEditorChange}
          placeholder={placeholder}
          // TODO: make ref work
          // ref="editor"
          spellCheck={true}
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
