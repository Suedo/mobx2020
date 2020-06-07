import React, { FunctionComponent } from 'react';
import { FormatBold, FormatItalic, FormatUnderlined, CodeSharp, LinkSharp } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

interface StyleButtonPropsI {
  active?: boolean;
  label?: string;
  onToggle?: any;
  className?: string;
  style?: any;
  onAddLink?: () => void;
}

export const StyleButton: FunctionComponent<StyleButtonPropsI> = ({ style, onAddLink, label, onToggle, className }) => {
  const onToggleCustom = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onToggle(style);
  };
  return (
    <span className={className} onMouseDown={onToggleCustom}>
      {getIconIfValid(label, onAddLink)}
    </span>
  );
};

const getIconIfValid = (label: any, onAddLink: any) => {
  switch (label) {
    case 'Bold':
      return <FormatBold />;
    case 'Italic':
      return <FormatItalic />;
    case 'Underline':
      return <FormatUnderlined />;
    case 'Monospace':
      return <CodeSharp />;
    case 'Link':
      return (
        <IconButton onClick={onAddLink}>
          <LinkSharp />
        </IconButton>
      );
    default:
      return label;
  }
};
