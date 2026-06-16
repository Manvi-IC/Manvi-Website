'use client';
import { useState, useRef, useCallback, useEffect, DragEvent, ChangeEvent } from 'react';
import { UploadCloud, File as FileIcon, AlertCircle, CheckCircle2, Clock, Trash2, RefreshCw } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const DB_NAME = process.env.NEXT_PUBLIC_X_DATABASE || 'm5clogs';

const headers = {
  'x-database': DB_NAME,
};

function formatBytes(bytes: number) {
  if (!bytes) return '—';
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function timeAgo(dateStr: string | number | Date) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export default function UploadRatesPage() {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<any>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchLogs = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/rates/uploads`, { headers });
      const data = await res.json();
      if (data.success) setLogs(data.data);
    } catch (e: any) {
      console.error('Failed to fetch logs', e);
    } finally {
      setLoadingLogs(false);
    }
  }, []);

  useEffect(() => { fetchLogs(); }, [fetchLogs]);

  const uploadFile = async (file: File) => {
    if (!file) return;
    const allowed = ['.xls', '.xlsx', '.csv'];
    const ext = '.' + (file.name.split('.').pop()?.toLowerCase() || '');
    if (!allowed.includes(ext)) {
      setUploadResult({ success: false, message: 'Only XLS, XLSX, or CSV files are supported.' });
      return;
    }

    setUploading(true);
    setUploadResult(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(`${API_URL}/rates/upload`, {
        method: 'POST',
        headers: { 'x-database': DB_NAME },
        body: formData,
      });
      const data = await res.json();
      setUploadResult(data);
      if (data.success) fetchLogs();
    } catch (err: any) {
      setUploadResult({ success: false, message: 'Upload failed: ' + err.message });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  }, []);

  const handleDrag = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
    e.target.value = '';
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload Rates</h1>
        <p className="mt-1 text-sm text-gray-500">
          Upload rate sheets (WALKIN format) or zipcode zone files (Australia/Canada) in XLS or XLSX format.
        </p>
      </div>

      {/* Format Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-orange-800 mb-2">📊 Rate Sheet Format (WALKIN file)</h3>
          <p className="text-xs text-orange-700">
            Columns: <span className="font-mono bg-orange-100 px-1 rounded">SHIPPER, NETWORK, SERVICE, TYPE, minWt, maxWt, Zone1, Zone2...</span>
          </p>
          <p className="text-xs text-orange-600 mt-1">TYPE: S = slab price, B = per/kg rate</p>
          <p className="text-xs text-orange-600 mt-0.5">Networks: SELF, ARA, DHL, UPS, FED, etc.</p>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h3 className="text-sm font-semibold text-blue-800 mb-2">📍 Zipcode Zone Format (Australia/Canada)</h3>
          <p className="text-xs text-blue-700">
            Columns: <span className="font-mono bg-blue-100 px-1 rounded">NETWORK, SERVICE, COUNTRY, ZONE, ZIPCODE, CITY, STATE</span>
          </p>
          <p className="text-xs text-blue-600 mt-1">Countries: AUSTRALIA, CANADA</p>
          <p className="text-xs text-blue-600 mt-0.5">Auto-detected by filename containing "zip" or "zipcode"</p>
        </div>
      </div>

      {/* Upload Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10">
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !uploading && fileRef.current?.click()}
          className={`border-2 border-dashed rounded-lg px-6 py-12 flex flex-col items-center justify-center text-center transition-colors cursor-pointer select-none
            ${dragActive ? 'border-[#e77419] bg-orange-50' : 'border-gray-300 hover:bg-gray-50 hover:border-[#e77419]'}
            ${uploading ? 'opacity-60 cursor-not-allowed' : ''}
          `}
        >
          <input
            ref={fileRef}
            type="file"
            accept=".xls,.xlsx,.csv"
            className="hidden"
            onChange={handleFileChange}
            disabled={uploading}
          />
          {uploading ? (
            <>
              <RefreshCw className="mx-auto h-12 w-12 text-[#e77419] animate-spin" />
              <h3 className="mt-4 text-sm font-semibold text-gray-900">Uploading & Processing…</h3>
              <p className="mt-1 text-xs text-gray-500">This may take a moment for large files</p>
            </>
          ) : (
            <>
              <UploadCloud className={`mx-auto h-12 w-12 ${dragActive ? 'text-[#e77419]' : 'text-gray-400'}`} />
              <h3 className="mt-4 text-sm font-semibold text-gray-900">
                {dragActive ? 'Drop to upload' : 'Click to upload or drag and drop'}
              </h3>
              <p className="mt-2 text-xs text-gray-500">XLS, XLSX or CSV (max 20MB)</p>
              <button
                type="button"
                className="mt-6 bg-[#e77419] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#d06817] transition-colors pointer-events-none"
              >
                Select File
              </button>
            </>
          )}
        </div>

        {/* Upload Result */}
        {uploadResult && (
          <div className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${
            uploadResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
          }`}>
            {uploadResult.success
              ? <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
              : <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
            }
            <div>
              <p className={`text-sm font-semibold ${uploadResult.success ? 'text-green-800' : 'text-red-800'}`}>
                {uploadResult.message}
              </p>
              {uploadResult.success && (
                <p className="text-xs text-green-700 mt-1">
                  Type: <strong>{uploadResult.fileType}</strong> •
                  Inserted: <strong>{uploadResult.rowsInserted}</strong>
                  {uploadResult.rowsFailed > 0 && ` • Failed: ${uploadResult.rowsFailed}`}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Upload History */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-gray-900">Upload History</h4>
            <button
              onClick={fetchLogs}
              className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
            >
              <RefreshCw size={12} /> Refresh
            </button>
          </div>

          {loadingLogs ? (
            <div className="text-center py-8 text-sm text-gray-400">Loading…</div>
          ) : logs.length === 0 ? (
            <div className="text-center py-8 text-sm text-gray-400 border border-dashed border-gray-200 rounded-lg">
              No uploads yet. Upload a rate sheet to get started.
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 border border-gray-100 rounded-lg overflow-hidden">
              {logs.map((log, idx) => (
                <li key={idx} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${
                      log.status === 'failed' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-[#e77419]'
                    }`}>
                      {log.status === 'failed' ? <AlertCircle size={20} /> : <FileIcon size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{log.filename}</p>
                      <p className="text-xs text-gray-500">
                        {formatBytes(log.fileSize)} · {timeAgo(log.createdAt)} ·
                        <span className={`ml-1 font-medium ${log.fileType === 'zipcodes' ? 'text-blue-600' : 'text-orange-600'}`}>
                          {log.fileType}
                        </span>
                      </p>
                      {log.status === 'completed' && (
                        <p className="text-xs text-gray-400">
                          {log.rowsInserted} rows inserted
                          {log.rowsFailed > 0 && `, ${log.rowsFailed} failed`}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    log.status === 'completed' ? 'bg-green-100 text-green-800' :
                    log.status === 'failed' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {log.status === 'processing' && <Clock size={10} />}
                    {log.status === 'completed' && <CheckCircle2 size={10} />}
                    {log.status === 'failed' && <AlertCircle size={10} />}
                    {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
