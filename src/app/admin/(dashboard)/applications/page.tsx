// app/admin/applications/page.tsx (FIXED)
"use client";

import { useState, useEffect } from "react";
import { 
  Eye, 
  Download, 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Search,
  ChevronDown,
  ChevronUp,
  FileText,
  User,
  Mail,
  Phone,
  Briefcase
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

interface Application {
  _id: string;
  jobId: {
    _id: string;
    title: string;
    department: string;
    location: string;
  } | null;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  experience: string;
  noticePeriod: string;
  resumeUrl: string;
  resumePublicId: string;
  status: "pending" | "reviewed" | "shortlisted" | "rejected";
  notes?: string;
  createdAt: string;
}

interface Stats {
  total: number;
  pending: number;
  reviewed: number;
  shortlisted: number;
  rejected: number;
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({ total: 0, pending: 0, reviewed: 0, shortlisted: 0, rejected: 0 });
  const [filter, setFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedApp, setExpandedApp] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<string | null>(null);

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const url = filter === "all" 
        ? `${API_URL}/admin/applications` 
        : `${API_URL}/admin/applications?status=${filter}`;
      
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setApplications(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/applications/stats`);
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchStats();
  }, [filter]);

  const updateStatus = async (id: string, status: string) => {
    setUpdating(id);
    try {
      const res = await fetch(`${API_URL}/admin/applications/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        fetchApplications();
        fetchStats();
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    } finally {
      setUpdating(null);
    }
  };

  // FIXED: Download via backend endpoint
  const handleDownloadResume = async (app: Application) => {
    setDownloading(app._id);
    try {
      console.log(`📥 Downloading resume for: ${app.fullName}`);
      
      // Use the backend endpoint to download the resume
      const response = await fetch(`${API_URL}/admin/download-resume/${app._id}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/pdf, application/octet-stream, */*',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to download: ${response.status} ${response.statusText}`);
      }

      // Get the blob from response
      const blob = await response.blob();
      
      if (blob.size === 0) {
        throw new Error('Downloaded file is empty');
      }

      console.log(`📄 Downloaded file size: ${blob.size} bytes`);
      console.log(`📄 Content-Type: ${blob.type}`);

      // Create download URL
      const url = window.URL.createObjectURL(blob);
      
      // Create filename
      const fileName = `${app.fullName.replace(/\s+/g, '_')}_Resume.pdf`;
      
      // Trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
      }, 5000);

      console.log('✅ Download completed successfully');

    } catch (error) {
      console.error('❌ Download failed:', error);
      
      // Fallback: Try opening the Cloudinary URL directly with force download
      try {
        console.log('🔄 Trying fallback method...');
        const cloudinaryUrl = app.resumeUrl;
        // Add fl_attachment to force download
        const downloadUrl = cloudinaryUrl.includes('?') 
          ? `${cloudinaryUrl}&fl_attachment` 
          : `${cloudinaryUrl}?fl_attachment`;
        
        // Open in new tab
        window.open(downloadUrl, '_blank');
      } catch (fallbackError) {
        console.error('❌ Fallback also failed:', fallbackError);
        alert('Failed to download resume. Please try right-clicking on the resume link and selecting "Save link as..."');
      }
    } finally {
      setDownloading(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      pending: "bg-yellow-100 text-yellow-800",
      reviewed: "bg-blue-100 text-blue-800",
      shortlisted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4" />;
      case "reviewed": return <Eye className="h-4 w-4" />;
      case "shortlisted": return <CheckCircle className="h-4 w-4" />;
      case "rejected": return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const filteredApplications = applications.filter(app => {
    if (!searchTerm) return true;
    const search = searchTerm.toLowerCase();
    return (
      app.fullName.toLowerCase().includes(search) ||
      app.email.toLowerCase().includes(search) ||
      app.jobTitle.toLowerCase().includes(search) ||
      app.phone.includes(search)
    );
  });

  const StatCard = ({ label, value, color, icon }: { label: string; value: number; color: string; icon: React.ReactNode }) => (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 ${color}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="p-3 rounded-full bg-gray-50">
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">All Applications</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage all job applications across all positions
          </p>
        </div>
        <button
          onClick={() => {
            fetchApplications();
            fetchStats();
          }}
          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <RefreshCw className={`h-5 w-5 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard 
          label="Total" 
          value={stats.total} 
          color="border-gray-200"
          icon={<FileText className="h-5 w-5 text-gray-600" />}
        />
        <StatCard 
          label="Pending" 
          value={stats.pending} 
          color="border-yellow-200 bg-yellow-50/50"
          icon={<Clock className="h-5 w-5 text-yellow-600" />}
        />
        <StatCard 
          label="Reviewed" 
          value={stats.reviewed} 
          color="border-blue-200 bg-blue-50/50"
          icon={<Eye className="h-5 w-5 text-blue-600" />}
        />
        <StatCard 
          label="Shortlisted" 
          value={stats.shortlisted} 
          color="border-green-200 bg-green-50/50"
          icon={<CheckCircle className="h-5 w-5 text-green-600" />}
        />
        <StatCard 
          label="Rejected" 
          value={stats.rejected} 
          color="border-red-200 bg-red-50/50"
          icon={<XCircle className="h-5 w-5 text-red-600" />}
        />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, job title, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e77419] focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {["all", "pending", "reviewed", "shortlisted", "rejected"].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                  filter === status
                    ? "bg-[#e77419] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Applications List */}
      {loading ? (
        <div className="text-center py-12">
          <RefreshCw className="animate-spin h-8 w-8 text-gray-400 mx-auto" />
          <p className="mt-2 text-sm text-gray-500">Loading applications...</p>
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
          <FileText className="h-12 w-12 text-gray-300 mx-auto" />
          <p className="mt-4 text-gray-500">No applications found</p>
          <p className="text-sm text-gray-400">
            {searchTerm ? "Try adjusting your search or filters" : "Applications will appear here when candidates apply"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredApplications.map((app) => (
            <div
              key={app._id}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedApp(expandedApp === app._id ? null : app._id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {app.fullName}
                      </h3>
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(app.status)}`}>
                        {getStatusIcon(app.status)}
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                      {app.jobTitle === "Speculative Application" && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          Speculative
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-x-6 gap-y-1 mt-1">
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5 text-gray-400" />
                        {app.jobTitle}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5 text-gray-400" />
                        {app.email}
                      </p>
                      <p className="text-sm text-gray-500">
                        <span className="text-gray-400">Applied:</span> {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownloadResume(app);
                      }}
                      disabled={downloading === app._id}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Download Resume"
                    >
                      {downloading === app._id ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {expandedApp === app._id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedApp === app._id && (
                <div className="border-t border-gray-100 p-4 bg-gray-50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Personal Information</h4>
                      <div className="space-y-2">
                        <p className="text-sm flex items-center gap-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{app.fullName}</span>
                        </p>
                        <p className="text-sm flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <a href={`mailto:${app.email}`} className="text-blue-600 hover:underline">
                            {app.email}
                          </a>
                        </p>
                        <p className="text-sm flex items-center gap-2">
                          <Phone className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{app.phone}</span>
                        </p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Application Details</h4>
                      <div className="space-y-2">
                        <p className="text-sm">
                          <span className="text-gray-500">Experience:</span>
                          <span className="text-gray-700 ml-2">{app.experience}</span>
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Notice Period:</span>
                          <span className="text-gray-700 ml-2">{app.noticePeriod}</span>
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Position:</span>
                          <span className="text-gray-700 ml-2">{app.jobTitle}</span>
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Department:</span>
                          <span className="text-gray-700 ml-2">{app.jobId?.department || "N/A"}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Status Update */}
                  <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-4 flex-wrap">
                    <span className="text-sm font-medium text-gray-700">Update Status:</span>
                    <select
                      value={app.status}
                      onChange={(e) => updateStatus(app._id, e.target.value)}
                      disabled={updating === app._id}
                      className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#e77419] focus:border-transparent disabled:opacity-50"
                    >
                      <option value="pending">Pending</option>
                      <option value="reviewed">Reviewed</option>
                      <option value="shortlisted">Shortlisted</option>
                      <option value="rejected">Rejected</option>
                    </select>
                    {updating === app._id && (
                      <RefreshCw className="h-4 w-4 text-gray-400 animate-spin" />
                    )}
                    <button
                      onClick={() => handleDownloadResume(app)}
                      disabled={downloading === app._id}
                      className="ml-auto text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1 disabled:opacity-50"
                    >
                      {downloading === app._id ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4" />
                      )}
                      Download Resume
                    </button>
                  </div>

                  {app.notes && (
                    <div className="mt-3 p-3 bg-white rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Notes:</span> {app.notes}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}