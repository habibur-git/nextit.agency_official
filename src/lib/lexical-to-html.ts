/**
 * Minimal Lexical JSON to HTML serializer for Payload CMS rich text.
 * Handles common node types: root, paragraph, text, heading, list, listitem, link, blockquote.
 */

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Lexical text format bitmask (see Lexical TextNode)
const FORMAT_BOLD = 1;
const FORMAT_ITALIC = 2;
const FORMAT_STRIKETHROUGH = 4;
const FORMAT_UNDERLINE = 8;
const FORMAT_CODE = 16;

function formatText(
  text: string,
  format?: number,
  style?: string,
): string {
  if (!text) return "";
  const escaped = escapeHtml(text);
  if (!format && !style) return escaped;
  let out = escaped;
  const fmt = format ?? 0;
  if (fmt & FORMAT_CODE)
    out = `<code class="px-1.5 py-0.5 rounded bg-border text-sm">${out}</code>`;
  if (fmt & FORMAT_BOLD) out = `<strong>${out}</strong>`;
  if (fmt & FORMAT_ITALIC) out = `<em>${out}</em>`;
  if (fmt & FORMAT_UNDERLINE) out = `<u>${out}</u>`;
  if (fmt & FORMAT_STRIKETHROUGH) out = `<s>${out}</s>`;
  if (style?.trim()) {
    const safe = escapeHtml(style.trim());
    out = `<span style="${safe}">${out}</span>`;
  }
  return out;
}

type LexicalNode = {
  type?: string;
  children?: LexicalNode[];
  text?: string;
  format?: number;
  tag?: string;
  listType?: string;
  url?: string;
  value?: number;
  [key: string]: unknown;
};

function serializeNode(node: LexicalNode): string {
  if (!node || typeof node !== "object") return "";

  switch (node.type) {
    case "text": {
      const style =
        (node.__style as string) ?? (node.style as string);
      return formatText(
        node.text ?? "",
        node.format as number | undefined,
        style,
      );
    }

    case "paragraph":
      return `<p>${(node.children ?? []).map(serializeNode).join("")}</p>`;

    case "heading": {
      const tag = node.tag ?? "h3";
      return `<${tag}>${(node.children ?? []).map(serializeNode).join("")}</${tag}>`;
    }

    case "list": {
      const listType = (node.listType as string) ?? "bullet";
      const tag = listType === "number" ? "ol" : "ul";
      const cls =
        listType === "number"
          ? "list-decimal list-inside"
          : "list-disc list-inside";
      return `<${tag} class="${cls} space-y-1 my-4">${(node.children ?? []).map(serializeNode).join("")}</${tag}>`;
    }

    case "listitem":
      return `<li>${(node.children ?? []).map(serializeNode).join("")}</li>`;

    case "link": {
      const url = (node.url as string) ?? "#";
      const rel = url.startsWith("http")
        ? ' rel="noopener noreferrer" target="_blank"'
        : "";
      return `<a href="${escapeHtml(url)}"${rel} class="text-theme underline hover:opacity-90">${(node.children ?? []).map(serializeNode).join("")}</a>`;
    }

    case "blockquote":
      return `<blockquote class="border-l-4 border-theme pl-4 my-4 italic text-desc">${(node.children ?? []).map(serializeNode).join("")}</blockquote>`;

    case "linebreak":
      return "<br />";

    case "root":
      return (node.children ?? []).map(serializeNode).join("");

    default:
      // Unknown node: try to render children
      if (Array.isArray(node.children))
        return node.children.map(serializeNode).join("");
      return "";
  }
}

export type SerializedLexicalState = {
  root?: LexicalNode;
  [key: string]: unknown;
};

function nodeToPlainText(node: LexicalNode): string {
  if (!node || typeof node !== "object") return "";
  if (node.type === "text" && typeof node.text === "string") return node.text;
  return (node.children ?? []).map(nodeToPlainText).join(" ");
}

/**
 * Converts Payload Lexical editor state to plain text (for word count, etc.).
 */
export function lexicalToPlainText(
  data: SerializedLexicalState | null | undefined,
): string {
  if (!data || typeof data !== "object" || !data.root) return "";
  return nodeToPlainText(data.root as LexicalNode);
}

/**
 * Converts Payload Lexical editor state to HTML.
 * Returns empty string if data is missing or invalid.
 */
export function lexicalToHtml(
  data: SerializedLexicalState | null | undefined,
): string {
  if (!data || typeof data !== "object" || !data.root) return "";
  return serializeNode(data.root as LexicalNode);
}
