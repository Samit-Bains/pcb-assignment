import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";

export async function POST(req) {
    await connectDB();
    const body = await req.json();
    const { shipment, latitude, longitude } = body;

    const record = await Job.findOneAndUpdate(
        { shipment },
        { latitude, longitude, updatedAt: new Date() },
        { new: true }
    );

    return new Response(JSON.stringify(record), { status: 200 });
}