import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import { Color } from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';

import { Toolbar } from './toolbar';

export const proseClasses = `prose max-w-none dark:prose-invert prose-gray 
  prose-base prose-li:marker:text-slate-700 prose-img:block prose-img:my-4 font-sans`
  .trim()
  .replaceAll('\n', ' ');

export const Tiptap = ({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Image,
      Link,
      Color,
      TextStyle,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content:
      description +
      `<h1>Awesome editor with tooling!</h1><p>We can have more functionality here <span style="color: #ff0000">which is wow!!</span></p><p><a target="_blank" rel="noopener noreferrer nofollow" href="#">You can see the extensions here.</a></p><ul><li><p>Also making lists is possible</p><ol><li><p>With sub lists!!</p></li><li><p style="text-align: center">Even with this!!</p></li></ol><ul><li><p>woww</p><ul><li><p>Haha even this is working....</p></li></ul></li></ul></li></ul><img src="https://source.unsplash.com/K9QHL52rE2k/800x400">`,
    editorProps: {
      attributes: {
        class: `${proseClasses} h-[calc(100%-2.5rem)] rounded-b-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none`,
      },
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      console.log(html);

      onChange(html);
    },
  });

  return (
    <div className="flex rounded-md flex-col justify-stretch focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};
