import { observable } from 'mobx';

export class EditorStateRaw {
  @observable rawString: string;

  constructor(rawString: string) {
    this.rawString = rawString;
  }
}

export const EditorStateStore = () => {
  return {
    editorStateRaw: new EditorStateRaw(''),

    set newEditorStateRaw(value: string) {
      this.editorStateRaw = new EditorStateRaw(value);
    },
  };
};
