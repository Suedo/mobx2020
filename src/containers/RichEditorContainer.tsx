import React from 'react';
import { observer } from 'mobx-react-lite';
import { RichEditor } from '../components/EditorComponent/RichEditorComponent';

export const Editor = observer(() => {
  return <RichEditor placeholder="What's on your mind?"></RichEditor>;
});
