// Smart University Logic

const STORAGE_KEY = 'smart_uni_students';

// Initialize storage if empty
if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
}

// Data Handling
function getStudents() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveStudent(student) {
    const students = getStudents();
    students.push(student);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function updateStudentInStorage(updatedStudent) {
    let students = getStudents();
    const index = students.findIndex(s => s.id === updatedStudent.id);
    if (index !== -1) {
        students[index] = updatedStudent;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
        return true;
    }
    return false;
}

function deleteStudentFromStorage(id) {
    let students = getStudents();
    students = students.filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function generateStudentId() {
    const students = getStudents();
    const year = new Date().getFullYear();
    const nextId = students.length + 1;
    return `SU-${year}-${String(nextId).padStart(4, '0')}`;
}

// Authentication (Mock)
function login(username, password) {
    if (username === 'admin' && password === 'admin') {
        localStorage.setItem('currentUser', JSON.stringify({ username: 'admin', role: 'admin' }));
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

function checkAuth() {
    const user = localStorage.getItem('currentUser');
    if (!user && !window.location.pathname.includes('index.html')) {
        window.location.href = 'index.html';
    }
}

// Helper to get URL params
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
