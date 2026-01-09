const API_URL = 'http://127.0.0.1:5000/attendance';
const container = document.getElementById('space-container');
const connectionStatus = document.getElementById('connection-status');

let categoryChart = null;
let distributionChart = null;

function createCard(student) {
    const card = document.createElement('div');
    card.className = 'student-card';

    // Determine category class
    let catClass = 'cat-average';
    if (student.category === 'Good') catClass = 'cat-good';
    if (student.category === 'Poor') catClass = 'cat-poor';

    // Mock Data for Popup
    const stableOrbit = (Math.random() * 100).toFixed(2) + '%';
    const lastActive = new Date(Date.now() - Math.random() * 86400000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    card.innerHTML = `
        <div class="student-name">${student.name}</div>
        <div class="attendance-percentage">${student.attendance}%</div>
        <div class="attendance-category ${catClass}">${student.category}</div>
        
        <!-- Hover Popup -->
        <div class="card-popup">
            <div class="popup-row">
                <span class="popup-label">Orbit Stability</span>
                <span class="popup-value" style="color: ${student.attendance > 75 ? '#4cd964' : '#ffcc00'}">${stableOrbit}</span>
            </div>
            <div class="popup-row">
                <span class="popup-label">Last Active</span>
                <span class="popup-value">${lastActive}</span>
            </div>
            <div class="popup-row">
                <span class="popup-label">Status Code</span>
                <span class="popup-value">#${Math.floor(Math.random() * 9000) + 1000}</span>
            </div>
        </div>
    `;

    // Randomize start of float animation
    const randomDelay = Math.random() * -6;
    card.style.animationDelay = `${randomDelay}s`;

    // Click Animation
    card.addEventListener('click', () => {
        card.classList.remove('clicked');
        void card.offsetWidth;
        card.classList.add('clicked');
    });

    container.appendChild(card);
}

function renderCharts(students) {
    // Process Data
    const categoryCounts = { 'Good': 0, 'Average': 0, 'Poor': 0 };
    students.forEach(s => {
        if (categoryCounts[s.category] !== undefined) {
            categoryCounts[s.category]++;
        }
    });

    const labels = Object.keys(categoryCounts);
    const data = Object.values(categoryCounts);

    // Chart.js Global Defaults
    Chart.defaults.color = '#a0a0b0';
    Chart.defaults.font.family = "'Roboto', sans-serif";

    // 1. Bar Chart: Category Breakdown
    const ctxBar = document.getElementById('categoryChart').getContext('2d');
    if (categoryChart) categoryChart.destroy();
    categoryChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Number of Students',
                data: data,
                backgroundColor: ['#4cd964', '#ffcc00', '#ff3b30'],
                borderColor: ['rgba(76, 217, 100, 1)', 'rgba(255, 204, 0, 1)', 'rgba(255, 59, 48, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                title: { display: true, text: 'Category Breakdown', color: '#fff', font: { size: 16, family: 'Orbitron' } }
            },
            scales: {
                y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.05)' } },
                x: { grid: { display: false } }
            }
        }
    });

    // 2. Pie Chart: Distribution
    const ctxPie = document.getElementById('distributionChart').getContext('2d');
    if (distributionChart) distributionChart.destroy();

    // Binning for distribution chart (just to have something different for the pie chart)
    // Actually, user asked for "Attendance Distribution". We can bin percentages: >90, 75-90, <75
    // But aligning with categories is usually cleaner. Let's stick to categories for consistency or try simple bins.
    // Let's do Categories for consistency across visualizations.

    distributionChart = new Chart(ctxPie, {
        type: 'doughnut',
        data: {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: ['rgba(76, 217, 100, 0.7)', 'rgba(255, 204, 0, 0.7)', 'rgba(255, 59, 48, 0.7)'],
                borderColor: '#0d0d1a',
                borderWidth: 2,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right', labels: { color: '#fff' } },
                title: { display: true, text: 'Distribution', color: '#fff', font: { size: 16, family: 'Orbitron' } }
            }
        }
    });
}

// Fetch Data
async function fetchData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        // Backend returns either direct array OR object with summary.
        // We handle direct array by calculating summary client-side.
        const data = await response.json();

        connectionStatus.textContent = "Data Loaded";
        connectionStatus.style.color = "#4cd964";

        container.innerHTML = '';

        // Handle if data is array or object
        const rawStudents = Array.isArray(data) ? data : (data.students || []);

const students = rawStudents.map(s => ({
    name: s.Name,
    attendance: Math.round(s.Attendance_Percentage),
    category: s.Category
}));


        students.forEach(student => {
            createCard(student);
        });

        renderCharts(students);

    } catch (error) {
        console.error('Fetch error:', error);
        connectionStatus.textContent = "Connection Failed (Using Demo Data)";
        connectionStatus.style.color = "#ff3b30";

        // Demo Data Fallback
        const demoData = [
            { name: "Alice Skywalker", attendance: 85, category: "Good" },
            { name: "Bob Vader", attendance: 45, category: "Poor" },
            { name: "Charlie Solo", attendance: 65, category: "Average" },
            { name: "Dana Kenobi", attendance: 92, category: "Good" },
            { name: "Eve Palpatine", attendance: 78, category: "Average" },
            { name: "Frank Calrissian", attendance: 88, category: "Good" },
            { name: "Grace Organa", attendance: 55, category: "Poor" },
            { name: "Harry Fett", attendance: 70, category: "Average" },
            { name: "Iris Windu", attendance: 82, category: "Good" },
            { name: "Jack Dameron", attendance: 60, category: "Average" }
        ];

        container.innerHTML = '';
        demoData.forEach(student => {
            createCard(student);
        });

        renderCharts(demoData);
    }
}

// Initialize
fetchData();
