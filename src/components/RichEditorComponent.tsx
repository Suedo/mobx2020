import React, { FunctionComponent, useState, useRef, KeyboardEvent } from 'react';

import { Editor, EditorState, RichUtils, getDefaultKeyBinding, KeyBindingUtil } from 'draft-js';
import './RichEditor.css';

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

  return (
    <div className="RichEditor-root">
      <BlockStyleControls editorState={editorState} onToggle={customToggleBlockType} />
      <InlineStyleControls editorState={editorState} onToggle={customToggleInlineStyle} />
      {/* <div className={className} onClick={this.focus}> */}
      <div className={className}>
        <Editor
          // @ts-ignore
          blockStyleFn={getBlockStyle}
          customStyleMap={styleMap}
          editorState={editorState}
          handleKeyCommand={customHandleKeyCommand}
          keyBindingFn={customKeyBindingFn}
          onChange={(editorState) => setEditorState(editorState)}
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

interface StyleButtonPropsI {
  active?: boolean;
  label?: string;
  onToggle?: any;
  className?: string;
  style?: any;
}

export const StyleButton: FunctionComponent<StyleButtonPropsI> = ({ style, active, label, onToggle, className }) => {
  const onToggleCustom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onToggle(style);
  };
  return (
    <span className={className} onMouseDown={onToggleCustom}>
      {label}
    </span>
  );
};

const BLOCK_TYPES = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  { label: 'H4', style: 'header-four' },
  { label: 'H5', style: 'header-five' },
  { label: 'H6', style: 'header-six' },
  { label: 'Blockquote', style: 'blockquote' },
  { label: 'UL', style: 'unordered-list-item' },
  { label: 'OL', style: 'ordered-list-item' },
  { label: 'Code Block', style: 'code-block' },
];

interface BlockStyleControlsPropsI {
  editorState: any;
  onToggle: any;
}

export const BlockStyleControls: FunctionComponent<BlockStyleControlsPropsI> = ({ editorState, onToggle }) => {
  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
];

interface InlineStyleControlsPropsI {
  editorState: any;
  onToggle: any;
}

export const InlineStyleControls: FunctionComponent<InlineStyleControlsPropsI> = ({ onToggle, editorState }) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};
