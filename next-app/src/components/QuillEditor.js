'use client';
import React, { useEffect, useRef } from 'react';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';

export default function QuillEditor({ value, onChange, style }) {
  const containerRef = useRef(null);
  const quillRef = useRef(null);
  const isUpdatingRef = useRef(false);

  useEffect(() => {
    if (containerRef.current && !quillRef.current) {
      quillRef.current = new Quill(containerRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean'],
          ],
        },
      });

      quillRef.current.on('text-change', () => {
        isUpdatingRef.current = true;
        onChange(quillRef.current.root.innerHTML);
        isUpdatingRef.current = false;
      });
    }
  }, []);

  useEffect(() => {
    if (quillRef.current && !isUpdatingRef.current) {
      const currentHtml = quillRef.current.root.innerHTML;
      // Prevent resetting the cursor position unnecessarily
      if (value !== currentHtml && value !== undefined) {
        quillRef.current.clipboard.dangerouslyPasteHTML(value);
      }
    }
  }, [value]);

  return (
    <div style={style}>
      <div ref={containerRef} style={{ height: '100%', minHeight: '300px' }} />
    </div>
  );
}
