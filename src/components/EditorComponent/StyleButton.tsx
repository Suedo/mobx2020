import React, { FunctionComponent } from 'react';
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Code,
  Link,
  FormatQuote,
  FormatListBulleted,
  FormatListNumbered,
  DeveloperMode,
} from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

interface StyleButtonPropsI {
  active?: boolean;
  label?: string;
  onToggle?: any;
  className?: string;
  style?: string;
}

export const StyleButton: FunctionComponent<StyleButtonPropsI> = ({ style, label, onToggle, className }) => {
  const onToggleCustom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onToggle(style);
  };
  return (
    <span className={className} onMouseDown={onToggleCustom}>
      <IconButton>{getIconIfValid(label)}</IconButton>
    </span>
  );
};

const getIconIfValid = (label: any) => {
  switch (label) {
    case 'Bold':
      return <FormatBold />;
    case 'Italic':
      return <FormatItalic />;
    case 'Underline':
      return <FormatUnderlined />;
    case 'Monospace':
      return <Code />;
    case 'Link':
      return <Link />;
    case 'Blockquote':
      return <FormatQuote />;
    case 'UL':
      return <FormatListBulleted />;
    case 'OL':
      return <FormatListNumbered />;
    case 'Code Block':
      return <DeveloperMode />;
    default:
      return label;
  }
};
