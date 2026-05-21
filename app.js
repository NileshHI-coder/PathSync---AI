
// --- Firebase User Data Manager ---


const UserDB = {
    // Save or Update User Data
    saveUser: async (userId, data) => {
        try {
            await db.collection("users").doc(userId).set(data, { merge: true });
            console.log("User data saved!");
            return true;
        } catch (error) {
            console.error("Error saving user:", error);
            return false;
        }
    },

    // Get User Data
    getUser: async (userId) => {
        try {
            const doc = await db.collection("users").doc(userId).get();
            if (doc.exists) {
                return doc.data();
            } else {
                // Create new user if not exists
                const newUser = {
                    name: "Student",
                    email: "user@email.com",
                    careerGoal: "Not Set",
                    skills: 0,
                    projects: 0,
                    streak: 0,
                    profileScore: 10,
                    createdAt: firebase.firestore.FieldValue.serverTimestamp()
                };
                await db.collection("users").doc(userId).set(newUser);
                return newUser;
            }
        } catch (error) {
            console.error("Error getting user:", error);
            return null;
        }
    },

    // Update Stats
    updateStats: async (userId, updates) => {
        try {
            await db.collection("users").doc(userId).update(updates);
        } catch (error) {
            console.error("Error updating stats:", error);
        }
    }
};

// --- Main App Logic ---
const App = {
    user: null,
    userId: null,

    init: async function() {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        
        // Check if user is logged in and get ID
        if (isLoggedIn) {
            this.userId = localStorage.getItem('userId') || 'user_' + Date.now();
            localStorage.setItem('userId', this.userId);
            
            // Get user data from Firestore
            this.user = await UserDB.getUser(this.userId);
            
            // Update UI
            this.renderDashboard();
        }

        this.renderNav();
    },

    login: async function(e) {
        e.preventDefault();
        
        // Create unique ID for user
        const userId = localStorage.getItem('userId') || 'user_' + Date.now();
        localStorage.setItem('userId', userId);
        
        // Initial Data
        const userData = {
            name: "Student",
            email: "user@pathsync.com",
            careerGoal: "Not Set",
            skills: 0,
            projects: 0,
            streak: 0,
            profileScore: 20
        };

        // Save to Firestore
        await UserDB.saveUser(userId, userData);
        
        // Save to LocalStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userId', userId);
        
        window.location.href = 'dashboard.html';
    },

    logout: function() {
        localStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    },

    renderNav: function() {
        const nav = document.querySelector('nav');
        if (nav && localStorage.getItem('isLoggedIn')) {
            nav.innerHTML = `
                <div class="logo">PathSync AI</div>
                <div class="nav-links">
                    <a href="dashboard.html">Dashboard</a>
                    <a href="roadmap.html">Roadmap</a>
                    <a href="chatbot.html">AI Mentor</a>
                    <a href="skills.html">Skills</a>
                    <a href="#" onclick="App.logout()">Logout</a>
                </div>
            `;
        }
    },

    renderDashboard: function() {
        if (!this.user) return;

        const nameEl = document.getElementById('userName');
        const profileEl = document.getElementById('profileScore');
        const skillsEl = document.getElementById('skillsCount');
        const projectsEl = document.getElementById('projectsCount');
        const streakEl = document.getElementById('streakCount');
        const goalEl = document.getElementById('careerGoal');

        if (nameEl) nameEl.innerText = this.user.name;
        if (profileEl) profileEl.innerText = this.user.profileScore + '%';
        if (skillsEl) skillsEl.innerText = this.user.skills;
        if (projectsEl) projectsEl.innerText = this.user.projects;
        if (streakEl) streakEl.innerText = this.user.streak;
        if (goalEl) goalEl.innerText = this.user.careerGoal;
    }
};

// --- AI Logic ---
async function getAIResponse(prompt) {

    prompt = prompt.toLowerCase();

    // Greetings
    if (
        prompt.includes("hi") ||
        prompt.includes("hello") ||
        prompt.includes("hey")
    ) {
        return "Hello 👋 I'm your AI Career Mentor. I can help you with career guidance, skills, roadmaps, interview prep, and project ideas.";
    }

    // How are you
    if (prompt.includes("how are you")) {
        return "I'm doing great 🚀 and ready to help you build your future career!";
    }

    // Career suggestion
    if (
        prompt.includes("suggest career") ||
        prompt.includes("career") ||
        prompt.includes("which career")
    ) {
        return "Popular career paths in tech include AI Engineer, Full Stack Developer, Data Scientist, Cybersecurity Analyst, Cloud Engineer, and UI/UX Designer.";
    }

    // Frontend
    if (prompt.includes("frontend")) {
        return "Frontend Developer Roadmap 🚀 Learn HTML, CSS, JavaScript, React.js, APIs, Git, and build responsive projects.";
    }

    // Backend
    if (prompt.includes("backend")) {
        return "Backend Developer Roadmap 🚀 Learn Node.js, Express.js, MongoDB, REST APIs, Authentication, and deployment.";
    }

    // Full Stack
    if (prompt.includes("full stack")) {
        return "Full Stack Developer Path 🚀 Learn frontend + backend technologies including React, Node.js, MongoDB, APIs, and deployment.";
    }

    // AI Engineer
    if (
        prompt.includes("ai engineer") ||
        prompt.includes("machine learning")
    ) {
        return "AI Engineer Roadmap 🚀 Learn Python, Machine Learning, Deep Learning, TensorFlow, NLP, and build AI projects.";
    }

    // Data Science
    if (prompt.includes("data scientist")) {
        return "Data Scientist Roadmap 📊 Learn Python, Pandas, Statistics, Machine Learning, SQL, and Data Visualization.";
    }

    // Cybersecurity
    if (prompt.includes("cybersecurity")) {
        return "Cybersecurity Path 🔐 Learn Networking, Linux, Ethical Hacking, Security Tools, and Threat Analysis.";
    }

    // Skills
    if (prompt.includes("skills")) {
        return "Important skills for students include Communication, Problem Solving, Teamwork, Programming, GitHub, and Real Projects.";
    }

    // Interview
    if (prompt.includes("interview")) {
        return "Interview Tips 🎯 Practice DSA, communication skills, projects explanation, and mock interviews regularly.";
    }

    // Resume
    if (prompt.includes("resume")) {
        return "A strong resume should include skills, projects, internships, certifications, and achievements.";
    }

    // Project Ideas
    if (prompt.includes("project")) {
        return "Project Ideas 💡 AI Resume Analyzer, Skill Gap Analyzer, Smart Career Mentor, Job Tracker, and Interview Preparation Platform.";
    }

    // Motivation
    if (
        prompt.includes("motivate") ||
        prompt.includes("motivation")
    ) {
        return "Success comes from consistency 🚀 Keep learning, keep building projects, and never stop improving.";
    }

    // Default
    return "I am your AI Career Mentor 🤖 Ask me about careers, roadmaps, projects, skills, resumes, or interview preparation.";
}
async function sendChatMessage() {

    const inputEl = document.getElementById("userInput");
    const display = document.getElementById("chatDisplay");
    const loading = document.getElementById("loading");

    const input = inputEl.value.trim();

    if (!input) return;

    // Show User Message
    display.innerHTML += `
        <div class="msg msg-user">${input}</div>
    `;

    // Clear Input
    inputEl.value = "";

    // Show Loading
    if (loading) {
        loading.style.display = "block";
    }

    // Scroll Down
    display.scrollTop = display.scrollHeight;

    try {

        // Get AI Reply
        const reply = await getAIResponse(input);

        // Hide Loading
        if (loading) {
            loading.style.display = "none";
        }

        // Show AI Message
        display.innerHTML += `
            <div class="msg msg-ai">${reply}</div>
        `;

    } catch (error) {

        console.error(error);

        // Hide Loading
        if (loading) {
            loading.style.display = "none";
        }

        // Error Message
        display.innerHTML += `
            <div class="msg msg-ai" style="color:red;">
                Error connecting to AI.
            </div>
        `;
    }

    // Auto Scroll
    display.scrollTop = display.scrollHeight;
}

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});