// app/admin/jobs/JobModal.tsx
"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Job {
  _id?: string;
  title: string;
  department: string;
  location: string;
  tag: string;
  description: string;
  responsibilities: string[];
  isActive?: boolean;
}

interface JobModalProps {
  job?: Job;
  onClose: () => void;
  onSaved: () => void;
}

export default function JobModal({ job, onClose, onSaved }: JobModalProps) {
  const [formData, setFormData] = useState<Job>({
    title: "",
    department: "",
    location: "",
    tag: "",
    description: "",
    responsibilities: [""],
    isActive: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (job) {
      setFormData({
        ...job,
        responsibilities: job.responsibilities.length > 0 ? job.responsibilities : [""],
      });
    }
  }, [job]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResponsibilityChange = (index: number, value: string) => {
    const newResponsibilities = [...formData.responsibilities];
    newResponsibilities[index] = value;
    setFormData({ ...formData, responsibilities: newResponsibilities });
  };

  const addResponsibility = () => {
    setFormData({
      ...formData,
      responsibilities: [...formData.responsibilities, ""],
    });
  };

  const removeResponsibility = (index: number) => {
    if (formData.responsibilities.length > 1) {
      setFormData({
        ...formData,
        responsibilities: formData.responsibilities.filter((_, i) => i !== index),
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Filter out empty responsibilities
    const cleanedData = {
      ...formData,
      responsibilities: formData.responsibilities.filter(r => r.trim() !== ""),
    };

    if (cleanedData.responsibilities.length === 0) {
      setError("Please add at least one responsibility");
      setLoading(false);
      return;
    }

    try {
      const url = job?._id ? `${API_URL}/admin/jobs/${job._id}` : `${API_URL}/admin/jobs`;
      const method = job?._id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cleanedData),
      });

      const data = await res.json();
      if (data.success) {
        onSaved();
      } else {
        setError(data.message || "Failed to save job");
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            {job?._id ? "Edit Job" : "Create New Job"}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e77419] focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department *
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e77419] focus:border-transparent"
                placeholder="e.g. Operations"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e77419] focus:border-transparent"
                placeholder="e.g. Dwarka, New Delhi"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tag *
            </label>
            <input
              type="text"
              name="tag"
              value={formData.tag}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e77419] focus:border-transparent"
              placeholder="e.g. Operations, Customs, Sales"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e77419] focus:border-transparent"
              placeholder="Brief description of the role..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Responsibilities *
            </label>
            {formData.responsibilities.map((resp, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={resp}
                  onChange={(e) => handleResponsibilityChange(index, e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e77419] focus:border-transparent"
                  placeholder={`Responsibility ${index + 1}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => removeResponsibility(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addResponsibility}
              className="text-sm text-[#e77419] hover:text-[#d06817] flex items-center gap-1 mt-1"
            >
              <Plus size={16} />
              Add Responsibility
            </button>
          </div>

          <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="bg-[#e77419] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#d06817] transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : job?._id ? "Update Job" : "Create Job"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}