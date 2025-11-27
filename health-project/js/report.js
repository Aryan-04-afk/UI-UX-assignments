document.addEventListener("DOMContentLoaded", () => {
    setActiveNav("reports");
    loadPlaceholderTable();
    updatePeriodSummary();
    updateStatistics();
    createReportChart("steps");
});

let currentPeriod = "daily";
let currentMetric = "steps";

const placeholderData = [
    { date: "2025-01-01", steps: 5000, heartRate: 72, water: 2.0, calories: 400, sleep: 6.5, quality: "Good" },
    { date: "2025-01-02", steps: 6800, heartRate: 75, water: 2.3, calories: 420, sleep: 7.1, quality: "Fair" },
    { date: "2025-01-03", steps: 7200, heartRate: 78, water: 2.5, calories: 450, sleep: 6.8, quality: "Good" },
    { date: "2025-01-04", steps: 9000, heartRate: 74, water: 2.1, calories: 460, sleep: 7.5, quality: "Great" },
];

function switchPeriod(period) {
    currentPeriod = period;

    document.querySelectorAll(".btn-tab").forEach(btn => btn.classList.remove("active"));
    document.getElementById("tab-" + period).classList.add("active");

    updatePeriodSummary();
}

function changeMetric(metric, event) {
    currentMetric = metric;

    document.querySelectorAll(".btn").forEach(btn => {
        if (btn.onclick && btn.onclick.toString().includes("changeMetric")) {
            btn.className = "btn btn-outline";
        }
    });

    if (event) event.target.className = "btn btn-primary";

    document.getElementById("chartTitle").textContent =
        metric.charAt(0).toUpperCase() + metric.slice(1) + " Trend";

    createReportChart(metric);
    updateStatistics();
}


function loadPlaceholderTable() {
    const body = document.getElementById("dataTableBody");
    let rows = "";

    for (let d of placeholderData) {
        rows += "<tr>";
        rows += "<td>" + d.date + "</td>";
        rows += "<td>" + d.heartRate + " BPM</td>";
        rows += "<td>" + d.steps.toLocaleString() + "</td>";
        rows += "<td>" + d.water + " L</td>";
        rows += "<td>" + d.calories + " kcal</td>";
        rows += "<td>" + d.sleep + " hrs</td>";
        rows += "<td>" + d.quality + "</td>";
        rows += "</tr>";
    }

    body.innerHTML = rows;
}

function updateStatistics() {
    const sample = placeholderData[placeholderData.length - 1];

    document.getElementById("bestValue").textContent = "9000 steps";
    document.getElementById("bestDate").textContent = "Achieved on 2025-01-04";

    document.getElementById("avgValue").textContent = "6750 steps";
    document.getElementById("trendValue").textContent = "↑ 5%";
    document.getElementById("trendDescription").textContent = "Improving trend";
}

function updatePeriodSummary() {
    const box = document.getElementById("periodSummary");

    if (currentPeriod === "daily") {
        box.innerHTML = `
            <div class="card">7200 steps</div>
            <div class="card">76 BPM</div>
            <div class="card">2.3 L</div>
            <div class="card">7 hrs</div>
        `;
    } else if (currentPeriod === "weekly") {
        box.innerHTML = `
            <div class="card">6800 steps/day</div>
            <div class="card">74 BPM avg</div>
            <div class="card">2.2 L/day</div>
            <div class="card">6.9 hrs/night</div>
        `;
    } else {
        box.innerHTML = `
            <div class="card">45000 steps</div>
            <div class="card">15 L water</div>
            <div class="card">3000 kcal</div>
            <div class="card">5/7 goals</div>
        `;
    }
}

let reportChart;

function createReportChart(metric) {
    const ctx = document.getElementById("reportChart").getContext("2d");

    if (reportChart) reportChart.destroy();

    const labels = placeholderData.map(d => d.date);
    const values = placeholderData.map(d => d[metric] || d.steps);

    reportChart = new Chart(ctx, {
        type: "line",
        data: {
            labels,
            datasets: [{
                label: metric,
                data: values,
                borderWidth: 2,
                tension: 0.3
            }]
        }
    });
}
