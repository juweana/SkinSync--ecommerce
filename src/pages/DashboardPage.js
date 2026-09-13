import { useEffect, useState } from "react";
import { getDashboardCounts } from "../api/dashboardApi";

function DashboardPage() {
  const [counts, setCounts] = useState(null);

  useEffect(() => {
    getDashboardCounts().then((data) => setCounts(data));
  }, []);

  if (!counts) {
    return <p className="p-4">Loading...</p>;
  }

  return (
    <main className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="border p-4">Products: {counts.products}</div>
        <div className="border p-4">
          Active Products: {counts.active_products}
        </div>
        <div className="border p-4">Categories: {counts.categories}</div>
        <div className="border p-4">Orders: {counts.orders}</div>
        <div className="border p-4">Order Items: {counts.order_items}</div>
      </div>
    </main>
  );
}

export default DashboardPage;
