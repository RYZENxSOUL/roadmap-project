"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Roadmap {
    _id: string;
    roadmap_title: string;
    category: string;
    total_edcoins: number;
    total_time: number;
}

const Table = () => {
    const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
    const [search, setSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Call the MongoDB API instead of local function
                const response = await fetch('/api/roadmaps');
                const data = await response.json();
                setRoadmaps(data);
            } catch (error) {
                console.error('Error fetching roadmaps:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredData = Array.isArray(roadmaps)
        ? roadmaps.filter((item) =>
            item.roadmap_title
                .toLowerCase()
                .includes(search.toLowerCase())
        )
        : [];

    const sortedData = [...filteredData].sort((a, b) => {
        if (sortOrder === "asc") {
            return a.total_edcoins - b.total_edcoins;
        } else {
            return b.total_edcoins - a.total_edcoins;
        }
    });

    const formatTime = (minutes: number) => {
        const hrs = Math.floor(minutes / 60);
        const mins = minutes % 60;

        return `${hrs}hr ${mins}min`;
    };

    if (loading) {
        return <div className="p-8">Loading...</div>;
    }

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold mb-6">
                Roadmap Data
            </h1>

            <input
                type="text"
                placeholder="Search roadmap..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="border p-3 mb-6 w-full rounded-lg text-white bg-gray-800"
            />

            <div className="overflow-x-auto">
                <table className="w-full border border-gray-500 min-w-[700px]">
                    <thead className="bg-gray-300 text-black">
                        <tr>
                            <th className="border p-4 text-left">
                                Title
                            </th>

                            <th className="border p-4 text-left">
                                Category
                            </th>

                            <th className="border p-4 text-left">
                                <div className="flex items-center gap-2">
                                    Edcoins

                                    <button
                                        onClick={() => setSortOrder("asc")}
                                    >
                                        <Image
                                            src="/images/upward.png"
                                            alt="Ascending"
                                            width={20}
                                            height={20}
                                        />
                                    </button>

                                    <button
                                        onClick={() => setSortOrder("desc")}
                                    >
                                        <Image
                                            src="/images/downward.png"
                                            alt="Descending"
                                            width={20}
                                            height={20}
                                        />
                                    </button>
                                </div>
                            </th>

                            <th className="border p-4 text-left">
                                Time
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedData.length > 0 ? (
                            sortedData.map((item) => (
                                <tr key={item._id}>
                                    <td className="border p-4">
                                        {item.roadmap_title}
                                    </td>

                                    <td className="border p-4">
                                        {item.category}
                                    </td>

                                    <td className="border p-4">
                                        {item.total_edcoins}
                                    </td>

                                    <td className="border p-4">
                                        {formatTime(item.total_time)}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="text-center p-6"
                                >
                                    No Roadmap Found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;