import React, { FunctionComponent, useState, useRef, KeyboardEvent } from 'react';

import { Editor, EditorState, RichUtils, getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';

// @ts-ignore
import { stateToMarkdown } from 'draft-js-export-markdown';
import './RichEditor.css';
import { BlockStyleControls } from './BlockStyleControls';
import { InlineStyleControls } from './InlineStyleControls';

import { addLinkPluginPlugin } from './LinkAddPlugin';

interface RichEditorPropsI {
  placeholder?: string;
}

export const RichEditor: FunctionComponent<RichEditorPropsI> = ({ placeholder }) => {
  const initialEditorState = EditorState.createEmpty();
  const [editorState, setEditorState] = useState(initialEditorState);

  const editorRef = useRef();

  let className = 'RichEditor-editor';

  const { handleKeyCommand, onTab, toggleBlockType, toggleInlineStyle } = RichUtils;
  const { hasCommandModifier } = KeyBindingUtil;

  const addLink = () => {
    const selection = editorState.getSelection();
    const link = window.prompt('Paste the link -');
    if (!link) {
      onEditorChange(RichUtils.toggleLink(editorState, selection, null));
      return 'handled';
    }
    const content = editorState.getCurrentContent();
    const contentWithEntity = content.createEntity('LINK', 'MUTABLE', {
      url: link,
    });
    const newEditorState = EditorState.push(editorState, contentWithEntity, 'apply-entity');
    const entityKey = contentWithEntity.getLastCreatedEntityKey();
    onEditorChange(RichUtils.toggleLink(newEditorState, selection, entityKey));
    return 'handled';
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
    if (e.keyCode === 83 /* `S` key */ && hasCommandModifier(e)) {
      return 'editor-save';
    }
    return getDefaultKeyBinding(e);
  };

  const customHandleKeyCommand = (command: any, editorState: any) => {
    if (command === 'editor-tab') {
      return 'handled';
    }
    if (command === 'editor-save') {
      console.log('customHandleKeyCommand:: editor-save');
      console.log(stateToMarkdown(editorState.getCurrentContent()));
      return 'handled';
    }

    return 'not-handled';
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
      <InlineStyleControls editorState={editorState} onToggle={customToggleInlineStyle} onAddLink={addLink} />
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
          plugins={[addLinkPluginPlugin]}
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
