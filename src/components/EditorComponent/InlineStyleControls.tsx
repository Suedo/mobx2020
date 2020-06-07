import React, { FunctionComponent } from 'react';
import { StyleButton } from './StyleButton';

var INLINE_STYLES = [
  { label: 'Bold', style: 'BOLD' },
  { label: 'Italic', style: 'ITALIC' },
  { label: 'Underline', style: 'UNDERLINE' },
  { label: 'Monospace', style: 'CODE' },
  { label: 'Link', style: 'LINK' },
];

interface InlineStyleControlsPropsI {
  editorState: any;
  onToggle: any;
  onAddLink: () => void;
}

export const InlineStyleControls: FunctionComponent<InlineStyleControlsPropsI> = ({
  onToggle,
  editorState,
  onAddLink,
}) => {
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
          className={'RichEditor-styleButton'}
          onAddLink={onAddLink}
        />
      ))}
    </div>
  );
};
