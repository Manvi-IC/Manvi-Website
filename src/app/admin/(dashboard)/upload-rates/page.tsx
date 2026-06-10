import { UploadCloud, File, AlertCircle } from 'lucide-react';

export default function UploadRatesPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Upload Rates</h1>
        <p className="mt-1 text-sm text-gray-500">
          Upload new shipping rates in CSV or Excel format to update the system.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-10">
        <div className="border-2 border-dashed border-gray-300 rounded-lg px-6 py-12 flex flex-col items-center justify-center text-center hover:bg-gray-50 hover:border-[#e77419] transition-colors cursor-pointer">
          <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-sm font-semibold text-gray-900">Click to upload or drag and drop</h3>
          <p className="mt-2 text-xs text-gray-500">CSV, XLS, or XLSX (max. 10MB)</p>
          <button className="mt-6 bg-[#e77419] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#d06817] transition-colors">
            Select File
          </button>
        </div>

        <div className="mt-8">
          <h4 className="text-sm font-medium text-gray-900 mb-4">Recent Uploads</h4>
          <ul className="divide-y divide-gray-100 border border-gray-100 rounded-lg">
            {[
              { name: 'US_Rates_Q3_2026.csv', size: '2.4 MB', status: 'Completed', date: '2 hours ago' },
              { name: 'EU_Zone_Updates.xlsx', size: '1.1 MB', status: 'Completed', date: 'Yesterday' },
              { name: 'Asia_Express_v2.csv', size: '3.8 MB', status: 'Failed', date: '3 days ago' },
            ].map((file, idx) => (
              <li key={idx} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${file.status === 'Failed' ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-[#e77419]'}`}>
                    {file.status === 'Failed' ? <AlertCircle size={20} /> : <File size={20} />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{file.size} · {file.date}</p>
                  </div>
                </div>
                <div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    file.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {file.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
