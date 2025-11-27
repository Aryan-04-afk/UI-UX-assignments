const userProfile = {
    name: "Aryan",
    age: 22,
    gender: "Male",
    weight: 70,
    height: 175,
    goals: "Improve cardiovascular fitness and maintain consistent sleep schedule"
};

const healthData = {
    daily: [
        { date: "2025-11-06", heartRate: 72, steps: 8500, waterIntake: 2.5, caloriesBurned: 450, sleepHours: 6.5, sleepQuality: "Fair" },
        { date: "2025-11-07", heartRate: 68, steps: 10200, waterIntake: 3.0, caloriesBurned: 520, sleepHours: 7.5, sleepQuality: "Good" },
        { date: "2025-11-08", heartRate: 70, steps: 7800, waterIntake: 2.2, caloriesBurned: 410, sleepHours: 6.0, sleepQuality: "Fair" },
        { date: "2025-11-09", heartRate: 66, steps: 12500, waterIntake: 3.5, caloriesBurned: 610, sleepHours: 8.0, sleepQuality: "Good" },
        { date: "2025-11-10", heartRate: 71, steps: 9300, waterIntake: 2.8, caloriesBurned: 480, sleepHours: 7.0, sleepQuality: "Good" },
        { date: "2025-11-11", heartRate: 69, steps: 11000, waterIntake: 3.2, caloriesBurned: 550, sleepHours: 7.5, sleepQuality: "Good" },
        { date: "2025-11-12", heartRate: 67, steps: 10800, waterIntake: 3.0, caloriesBurned: 530, sleepHours: 7.2, sleepQuality: "Good" }
    ]
};

function calculateBMI() {
    const heightInMeters = userProfile.height / 100;
    const bmi = userProfile.weight / (heightInMeters * heightInMeters);
    return Math.round(bmi * 10) / 10;
}

function getBMICategory(bmi) {
    if (bmi < 18.5) return { category: "Underweight", class: "status-bad" };
    if (bmi < 25) return { category: "Normal", class: "status-excellent" };
    if (bmi < 30) return { category: "Overweight", class: "status-good" };
    return { category: "Obese", class: "status-bad" };
}

function getTodayData() {
    return healthData.daily[healthData.daily.length - 1];
}

function calculateAverage(metric) {
    const sum = healthData.daily.reduce((acc, day) => acc + day[metric], 0);
    const avg = sum / healthData.daily.length;
    return Math.round(avg * 10) / 10;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function getDateLabels() {
    return healthData.daily.map(day => formatDate(day.date));
}

function getMetricData(metric) {
    return healthData.daily.map(day => day[metric]);
}

function setActiveNav(pageName) {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });
}

function saveProfile(profile) {
    localStorage.setItem('healthRoundupProfile', JSON.stringify(profile));
}

function loadProfile() {
    const saved = localStorage.getItem('healthRoundupProfile');
    return saved ? JSON.parse(saved) : userProfile;
}

function initializeProfile() {
    const savedProfile = loadProfile();
    Object.assign(userProfile, savedProfile);
}

function animateNumber(element, target, duration = 1000) {
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const current = start + (target - start) * easeOutQuart;

        element.textContent = Math.round(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', () => {
    initializeProfile();
});
