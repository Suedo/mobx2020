// addLinkPlugin
// https://medium.com/@siobhanpmahoney/building-a-rich-text-editor-with-react-and-draft-js-part-2-2-embedding-links-d71b57d187a7
// somehow cannot get the Link in editor to change style, hence trying out a different plugin
import React from 'react';
import { RichUtils, KeyBindingUtil, EditorState } from 'draft-js';

export const linkStrategy = (contentBlock: any, callback: any, contentState: any) => {
  contentBlock.findEntityRanges((character: any) => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
  }, callback);
};

export const Link = (props: any) => {
  const { contentState, entityKey } = props;
  const { url } = contentState.getEntity(entityKey).getData();
  return (
    <a className="link" href={url} rel="noopener noreferrer" target="_blank" aria-label={url}>
      {props.children}
    </a>
  );
};

export const addLinkPluginPlugin = {
  // @ts-ignore
  keyBindingFn(event: any, { getEditorState }) {
    const editorState = getEditorState();
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      return;
    }
    if (KeyBindingUtil.hasCommandModifier(event) && event.which === 75) {
      return 'add-link';
    }
  },

  // // @ts-ignore
  // handleKeyCommand(command, editorState, { getEditorState, setEditorState }) {
  //   if (command !== 'add-link') {
  //     return 'not-handled';
  //   }
  //   let link = window.prompt('Paste the link -');
  //   console.log('handleKeyCommand:: ', link);

  //   const selection = editorState.getSelection();
  //   if (!link) {
  //     setEditorState(RichUtils.toggleLink(editorState, selection, null));
  //     return 'handled';
  //   }
  //   const content = editorState.getCurrentContent();
  //   const contentWithEntity = content.createEntity('LINK', 'MUTABLE', {
  //     url: link,
  //   });
  //   const newEditorState = EditorState.push(editorState, contentWithEntity, 'apply-entity');
  //   const entityKey = contentWithEntity.getLastCreatedEntityKey();
  //   setEditorState(RichUtils.toggleLink(newEditorState, selection, entityKey));
  //   return 'handled';
  // },

  decorators: [
    {
      strategy: linkStrategy,
      component: Link,
    },
  ],
};
