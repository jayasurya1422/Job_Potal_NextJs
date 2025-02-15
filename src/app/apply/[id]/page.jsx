"use server";

import JobApplyComponent from "@/components/job-apply-form";
import React from "react";
import preloaduserData from "@/lib/preloaduserData";

async function ApplyPage({ params }) {
    const { id } = await params;

    try {
        const user = await preloaduserData(); // ✅ Correct function call
        return (
            <div>
                <JobApplyComponent jobId={id} preloadedData={user} />
            </div>
        );
    } catch (error) {
        console.error("Error loading user data:", error);
        return (
            <div>
                <p>Error loading user data. Please try again later.</p>
            </div>
        );
    }
}

export default ApplyPage;