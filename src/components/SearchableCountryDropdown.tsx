import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, X } from "lucide-react";

export default function SearchableCountryDropdown({
  countries,
  value,
  onChange,
  placeholder = "Select Country",
}: {
  countries: string[];
  value: string;
  onChange: (country: string) => void;
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const filtered = query.trim()
    ? countries.filter((c) =>
        c.toLowerCase().startsWith(query.trim().toLowerCase()),
      )
    : countries.slice(0, 100);

  const handleSelect = (c: string) => {
    onChange(c);
    setOpen(false);
    setQuery("");
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div
        className="w-full bg-white text-[#333] text-[14px] font-medium rounded-xl border border-gray-200 shadow-sm flex items-center gap-3 px-5 py-4 cursor-text"
        onClick={() => {
          setOpen(true);
          setTimeout(() => inputRef.current?.focus(), 0);
        }}
      >
        <Search size={15} className="text-gray-400 shrink-0" />
        <input
          ref={inputRef}
          type="text"
          value={open ? query : value}
          placeholder={value || placeholder}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!open) setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          className="flex-1 bg-transparent outline-none placeholder:text-gray-400"
        />
        {value ? (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
              setQuery("");
            }}
            className="text-gray-300 hover:text-gray-500 shrink-0"
          >
            <X size={14} />
          </button>
        ) : (
          <ChevronDown
            size={16}
            className={`text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          />
        )}
      </div>

      {open && (
        <div className="absolute z-30 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-72 overflow-y-auto">
          {filtered.length === 0 && (
            <div className="px-5 py-4 text-sm text-gray-400 text-center">
              No countries found
            </div>
          )}
          {filtered.map((c) => {
            const isSelected = c === value;
            return (
              <button
                key={c}
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(c)}
                className={`w-full text-left px-5 py-3 text-sm flex items-center justify-between gap-3 transition-colors ${
                  isSelected
                    ? "bg-orange-50 text-[#f27a1a] font-semibold"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                <span className="truncate">{c}</span>
              </button>
            );
          })}
          {!query.trim() && countries.length > 100 && (
            <div className="px-5 py-3 text-xs text-gray-400 text-center italic">
              Start typing to see more...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
