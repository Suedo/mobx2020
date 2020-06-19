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
import Tooltip from '@material-ui/core/Tooltip';

interface StyleButtonPropsI {
  active?: boolean;
  label?: string;
  onToggle?: any;
  className?: string;
  style?: string;
}

export const StyleButton: FunctionComponent<StyleButtonPropsI> = ({ style, active, label, onToggle, className }) => {
  const onToggleCustom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onToggle(style);
  };

  let toolTipText = label || '';
  if (label === 'UL') toolTipText = 'Bulleted List';
  else if (label === 'OL') toolTipText = 'Numbered List';
  else if (label === 'Monospace') toolTipText = 'Inline Code';

  const activeclass = `${active ? ' RichEditor-activeButton' : ''}`;
  const classNames = className + activeclass;
  return (
    <span className={classNames} onMouseDown={onToggleCustom}>
      <Tooltip title={toolTipText}>
        <IconButton>{getIconIfValid(label)}</IconButton>
      </Tooltip>
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
