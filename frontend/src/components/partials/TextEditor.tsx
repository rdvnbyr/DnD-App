import React, { useMemo } from 'react';
import JoditEditor from 'jodit-react';
import type { Jodit } from 'jodit-react';

type Props = {
  placeholder?: string;
  content: string;
  onBlur: (newContent: string) => void;
  onChange: (newContent: string) => void;
};

export const TextEditor = React.forwardRef((props: Props, ref: React.Ref<Jodit>) => {
  const { content, onBlur, onChange, placeholder } = props;
  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/doc/
      placeholder,
      buttons: [
        'bold',
        'italic',
        'underline',
        'ul',
        'ol',
        'outdent',
        'indent',
        'font',
        'fontsize',
        'brush',
        'paragraph',
        'link',
        'align',
        'undo',
      ],
    }),
    []
  );

  return (
    <JoditEditor
      ref={ref}
      value={content}
      config={config}
      // tabIndex={1} // tabIndex of textarea
      onBlur={onBlur} // preferred to use only this option to update the content for performance reasons
      onChange={onChange}
    />
  );
});
