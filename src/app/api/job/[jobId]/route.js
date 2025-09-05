import { connectDB } from "@/lib/mongodb";
import Job from "@/models/Job";

export async function GET(req, { params }) {
    await connectDB();
    const record = await Job.findOne({ job: params.jobId });

    if (!record) {
        return new Response(JSON.stringify({ error: "Job not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(record), { status: 200 });
}