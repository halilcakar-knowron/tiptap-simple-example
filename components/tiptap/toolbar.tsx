'use client';

import { type Editor } from '@tiptap/react';
import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  ChevronDown,
  Undo,
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from 'lucide-react';
import { Toggle } from '../ui/toggle';
import { Separator } from '@/components/ui/separator';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

type Props = {
  editor: Editor | null;
};

const getCurrentHeading = (editor: Editor | null) => {
  if (!editor) {
    return 'Normal';
  }

  const isHeading = editor.isActive('heading');

  if (isHeading) {
    return 'Heading ' + editor.getAttributes('heading').level;
  }

  return 'Normal';
};

export const Toolbar = ({ editor }: Props) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="border border-b-0 border-input bg-transparent rounded-t-md h-10 flex pl-2 items-center">
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={() => editor.commands.undo()}
      >
        <Undo />
      </Button>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        onClick={() => editor.commands.redo()}
      >
        <Redo />
      </Button>

      <Separator className="mx-4 py-5" orientation="vertical" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2">
            {getCurrentHeading(editor)} <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          onCloseAutoFocus={(event) => event.preventDefault()}
        >
          <DropdownMenuItem
            onClick={() => {
              editor.chain().focus().toggleNode('heading', 'paragraph').run();
            }}
          >
            Normal
          </DropdownMenuItem>
          {[1, 2, 3, 4, 5, 6].map((level: any) => {
            return (
              <DropdownMenuItem
                key={level}
                onClick={() => {
                  editor.chain().focus().toggleHeading({ level }).run();
                }}
              >
                Heading {level}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>

      <Separator className="mx-4 py-5" orientation="vertical" />

      <input
        type="color"
        onInput={(event) =>
          editor.chain().focus().setColor(event.currentTarget.value).run()
        }
        value={editor.getAttributes('textStyle').color}
      />

      <Separator className="mx-4 py-5" orientation="vertical" />

      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: 'left' })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign('left').run()
        }
      >
        <AlignLeft className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: 'center' })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign('center').run()
        }
      >
        <AlignCenter className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive({ textAlign: 'right' })}
        onPressedChange={() =>
          editor.chain().focus().setTextAlign('right').run()
        }
      >
        <AlignRight className="h-4 w-4" />
      </Toggle>

      <Separator className="mx-4 py-5" orientation="vertical" />

      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('strike')}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('bulletlist')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Toggle>

      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
    </div>
  );
};

{
  /* <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 1 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading className="h-4 w-4" />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="h-4 w-4" />
      </Toggle> */
}
