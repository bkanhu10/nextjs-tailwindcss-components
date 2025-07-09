import { cn } from "@/lib/utils";
import { Check, Clipboard } from "lucide-react";
import { useState } from "react";

export default function CopyClipboard({
  text,
  timeout = 2000,
  label = "Copy",
  className = "",
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    let success = false;

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(text);
        success = true;
      } catch (err) {
        console.error("Clipboard API failed, trying fallback:", err);
      }
    }

    if (!success) {
      // Fallback using execCommand
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        success = document.execCommand("copy");
      } catch (err) {
        console.error("Fallback copy failed:", err);
      }
      document.body.removeChild(textarea);
    }

    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } else {
      console.error("Failed to copy text.");
    }
  };

  return (
    <button
      className={cn(
        "rounded-md border border-brand-950/20 bg-transparent p-1 text-xs font-medium text-brand-950 shadow-sm transition duration-300 hover:bg-brand-100 focus:outline-none focus:ring-2 focus:ring-brand-950 focus:ring-offset-2",
        className
      )}
      onClick={handleCopy}
    >
      <span className="flex items-center justify-center gap-1">
        {copied ? (
          <>
            <Check size={16} /> Copied!
          </>
        ) : (
          <>
            <Clipboard size={16} />
          </>
        )}
      </span>
    </button>
  );
}
