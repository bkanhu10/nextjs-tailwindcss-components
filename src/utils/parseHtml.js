// utils/parseHtml.js
import { Parser } from "htmlparser2";

/**
 * Convert an HTML fragment (only <p>, <ul>, <ol>, <li> expected)
 * into a lightweight AST array.
 */
export function parseHtml(html) {
  const roots = []; // top‑level nodes
  const stack = []; // open elements

  /** Push `node` into the current parent, or into roots if at top level */
  const pushChild = (node) => {
    if (stack.length) {
      const parent = stack[stack.length - 1];
      parent.children.push(node);
    } else {
      roots.push(node);
    }
  };

  const parser = new Parser(
    {
      onopentag(name) {
        const el = { name, children: [] };
        pushChild(el);
        stack.push(el); // this becomes the current parent
      },

      ontext(text) {
        // Collapse runs of whitespace so PDF doesn’t get weird gaps
        const cleaned = text.replace(/\s+/g, " ");
        if (!cleaned.trim()) return; // skip pure whitespace
        pushChild({ data: cleaned });
      },

      onclosetag() {
        stack.pop(); // finished this element
      },
    },
    { decodeEntities: true } // &amp; → &
  );

  parser.write(html ?? "");
  parser.end();

  return roots;
}
