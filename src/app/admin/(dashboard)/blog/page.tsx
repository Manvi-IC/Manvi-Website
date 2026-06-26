// app/admin/blog/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  FileText,
  Check,
  AlertCircle,
  X,
  AlignLeft,
  Heading,
  List,
  HelpCircle,
  Image,
  Layers,
  GripVertical,
  Table,
  Link as LinkIcon,
  Bold,
  Italic,
  Link2Off
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  label?: string;
}

function ImageUploadField({ value, onChange, placeholder = "Image URL", label }: ImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/admin/upload-image`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        onChange(data.url);
      } else {
        alert(data.message || "Failed to upload image");
      }
    } catch (err) {
      console.error("Upload error:", err);
      alert("Error uploading image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-1">
      {label && <label className="block text-xs font-semibold text-gray-500 uppercase">{label}</label>}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded-lg p-2 text-sm focus:outline-none focus:border-[#e77419]"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <label className="flex items-center justify-center px-3 py-2 bg-slate-100 hover:bg-slate-200 border rounded-lg cursor-pointer text-xs font-semibold text-slate-700 transition-colors whitespace-nowrap min-w-[100px] shadow-sm select-none">
          {uploading ? "Uploading..." : "Upload File"}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      </div>
    </div>
  );
}

function MarkdownEditor({ value, onChange, placeholder, rows = 3 }: { value: string, onChange: (val: string) => void, placeholder?: string, rows?: number }) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [savedRange, setSavedRange] = useState<Range | null>(null);

  // Link Hover Popover States
  const [activeLinkEl, setActiveLinkEl] = useState<HTMLAnchorElement | null>(null);
  const [isEditingPopoverLink, setIsEditingPopoverLink] = useState(false);
  const [popoverLinkUrlInput, setPopoverLinkUrlInput] = useState("");
  const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
  const popoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Keep track of the last value to prevent infinite render loops
  const lastValueRef = useRef(value);

  // Helper to convert Markdown to HTML
  const markdownToHtml = (md: string): string => {
    if (!md) return "";
    let html = md;
    
    // Escape HTML characters
    html = html
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Bold-Italic: ***text***
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
    
    // Bold: **text**
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    
    // Italic: *text*
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    
    // Link: [text](url)
    html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:#2563eb;text-decoration:underline;">$1</a>');

    // Convert newlines to <br>
    html = html.replace(/\n/g, "<br>");
    
    return html;
  };

  // Helper to convert HTML back to Markdown
  const htmlToMarkdown = (html: string): string => {
    if (!html) return "";
    
    let doc: Document;
    try {
      doc = new DOMParser().parseFromString(html, "text/html");
    } catch (e) {
      return html;
    }
    
    const body = doc.body;

    function processNode(node: Node): string {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent || "";
      }
      
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tagName = el.tagName.toLowerCase();
        
        let childrenVal = "";
        for (let i = 0; i < el.childNodes.length; i++) {
          childrenVal += processNode(el.childNodes[i]);
        }
        
        switch (tagName) {
          case "strong":
          case "b":
            return childrenVal.trim() ? `**${childrenVal}**` : "";
          case "em":
          case "i":
            return childrenVal.trim() ? `*${childrenVal}*` : "";
          case "a":
            const href = el.getAttribute("href") || "";
            return childrenVal.trim() ? `[${childrenVal}](${href})` : "";
          case "br":
            return "\n";
          case "p":
          case "div":
            return childrenVal ? `${childrenVal}\n` : "";
          default:
            return childrenVal;
        }
      }
      return "";
    }

    let markdown = "";
    for (let i = 0; i < body.childNodes.length; i++) {
      markdown += processNode(body.childNodes[i]);
    }
    
    return markdown.replace(/\u00A0/g, " ").replace(/\r/g, "").replace(/\n{3,}/g, "\n\n");
  };

  // Sync state changes from outside
  useEffect(() => {
    if (editorRef.current) {
      const currentMarkdown = htmlToMarkdown(editorRef.current.innerHTML);
      if (value !== currentMarkdown) {
        editorRef.current.innerHTML = markdownToHtml(value);
        lastValueRef.current = value;
        // Style all links blue+underline after content loads
        editorRef.current.querySelectorAll("a").forEach((a) => {
          (a as HTMLElement).style.color = "#2563eb";
          (a as HTMLElement).style.textDecoration = "underline";
        });
      }
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      const html = editorRef.current.innerHTML;
      const markdown = htmlToMarkdown(html);
      lastValueRef.current = markdown;
      onChange(markdown);
    }
  };

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      setSavedRange(sel.getRangeAt(0));
    }
  };

  const restoreSelection = () => {
    const sel = window.getSelection();
    if (sel && savedRange) {
      sel.removeAllRanges();
      sel.addRange(savedRange);
    }
  };

  const executeCommand = (command: string, val: string = "") => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    
    const sel = window.getSelection();
    const hasSelection = sel && !sel.isCollapsed;
    
    document.execCommand(command, false, val);
    
    if (hasSelection && sel && sel.rangeCount > 0) {
      sel.collapseToEnd();
      
      const range = sel.getRangeAt(0);
      const node = range.startContainer;
      const parentEl = node.parentElement;
      
      if (parentEl && ["STRONG", "B", "EM", "I", "A"].includes(parentEl.tagName)) {
        // Find the outermost formatting element
        let outermostEl = parentEl;
        while (
          outermostEl.parentNode && 
          outermostEl.parentNode.nodeType === Node.ELEMENT_NODE &&
          (outermostEl.parentNode as HTMLElement).tagName !== "DIV" &&
          ["STRONG", "B", "EM", "I", "A"].includes((outermostEl.parentNode as HTMLElement).tagName)
        ) {
          outermostEl = outermostEl.parentNode as HTMLElement;
        }

        // Create a space node outside (use non-breaking space to prevent empty node collapse)
        const spaceNode = document.createTextNode("\u00A0");
        
        // Insert after the outermost formatting element
        if (outermostEl.nextSibling) {
          outermostEl.parentNode?.insertBefore(spaceNode, outermostEl.nextSibling);
        } else {
          outermostEl.parentNode?.appendChild(spaceNode);
        }
        
        // Move caret inside the space node
        const newRange = document.createRange();
        newRange.setStart(spaceNode, 1);
        newRange.setEnd(spaceNode, 1);
        sel.removeAllRanges();
        sel.addRange(newRange);
      }
    }
    
    handleInput();
  };

  const styleAllLinks = () => {
    if (editorRef.current) {
      editorRef.current.querySelectorAll("a").forEach((a) => {
        (a as HTMLElement).style.color = "#2563eb";
        (a as HTMLElement).style.textDecoration = "underline";
      });
    }
  };

  const addLink = () => {
    if (!linkUrl) return;
    restoreSelection();
    executeCommand("createLink", linkUrl);
    styleAllLinks();
    setShowLinkInput(false);
    setLinkUrl("");
  };

  // Popover handlers
  const handleMouseOver = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest("a");
    if (anchor && editorRef.current) {
      if (popoverTimeoutRef.current) {
        clearTimeout(popoverTimeoutRef.current);
        popoverTimeoutRef.current = null;
      }
      setActiveLinkEl(anchor);
      setPopoverLinkUrlInput(anchor.getAttribute("href") || "");
      
      const rect = anchor.getBoundingClientRect();
      const editorRect = editorRef.current.getBoundingClientRect();
      setPopoverPosition({
        top: rect.top - editorRect.top - 46,
        left: rect.left - editorRect.left + (rect.width / 2) - 110,
      });
    }
  };

  const handleMouseLeave = () => {
    popoverTimeoutRef.current = setTimeout(() => {
      if (!isEditingPopoverLink) {
        setActiveLinkEl(null);
      }
    }, 300);
  };

  const handlePopoverMouseEnter = () => {
    if (popoverTimeoutRef.current) {
      clearTimeout(popoverTimeoutRef.current);
      popoverTimeoutRef.current = null;
    }
  };

  const handlePopoverMouseLeave = () => {
    if (!isEditingPopoverLink) {
      setActiveLinkEl(null);
    }
  };

  const savePopoverLink = () => {
    if (activeLinkEl) {
      activeLinkEl.setAttribute("href", popoverLinkUrlInput);
      setIsEditingPopoverLink(false);
      setActiveLinkEl(null);
      handleInput();
    }
  };

  const removePopoverLink = () => {
    if (activeLinkEl) {
      activeLinkEl.replaceWith(...activeLinkEl.childNodes);
      setActiveLinkEl(null);
      handleInput();
    }
  };

  return (
    <div className="flex flex-col relative w-full">
      <style jsx>{`
        .rich-text-editor:empty::before {
          content: attr(data-placeholder);
          color: #94a3b8;
          cursor: text;
        }
        .rich-text-editor a {
          color: #2563eb !important;
          text-decoration: underline !important;
          cursor: pointer;
        }
        .rich-text-editor strong {
          font-weight: bold;
        }
        .rich-text-editor em {
          font-style: italic;
        }
      `}</style>

      {/* Popover on Link Hover */}
      {activeLinkEl && (
        <div 
          className="absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-2.5 flex items-center gap-2 text-xs"
          style={{ 
            top: `${popoverPosition.top}px`, 
            left: `${popoverPosition.left}px`,
            minWidth: "220px" 
          }}
          onMouseEnter={handlePopoverMouseEnter}
          onMouseLeave={handlePopoverMouseLeave}
        >
          {isEditingPopoverLink ? (
            <div className="flex items-center gap-1.5 w-full">
              <input 
                type="text" 
                className="border border-gray-300 rounded px-1.5 py-0.5 text-xs focus:outline-none focus:border-[#e77419] flex-1"
                value={popoverLinkUrlInput}
                onChange={(e) => setPopoverLinkUrlInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    savePopoverLink();
                  }
                }}
                autoFocus
              />
              <button 
                type="button" 
                className="bg-[#e77419] hover:bg-[#db660c] text-white px-2 py-0.5 rounded font-bold transition-colors"
                onClick={savePopoverLink}
              >
                Save
              </button>
              <button 
                type="button" 
                className="text-slate-500 hover:text-slate-700 px-1 py-0.5 rounded"
                onClick={() => setIsEditingPopoverLink(false)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <a 
                href={activeLinkEl.href} 
                target="_blank" 
                rel="noreferrer"
                className="text-blue-600 hover:underline font-medium truncate max-w-[130px]"
              >
                {activeLinkEl.getAttribute("href")}
              </a>
              <div className="flex items-center gap-1 border-l pl-2 border-gray-200 shrink-0">
                <button 
                  type="button" 
                  className="text-slate-600 hover:text-[#e77419] transition-colors px-1"
                  onClick={() => {
                    setPopoverLinkUrlInput(activeLinkEl.getAttribute("href") || "");
                    setIsEditingPopoverLink(true);
                  }}
                >
                  Edit
                </button>
                <button 
                  type="button" 
                  className="text-red-500 hover:text-red-700 px-1"
                  onClick={removePopoverLink}
                >
                  Unlink
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center gap-1 mb-0 bg-slate-100 p-1.5 rounded-t-lg border border-gray-300 border-b-0 w-full overflow-x-auto select-none">
        <button 
          type="button" 
          onMouseDown={(e) => {
            e.preventDefault();
            executeCommand("bold");
          }} 
          className="p-1 hover:bg-slate-200 rounded text-xs text-slate-700 transition-colors shrink-0 flex items-center justify-center w-6 h-6 font-bold" 
          title="Bold"
        >
          <Bold size={14}/>
        </button>
        <button 
          type="button" 
          onMouseDown={(e) => {
            e.preventDefault();
            executeCommand("italic");
          }} 
          className="p-1 hover:bg-slate-200 rounded text-xs text-slate-700 transition-colors shrink-0 flex items-center justify-center w-6 h-6 italic" 
          title="Italic"
        >
          <Italic size={14}/>
        </button>
        <button 
          type="button" 
          onMouseDown={(e) => {
            e.preventDefault();
            saveSelection();
            setShowLinkInput(!showLinkInput);
          }} 
          className="px-2 py-1 hover:bg-slate-200 rounded text-xs font-medium text-slate-700 transition-colors flex items-center gap-1 shrink-0 h-6" 
          title="Link"
        >
          <LinkIcon size={12}/> Link
        </button>
        <button 
          type="button" 
          onMouseDown={(e) => {
            e.preventDefault();
            executeCommand("unlink");
          }} 
          className="px-2 py-1 hover:bg-slate-200 rounded text-xs font-medium text-red-500 hover:text-red-700 transition-colors shrink-0 h-6" 
          title="Remove Link"
        >
          <Link2Off size={12}/> Unlink
        </button>
        
        {showLinkInput && (
          <div className="flex items-center gap-1 ml-2 pl-2 border-l border-slate-300 animate-in fade-in zoom-in-95 duration-200">
            <input 
              type="text" 
              placeholder="https://" 
              className="px-2 py-0.5 text-xs border rounded w-32 md:w-48 focus:outline-none focus:border-[#e77419] h-6"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addLink();
                }
              }}
              autoFocus
            />
            <button 
              type="button" 
              className="px-2 py-0.5 bg-[#e77419] hover:bg-[#db660c] transition-colors text-white rounded text-xs font-bold shrink-0 h-6"
              onClick={addLink}
            >
              Add
            </button>
            <button 
              type="button" 
              className="px-2 py-0.5 text-slate-500 hover:text-slate-700 rounded text-xs shrink-0 h-6"
              onClick={() => { setShowLinkInput(false); setLinkUrl(""); }}
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Editor Body */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        className="rich-text-editor w-full border border-gray-300 rounded-b-lg rounded-tr-lg p-2.5 focus:border-[#e77419] focus:outline-none text-sm bg-white overflow-y-auto"
        style={{ minHeight: `${rows * 28}px`, maxHeight: "350px" }}
        data-placeholder={placeholder}
      />
    </div>
  );
}

interface BlogBlock {
  type: "paragraph" | "subheading" | "list" | "callout" | "image" | "heading" | "divider" | "slideshow" | "table";
  text?: string;
  items?: string[];
  style?: string; // e.g. "bullet", "numbered", "h2", "h3", "h4"
  src?: string;
  alt?: string;
  caption?: string;
  layout?: string; // e.g. "left-image", "right-image", "top-image", "bottom-image"
  images?: Array<{ src: string; alt?: string; caption?: string }>;
  buttonText?: string;
  buttonLink?: string;
  tableData?: string[][];
}

interface BlogPost {
  _id?: string;
  slug: string;
  category: string;
  icon: string;
  tag: string;
  title: string;
  description: string;
  metaTitle?: string;
  metaDescription?: string;
  readTime: string;
  thumbClass: string;
  featured: boolean;
  publishedDate: string;
  bannerImage?: string;
  bannerImageAlt?: string;
  mobileBannerImage?: string;
  mobileBannerImageAlt?: string;
  previewImage?: string;
  previewImageAlt?: string;
  author: {
    name: string;
    avatarInitials: string;
  };
  content: BlogBlock[];
}

const CATEGORIES = [
  { id: "guides", label: "Shipping Guides" },
  { id: "customs", label: "Customs & Compliance" },
  { id: "logistics", label: "International Logistics" },
  { id: "gifting", label: "Festive & Gifting" },
  { id: "news", label: "Company News" }
];

export default function BlogManagementPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [insertMenuIndex, setInsertMenuIndex] = useState<number | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("guides");
  const [tag, setTag] = useState("");
  const [icon, setIcon] = useState("📝");
  const [description, setDescription] = useState("");
  const [readTime, setReadTime] = useState("5 min");
  const [featured, setFeatured] = useState(false);
  const [publishedDate, setPublishedDate] = useState("");
  const [authorName, setAuthorName] = useState("Manvi Logistics Team");
  const [authorInitials, setAuthorInitials] = useState("ML");
  const [bannerImage, setBannerImage] = useState("");
  const [bannerImageAlt, setBannerImageAlt] = useState("");
  const [mobileBannerImage, setMobileBannerImage] = useState("");
  const [mobileBannerImageAlt, setMobileBannerImageAlt] = useState("");
  const [previewImage, setPreviewImage] = useState("");
  const [previewImageAlt, setPreviewImageAlt] = useState("");
  const [activeBannerTab, setActiveBannerTab] = useState<"desktop" | "mobile">("desktop");
  const [contentBlocks, setContentBlocks] = useState<BlogBlock[]>([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/admin/blogs`);
      const data = await res.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      showMsg("Failed to connect to backend", "error");
    } finally {
      setLoading(false);
    }
  };

  const showMsg = (text: string, type: "success" | "error") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 5000);
  };

  const handleOpenNewForm = () => {
    setEditingBlog(null);
    setTitle("");
    setMetaTitle("");
    setMetaDescription("");
    setSlug("");
    setCategory("guides");
    setTag("Shipping Guides");
    setIcon("📝");
    setDescription("");
    setReadTime("5 min");
    setFeatured(false);
    setPublishedDate(new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }));
    setAuthorName("Manvi Logistics Team");
    setAuthorInitials("ML");
    setBannerImage("");
    setBannerImageAlt("");
    setMobileBannerImage("");
    setMobileBannerImageAlt("");
    setPreviewImage("");
    setPreviewImageAlt("");
    setActiveBannerTab("desktop");
    setContentBlocks([
      { type: "paragraph", text: "", layout: "none" }
    ]);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (blog: BlogPost) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setMetaTitle(blog.metaTitle || "");
    setMetaDescription(blog.metaDescription || "");
    setSlug(blog.slug);
    setCategory(blog.category);
    setTag(blog.tag);
    setIcon(blog.icon);
    setDescription(blog.description);
    setReadTime(blog.readTime);
    setFeatured(blog.featured);
    setPublishedDate(blog.publishedDate);
    setAuthorName(blog.author?.name || "Manvi Logistics Team");
    setAuthorInitials(blog.author?.avatarInitials || "ML");
    setBannerImage(blog.bannerImage || "");
    setBannerImageAlt(blog.bannerImageAlt || "");
    setMobileBannerImage(blog.mobileBannerImage || "");
    setMobileBannerImageAlt(blog.mobileBannerImageAlt || "");
    setPreviewImage(blog.previewImage || "");
    setPreviewImageAlt(blog.previewImageAlt || "");
    setActiveBannerTab("desktop");
    setContentBlocks(blog.content || []);
    setIsFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog post?")) return;

    try {
      const res = await fetch(`${API_URL}/admin/blogs/${id}`, {
        method: "DELETE"
      });
      const data = await res.json();
      if (data.success) {
        showMsg("Blog post deleted successfully", "success");
        fetchBlogs();
      } else {
        showMsg(data.message || "Failed to delete post", "error");
      }
    } catch (err) {
      console.error("Delete error:", err);
      showMsg("Failed to delete post", "error");
    }
  };

  // Block Helpers
  const addBlock = (type: "paragraph" | "subheading" | "list" | "callout" | "image" | "heading" | "divider" | "slideshow" | "table", insertIndex?: number) => {
    const newBlock: BlogBlock = { type };
    if (type === "paragraph") {
      newBlock.text = "";
      newBlock.layout = "none";
      newBlock.src = "";
      newBlock.alt = "";
      newBlock.caption = "";
    } else if (type === "subheading" || type === "callout") {
      newBlock.text = "";
    } else if (type === "heading") {
      newBlock.text = "";
      newBlock.style = "h2";
    } else if (type === "divider") {
      // visual only
    } else if (type === "slideshow") {
      newBlock.images = [];
    } else if (type === "table") {
      newBlock.tableData = [["Header 1", "Header 2"], ["Row 1 Col 1", "Row 1 Col 2"]];
    } else if (type === "list") {
      newBlock.items = [""];
      newBlock.style = "bullet";
    } else if (type === "image") {
      newBlock.src = "";
      newBlock.alt = "";
      newBlock.caption = "";
    }

    if (typeof insertIndex === "number") {
      const newBlocks = [...contentBlocks];
      newBlocks.splice(insertIndex, 0, newBlock);
      setContentBlocks(newBlocks);
    } else {
      setContentBlocks([...contentBlocks, newBlock]);
    }
  };

  const removeBlock = (index: number) => {
    setContentBlocks(contentBlocks.filter((_, idx) => idx !== index));
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    if (direction === "up" && index === 0) return;
    if (direction === "down" && index === contentBlocks.length - 1) return;

    const newBlocks = [...contentBlocks];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIdx];
    newBlocks[targetIdx] = temp;
    setContentBlocks(newBlocks);
  };

  const updateBlockField = (index: number, field: keyof BlogBlock, value: any) => {
    const newBlocks = [...contentBlocks];
    newBlocks[index] = { ...newBlocks[index], [field]: value };
    setContentBlocks(newBlocks);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const blogData: BlogPost = {
      title,
      metaTitle,
      metaDescription,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      category,
      tag,
      icon,
      description,
      readTime,
      thumbClass: category === "gifting" ? "thumb-gifting" : category === "customs" ? "thumb-customs" : category === "logistics" ? "thumb-logistics" : "",
      featured,
      publishedDate,
      bannerImage,
      bannerImageAlt,
      mobileBannerImage,
      mobileBannerImageAlt,
      previewImage,
      previewImageAlt,
      author: {
        name: authorName,
        avatarInitials: authorInitials
      },
      content: contentBlocks
    };

    try {
      const url = editingBlog ? `${API_URL}/admin/blogs/${editingBlog._id}` : `${API_URL}/admin/blogs`;
      const method = editingBlog ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData)
      });

      const data = await res.json();
      if (data.success) {
        showMsg(editingBlog ? "Blog updated successfully!" : "Blog created successfully!", "success");
        setIsFormOpen(false);
        fetchBlogs();
      } else {
        showMsg(data.message || "Operation failed", "error");
      }
    } catch (err) {
      console.error("Submit error:", err);
      showMsg("Failed to save blog post", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Manager</h1>
          <p className="mt-1 text-sm text-gray-500">
            Publish educational articles and updates to connect with your customers.
          </p>
        </div>
        {!isFormOpen && (
          <button
            onClick={handleOpenNewForm}
            className="bg-[#e77419] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#d06817] transition-colors flex items-center gap-2"
          >
            <Plus size={18} />
            Create Blog
          </button>
        )}
      </div>

      {/* Message feedback Banner */}
      {message && (
        <div className={`p-4 rounded-lg flex items-center gap-3 ${message.type === "success" ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
          {message.type === "success" ? <Check size={20} /> : <AlertCircle size={20} />}
          <span>{message.text}</span>
        </div>
      )}

      {/* Form Editor Section */}
      {isFormOpen ? (
        <form onSubmit={handleFormSubmit} className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 space-y-6 shadow-sm">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-lg font-bold text-gray-900">
              {editingBlog ? "Edit Blog Post" : "New Blog Post"}
            </h2>
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={22} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                required
                className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:border-[#e77419] focus:outline-none"
                placeholder="e.g. Sourcing from India"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Slug (URL endpoint)</label>
              <input
                type="text"
                className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:border-[#e77419] focus:outline-none"
                placeholder="e.g. sourcing-from-india (leave blank to auto-generate)"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:border-[#e77419] focus:outline-none bg-white"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category Tag (Display Name)</label>
              <input
                type="text"
                required
                className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:border-[#e77419] focus:outline-none"
                placeholder="e.g. Customs & Compliance"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Icon / Emoji</label>
              <input
                type="text"
                required
                className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:border-[#e77419] focus:outline-none"
                placeholder="e.g. 🎁, 📦"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Read Time</label>
              <input
                type="text"
                required
                className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:border-[#e77419] focus:outline-none"
                placeholder="e.g. 5 min"
                value={readTime}
                onChange={(e) => setReadTime(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Author Name</label>
              <input
                type="text"
                required
                className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:border-[#e77419] focus:outline-none"
                placeholder="e.g. Manvi Logistics Team"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Author Initials</label>
              <input
                type="text"
                required
                maxLength={3}
                className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:border-[#e77419] focus:outline-none uppercase"
                placeholder="e.g. ML"
                value={authorInitials}
                onChange={(e) => setAuthorInitials(e.target.value.replace(/[^A-Za-z]/g, '').toUpperCase())}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Published Date</label>
              <input
                type="text"
                required
                className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:border-[#e77419] focus:outline-none"
                placeholder="e.g. June 15, 2026"
                value={publishedDate}
                onChange={(e) => setPublishedDate(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Short Summary / Description</label>
            <textarea
              required
              rows={2}
              className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:border-[#e77419] focus:outline-none"
              placeholder="Provide a quick snippet that displays on the home list card..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Meta Title (SEO)</label>
              <input
                type="text"
                className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:border-[#e77419] focus:outline-none"
                placeholder="e.g. Best Sourcing from India | Manvi Logistics"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Meta Description (SEO)</label>
              <input
                type="text"
                className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:border-[#e77419] focus:outline-none"
                placeholder="e.g. Learn how to source directly from India..."
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">Banner Image (Optional)</label>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setActiveBannerTab("desktop")}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    activeBannerTab === "desktop" ? "bg-white shadow-sm text-gray-800" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setActiveBannerTab("mobile")}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                    activeBannerTab === "mobile" ? "bg-white shadow-sm text-gray-800" : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Mobile
                </button>
              </div>
            </div>

            {activeBannerTab === "desktop" ? (
              <div className="animate-in fade-in zoom-in-95 duration-200">
                <ImageUploadField
                  value={bannerImage}
                  onChange={setBannerImage}
                  placeholder="e.g. /customs-banner.jpg or upload an image file"
                  label=""
                />
                <input
                  type="text"
                  className="mt-2 w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#e77419] focus:outline-none"
                  placeholder="Desktop Banner Alt Text"
                  value={bannerImageAlt}
                  onChange={(e) => setBannerImageAlt(e.target.value)}
                />
                <p className="mt-1.5 text-xs text-slate-500 font-medium">
                  Accepted dimensions: <strong className="text-slate-700">1200 x 440 pixels</strong> (Landscape ratio).
                </p>
              </div>
            ) : (
              <div className="animate-in fade-in zoom-in-95 duration-200">
                <ImageUploadField
                  value={mobileBannerImage}
                  onChange={setMobileBannerImage}
                  placeholder="Upload mobile banner image"
                  label=""
                />
                <input
                  type="text"
                  className="mt-2 w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#e77419] focus:outline-none"
                  placeholder="Mobile Banner Alt Text"
                  value={mobileBannerImageAlt}
                  onChange={(e) => setMobileBannerImageAlt(e.target.value)}
                />
                <p className="mt-1.5 text-xs text-slate-500 font-medium">
                  Accepted dimensions: <strong className="text-slate-700">800 x 600 pixels</strong> (4:3 ratio). Used on phones.
                </p>
              </div>
            )}
          </div>

          <div>
            <ImageUploadField
              value={previewImage}
              onChange={setPreviewImage}
              placeholder="e.g. /preview.jpg or upload an image file"
              label="Preview Image (Optional)"
            />
            <input
              type="text"
              className="mt-2 w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:border-[#e77419] focus:outline-none"
              placeholder="Preview Image Alt Text"
              value={previewImageAlt}
              onChange={(e) => setPreviewImageAlt(e.target.value)}
            />
            <p className="mt-1.5 text-xs text-slate-500 font-medium">
              Accepted dimensions: <strong className="text-slate-700">16:9 ratio</strong> (Landscape ratio). Used as thumbnail on blog page.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              className="h-4 w-4 rounded border-gray-300 text-[#e77419] focus:ring-[#e77419]"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
            />
            <label htmlFor="featured" className="text-sm font-medium text-gray-700">
              Feature this post at the top of the blog page
            </label>
          </div>

          {/* Structured Content Blocks */}
          <div className="border-t pt-6 space-y-4">
            <div className="mb-4">
              <h3 className="text-sm font-bold text-gray-700 mb-2">Append Section</h3>
              <div className="flex flex-wrap gap-2.5">
                <button type="button" onClick={() => addBlock("paragraph")} className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"><AlignLeft size={14} /> Paragraph</button>
                <button type="button" onClick={() => addBlock("heading")} className="bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"><Heading size={14} /> Heading (H2-H4)</button>
                <button type="button" onClick={() => addBlock("list")} className="bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"><List size={14} /> List Items</button>
                <button type="button" onClick={() => addBlock("callout")} className="bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"><HelpCircle size={14} /> Callout Box</button>
                <button type="button" onClick={() => addBlock("image")} className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"><Image size={14} /> Single Image</button>
                <button type="button" onClick={() => addBlock("slideshow")} className="bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"><Layers size={14} /> Slideshow</button>
                <button type="button" onClick={() => addBlock("table")} className="bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border border-cyan-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"><Table size={14} /> Table</button>
                <button type="button" onClick={() => addBlock("divider")} className="bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"><span>—</span> Divider</button>
              </div>
            </div>

            <div className="space-y-5 bg-slate-50 p-6 rounded-2xl border border-gray-100">
              {contentBlocks.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-250 rounded-xl bg-white">
                  <p className="text-sm text-gray-400">No content blocks added yet. Choose a block type above to construct your article.</p>
                </div>
              ) : (
                contentBlocks.map((block, idx) => {
                  const getBlockStyles = (type: string) => {
                    switch (type) {
                      case "paragraph":
                        return {
                          border: "border-l-4 border-l-blue-500 focus-within:border-l-blue-600",
                          badge: "bg-blue-50 text-blue-700 border border-blue-100",
                          label: "Paragraph text",
                          icon: <AlignLeft size={13} className="inline mr-1" />
                        };
                      case "subheading":
                      case "heading":
                        return {
                          border: "border-l-4 border-l-amber-500 focus-within:border-l-amber-600",
                          badge: "bg-amber-50 text-amber-700 border border-amber-100",
                          label: type === "subheading" ? "Subheading" : "Section Heading",
                          icon: <Heading size={13} className="inline mr-1" />
                        };
                      case "list":
                        return {
                          border: "border-l-4 border-l-teal-500 focus-within:border-l-teal-600",
                          badge: "bg-teal-50 text-teal-700 border border-teal-100",
                          label: "List Items",
                          icon: <List size={13} className="inline mr-1" />
                        };
                      case "callout":
                        return {
                          border: "border-l-4 border-l-rose-500 focus-within:border-l-rose-600",
                          badge: "bg-rose-50 text-rose-700 border border-rose-100",
                          label: "Callout Box",
                          icon: <HelpCircle size={13} className="inline mr-1" />
                        };
                      case "image":
                        return {
                          border: "border-l-4 border-l-emerald-500 focus-within:border-l-emerald-600",
                          badge: "bg-emerald-50 text-emerald-700 border border-emerald-100",
                          label: "Single Image / Graphic",
                          icon: <Image size={13} className="inline mr-1" />
                        };
                      case "slideshow":
                        return {
                          border: "border-l-4 border-l-violet-500 focus-within:border-l-violet-600",
                          badge: "bg-violet-50 text-violet-700 border border-violet-100",
                          label: "Image Slideshow",
                          icon: <Layers size={13} className="inline mr-1" />
                        };
                      case "table":
                        return {
                          border: "border-l-4 border-l-cyan-500 focus-within:border-l-cyan-600",
                          badge: "bg-cyan-50 text-cyan-700 border border-cyan-100",
                          label: "Data Table",
                          icon: <Table size={13} className="inline mr-1" />
                        };
                      case "divider":
                        return {
                          border: "border-l-4 border-l-slate-400 focus-within:border-l-slate-500",
                          badge: "bg-slate-100 text-slate-700 border border-slate-250",
                          label: "Horizontal Divider",
                          icon: <span className="inline mr-1">—</span>
                        };
                      default:
                        return {
                          border: "border-l-4 border-l-gray-300",
                          badge: "bg-gray-50 text-gray-700 border border-gray-100",
                          label: "Unknown Block",
                          icon: null
                        };
                    }
                  };

                  const blockMeta = getBlockStyles(block.type);

                  return (
                    <div key={idx} className="space-y-4">
                      {insertMenuIndex === idx && (
                        <div className="bg-white border-2 border-dashed border-[#e77419]/40 rounded-xl p-4 shadow-sm relative animate-in fade-in zoom-in-95 duration-200">
                          <button
                            type="button"
                            onClick={() => setInsertMenuIndex(null)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 bg-gray-100 rounded-full p-1"
                          >
                            <X size={14} />
                          </button>
                          <div className="text-xs font-bold text-[#e77419] mb-3 uppercase tracking-wider flex items-center gap-1">
                            <Plus size={14} /> Insert Section
                          </div>
                          <div className="flex flex-wrap gap-2.5">
                            <button type="button" onClick={() => { addBlock("paragraph", idx); setInsertMenuIndex(null); }} className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all"><AlignLeft size={13} className="inline mr-1" />Paragraph</button>
                            <button type="button" onClick={() => { addBlock("heading", idx); setInsertMenuIndex(null); }} className="bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all"><Heading size={13} className="inline mr-1" />Heading</button>
                            <button type="button" onClick={() => { addBlock("list", idx); setInsertMenuIndex(null); }} className="bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all"><List size={13} className="inline mr-1" />List</button>
                            <button type="button" onClick={() => { addBlock("callout", idx); setInsertMenuIndex(null); }} className="bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all"><HelpCircle size={13} className="inline mr-1" />Callout</button>
                            <button type="button" onClick={() => { addBlock("image", idx); setInsertMenuIndex(null); }} className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all"><Image size={13} className="inline mr-1" />Image</button>
                            <button type="button" onClick={() => { addBlock("slideshow", idx); setInsertMenuIndex(null); }} className="bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all"><Layers size={13} className="inline mr-1" />Slideshow</button>
                            <button type="button" onClick={() => { addBlock("table", idx); setInsertMenuIndex(null); }} className="bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border border-cyan-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all"><Table size={13} className="inline mr-1" />Table</button>
                            <button type="button" onClick={() => { addBlock("divider", idx); setInsertMenuIndex(null); }} className="bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 text-xs px-3 py-1.5 rounded-lg font-bold transition-all"><span className="inline mr-1">—</span>Divider</button>
                          </div>
                        </div>
                      )}

                      <div className={`bg-white border border-gray-150 rounded-xl p-5 flex gap-4 items-start shadow-sm hover:shadow-md hover:border-gray-250 transition-all duration-200 ${blockMeta.border}`}>
                        {/* Position Controllers */}
                        <div className="flex flex-col gap-1.5 text-gray-400 self-stretch justify-center items-center px-1 border-r border-gray-100 pr-3.5">
                          <button
                            type="button"
                            onClick={() => moveBlock(idx, "up")}
                            disabled={idx === 0}
                            className="hover:text-[#e77419] hover:bg-orange-50 p-1 rounded transition-colors disabled:opacity-20 disabled:hover:bg-transparent"
                            title="Move Up"
                          >
                            <ArrowUp size={16} />
                          </button>
                          <span className="bg-slate-100 text-slate-600 rounded-md text-[10px] font-black w-6 h-6 flex items-center justify-center select-none shadow-inner">
                            {idx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => moveBlock(idx, "down")}
                            disabled={idx === contentBlocks.length - 1}
                            className="hover:text-[#e77419] hover:bg-orange-50 p-1 rounded transition-colors disabled:opacity-20 disabled:hover:bg-transparent"
                            title="Move Down"
                          >
                            <ArrowDown size={16} />
                          </button>
                        </div>

                        {/* Block Fields */}
                        <div className="flex-1 min-w-0 space-y-3">
                          <div className="flex justify-between items-center border-b pb-2 border-slate-50">
                            <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 ${blockMeta.badge}`}>
                              {blockMeta.icon}
                              {blockMeta.label}
                            </span>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setInsertMenuIndex(idx)}
                                className="text-[11px] font-bold text-[#e77419] hover:bg-orange-50 px-2 py-1 rounded transition-colors mr-1 flex items-center gap-1"
                                title="Insert new block above this one"
                              >
                                <Plus size={12} /> Above
                              </button>
                              <button
                                type="button"
                                onClick={() => setInsertMenuIndex(idx + 1)}
                                className="text-[11px] font-bold text-[#e77419] hover:bg-orange-50 px-2 py-1 rounded transition-colors mr-2 flex items-center gap-1"
                                title="Insert new block below this one"
                              >
                                <Plus size={12} /> Below
                              </button>
                              <button
                                type="button"
                                onClick={() => removeBlock(idx)}
                                className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-all"
                                title="Delete Block"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>

                          {/* Render custom fields based on block type */}
                          {block.type === "paragraph" && (
                            <div className="space-y-3">
                              <MarkdownEditor
                                rows={3}
                                placeholder="Write paragraph text here..."
                                value={block.text || ""}
                                onChange={(val) => updateBlockField(idx, "text", val)}
                              />
                              <div className="bg-slate-50 p-3 rounded-lg border border-dashed space-y-3">
                                <div className="text-xs font-semibold text-gray-500">Inline Image (Optional)</div>
                                <div className="space-y-2">
                                  <ImageUploadField
                                    value={block.src || ""}
                                    onChange={(url) => updateBlockField(idx, "src", url)}
                                    placeholder="Image URL or upload file"
                                    label="Image Source"
                                  />
                                  {(block.layout === "left-image" || block.layout === "right-image") && (
                                    <p className="text-[10px] text-amber-700 bg-amber-50 p-1.5 rounded border border-amber-200 mt-1 font-medium">
                                      💡 Left/Right layouts require a 1:1 square. Accepted dimensions: <strong>300 x 300 pixels</strong>.
                                    </p>
                                  )}
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <div>
                                      <label className="block text-[10px] font-semibold text-gray-500 uppercase">Alt description</label>
                                      <input
                                        type="text"
                                        className="border rounded p-2 text-xs w-full focus:outline-none focus:border-[#e77419] mt-1"
                                        placeholder="Alt description"
                                        value={block.alt || ""}
                                        onChange={(e) => updateBlockField(idx, "alt", e.target.value)}
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-[10px] font-semibold text-gray-500 uppercase">Alignment Layout</label>
                                      <select
                                        className="border rounded p-2 text-xs w-full focus:outline-none bg-white font-medium focus:border-[#e77419] mt-1"
                                        value={block.layout || "none"}
                                        onChange={(e) => updateBlockField(idx, "layout", e.target.value)}
                                      >
                                        <option value="none">No Image (Text only)</option>
                                        <option value="left-image">Left Image / Right Para</option>
                                        <option value="right-image">Right Image / Left Para</option>
                                        <option value="top-image">Image Above Para</option>
                                        <option value="bottom-image">Image Below Para</option>
                                      </select>
                                    </div>
                                  </div>
                                </div>
                                {(block.layout && block.layout !== "none") && (
                                  <input
                                    type="text"
                                    className="border rounded p-2 text-xs w-full focus:outline-none focus:border-[#e77419]"
                                    placeholder="Image caption (Optional)"
                                    value={block.caption || ""}
                                    onChange={(e) => updateBlockField(idx, "caption", e.target.value)}
                                  />
                                )}
                              </div>
                            </div>
                          )}

                          {block.type === "subheading" && (
                            <input
                              type="text"
                              className="w-full border rounded-lg p-2.5 focus:border-[#e77419] focus:outline-none text-sm font-bold"
                              placeholder="Write section header..."
                              value={block.text || ""}
                              onChange={(e) => updateBlockField(idx, "text", e.target.value)}
                            />
                          )}

                          {block.type === "heading" && (
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                              <div className="md:col-span-3">
                                <input
                                  type="text"
                                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:border-[#e77419] focus:outline-none text-sm font-bold"
                                  placeholder="Write heading text here..."
                                  value={block.text || ""}
                                  onChange={(e) => updateBlockField(idx, "text", e.target.value)}
                                />
                              </div>
                              <div>
                                <select
                                  className="w-full border border-gray-300 rounded-lg p-2.5 focus:border-[#e77419] focus:outline-none bg-white text-sm"
                                  value={block.style || "h2"}
                                  onChange={(e) => updateBlockField(idx, "style", e.target.value)}
                                >
                                  <option value="h2">H2 (Large)</option>
                                  <option value="h3">H3 (Medium)</option>
                                  <option value="h4">H4 (Small)</option>
                                </select>
                              </div>
                            </div>
                          )}

                          {block.type === "divider" && (
                            <div className="border border-dashed border-gray-300 rounded-lg p-3 bg-slate-50 text-center text-xs font-semibold text-gray-500">
                              --- Horizontal Section Divider (Visual line) ---
                            </div>
                          )}

                          {block.type === "slideshow" && (
                            <div className="space-y-4 bg-slate-50/50 p-3 rounded-lg border border-gray-200">
                              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Slideshow Images ({block.images?.length || 0})</div>

                              <div className="space-y-3">
                                {(block.images || []).map((img, imgIdx) => (
                                  <div key={imgIdx} className="bg-white border border-gray-200 rounded-lg p-3 flex gap-3 items-start shadow-sm">
                                    <div className="text-xs font-bold text-gray-400 mt-2">{imgIdx + 1}</div>
                                    <div className="flex-1 space-y-2">
                                      <ImageUploadField
                                        value={img.src}
                                        onChange={(url) => {
                                          const newImgs = [...(block.images || [])];
                                          newImgs[imgIdx] = { ...newImgs[imgIdx], src: url };
                                          updateBlockField(idx, "images", newImgs);
                                        }}
                                        placeholder="/rakhi.jpg or click Upload File"
                                        label="Image URL / Upload"
                                      />
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <div>
                                          <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Alt description</label>
                                          <input
                                            type="text"
                                            className="w-full border rounded p-1.5 text-xs focus:outline-none focus:border-[#e77419]"
                                            value={img.alt || ""}
                                            onChange={(e) => {
                                              const newImgs = [...(block.images || [])];
                                              newImgs[imgIdx] = { ...newImgs[imgIdx], alt: e.target.value };
                                              updateBlockField(idx, "images", newImgs);
                                            }}
                                            placeholder="Alt text"
                                          />
                                        </div>
                                        <div>
                                          <label className="text-[10px] font-bold text-gray-400 uppercase block mb-1">Caption (Optional)</label>
                                          <input
                                            type="text"
                                            className="w-full border rounded p-1.5 text-xs focus:outline-none focus:border-[#e77419]"
                                            value={img.caption || ""}
                                            onChange={(e) => {
                                              const newImgs = [...(block.images || [])];
                                              newImgs[imgIdx] = { ...newImgs[imgIdx], caption: e.target.value };
                                              updateBlockField(idx, "images", newImgs);
                                            }}
                                            placeholder="Slide caption"
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const newImgs = (block.images || []).filter((_, i) => i !== imgIdx);
                                        updateBlockField(idx, "images", newImgs);
                                      }}
                                      className="text-red-500 hover:text-red-700 mt-5 p-1"
                                      title="Remove slide"
                                    >
                                      <Trash2 size={15} />
                                    </button>
                                  </div>
                                ))}
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  const newImgs = [...(block.images || []), { src: "", alt: "", caption: "" }];
                                  updateBlockField(idx, "images", newImgs);
                                }}
                                className="bg-[#e77419]/10 hover:bg-[#e77419]/20 text-[#e77419] text-xs px-3 py-1.5 rounded font-bold transition-colors flex items-center gap-1.5 mt-2"
                              >
                                <Plus size={14} />
                                Add Image to Slideshow
                              </button>
                            </div>
                          )}

                          {block.type === "table" && (
                            <div className="space-y-4 bg-slate-50/50 p-4 rounded-xl border border-slate-200 shadow-inner">
                              <div className="flex items-center justify-between">
                                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Table Editor ({block.tableData?.length || 0} rows)</div>
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const rows = block.tableData || [];
                                      if (rows.length === 0) return;
                                      const colsCount = rows[0].length;
                                      if (colsCount >= 8) {
                                        alert("Maximum 8 columns allowed.");
                                        return;
                                      }
                                      const newRows = rows.map(r => [...r, ""]);
                                      updateBlockField(idx, "tableData", newRows);
                                    }}
                                    className="bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200 text-[10px] px-2.5 py-1.5 rounded-lg font-bold transition-all hover:scale-95 active:scale-90 shadow-sm flex items-center gap-1"
                                  >
                                    <Plus size={11} /> Column
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const rows = block.tableData || [];
                                      if (rows.length === 0) return;
                                      if (rows[0].length <= 1) return;
                                      const newRows = rows.map(r => r.slice(0, -1));
                                      updateBlockField(idx, "tableData", newRows);
                                    }}
                                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[10px] px-2.5 py-1.5 rounded-lg font-bold transition-all hover:scale-95 active:scale-90 shadow-sm"
                                  >
                                    - Column
                                  </button>
                                </div>
                              </div>

                              <div className="overflow-x-auto pb-2 w-full scrollbar-thin">
                                <div className="space-y-2.5 min-w-max p-1">
                                  {(block.tableData || []).map((row, rowIdx) => (
                                    <div key={rowIdx} className="flex gap-2 items-center">
                                      {row.map((cell, colIdx) => (
                                        <input
                                          key={colIdx}
                                          type="text"
                                          className={`border rounded-lg px-3 h-8.5 text-xs transition-all outline-none w-[150px] shadow-sm ${rowIdx === 0
                                            ? "font-bold bg-slate-100 border-slate-350 text-slate-800 placeholder-slate-400 focus:bg-white focus:border-[#e77419] focus:ring-2 focus:ring-[#e77419]/10"
                                            : "bg-white border-slate-200 text-slate-700 placeholder-slate-300 focus:border-[#e77419] focus:ring-2 focus:ring-[#e77419]/10"
                                            }`}
                                          value={cell}
                                          placeholder={rowIdx === 0 ? `Header ${colIdx + 1}` : `Cell data`}
                                          onChange={(e) => {
                                            const newRows = [...(block.tableData || [])];
                                            newRows[rowIdx] = [...newRows[rowIdx]];
                                            newRows[rowIdx][colIdx] = e.target.value;
                                            updateBlockField(idx, "tableData", newRows);
                                          }}
                                        />
                                      ))}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const newRows = [...(block.tableData || [])];
                                          newRows.splice(rowIdx, 1);
                                          updateBlockField(idx, "tableData", newRows);
                                        }}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-100 bg-red-50 border border-red-100 hover:border-red-200 rounded-lg shrink-0 transition-all flex items-center justify-center h-8.5 w-8.5 shadow-sm"
                                        title="Remove row"
                                      >
                                        <Trash2 size={13} />
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => {
                                  const rows = block.tableData || [];
                                  const colsCount = rows.length > 0 ? rows[0].length : 2;
                                  const newRow = Array(colsCount).fill("");
                                  updateBlockField(idx, "tableData", [...rows, newRow]);
                                }}
                                className="bg-cyan-50 hover:bg-cyan-100 text-cyan-700 border border-cyan-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all hover:scale-95 active:scale-90 flex items-center gap-1.5 mt-2 shadow-sm"
                              >
                                <Plus size={13} />
                                Add Row
                              </button>
                            </div>
                          )}

                          {block.type === "callout" && (
                            <div className="space-y-3">
                              <MarkdownEditor
                                rows={2}
                                placeholder="Write tip/callout text..."
                                value={block.text || ""}
                                onChange={(val) => updateBlockField(idx, "text", val)}
                              />
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-amber-50/50 p-3 rounded-lg border border-amber-100">
                                <div>
                                  <label className="block text-[10px] font-bold text-amber-700 uppercase mb-1">Button Name (Optional)</label>
                                  <input
                                    type="text"
                                    className="w-full border border-amber-200 rounded p-2 text-xs focus:outline-none focus:border-[#e77419] bg-white"
                                    placeholder="e.g. Learn More"
                                    value={block.buttonText || ""}
                                    onChange={(e) => updateBlockField(idx, "buttonText", e.target.value)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-[10px] font-bold text-amber-700 uppercase mb-1">Button Link (Optional)</label>
                                  <input
                                    type="text"
                                    className="w-full border border-amber-200 rounded p-2 text-xs focus:outline-none focus:border-[#e77419] bg-white"
                                    placeholder="e.g. /services or https://..."
                                    value={block.buttonLink || ""}
                                    onChange={(e) => updateBlockField(idx, "buttonLink", e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          {block.type === "list" && (
                            <div className="space-y-2">
                              <div className="flex gap-4">
                                <label className="flex items-center gap-1.5 text-xs text-gray-600">
                                  <input
                                    type="radio"
                                    name={`style-${idx}`}
                                    checked={block.style !== "numbered"}
                                    onChange={() => updateBlockField(idx, "style", "bullet")}
                                  />
                                  Bulleted
                                </label>
                                <label className="flex items-center gap-1.5 text-xs text-gray-600">
                                  <input
                                    type="radio"
                                    name={`style-${idx}`}
                                    checked={block.style === "numbered"}
                                    onChange={() => updateBlockField(idx, "style", "numbered")}
                                  />
                                  Numbered
                                </label>
                              </div>
                              <MarkdownEditor
                                rows={3}
                                placeholder="Write each list item on a new line..."
                                value={block.items?.join("\n") || ""}
                                onChange={(val) => updateBlockField(idx, "items", val.split("\n"))}
                              />
                            </div>
                          )}

                          {block.type === "image" && (
                            <div className="space-y-3">
                              <ImageUploadField
                                value={block.src || ""}
                                onChange={(url) => updateBlockField(idx, "src", url)}
                                placeholder="Image URL or upload file"
                                label="Image Source"
                              />
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div>
                                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Alt description</label>
                                  <input
                                    type="text"
                                    className="w-full border rounded-lg p-2.5 focus:border-[#e77419] focus:outline-none text-sm"
                                    placeholder="Alt description"
                                    value={block.alt || ""}
                                    onChange={(e) => updateBlockField(idx, "alt", e.target.value)}
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Image caption (Optional)</label>
                                  <input
                                    type="text"
                                    className="w-full border rounded-lg p-2.5 focus:border-[#e77419] focus:outline-none text-sm"
                                    placeholder="Image caption"
                                    value={block.caption || ""}
                                    onChange={(e) => updateBlockField(idx, "caption", e.target.value)}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  );
                })
              )}
            </div>

            <div className="mt-6 pt-4 pb-2 border-t">
              <h3 className="text-sm font-bold text-gray-700 mb-3 flex items-center gap-2"><Plus size={16} className="text-[#e77419]" /> Append Section Below</h3>
              <div className="flex flex-wrap gap-2.5">
                <button type="button" onClick={() => addBlock("paragraph")} className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"><AlignLeft size={14} /> Paragraph</button>
                <button type="button" onClick={() => addBlock("heading")} className="bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"><Heading size={14} /> Heading (H2-H4)</button>
                <button type="button" onClick={() => addBlock("list")} className="bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"><List size={14} /> List Items</button>
                <button type="button" onClick={() => addBlock("callout")} className="bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"><HelpCircle size={14} /> Callout Box</button>
                <button type="button" onClick={() => addBlock("image")} className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"><Image size={14} /> Single Image</button>
                <button type="button" onClick={() => addBlock("slideshow")} className="bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"><Layers size={14} /> Slideshow</button>
                <button type="button" onClick={() => addBlock("table")} className="bg-cyan-50 text-cyan-700 hover:bg-cyan-100 border border-cyan-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"><Table size={14} /> Table</button>
                <button type="button" onClick={() => addBlock("divider")} className="bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"><span>—</span> Divider</button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 border-t pt-4">
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="px-4 py-2 border rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="bg-[#e77419] text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-[#d06817] transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <RefreshCw className="animate-spin h-4 w-4" />
                  Saving...
                </>
              ) : (
                "Save Article"
              )}
            </button>
          </div>
        </form>
      ) : (
        /* Blog List Container */
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="text-center py-16">
              <RefreshCw className="animate-spin h-8 w-8 text-gray-400 mx-auto" />
              <p className="mt-2 text-sm text-gray-500">Loading blog posts...</p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-2" />
              <p className="text-gray-500 font-medium">No blog posts created yet.</p>
              <button
                onClick={handleOpenNewForm}
                className="mt-4 text-[#e77419] hover:text-[#d06817] font-semibold text-sm"
              >
                Create your first article →
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b text-xs font-bold uppercase tracking-wider text-slate-500">
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Author</th>
                    <th className="px-6 py-4">Published Date</th>
                    <th className="px-6 py-4">Featured</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                  {blogs.map((blog) => (
                    <tr key={blog._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{blog.icon}</span>
                          <div>
                            <div className="font-semibold">{blog.title}</div>
                            <div className="text-xs text-gray-400">/{blog.slug}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="bg-orange-50 text-[#e77419] text-xs px-2.5 py-1 rounded-full font-semibold">
                          {blog.tag}
                        </span>
                      </td>
                      <td className="px-6 py-4">{blog.author?.name || "Manvi Team"}</td>
                      <td className="px-6 py-4">{blog.publishedDate}</td>
                      <td className="px-6 py-4">
                        {blog.featured ? (
                          <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded font-semibold">
                            Featured
                          </span>
                        ) : (
                          <span className="text-gray-400 text-xs">No</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenEditForm(blog)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          title="Edit post"
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id!)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                          title="Delete post"
                        >
                          <Trash2 size={17} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
