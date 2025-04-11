import React, { forwardRef, useEffect, useRef } from 'react';
import { Quill } from 'react-quill';

// Editor is an uncontrolled React component
const Editor = forwardRef(
  ({ readOnly, value }, ref) => {
    const containerRef = useRef(null);

    useEffect(() => {
      ref.current?.enable(!readOnly);
    }, [ref, readOnly]);

    useEffect(() => {
      const container = containerRef.current;
      const editorContainer = container.appendChild(
        container.ownerDocument.createElement('div'),
      );
      const quill = new Quill(editorContainer, {
        theme: 'snow',
      });
      if (value) {
        quill.clipboard.dangerouslyPasteHTML(value)
        ref.current = quill;
      }else{
        quill.clipboard.dangerouslyPasteHTML('')
      }



      return () => {
        ref.current = null;
        container.innerHTML = '';
      };
    }, [ref]);

    return <div ref={containerRef}></div>;
  },
);

Editor.displayName = 'Editor';


export default Editor;