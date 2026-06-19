// app/admin/blog/page.tsx
"use client";

import { useState, useEffect } from "react";
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
  GripVertical
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

interface BlogBlock {
  type: "paragraph" | "subheading" | "list" | "callout" | "image" | "heading" | "divider" | "slideshow";
  text?: string;
  items?: string[];
  style?: string; // e.g. "bullet", "numbered", "h2", "h3", "h4"
  src?: string;
  alt?: string;
  caption?: string;
  layout?: string; // e.g. "left-image", "right-image", "top-image", "bottom-image"
  images?: Array<{ src: string; alt?: string; caption?: string }>;
}

interface BlogPost {
  _id?: string;
  slug: string;
  category: string;
  icon: string;
  tag: string;
  title: string;
  description: string;
  readTime: string;
  thumbClass: string;
  featured: boolean;
  publishedDate: string;
  bannerImage?: string;
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

  // Form State
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
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
    setContentBlocks([
      { type: "paragraph", text: "", layout: "none" }
    ]);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (blog: BlogPost) => {
    setEditingBlog(blog);
    setTitle(blog.title);
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
  const addBlock = (type: "paragraph" | "subheading" | "list" | "callout" | "image" | "heading" | "divider" | "slideshow") => {
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
    } else if (type === "list") {
      newBlock.items = [""];
      newBlock.style = "bullet";
    } else if (type === "image") {
      newBlock.src = "";
      newBlock.alt = "";
      newBlock.caption = "";
    }
    setContentBlocks([...contentBlocks, newBlock]);
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
                className="mt-1 w-full border border-gray-300 rounded-lg p-2.5 focus:border-[#e77419] focus:outline-none"
                placeholder="e.g. ML"
                value={authorInitials}
                onChange={(e) => setAuthorInitials(e.target.value)}
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

          <div>
            <ImageUploadField
              value={bannerImage}
              onChange={setBannerImage}
              placeholder="e.g. /customs-banner.jpg or upload an image file"
              label="Banner Image (Optional)"
            />
            <p className="mt-1.5 text-xs text-slate-500 font-medium">
              Accepted dimensions: <strong className="text-slate-700">1200 x 440 pixels</strong> (Landscape ratio).
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
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => addBlock("paragraph")}
                  className="bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
                >
                  <AlignLeft size={14} />
                  Paragraph
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("heading")}
                  className="bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
                >
                  <Heading size={14} />
                  Heading (H2-H4)
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("list")}
                  className="bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
                >
                  <List size={14} />
                  List Items
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("callout")}
                  className="bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
                >
                  <HelpCircle size={14} />
                  Callout Box
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("image")}
                  className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
                >
                  <Image size={14} />
                  Single Image
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("slideshow")}
                  className="bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
                >
                  <Layers size={14} />
                  Slideshow
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("divider")}
                  className="bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 text-xs px-3.5 py-2 rounded-lg font-bold transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
                >
                  <span>—</span>
                  Divider
                </button>
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
                    <div key={idx} className={`bg-white border border-gray-150 rounded-xl p-5 flex gap-4 items-start shadow-sm hover:shadow-md hover:border-gray-250 transition-all duration-200 ${blockMeta.border}`}>
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
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-center border-b pb-2 border-slate-50">
                          <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 ${blockMeta.badge}`}>
                            {blockMeta.icon}
                            {blockMeta.label}
                          </span>
                          <button
                            type="button"
                            onClick={() => removeBlock(idx)}
                            className="text-gray-400 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-all"
                            title="Delete Block"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>

                      {/* Render custom fields based on block type */}
                      {block.type === "paragraph" && (
                        <div className="space-y-3">
                          <textarea
                            rows={3}
                            className="w-full border rounded-lg p-2.5 focus:border-[#e77419] focus:outline-none text-sm"
                            placeholder="Write paragraph text here..."
                            value={block.text || ""}
                            onChange={(e) => updateBlockField(idx, "text", e.target.value)}
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

                      {block.type === "callout" && (
                        <textarea
                          rows={2}
                          className="w-full border border-amber-200 bg-amber-50 text-amber-900 rounded-lg p-2.5 focus:border-[#e77419] focus:outline-none text-sm font-medium"
                          placeholder="Write tip/callout text..."
                          value={block.text || ""}
                          onChange={(e) => updateBlockField(idx, "text", e.target.value)}
                        />
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
                          <textarea
                            rows={3}
                            className="w-full border rounded-lg p-2.5 focus:border-[#e77419] focus:outline-none text-sm"
                            placeholder="Write each list item on a new line..."
                            value={block.items?.join("\n") || ""}
                            onChange={(e) => updateBlockField(idx, "items", e.target.value.split("\n"))}
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
                  );
                })
              )}
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
