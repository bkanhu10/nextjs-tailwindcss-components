"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { List, ListOrdered } from "lucide-react";
import { useEffect, useState } from "react";

export default function RichTextEditor({
  content,
  onChange,
  readOnly = false,
}) {
  const [selectionUpdateKey, setSelectionUpdateKey] = useState(0);

  // 1. Always initialize editor (don't conditionally skip it)
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // heading: false,
        bold: false,
        italic: false,
        strike: false,
        blockquote: false,
        codeBlock: false,
        code: false,
        horizontalRule: false,
        hardBreak: false,
      }),
    ],
    content: "", // temporary placeholder
    // onUpdate: ({ editor }) => {
    //   onChange(editor.getHTML());
    // },
    onUpdate: ({ editor }) => {
      if (!readOnly) onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm m-5 focus:outline-none",
      },
    },
    editable: !readOnly,
    immediatelyRender: false,
  });

  // 2. Update editor content when real content loads
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content, false); // false = don't push to history
    }
  }, [editor, content]);

  // 3. Re-render toolbar on selection change
  useEffect(() => {
    if (!editor) return;

    const handleSelectionUpdate = () => {
      setSelectionUpdateKey((prev) => prev + 1);
    };

    editor.on("selectionUpdate", handleSelectionUpdate);
    return () => editor.off("selectionUpdate", handleSelectionUpdate);
  }, [editor]);

  if (!editor) return <p>Loading editor...</p>;
  return (
    <Card>
      <CardContent className="p-4">
        {!readOnly && (
          <ToggleGroup type="multiple" className="mb-4">
            <ToggleGroupItem
              value="h3"
              aria-label="H3"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              pressed={editor.isActive("heading", { level: 3 })}
            ></ToggleGroupItem>
            <ToggleGroupItem
              value="bulletList"
              aria-label="Bullet list"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              pressed={editor.isActive("bulletList")}
            >
              <List className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="orderedList"
              aria-label="Order list"
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              pressed={editor.isActive("orderedList")}
            >
              <ListOrdered className="h-4 w-4" />
            </ToggleGroupItem>
            {/* <ToggleGroupItem
              value="h1"
              aria-label="H1"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              pressed={editor.isActive("heading", { level: 1 })}
            >
              <Heading1 className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="h2"
              aria-label="H2"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              pressed={editor.isActive("heading", { level: 2 })}
            >
              <Heading2 className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="h3"
              aria-label="H3"
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              pressed={editor.isActive("heading", { level: 3 })}
            >
              <Heading3 className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="bold"
              aria-label="Bold"
              onClick={() => editor.chain().focus().toggleBold().run()}
              pressed={editor.isActive("bold")}
            >
              <Bold className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="italic"
              aria-label="Italic"
              onClick={() => editor.chain().focus().toggleItalic().run()}
              pressed={editor.isActive("italic")}
            >
              <Italic className="h-4 w-4" />
            </ToggleGroupItem>
            <ToggleGroupItem
              value="strike"
              aria-label="Strike"
              onClick={() => editor.chain().focus().toggleStrike().run()}
              pressed={editor.isActive("strike")}
            >
              <Strikethrough className="h-4 w-4" />
            </ToggleGroupItem> */}
          </ToggleGroup>
        )}

        <div className="min-h-[150px] rounded-md border p-2">
          <EditorContent editor={editor} />
        </div>
      </CardContent>
    </Card>
  );
}
