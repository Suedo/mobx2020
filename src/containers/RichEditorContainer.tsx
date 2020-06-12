import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { RichEditor } from '../components/EditorComponent/RichEditorComponent';

export const Editor = observer(() => {
  const [editorSerialized, setEditorSerialized] = useState('');

  const handleSave = (value: string) => {
    console.log('Editor Container:', value);
    setEditorSerialized((editorSerialized) => value);
  };

  return (
    <RichEditor
      placeholder="What's on your mind?"
      savedState={editorSerialized}
      onSave={(value: string) => handleSave(value)}
    ></RichEditor>
  );
});
