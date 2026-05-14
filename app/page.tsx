'use client';

import { useEffect, useState } from 'react';
import Table from './components/Table';

export default function Home() {
  const [roadmaps, setRoadmaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Call the API to get data from MongoDB
    fetch('/api/roadmaps')
      .then(res => res.json())
      .then(data => {
        setRoadmaps(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <main>
      <Table data={roadmaps} />
    </main>
  );
}