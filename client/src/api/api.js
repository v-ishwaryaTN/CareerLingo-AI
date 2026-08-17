const API_BASE_URL = `${process.env.REACT_APP_API_URL || 'https://careerlingo-ai-server.onrender.com/'}`.replace(/\/$/, '') + '/api';
// ---- Courses ----
export const getCourses = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/courses`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    return [];
  }
};

// ---- Daily Chat ----
export const getChatHistory = async (sessionId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat/${sessionId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return [];
  }
};

export const sendChat = async (sessionId, languageCode, message) => {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, languageCode, message }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending chat:', error);
    return null;
  }
};

// ---- Auth ----
export const registerUser = async (name, email, password, preferredLanguage) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, preferredLanguage }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Registration failed');
    return data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Login failed');
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// ---- Interview ----
export const getInterviewQuestions = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/interview/questions`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching questions:', error);
    return [];
  }
};

export const submitInterviewAnswer = async (sessionId, question, answer, languageCode) => {
  try {
    const response = await fetch(`${API_BASE_URL}/interview/feedback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, question, answer, languageCode }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Feedback failed');
    return data;
  } catch (error) {
    console.error('Error submitting answer:', error);
    throw error;
  }
};

// ---- Resume ----
export const analyzeResume = async (resumeText, languageCode) => {
  try {
    const response = await fetch(`${API_BASE_URL}/resume/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText, languageCode }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Analysis failed');
    return data;
  } catch (error) {
    console.error('Error analyzing resume:', error);
    throw error;
  }
};

// ---- Jobs ----
export const getJobs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
};

export const applyToJob = async (jobId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/${jobId}/apply`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Apply failed');
    return data;
  } catch (error) {
    console.error('Error applying to job:', error);
    throw error;
  }
};

export const getMyApplications = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/jobs/applications/mine`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    return [];
  }
};

// ---- Translate (for Meeting Translator) ----
export const translateText = async (text, from, to) => {
  try {
    const response = await fetch(`${API_BASE_URL}/translate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, from, to }),
    });
    const data = await response.json();
    return data.translated || "(translation failed)";
  } catch (err) {
    return "(translation failed - check Gemini API key or quota)";
  }
};

export async function completeCourse(courseId, token) {
  const res = await fetch(`${API_BASE_URL}/courses/${courseId}/complete`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Could not mark course complete");
  return res.json();
}

export async function downloadCertificate(courseId, token) {
  const res = await fetch(`${API_BASE_URL}/courses/${courseId}/certificate`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error("Certificate not available yet");
  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "certificate.pdf";
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
}

export async function getCourseLesson(courseId, lang) {
  const res = await fetch(`${API_BASE_URL}/courses/${courseId}/lesson?lang=${lang}`);
  if (!res.ok) throw new Error("Could not load lesson");
  return res.json();
}