'use client';

import React, { useEffect, useRef } from 'react';
import { alpha } from '@mui/material/styles';

const EditableInline = ({
  value,
  onChange,
  editMode,
  bold = false,
  style = {},
}: {
  value: string;
  onChange: (val: string) => void;
  editMode: boolean;
  bold?: boolean;
  style?: React.CSSProperties;
}) => {
  const spanRef = useRef<HTMLSpanElement>(null);

  // Sync external value changes into the DOM without clobbering cursor
  useEffect(() => {
    if (spanRef.current && !editMode) {
      spanRef.current.textContent = value;
    }
  }, [value, editMode]);

  // On entering edit mode, set the initial content
  useEffect(() => {
    if (spanRef.current && editMode) {
      if (spanRef.current.textContent !== value) {
        spanRef.current.textContent = value;
      }
    }
  }, [editMode]);

  if (!editMode) {
    return bold ? <strong style={style}>{value}</strong> : <span style={style}>{value}</span>;
  }

  return (
    <span
      ref={spanRef}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.currentTarget.textContent || '')}
      style={{
        outline: 'none',
        borderBottom: '1.5px dashed #3b82f6',
        borderRadius: 2,
        background: alpha('#3b82f6', 0.05),
        padding: '0 2px',
        cursor: 'text',
        fontWeight: bold ? 700 : undefined,
        minWidth: 40,
        display: 'inline',
        ...style,
      }}
    />
  );
};

export default EditableInline;
