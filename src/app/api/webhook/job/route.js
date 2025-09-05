import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";

export async function POST(req) {
    await connectDB();
    const body = await req.json();
    const { job, shipment, status } = body;

    const record = await Job.findOneAndUpdate(
        { job },
        { shipment, status },
        { upsert: true, new: true }
    );

    return new Response(JSON.stringify(record), { status: 200 });
}