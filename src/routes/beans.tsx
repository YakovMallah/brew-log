import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "convex/react";
import { api } from "convex/_generated/api";

export const Route = createFileRoute("/beans")({
    component: BeansComponent,
});

function BeansComponent() {
    const beans = useQuery(api.beans.getBeans);

    if (!beans) {
        return <div>Loading beans...</div>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">My Coffee Beans</h1>

            {beans.length === 0 ? (
                <p className="text-lg">No coffee beans logged yet. Start by adding one!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {beans.map((bean) => (
                        <div key={bean._id} className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-2">{bean.name}</h2>
                            <p className="text-gray-700 mb-1">
                                <span className="font-medium">Roaster:</span> {bean.roaster}
                            </p>
                            <p className="text-gray-700 mb-1">
                                <span className="font-medium">Origin:</span> {bean.origin}
                            </p>
                            <p className="text-gray-700 mb-3">
                                <span className="font-medium">Roast Level:</span> {bean.roastLevel}
                            </p>
                            {bean.tastingNotes && (
                                <p className="text-gray-600 text-sm">
                                    <span className="font-medium">Tasting Notes:</span>{' '}
                                    {bean.tastingNotes.join(', ')}
                                </p>
                            )}
                            {/* Later add a link to edit/view details */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}