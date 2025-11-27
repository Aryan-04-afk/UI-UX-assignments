document.addEventListener("DOMContentLoaded", function () {
    loadDashboardData();
});

function loadDashboardData() {
    const user = {
        name: "Aryan",
        age: 22,
        gender: "Male",
        weight: 70,
        height: 175
    };

    document.getElementById("userName").textContent = user.name;

    const data = {
        heartRate: 78,
        avgHeartRate: 75,
        steps: 6200,
        calories: 450,
        avgCalories: 400,
        water: 2.1,
        goalWater: 3,
        sleepHours: 7.2,
        sleepQuality: "Good"
    };

    updateHeartRate(data);
    updateBMI(user);
    updateSteps(data.steps);
    updateWater(data.water, data.goalWater);
    updateCalories(data);
    updateSleep(data);
    updateInsights(data);
}

function updateHeartRate(data) {
    document.getElementById("heartRate").textContent = data.heartRate;
    document.getElementById("avgHeartRate").textContent = data.avgHeartRate;
}

function updateBMI(user) {
    const h = user.height / 100;
    const bmi = user.weight / (h * h);
    document.getElementById("bmiValue").textContent = bmi.toFixed(1);

    let category = "Normal";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi > 24.9) category = "Overweight";

    document.getElementById("bmiCategory").textContent = category;
}

function updateSteps(steps) {
    const goal = 10000;
    const percent = (steps / goal) * 100;

    document.getElementById("steps").textContent = steps;
    document.getElementById("stepsPercent").textContent = Math.round(percent) + "%";
    document.getElementById("stepsProgress").style.width = percent + "%";
}

function updateWater(water, goal) {
    const percent = (water / goal) * 100;

    document.getElementById("water").textContent = water.toFixed(1);
    document.getElementById("waterPercent").textContent = Math.round(percent) + "%";
    document.getElementById("waterProgress").style.width = percent + "%";
}

function updateCalories(data) {
    document.getElementById("calories").textContent = data.calories;
    document.getElementById("avgCalories").textContent = data.avgCalories;
}

function updateSleep(data) {
    document.getElementById("sleepHours").textContent = data.sleepHours;
    document.getElementById("sleepQuality").textContent = data.sleepQuality;
}

function updateInsights(data) {
    document.getElementById("weeklyAvgSteps").textContent = "6200";
    document.getElementById("avgSleep").textContent = data.sleepHours;
    document.getElementById("goalDays").textContent = "4";
}
