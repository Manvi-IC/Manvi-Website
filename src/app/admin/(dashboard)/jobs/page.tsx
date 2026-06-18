// app/admin/jobs/page.tsx (UPDATED - Removed ApplicationList)
"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  RefreshCw,
  FileText,
} from "lucide-react";
import Link from "next/link";
import JobModal from "./JobModal";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Job {
  _id: string;
  title: string;
  department: string;
  location: string;
  tag: string;
  description: string;
  responsibilities: string[];
  isActive: boolean;
  createdAt: string;
  applicationCount?: number;
}

export default function JobsManagementPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | undefined>();

  const fetchJobs = async () => {
    setLoading(true);
    try {
      // Fetch jobs
      const res = await fetch(`${API_URL}/admin/jobs`);
      const data = await res.json();
      if (data.success) {
        // Fetch application counts for each job
        const jobsWithCounts = await Promise.all(
          data.data.map(async (job: Job) => {
            try {
              const appRes = await fetch(
                `${API_URL}/admin/applications?jobId=${job._id}`,
              );
              const appData = await appRes.json();
              return {
                ...job,
                applicationCount: appData.success ? appData.data.length : 0,
              };
            } catch {
              return { ...job, applicationCount: 0 };
            }
          }),
        );
        setJobs(jobsWithCounts);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this job?")) return;

    try {
      const res = await fetch(`${API_URL}/admin/jobs/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        fetchJobs();
      }
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  };

  const handleToggleActive = async (job: Job) => {
    try {
      const res = await fetch(`${API_URL}/admin/jobs/${job._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...job, isActive: !job.isActive }),
      });
      const data = await res.json();
      if (data.success) {
        fetchJobs();
      }
    } catch (error) {
      console.error("Failed to toggle job status:", error);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Job Postings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage job listings for the careers page
          </p>
        </div>
        <button
          onClick={() => {
            setEditingJob(undefined);
            setShowModal(true);
          }}
          className="bg-[#e77419] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#d06817] transition-colors flex items-center gap-2"
        >
          <Plus size={18} />
          New Job
        </button>
      </div>

      {showModal && (
        <JobModal
          job={editingJob}
          onClose={() => {
            setShowModal(false);
            setEditingJob(undefined);
          }}
          onSaved={() => {
            setShowModal(false);
            setEditingJob(undefined);
            fetchJobs();
          }}
        />
      )}

      {loading ? (
        <div className="text-center py-12">
          <RefreshCw className="animate-spin h-8 w-8 text-gray-400 mx-auto" />
          <p className="mt-2 text-sm text-gray-500">Loading jobs...</p>
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <p className="text-gray-500">No jobs created yet.</p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-4 text-[#e77419] hover:text-[#d06817] font-medium"
          >
            Create your first job posting →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {job.title}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        job.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {job.isActive ? "Active" : "Inactive"}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full">
                      {job.department}
                    </span>
                    {/* Application count badge */}
                    <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <FileText size={12} />
                      {job.applicationCount || 0} applications
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{job.location}</p>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {job.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Created: {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                  {/* Link to Applications page with job filter */}
                  <Link
                    href={`/admin/applications?jobId=${job._id}`}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="View Applications for this job"
                  >
                    <FileText size={18} />
                  </Link>
                  <button
                    onClick={() => handleToggleActive(job)}
                    className={`p-2 rounded-lg transition-colors ${
                      job.isActive
                        ? "text-gray-400 hover:bg-gray-50"
                        : "text-green-600 hover:bg-green-50"
                    }`}
                    title={job.isActive ? "Deactivate" : "Activate"}
                  >
                    {job.isActive ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <button
                    onClick={() => {
                      setEditingJob(job);
                      setShowModal(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
