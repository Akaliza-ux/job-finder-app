async function searchJobs() {
    const query = document.getElementById("searchInput").value;

    const container = document.getElementById("jobsContainer");
    container.innerHTML = `<p>Loading jobs... ⏳</p>`;


    try {
        const response = await fetch(`https://remotive.com/api/remote-jobs?search=${query}`);
        const data = await response.json();

        displayJobs(data.jobs);
    } catch (error) {
        container.innerHTML = "Error fetching jobs.";
    } }
    function saveJob(job) {
    let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

    // Check if job is already saved
    if (savedJobs.some(j => j.url === job.url)) {
        alert("This job is already saved!");
        return;
    }

    savedJobs.push(job);
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
    alert("Job saved!");

    displaySavedJobs();


}
function displaySavedJobs() {
    const container = document.getElementById("savedJobsContainer");
    let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];

    if (savedJobs.length === 0) {
        container.innerHTML = "<p>No jobs saved yet.</p>";
        return;
    }

    container.innerHTML = "";

    savedJobs.forEach(job => {
        const jobElement = document.createElement("div");
        jobElement.classList.add("job");

        jobElement.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Company:</strong> ${job.company_name}</p>
            <p><strong>Location:</strong> ${job.candidate_required_location}</p>
            <p><strong>Type:</strong> ${job.job_type}</p>
            <a href="${job.url}" target="_blank">Apply Here</a>
            <button onclick="removeSavedJob('${job.url}')">Remove ❌</button>
        `;

        container.appendChild(jobElement);
    });
}

// Remove saved job
function removeSavedJob(url) {
    let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    savedJobs = savedJobs.filter(job => job.url !== url);
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
    displaySavedJobs();
}


function displayJobs(jobs) {
    const container = document.getElementById("jobsContainer");

    if (jobs.length === 0) {
        container.innerHTML = "No jobs found.";
        return;
    }

    container.innerHTML = "";

    jobs.forEach(job => {
    const jobElement = document.createElement("div");
    jobElement.classList.add("job");

    jobElement.innerHTML = `
        <h3>${job.title}</h3>
        <p><strong>Company:</strong> ${job.company_name}</p>
        <p><strong>Location:</strong> ${job.candidate_required_location}</p>
        <p><strong>Type:</strong> ${job.job_type}</p>
        <a href="${job.url}" target="_blank">Apply Here</a>
        <button onclick="saveJob(${JSON.stringify(job).replace(/"/g, '&quot;')})">Save Job ⭐</button>
    `;

    container.appendChild(jobElement);
});
// Display saved jobs when page loads
window.onload = () => {
    displaySavedJobs();
};}
document.getElementById("clearSavedBtn").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all saved jobs?")) {
        localStorage.removeItem("savedJobs");
        displaySavedJobs();
    }
});


