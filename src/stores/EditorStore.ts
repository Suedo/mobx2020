import { observable } from 'mobx';
import { RawDraftContentState, EditorState, convertToRaw } from 'draft-js';

// export class EditorStateRaw {
//   @observable rawString: string;

//   constructor(rawString: string) {
//     this.rawString = rawString;
//   }
// }

export const EditorStore = () => {
  return {
    value: '',

    newEditorState(value: string) {
      this.value = value;
      console.log('new editor value:', this.value);
    },

    // takes a Raw Darft state from Draftjs
    updateEditorState(editorState: EditorState) {
      const editorContent = editorState.getCurrentContent();
      const rawState = convertToRaw(editorContent);
      const serializedEditorState = JSON.stringify(rawState, null, 2);
      this.newEditorState(serializedEditorState);
    },
  };
};
