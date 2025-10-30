import React from "react";
import { useParams } from "react-router-dom";

type Row = {
  id: string;
  tableName: string;
  time: string;
  records: number | null;
  details: Record<string, any> | null;
};

const makeDummy = (): Row[] => {
  const now = new Date();
  return [
    { id: "1", tableName: "users", time: new Date(now.getTime() - 1000 * 60 * 60).toISOString(), records: null, details: { note: "no data (none)", sample: null } },
    { id: "2", tableName: "orders", time: new Date(now.getTime() - 1000 * 60 * 30).toISOString(), records: null, details: { note: "no data (none)", sample: null } },
    { id: "3", tableName: "products", time: new Date(now.getTime() - 1000 * 60 * 20).toISOString(), records: null, details: { note: "no data (none)", sample: null } },
    { id: "4", tableName: "invoices", time: new Date(now.getTime() - 1000 * 60 * 5).toISOString(), records: null, details: { note: "no data (none)", sample: null } },
  ];
};

const HistoryPage: React.FC = () => {
  const { userId } = useParams();
  const [rows] = React.useState<Row[]>(makeDummy());

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">History for {userId ?? "me"}</h1>
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Table</th>
              <th className="p-3 text-left">Last scanned</th>
              <th className="p-3 text-left">Records</th>
              <th className="p-3"> </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <details>
                    <summary className="cursor-pointer inline-flex items-center">
                      <span className="w-2 h-2 bg-gray-600 rounded-full mr-0.5"></span>
                      <span className="w-2 h-2 bg-gray-600 rounded-full mr-0.5"></span>
                      <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                      <span className="ml-2">{r.tableName}</span>
                    </summary>
                    <div className="p-4 bg-gray-50 text-sm text-gray-700">
                      <strong>Details:</strong>
                      <pre className="mt-2 p-2 bg-white rounded border text-xs overflow-auto">
                        {JSON.stringify(r.details, null, 2)}
                      </pre>
                    </div>
                  </details>
                </td>
                <td className="p-3">{new Date(r.time).toLocaleString()}</td>
                <td className="p-3">{r.records === null ? "none" : r.records}</td>
                <td className="p-3"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;
