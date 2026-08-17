// ======================================================
// data/courses.js
// 20 courses, each with lessons totaling 60+ minutes.
// Each course has a `video` object per language code.
// For courses where we don't have a verified dubbed video ID,
// we fall back to a YouTube SEARCH link for that language
// (always works, never a broken/wrong embed) instead of
// guessing a specific video ID.
// ======================================================

function ytSearchLink(query) {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}

// Use this helper wherever you render a course's video, so the
// component doesn't need to know about the fallback logic.
export function getCourseVideo(course, langCode) {
  return (course.video && course.video[langCode]) || course.video.en;
}

// Use this helper to know whether the returned video is a real
// embeddable video (show <iframe>) or a search link (show a
// "Watch on YouTube" button that opens a new tab instead).
export function isEmbeddableVideo(url) {
  return url.includes("/embed/");
}

export const courses = [
  // ====================================================
  // 1. HTML
  // ====================================================
  {
    id: "html",
    title: "HTML Mastery",
    category: "Frontend",
    level: "Beginner",
    icon: "🌐",
    description: "Learn HTML from basics and build your first web pages.",
    video: {
      en: "https://www.youtube.com/embed/pQN-pnXPaVg",
      ta: ytSearchLink("HTML full course in Tamil"),
      hi: ytSearchLink("HTML full course in Hindi"),
    },
    lessons: [
      {
        id: 1,
        title: "Introduction to HTML",
        duration: "15 min",
        content: {
          en: {
            title: "Introduction to HTML",
            description: "HTML stands for HyperText Markup Language. It is used to create the structure of web pages.",
            explanation: "HTML provides the basic structure of a website. We use HTML elements such as headings, paragraphs, images, links and buttons to create web pages.",
            example: "<h1>Hello World</h1>\n<p>Welcome to my website.</p>",
          },
          ta: {
            title: "HTML அறிமுகம்",
            description: "HTML என்பது HyperText Markup Language என்பதன் சுருக்கம். இது web page-களின் structure உருவாக்க பயன்படுகிறது.",
            explanation: "HTML மூலம் website-ன் அடிப்படை structure உருவாக்கப்படுகிறது. Heading, paragraph, image, link மற்றும் button போன்ற elements பயன்படுத்தலாம்.",
            example: "<h1>வணக்கம் உலகம்</h1>\n<p>என் website-க்கு வரவேற்கிறேன்.</p>",
          },
          hi: {
            title: "HTML का परिचय",
            description: "HTML का पूरा नाम HyperText Markup Language है। इसका उपयोग web pages की structure बनाने के लिए किया जाता है।",
            explanation: "HTML का उपयोग website की basic structure बनाने के लिए किया जाता है।",
            example: "<h1>नमस्ते दुनिया</h1>\n<p>मेरी वेबसाइट में आपका स्वागत है।</p>",
          },
        },
        quiz: {
          question: "What does HTML stand for?",
          options: ["HyperText Markup Language", "HighText Machine Language", "Hyper Tool Multi Language", "Home Tool Markup Language"],
          answer: 0,
        },
      },
      {
        id: 2,
        title: "HTML Elements",
        duration: "20 min",
        content: {
          en: {
            title: "HTML Elements",
            description: "HTML elements are the building blocks of web pages.",
            explanation: "An HTML element usually contains an opening tag, content and a closing tag.",
            example: "<p>This is a paragraph.</p>\n<h1>This is a heading.</h1>",
          },
          ta: {
            title: "HTML Elements",
            description: "HTML elements என்பது web page உருவாக்க பயன்படும் அடிப்படை பகுதிகள்.",
            explanation: "ஒரு HTML element-ல் பொதுவாக opening tag, content மற்றும் closing tag இருக்கும்.",
            example: "<p>இது ஒரு paragraph.</p>\n<h1>இது ஒரு heading.</h1>",
          },
          hi: {
            title: "HTML Elements",
            description: "HTML elements web pages के basic building blocks हैं।",
            explanation: "एक HTML element में opening tag, content और closing tag होते हैं।",
            example: "<p>यह एक paragraph है।</p>\n<h1>यह एक heading है।</h1>",
          },
        },
        quiz: {
          question: "Which tag is used for a paragraph?",
          options: ["<h1>", "<p>", "<div>", "<img>"],
          answer: 1,
        },
      },
      {
        id: 3,
        title: "HTML Forms",
        duration: "25 min",
        content: {
          en: {
            title: "HTML Forms",
            description: "Forms are used to collect user information.",
            explanation: "HTML forms allow users to enter information such as name, email and password.",
            example: '<form>\n  <input type="text" placeholder="Enter your name" />\n  <button>Submit</button>\n</form>',
          },
          ta: {
            title: "HTML Forms",
            description: "User information-ஐ பெற Forms பயன்படுத்தப்படுகின்றன.",
            explanation: "Name, email, password போன்ற தகவல்களை user-களிடமிருந்து பெற HTML forms பயன்படுத்தப்படுகின்றன.",
            example: '<form>\n  <input type="text" placeholder="உங்கள் பெயரை உள்ளிடவும்" />\n  <button>Submit</button>\n</form>',
          },
          hi: {
            title: "HTML Forms",
            description: "Forms का उपयोग user की information collect करने के लिए किया जाता है।",
            explanation: "Name, email और password जैसी जानकारी लेने के लिए forms का उपयोग किया जाता है।",
            example: '<form>\n  <input type="text" placeholder="अपना नाम दर्ज करें" />\n  <button>Submit</button>\n</form>',
          },
        },
        quiz: {
          question: "Which tag is used to create a form?",
          options: ["<form>", "<input>", "<button>", "<table>"],
          answer: 0,
        },
      },
      {
        id: 4,
        title: "Semantic HTML Tags",
        duration: "15 min",
        content: {
          en: {
            title: "Semantic HTML Tags",
            description: "Semantic tags describe the meaning of content, not just its appearance.",
            explanation: "Tags like <header>, <nav>, <main>, <footer> make pages more accessible and SEO-friendly.",
            example: "<header>\n  <nav>...</nav>\n</header>\n<main>...</main>\n<footer>...</footer>",
          },
          ta: {
            title: "Semantic HTML Tags",
            description: "Semantic tags content-ன் தோற்றத்தை மட்டும் இல்லாம, அர்த்தத்தையும் விவரிக்கும்.",
            explanation: "<header>, <nav>, <main>, <footer> போன்ற tags page-ஐ accessible-ஆவும் SEO-friendly-ஆவும் ஆக்கும்.",
            example: "<header>\n  <nav>...</nav>\n</header>\n<main>...</main>\n<footer>...</footer>",
          },
          hi: {
            title: "Semantic HTML Tags",
            description: "Semantic tags content के meaning को बताते हैं, सिर्फ दिखावट को नहीं।",
            explanation: "<header>, <nav>, <main>, <footer> जैसे tags page को accessible और SEO-friendly बनाते हैं।",
            example: "<header>\n  <nav>...</nav>\n</header>\n<main>...</main>\n<footer>...</footer>",
          },
        },
        quiz: {
          question: "Which tag is semantic?",
          options: ["<div>", "<span>", "<header>", "<b>"],
          answer: 2,
        },
      },
    ],
  },

  // ====================================================
  // 2. CSS
  // ====================================================
  {
    id: "css",
    title: "CSS Mastery",
    category: "Frontend",
    level: "Beginner",
    icon: "🎨",
    description: "Learn CSS and design beautiful responsive websites.",
    video: {
      en: "https://www.youtube.com/embed/1Rs2ND1ryYc",
      ta: ytSearchLink("CSS full course in Tamil"),
      hi: ytSearchLink("CSS full course in Hindi"),
    },
    lessons: [
      {
        id: 1,
        title: "Introduction to CSS",
        duration: "15 min",
        content: {
          en: { title: "Introduction to CSS", description: "CSS is used to style and design HTML websites.", explanation: "CSS allows us to change colors, fonts, spacing, layouts and many other visual properties.", example: "body {\n  background: white;\n  color: black;\n}" },
          ta: { title: "CSS அறிமுகம்", description: "CSS என்பது HTML website-களை அழகாக design செய்ய பயன்படுகிறது.", explanation: "CSS மூலம் color, font, spacing மற்றும் layout போன்றவற்றை மாற்றலாம்.", example: "body {\n  background: white;\n  color: black;\n}" },
          hi: { title: "CSS का परिचय", description: "CSS का उपयोग HTML websites को style और design करने के लिए किया जाता है।", explanation: "CSS से colors, fonts, spacing और layouts को बदला जा सकता है।", example: "body {\n  background: white;\n  color: black;\n}" },
        },
        quiz: { question: "What is CSS mainly used for?", options: ["Database", "Styling websites", "Creating servers", "Sending emails"], answer: 1 },
      },
      {
        id: 2,
        title: "CSS Colors",
        duration: "15 min",
        content: {
          en: { title: "CSS Colors", description: "CSS provides different ways to apply colors.", explanation: "You can use color names, HEX values, RGB and HSL values.", example: "h1 {\n  color: blue;\n}" },
          ta: { title: "CSS Colors", description: "CSS மூலம் பல விதமான colors பயன்படுத்தலாம்.", explanation: "Color names, HEX, RGB மற்றும் HSL values பயன்படுத்தலாம்.", example: "h1 {\n  color: blue;\n}" },
          hi: { title: "CSS Colors", description: "CSS में अलग-अलग तरीकों से colors लगाए जा सकते हैं।", explanation: "Color names, HEX, RGB और HSL values का उपयोग कर सकते हैं।", example: "h1 {\n  color: blue;\n}" },
        },
        quiz: { question: "Which property changes text color?", options: ["background", "font", "color", "text"], answer: 2 },
      },
      {
        id: 3,
        title: "Flexbox Layout",
        duration: "20 min",
        content: {
          en: { title: "Flexbox Layout", description: "Flexbox helps arrange items in a row or column easily.", explanation: "Use display:flex on a container to align and distribute space among child elements.", example: ".container {\n  display: flex;\n  justify-content: center;\n}" },
          ta: { title: "Flexbox Layout", description: "Items-ஐ row/column-ஆ arrange பண்ண Flexbox உதவும்.", explanation: "Container-ல் display:flex வெச்சு child elements-ஐ align பண்ணலாம்.", example: ".container {\n  display: flex;\n  justify-content: center;\n}" },
          hi: { title: "Flexbox Layout", description: "Flexbox से items को row या column में आसानी से arrange कर सकते हैं।", explanation: "Container में display:flex लगाकर child elements को align कर सकते हैं।", example: ".container {\n  display: flex;\n  justify-content: center;\n}" },
        },
        quiz: { question: "Which property enables Flexbox?", options: ["display: flex", "position: flex", "flex: on", "float: flex"], answer: 0 },
      },
      {
        id: 4,
        title: "Responsive Design with Media Queries",
        duration: "20 min",
        content: {
          en: { title: "Responsive Design", description: "Media queries adapt layout for different screen sizes.", explanation: "Use @media rules to apply different styles on mobile, tablet and desktop.", example: "@media (max-width: 600px) {\n  body { font-size: 14px; }\n}" },
          ta: { title: "Responsive Design", description: "Media queries வெவ்வேறு screen sizes-க்கு layout-ஐ மாற்றும்.", explanation: "Mobile, tablet, desktop-க்கு வேற வேற styles கொடுக்க @media rules பயன்படுத்தலாம்.", example: "@media (max-width: 600px) {\n  body { font-size: 14px; }\n}" },
          hi: { title: "Responsive Design", description: "Media queries अलग-अलग screen sizes के लिए layout बदलते हैं।", explanation: "Mobile, tablet, desktop के लिए अलग styles देने के लिए @media rules का उपयोग करें।", example: "@media (max-width: 600px) {\n  body { font-size: 14px; }\n}" },
        },
        quiz: { question: "What does @media help with?", options: ["Database queries", "Responsive design", "Server routing", "Form validation"], answer: 1 },
      },
    ],
  },

  // ====================================================
  // 3. JavaScript
  // ====================================================
  {
    id: "javascript",
    title: "JavaScript Mastery",
    category: "Programming",
    level: "Beginner",
    icon: "⚡",
    description: "Learn JavaScript from basics to advanced concepts.",
    video: {
      en: "https://www.youtube.com/embed/PkZNo7MFNFg",
      ta: ytSearchLink("JavaScript full course in Tamil"),
      hi: ytSearchLink("JavaScript full course in Hindi"),
    },
    lessons: [
      {
        id: 1,
        title: "JavaScript Introduction",
        duration: "20 min",
        content: {
          en: { title: "JavaScript Introduction", description: "JavaScript makes websites interactive and dynamic.", explanation: "JavaScript can handle events, update page content and communicate with APIs.", example: 'let name = "Ishu";\nconsole.log("Hello " + name);' },
          ta: { title: "JavaScript அறிமுகம்", description: "JavaScript website-களை interactive மற்றும் dynamic ஆக மாற்றுகிறது.", explanation: "JavaScript மூலம் events handle செய்யலாம், page content update செய்யலாம்.", example: 'let name = "Ishu";\nconsole.log("Hello " + name);' },
          hi: { title: "JavaScript का परिचय", description: "JavaScript websites को interactive और dynamic बनाता है।", explanation: "JavaScript से events handle, page content update कर सकते हैं।", example: 'let name = "Ishu";\nconsole.log("Hello " + name);' },
        },
        quiz: { question: "Which language is used to make websites interactive?", options: ["HTML", "CSS", "JavaScript", "SQL"], answer: 2 },
      },
      {
        id: 2,
        title: "JavaScript Variables",
        duration: "20 min",
        content: {
          en: { title: "JavaScript Variables", description: "Variables are used to store data.", explanation: "JavaScript provides let, const and var to create variables.", example: 'let name = "Ishu";\nconst age = 20;' },
          ta: { title: "JavaScript Variables", description: "Data-வை store செய்வதற்கு variables பயன்படுத்தப்படுகின்றன.", explanation: "JavaScript-ல் variables உருவாக்க let, const மற்றும் var பயன்படுத்தலாம்.", example: 'let name = "Ishu";\nconst age = 20;' },
          hi: { title: "JavaScript Variables", description: "Data को store करने के लिए variables का उपयोग किया जाता है।", explanation: "JavaScript में variables बनाने के लिए let, const और var का उपयोग होता है।", example: 'let name = "Ishu";\nconst age = 20;' },
        },
        quiz: { question: "Which keyword creates a block-scoped variable?", options: ["let", "print", "echo", "select"], answer: 0 },
      },
      {
        id: 3,
        title: "Functions & Arrow Functions",
        duration: "25 min",
        content: {
          en: { title: "Functions", description: "Functions let you group reusable blocks of code.", explanation: "Arrow functions are a shorter syntax for writing functions in modern JavaScript.", example: "const add = (a, b) => a + b;\nconsole.log(add(2, 3));" },
          ta: { title: "Functions", description: "Reusable code blocks-ஐ group பண்ண functions உதவும்.", explanation: "Arrow functions modern JavaScript-ல் function எழுத ஒரு short syntax.", example: "const add = (a, b) => a + b;\nconsole.log(add(2, 3));" },
          hi: { title: "Functions", description: "Functions से reusable code blocks को group कर सकते हैं।", explanation: "Arrow functions modern JavaScript में function लिखने का एक छोटा syntax है।", example: "const add = (a, b) => a + b;\nconsole.log(add(2, 3));" },
        },
        quiz: { question: "Which is an arrow function?", options: ["function() {}", "() => {}", "def x():", "func x() {}"], answer: 1 },
      },
    ],
  },

  // ====================================================
  // 4. React
  // ====================================================
  {
    id: "react",
    title: "React.js Mastery",
    category: "Frontend",
    level: "Intermediate",
    icon: "⚛️",
    description: "Build modern user interfaces with React.",
    video: {
      en: "https://www.youtube.com/embed/SqcY0GlETPk",
      ta: ytSearchLink("React JS full course in Tamil"),
      hi: ytSearchLink("React JS full course in Hindi"),
    },
    lessons: [
      {
        id: 1,
        title: "React Introduction",
        duration: "20 min",
        content: {
          en: { title: "React Introduction", description: "React is a JavaScript library for building user interfaces.", explanation: "React uses reusable components to create modern and interactive applications.", example: "function App() {\n  return <h1>Hello React</h1>;\n}" },
          ta: { title: "React அறிமுகம்", description: "React என்பது user interfaces உருவாக்க பயன்படும் JavaScript library.", explanation: "React-ல் reusable components பயன்படுத்தி modern applications உருவாக்கலாம்.", example: "function App() {\n  return <h1>Hello React</h1>;\n}" },
          hi: { title: "React का परिचय", description: "React user interfaces बनाने के लिए एक JavaScript library है।", explanation: "React में reusable components का उपयोग करके modern applications बना सकते हैं।", example: "function App() {\n  return <h1>Hello React</h1>;\n}" },
        },
        quiz: { question: "React is mainly used for?", options: ["Building user interfaces", "Database management", "Operating systems", "Image editing"], answer: 0 },
      },
      {
        id: 2,
        title: "Components & Props",
        duration: "25 min",
        content: {
          en: { title: "Components & Props", description: "Props let you pass data from one component to another.", explanation: "A parent component can send data down to a child component using props.", example: "function Greet(props) {\n  return <h2>Hello {props.name}</h2>;\n}" },
          ta: { title: "Components & Props", description: "Props மூலம் ஒரு component-ல் இருந்து இன்னொரு component-க்கு data pass பண்ணலாம்.", explanation: "Parent component-ல் இருந்து child component-க்கு props மூலம் data கொடுக்கலாம்.", example: "function Greet(props) {\n  return <h2>Hello {props.name}</h2>;\n}" },
          hi: { title: "Components & Props", description: "Props से एक component से दूसरे component में data भेज सकते हैं।", explanation: "Parent component से child component को props के जरिए data दिया जा सकता है।", example: "function Greet(props) {\n  return <h2>Hello {props.name}</h2>;\n}" },
        },
        quiz: { question: "Props are used to pass data from?", options: ["Child to parent", "Parent to child", "File to file", "Server to database"], answer: 1 },
      },
      {
        id: 3,
        title: "useState Hook",
        duration: "25 min",
        content: {
          en: { title: "useState Hook", description: "useState lets a component remember and update values.", explanation: "Calling useState returns a value and a function to update that value, causing a re-render.", example: "const [count, setCount] = useState(0);\nsetCount(count + 1);" },
          ta: { title: "useState Hook", description: "useState மூலம் component ஒரு value-ஐ நினைவில் வெச்சு update பண்ணும்.", explanation: "useState ஒரு value மற்றும் அதை update பண்ண ஒரு function தரும்.", example: "const [count, setCount] = useState(0);\nsetCount(count + 1);" },
          hi: { title: "useState Hook", description: "useState से component एक value को याद रखकर update कर सकता है।", explanation: "useState एक value और उसे update करने के लिए एक function देता है।", example: "const [count, setCount] = useState(0);\nsetCount(count + 1);" },
        },
        quiz: { question: "useState returns?", options: ["Only a value", "A value and an update function", "A component", "A string"], answer: 1 },
      },
    ],
  },

  // ====================================================
  // 5. Git & GitHub
  // ====================================================
  {
    id: "git-github",
    title: "Git & GitHub",
    category: "Tools",
    level: "Beginner",
    icon: "🔧",
    description: "Version control basics every developer needs.",
    video: {
      en: "https://www.youtube.com/embed/zTjRZNkhiEU",
      ta: ytSearchLink("Git and GitHub full course in Tamil"),
      hi: ytSearchLink("Git and GitHub full course in Hindi"),
    },
    lessons: [
      {
        id: 1,
        title: "What is Version Control",
        duration: "15 min",
        content: {
          en: { title: "What is Version Control", description: "Version control tracks changes to your code over time.", explanation: "Git lets multiple people work on the same project without overwriting each other's changes.", example: "git init" },
          ta: { title: "Version Control என்றால் என்ன", description: "Version control code-ல் ஆகும் மாற்றங்களை track பண்ணும்.", explanation: "பலரும் ஒரே project-ல் வேலை பண்ண Git உதவும், ஒருவரது மாற்றம் இன்னொருவரது மாற்றத்தை அழிக்காது.", example: "git init" },
          hi: { title: "Version Control क्या है", description: "Version control आपके code में हुए बदलावों को track करता है।", explanation: "Git से कई लोग एक ही project पर काम कर सकते हैं बिना एक-दूसरे के बदलाव मिटाए।", example: "git init" },
        },
        quiz: { question: "What does Git help with?", options: ["Styling pages", "Tracking code changes", "Sending emails", "Running servers"], answer: 1 },
      },
      {
        id: 2,
        title: "Basic Git Commands",
        duration: "20 min",
        content: {
          en: { title: "Basic Git Commands", description: "A few commands cover most daily Git usage.", explanation: "git add stages changes, git commit saves them, git push uploads them to GitHub.", example: "git add .\ngit commit -m \"first commit\"\ngit push" },
          ta: { title: "Basic Git Commands", description: "தினமும் use பண்ற Git commands கொஞ்சம் தான்.", explanation: "git add changes-ஐ stage பண்ணும், git commit save பண்ணும், git push GitHub-க்கு upload பண்ணும்.", example: "git add .\ngit commit -m \"first commit\"\ngit push" },
          hi: { title: "Basic Git Commands", description: "रोज़ाना उपयोग होने वाले Git commands कम ही हैं।", explanation: "git add बदलावों को stage करता है, git commit save करता है, git push GitHub पर upload करता है।", example: "git add .\ngit commit -m \"first commit\"\ngit push" },
        },
        quiz: { question: "Which command uploads code to GitHub?", options: ["git add", "git push", "git init", "git status"], answer: 1 },
      },
      {
        id: 3,
        title: "Branching & Merging",
        duration: "25 min",
        content: {
          en: { title: "Branching & Merging", description: "Branches let you work on features separately.", explanation: "Create a branch to try new features safely, then merge it back into main when ready.", example: "git branch feature-login\ngit checkout feature-login\ngit merge feature-login" },
          ta: { title: "Branching & Merging", description: "Branches மூலம் features-ஐ தனியா வேலை பண்ணலாம்.", explanation: "புது feature-ஐ safe-ஆ try பண்ண branch create பண்ணி, ready ஆனதும் main-க்கு merge பண்ணலாம்.", example: "git branch feature-login\ngit checkout feature-login\ngit merge feature-login" },
          hi: { title: "Branching & Merging", description: "Branches से features पर अलग से काम कर सकते हैं।", explanation: "नया feature safely try करने के लिए branch बनाएं, फिर तैयार होने पर main में merge करें।", example: "git branch feature-login\ngit checkout feature-login\ngit merge feature-login" },
        },
        quiz: { question: "What does git merge do?", options: ["Deletes a branch", "Combines branches", "Creates a repo", "Uploads files"], answer: 1 },
      },
    ],
  },

  // ====================================================
  // 6. Node.js
  // ====================================================
  {
    id: "nodejs",
    title: "Node.js Basics",
    category: "Backend",
    level: "Beginner",
    icon: "🟢",
    description: "Learn server-side JavaScript with Node.js.",
    video: {
      en: ytSearchLink("Node.js full course in English"),
      ta: ytSearchLink("Node.js full course in Tamil"),
      hi: ytSearchLink("Node.js full course in Hindi"),
    },
    lessons: [
      {
        id: 1,
        title: "What is Node.js",
        duration: "15 min",
        content: {
          en: { title: "What is Node.js", description: "Node.js runs JavaScript outside the browser, on a server.", explanation: "It lets you build backend applications, APIs and command-line tools using JavaScript.", example: "console.log(\"Hello from Node.js\");" },
          ta: { title: "Node.js என்றால் என்ன", description: "Node.js JavaScript-ஐ browser-க்கு வெளியே, server-ல் run பண்ண உதவும்.", explanation: "இதன் மூலம் JavaScript வெச்சே backend applications, APIs உருவாக்கலாம்.", example: "console.log(\"Hello from Node.js\");" },
          hi: { title: "Node.js क्या है", description: "Node.js JavaScript को browser के बाहर, server पर चलाता है।", explanation: "इससे JavaScript का उपयोग करके backend applications और APIs बना सकते हैं।", example: "console.log(\"Hello from Node.js\");" },
        },
        quiz: { question: "Node.js is mainly used for?", options: ["Styling web pages", "Server-side JavaScript", "Database design tool", "Image editing"], answer: 1 },
      },
      {
        id: 2,
        title: "Modules & npm",
        duration: "20 min",
        content: {
          en: { title: "Modules & npm", description: "npm is Node's package manager for installing libraries.", explanation: "require() imports built-in or installed modules so you can reuse existing code.", example: "const fs = require(\"fs\");\nnpm install express" },
          ta: { title: "Modules & npm", description: "npm என்பது Node-க்கான package manager, libraries install பண்ண உதவும்.", explanation: "require() மூலம் built-in அல்லது install பண்ண modules-ஐ import பண்ணலாம்.", example: "const fs = require(\"fs\");\nnpm install express" },
          hi: { title: "Modules & npm", description: "npm, Node का package manager है, libraries install करने के लिए।", explanation: "require() से built-in या installed modules import कर सकते हैं।", example: "const fs = require(\"fs\");\nnpm install express" },
        },
        quiz: { question: "What does npm install do?", options: ["Deletes files", "Installs packages", "Starts server", "Runs tests"], answer: 1 },
      },
      {
        id: 3,
        title: "Creating a Simple Server",
        duration: "25 min",
        content: {
          en: { title: "Creating a Simple Server", description: "Node's http module can create a basic web server.", explanation: "The server listens on a port and responds to incoming requests.", example: "const http = require(\"http\");\nhttp.createServer((req, res) => {\n  res.end(\"Hello\");\n}).listen(3000);" },
          ta: { title: "Simple Server உருவாக்குதல்", description: "Node-oda http module ஒரு basic web server create பண்ண உதவும்.", explanation: "Server ஒரு port-ல் listen பண்ணி, வரும் requests-க்கு respond பண்ணும்.", example: "const http = require(\"http\");\nhttp.createServer((req, res) => {\n  res.end(\"Hello\");\n}).listen(3000);" },
          hi: { title: "Simple Server बनाना", description: "Node का http module एक basic web server बना सकता है।", explanation: "Server एक port पर listen करता है और आने वाले requests का जवाब देता है।", example: "const http = require(\"http\");\nhttp.createServer((req, res) => {\n  res.end(\"Hello\");\n}).listen(3000);" },
        },
        quiz: { question: "Which module creates a server?", options: ["fs", "path", "http", "os"], answer: 2 },
      },
    ],
  },

  // ====================================================
  // 7. Python
  // ====================================================
  {
    id: "python",
    title: "Python for Beginners",
    category: "Programming",
    level: "Beginner",
    icon: "🐍",
    description: "Learn Python programming from scratch.",
    video: {
      en: "https://www.youtube.com/embed/rfscVS0vtbw",
      ta: ytSearchLink("Python full course in Tamil"),
      hi: ytSearchLink("Python full course in Hindi"),
    },
    lessons: [
      {
        id: 1,
        title: "Python Basics",
        duration: "15 min",
        content: {
          en: { title: "Python Basics", description: "Python is a simple, readable programming language.", explanation: "It's widely used for web development, data science, automation and AI.", example: 'print("Hello World")' },
          ta: { title: "Python Basics", description: "Python ஒரு simple, படிக்க easy-ஆன programming language.", explanation: "Web development, data science, automation, AI-க்கு Python widely use ஆகுது.", example: 'print("Hello World")' },
          hi: { title: "Python Basics", description: "Python एक simple, पढ़ने में आसान programming language है।", explanation: "Web development, data science, automation, AI में Python का बहुत उपयोग होता है।", example: 'print("Hello World")' },
        },
        quiz: { question: "Which prints text in Python?", options: ["echo()", "print()", "console.log()", "write()"], answer: 1 },
      },
      {
        id: 2,
        title: "Variables & Data Types",
        duration: "20 min",
        content: {
          en: { title: "Variables & Data Types", description: "Python variables can hold numbers, text, or lists.", explanation: "You don't need to declare a type — Python figures it out automatically.", example: 'name = "Ishu"\nage = 20\nskills = ["React", "Node"]' },
          ta: { title: "Variables & Data Types", description: "Python variables numbers, text, lists எல்லாம் store பண்ணும்.", explanation: "Type declare பண்ண தேவையில்ல — Python தானாகவே கண்டுபிடித்துக்கும்.", example: 'name = "Ishu"\nage = 20\nskills = ["React", "Node"]' },
          hi: { title: "Variables & Data Types", description: "Python variables numbers, text, lists रख सकते हैं।", explanation: "Type declare करने की ज़रूरत नहीं — Python खुद पता लगा लेता है।", example: 'name = "Ishu"\nage = 20\nskills = ["React", "Node"]' },
        },
        quiz: { question: "Do you need to declare types in Python?", options: ["Yes, always", "No, Python infers it", "Only for numbers", "Only for lists"], answer: 1 },
      },
      {
        id: 3,
        title: "Loops & Conditionals",
        duration: "25 min",
        content: {
          en: { title: "Loops & Conditionals", description: "Loops repeat code; conditionals make decisions.", explanation: "for and while loops repeat actions; if/elif/else choose which code runs.", example: "for i in range(3):\n    print(i)\n\nif age > 18:\n    print(\"Adult\")" },
          ta: { title: "Loops & Conditionals", description: "Loops code-ஐ repeat பண்ணும்; conditionals decision எடுக்கும்.", explanation: "for, while loops repeat பண்ணும்; if/elif/else எந்த code run ஆகணும்னு தேர்வு செய்யும்.", example: "for i in range(3):\n    print(i)\n\nif age > 18:\n    print(\"Adult\")" },
          hi: { title: "Loops & Conditionals", description: "Loops code को repeat करते हैं; conditionals decision लेते हैं।", explanation: "for, while loops repeat करते हैं; if/elif/else तय करते हैं कि कौन सा code चले।", example: "for i in range(3):\n    print(i)\n\nif age > 18:\n    print(\"Adult\")" },
        },
        quiz: { question: "Which keyword makes a decision in Python?", options: ["for", "if", "def", "class"], answer: 1 },
      },
    ],
  },

  // ====================================================
  // 8. SQL & Databases
  // ====================================================
  {
    id: "sql",
    title: "SQL & Databases",
    category: "Database",
    level: "Beginner",
    icon: "🗄️",
    description: "Learn to query and manage relational databases.",
    video: {
      en: "https://www.youtube.com/embed/HXV3zeQKqGY",
      ta: ytSearchLink("SQL full course in Tamil"),
      hi: ytSearchLink("SQL full course in Hindi"),
    },
    lessons: [
      {
        id: 1,
        title: "What is a Database",
        duration: "15 min",
        content: {
          en: { title: "What is a Database", description: "A database stores organized data in tables.", explanation: "Relational databases like MySQL organize data into rows and columns.", example: "SELECT * FROM users;" },
          ta: { title: "Database என்றால் என்ன", description: "Database organized data-வை tables-ல் store பண்ணும்.", explanation: "MySQL போன்ற relational databases data-வை rows, columns-ஆ organize பண்ணும்.", example: "SELECT * FROM users;" },
          hi: { title: "Database क्या है", description: "Database organized data को tables में store करता है।", explanation: "MySQL जैसे relational databases data को rows और columns में रखते हैं।", example: "SELECT * FROM users;" },
        },
        quiz: { question: "SQL is used to?", options: ["Style pages", "Query databases", "Send emails", "Design UI"], answer: 1 },
      },
      {
        id: 2,
        title: "SELECT, WHERE & ORDER BY",
        duration: "20 min",
        content: {
          en: { title: "SELECT, WHERE & ORDER BY", description: "These keywords filter and sort query results.", explanation: "WHERE filters rows, ORDER BY sorts them by a column.", example: "SELECT name FROM users WHERE age > 18 ORDER BY name;" },
          ta: { title: "SELECT, WHERE & ORDER BY", description: "இந்த keywords query results-ஐ filter, sort பண்ணும்.", explanation: "WHERE rows-ஐ filter பண்ணும், ORDER BY column படி sort பண்ணும்.", example: "SELECT name FROM users WHERE age > 18 ORDER BY name;" },
          hi: { title: "SELECT, WHERE & ORDER BY", description: "ये keywords query results को filter, sort करते हैं।", explanation: "WHERE rows को filter करता है, ORDER BY column के हिसाब से sort करता है।", example: "SELECT name FROM users WHERE age > 18 ORDER BY name;" },
        },
        quiz: { question: "Which keyword filters rows?", options: ["ORDER BY", "WHERE", "SELECT", "FROM"], answer: 1 },
      },
      {
        id: 3,
        title: "JOINs",
        duration: "25 min",
        content: {
          en: { title: "JOINs", description: "JOIN combines rows from two or more tables.", explanation: "INNER JOIN returns matching rows from both tables based on a common column.", example: "SELECT orders.id, users.name\nFROM orders\nJOIN users ON orders.user_id = users.id;" },
          ta: { title: "JOINs", description: "JOIN ரெண்டு அல்லது அதற்கு மேற்பட்ட tables-ஐ இணைக்கும்.", explanation: "INNER JOIN common column-ன் அடிப்படையில் matching rows-ஐ இரண்டு tables-ல் இருந்தும் தரும்.", example: "SELECT orders.id, users.name\nFROM orders\nJOIN users ON orders.user_id = users.id;" },
          hi: { title: "JOINs", description: "JOIN दो या ज़्यादा tables की rows को जोड़ता है।", explanation: "INNER JOIN common column के आधार पर दोनों tables से matching rows देता है।", example: "SELECT orders.id, users.name\nFROM orders\nJOIN users ON orders.user_id = users.id;" },
        },
        quiz: { question: "JOIN is used to?", options: ["Delete tables", "Combine tables", "Create indexes", "Backup data"], answer: 1 },
      },
    ],
  },

  // ====================================================
  // 9. MongoDB
  // ====================================================
  {
    id: "mongodb",
    title: "MongoDB Basics",
    category: "Database",
    level: "Beginner",
    icon: "🍃",
    description: "Work with NoSQL databases using MongoDB.",
    video: {
      en: ytSearchLink("MongoDB full course in English"),
      ta: ytSearchLink("MongoDB full course in Tamil"),
      hi: ytSearchLink("MongoDB full course in Hindi"),
    },
    lessons: [
      {
        id: 1,
        title: "What is MongoDB",
        duration: "15 min",
        content: {
          en: { title: "What is MongoDB", description: "MongoDB is a NoSQL database that stores data as documents.", explanation: "Instead of tables and rows, MongoDB uses collections and JSON-like documents.", example: '{ "name": "Ishu", "age": 20 }' },
          ta: { title: "MongoDB என்றால் என்ன", description: "MongoDB ஒரு NoSQL database, data-வை documents-ஆ store பண்ணும்.", explanation: "Tables, rows-க்கு பதிலா MongoDB collections மற்றும் JSON-like documents use பண்ணும்.", example: '{ "name": "Ishu", "age": 20 }' },
          hi: { title: "MongoDB क्या है", description: "MongoDB एक NoSQL database है, data को documents के रूप में रखता है।", explanation: "Tables, rows की जगह MongoDB collections और JSON-like documents का उपयोग करता है।", example: '{ "name": "Ishu", "age": 20 }' },
        },
        quiz: { question: "MongoDB stores data as?", options: ["Rows and columns", "Documents", "Spreadsheets", "XML files"], answer: 1 },
      },
      {
        id: 2,
        title: "CRUD Operations",
        duration: "20 min",
        content: {
          en: { title: "CRUD Operations", description: "CRUD stands for Create, Read, Update, Delete.", explanation: "insertOne, find, updateOne and deleteOne are the core MongoDB operations.", example: 'db.users.insertOne({ name: "Ishu" });\ndb.users.find();' },
          ta: { title: "CRUD Operations", description: "CRUD என்பது Create, Read, Update, Delete-ன் சுருக்கம்.", explanation: "insertOne, find, updateOne, deleteOne தான் MongoDB-ன் core operations.", example: 'db.users.insertOne({ name: "Ishu" });\ndb.users.find();' },
          hi: { title: "CRUD Operations", description: "CRUD का मतलब Create, Read, Update, Delete है।", explanation: "insertOne, find, updateOne, deleteOne MongoDB के core operations हैं।", example: 'db.users.insertOne({ name: "Ishu" });\ndb.users.find();' },
        },
        quiz: { question: "Which operation adds new data?", options: ["find()", "insertOne()", "deleteOne()", "updateOne()"], answer: 1 },
      },
      {
        id: 3,
        title: "Mongoose Schemas",
        duration: "25 min",
        content: {
          en: { title: "Mongoose Schemas", description: "Mongoose defines the shape of documents in Node.js apps.", explanation: "A schema describes fields and their types, making data more predictable.", example: "const userSchema = new mongoose.Schema({\n  name: String,\n  age: Number,\n});" },
          ta: { title: "Mongoose Schemas", description: "Mongoose Node.js apps-ல் documents-ன் shape-ஐ define பண்ணும்.", explanation: "Schema fields மற்றும் அவற்றின் types-ஐ describe பண்ணும்.", example: "const userSchema = new mongoose.Schema({\n  name: String,\n  age: Number,\n});" },
          hi: { title: "Mongoose Schemas", description: "Mongoose Node.js apps में documents की shape define करता है।", explanation: "Schema fields और उनके types को describe करता है।", example: "const userSchema = new mongoose.Schema({\n  name: String,\n  age: Number,\n});" },
        },
        quiz: { question: "Mongoose schema defines?", options: ["Server routes", "Fields and types", "CSS styles", "HTTP headers"], answer: 1 },
      },
    ],
  },

  // ====================================================
  // 10. Express.js
  // ====================================================
  {
    id: "expressjs",
    title: "Express.js Backend Development",
    category: "Backend",
    level: "Intermediate",
    icon: "🚂",
    description: "Build REST APIs using Express.js and Node.",
    video: {
      en: ytSearchLink("Express.js full course in English"),
      ta: ytSearchLink("Express.js full course in Tamil"),
      hi: ytSearchLink("Express.js full course in Hindi"),
    },
    lessons: [
      {
        id: 1,
        title: "Introduction to Express",
        duration: "15 min",
        content: {
          en: { title: "Introduction to Express", description: "Express is a minimal Node.js framework for building web servers.", explanation: "It simplifies routing, middleware and handling HTTP requests.", example: 'const express = require("express");\nconst app = express();' },
          ta: { title: "Express அறிமுகம்", description: "Express web servers build பண்ண ஒரு simple Node.js framework.", explanation: "Routing, middleware, HTTP requests handle பண்றது Express மூலம் easy ஆகும்.", example: 'const express = require("express");\nconst app = express();' },
          hi: { title: "Express का परिचय", description: "Express web servers बनाने का एक simple Node.js framework है।", explanation: "Routing, middleware, HTTP requests को handle करना Express से आसान हो जाता है।", example: 'const express = require("express");\nconst app = express();' },
        },
        quiz: { question: "Express is built on top of?", options: ["Python", "Node.js", "Java", "PHP"], answer: 1 },
      },
      {
        id: 2,
        title: "Routes & Middleware",
        duration: "20 min",
        content: {
          en: { title: "Routes & Middleware", description: "Routes handle specific URLs; middleware runs code in between.", explanation: "app.get/app.post define routes; middleware functions can log, authenticate, or modify requests.", example: 'app.get("/users", (req, res) => {\n  res.json({ users: [] });\n});' },
          ta: { title: "Routes & Middleware", description: "Routes specific URLs-ஐ handle பண்ணும்; middleware இடையில் code run பண்ணும்.", explanation: "app.get/app.post routes define பண்ணும்; middleware functions log, authenticate பண்ணலாம்.", example: 'app.get("/users", (req, res) => {\n  res.json({ users: [] });\n});' },
          hi: { title: "Routes & Middleware", description: "Routes specific URLs को handle करते हैं; middleware बीच में code चलाता है।", explanation: "app.get/app.post routes define करते हैं; middleware functions log, authenticate कर सकते हैं।", example: 'app.get("/users", (req, res) => {\n  res.json({ users: [] });\n});' },
        },
        quiz: { question: "app.get() is used to?", options: ["Delete a route", "Handle GET requests", "Start the database", "Style the page"], answer: 1 },
      },
      {
        id: 3,
        title: "Building a REST API",
        duration: "25 min",
        content: {
          en: { title: "Building a REST API", description: "A REST API exposes endpoints for CRUD operations over HTTP.", explanation: "GET, POST, PUT, DELETE map to read, create, update and delete actions.", example: 'app.post("/users", (req, res) => {\n  res.status(201).json(req.body);\n});' },
          ta: { title: "REST API Build பண்றது", description: "REST API HTTP-ல் CRUD operations-க்கான endpoints தரும்.", explanation: "GET, POST, PUT, DELETE read, create, update, delete-க்கு map ஆகும்.", example: 'app.post("/users", (req, res) => {\n  res.status(201).json(req.body);\n});' },
          hi: { title: "REST API बनाना", description: "REST API HTTP पर CRUD operations के लिए endpoints देता है।", explanation: "GET, POST, PUT, DELETE read, create, update, delete से map होते हैं।", example: 'app.post("/users", (req, res) => {\n  res.status(201).json(req.body);\n});' },
        },
        quiz: { question: "Which HTTP method creates new data?", options: ["GET", "POST", "DELETE", "HEAD"], answer: 1 },
      },
    ],
  },

  // ====================================================
  // 11. Data Structures & Algorithms
  // ====================================================
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    category: "Programming",
    level: "Intermediate",
    icon: "🧮",
    description: "Master DSA concepts for coding interviews.",
    video: {
      en: ytSearchLink("DSA full course in English"),
      ta: ytSearchLink("Data Structures and Algorithms full course in Tamil"),
      hi: ytSearchLink("Data Structures and Algorithms full course in Hindi"),
    },
    lessons: [
      {
        id: 1,
        title: "Arrays & Strings",
        duration: "20 min",
        content: {
          en: { title: "Arrays & Strings", description: "Arrays store ordered collections of items in memory.", explanation: "Most interview questions start with array and string manipulation basics.", example: "const arr = [1, 2, 3];\narr.push(4);" },
          ta: { title: "Arrays & Strings", description: "Arrays memory-ல் ordered items-ஐ store பண்ணும்.", explanation: "Interview questions பெரும்பாலும் array, string basics-ல் ஆரம்பிக்கும்.", example: "const arr = [1, 2, 3];\narr.push(4);" },
          hi: { title: "Arrays & Strings", description: "Arrays memory में ordered items store करते हैं।", explanation: "Interview questions अक्सर array, string basics से शुरू होते हैं।", example: "const arr = [1, 2, 3];\narr.push(4);" },
        },
        quiz: { question: "Arrays store data in what order?", options: ["Random", "Ordered", "Sorted only", "Reverse only"], answer: 1 },
      },
      {
        id: 2,
        title: "Stacks & Queues",
        duration: "20 min",
        content: {
          en: { title: "Stacks & Queues", description: "Stack is LIFO (last in, first out); Queue is FIFO (first in, first out).", explanation: "Stacks are used for undo actions; queues are used for task scheduling.", example: "// Stack: push/pop\n// Queue: enqueue/dequeue" },
          ta: { title: "Stacks & Queues", description: "Stack LIFO (last in, first out); Queue FIFO (first in, first out).", explanation: "Undo actions-க்கு stacks, task scheduling-க்கு queues use ஆகும்.", example: "// Stack: push/pop\n// Queue: enqueue/dequeue" },
          hi: { title: "Stacks & Queues", description: "Stack LIFO होता है; Queue FIFO होता है।", explanation: "Undo actions के लिए stacks, task scheduling के लिए queues का उपयोग होता है।", example: "// Stack: push/pop\n// Queue: enqueue/dequeue" },
        },
        quiz: { question: "Which is LIFO?", options: ["Queue", "Stack", "Array", "Tree"], answer: 1 },
      },
      {
        id: 3,
        title: "Sorting & Searching",
        duration: "25 min",
        content: {
          en: { title: "Sorting & Searching", description: "Sorting arranges data; searching finds specific items.", explanation: "Binary search is much faster than linear search, but needs sorted data first.", example: "// Binary search needs a sorted array" },
          ta: { title: "Sorting & Searching", description: "Sorting data-வை arrange பண்ணும்; searching specific items கண்டுபிடிக்கும்.", explanation: "Binary search linear search-ஐ விட வேகமா இருக்கும், ஆனா sorted data தேவை.", example: "// Binary search needs a sorted array" },
          hi: { title: "Sorting & Searching", description: "Sorting data को arrange करता है; searching specific items ढूंढता है।", explanation: "Binary search, linear search से तेज़ है, पर sorted data चाहिए।", example: "// Binary search needs a sorted array" },
        },
        quiz: { question: "Binary search requires?", options: ["Unsorted data", "Sorted data", "A stack", "A queue"], answer: 1 },
      },
    ],
  },

  // ====================================================
  // 12. Java
  // ====================================================
  {
    id: "java",
    title: "Java Programming",
    category: "Programming",
    level: "Beginner",
    icon: "☕",
    description: "Learn object-oriented programming with Java.",
    video: {
      en: ytSearchLink("Java full course in English"),
      ta: ytSearchLink("Java full course in Tamil"),
      hi: ytSearchLink("Java full course in Hindi"),
    },
    lessons: [
      {
        id: 1,
        title: "Java Basics",
        duration: "15 min",
        content: {
          en: { title: "Java Basics", description: "Java is a popular object-oriented programming language.", explanation: "Every Java program starts with a main() method inside a class.", example: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello");\n  }\n}' },
          ta: { title: "Java Basics", description: "Java ஒரு popular object-oriented programming language.", explanation: "ஒவ்வொரு Java program-உம் class-க்குள் main() method-ல் இருந்து ஆரம்பிக்கும்.", example: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello");\n  }\n}' },
          hi: { title: "Java Basics", description: "Java एक लोकप्रिय object-oriented programming language है।", explanation: "हर Java program class के अंदर main() method से शुरू होता है।", example: 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello");\n  }\n}' },
        },
        quiz: { question: "Every Java program starts with?", options: ["init()", "main()", "start()", "run()"], answer: 1 },
      },
      {
        id: 2,
        title: "Classes & Objects",
        duration: "20 min",
        content: {
          en: { title: "Classes & Objects", description: "A class is a blueprint; an object is an instance of it.", explanation: "Classes define fields and methods; objects hold actual data.", example: "class Car {\n  String color;\n}\nCar c = new Car();" },
          ta: { title: "Classes & Objects", description: "Class ஒரு blueprint; object அதன் ஒரு instance.", explanation: "Classes fields, methods define பண்ணும்; objects actual data வெச்சிருக்கும்.", example: "class Car {\n  String color;\n}\nCar c = new Car();" },
          hi: { title: "Classes & Objects", description: "Class एक blueprint है; object उसका instance है।", explanation: "Classes fields, methods define करते हैं; objects असली data रखते हैं।", example: "class Car {\n  String color;\n}\nCar c = new Car();" },
        },
        quiz: { question: "An object is?", options: ["A blueprint", "An instance of a class", "A loop", "A variable type"], answer: 1 },
      },
      {
        id: 3,
        title: "Inheritance",
        duration: "25 min",
        content: {
          en: { title: "Inheritance", description: "Inheritance lets a class reuse another class's fields and methods.", explanation: "Use 'extends' to inherit; this avoids repeating the same code across classes.", example: "class Animal {}\nclass Dog extends Animal {}" },
          ta: { title: "Inheritance", description: "Inheritance மூலம் ஒரு class இன்னொரு class-ன் fields, methods-ஐ reuse பண்ணும்.", explanation: "'extends' வெச்சு inherit பண்ணலாம், code repeat ஆவதை தவிர்க்கலாம்.", example: "class Animal {}\nclass Dog extends Animal {}" },
          hi: { title: "Inheritance", description: "Inheritance से एक class दूसरी class के fields, methods reuse कर सकती है।", explanation: "'extends' से inherit करते हैं, इससे code बार-बार लिखना नहीं पड़ता।", example: "class Animal {}\nclass Dog extends Animal {}" },
        },
        quiz: { question: "Which keyword is used for inheritance?", options: ["extends", "implements", "inherits", "uses"], answer: 0 },
      },
    ],
  },

  // ====================================================
  // 13. REST API Design
  // ====================================================
  {
    id: "rest-api",
    title: "REST API Design",
    category: "Backend",
    level: "Intermediate",
    icon: "🔌",
    description: "Learn to design and build RESTful APIs.",
    video: {
      en: ytSearchLink("REST API design full course in English"),
      ta: ytSearchLink("REST API design tutorial in Tamil"),
      hi: ytSearchLink("REST API design tutorial in Hindi"),
    },
    lessons: [
      {
        id: 1,
        title: "REST Principles",
        duration: "15 min",
        content: {
          en: { title: "REST Principles", description: "REST APIs use standard HTTP methods over resource URLs.", explanation: "Resources are nouns (e.g. /users), and HTTP methods describe the action.", example: "GET /users\nPOST /users\nDELETE /users/1" },
          ta: { title: "REST Principles", description: "REST APIs resource URLs மேல் standard HTTP methods use பண்ணும்.", explanation: "Resources nouns (எ.கா. /users), HTTP methods action-ஐ describe பண்ணும்.", example: "GET /users\nPOST /users\nDELETE /users/1" },
          hi: { title: "REST Principles", description: "REST APIs resource URLs पर standard HTTP methods का उपयोग करते हैं।", explanation: "Resources nouns होते हैं (जैसे /users), HTTP methods action describe करते हैं।", example: "GET /users\nPOST /users\nDELETE /users/1" },
        },
        quiz: { question: "REST resources are usually?", options: ["Verbs", "Nouns", "Numbers", "Symbols"], answer: 1 },
      },
      {
        id: 2,
        title: "Status Codes",
        duration: "20 min",
        content: {
          en: { title: "Status Codes", description: "HTTP status codes tell the client what happened.", explanation: "200 means success, 404 means not found, 500 means server error.", example: "res.status(404).json({ error: \"Not found\" });" },
          ta: { title: "Status Codes", description: "HTTP status codes client-க்கு என்ன நடந்ததுன்னு சொல்லும்.", explanation: "200 success, 404 not found, 500 server error.", example: "res.status(404).json({ error: \"Not found\" });" },
          hi: { title: "Status Codes", description: "HTTP status codes client को बताते हैं क्या हुआ।", explanation: "200 यानी success, 404 यानी not found, 500 यानी server error।", example: "res.status(404).json({ error: \"Not found\" });" },
        },
        quiz: { question: "404 means?", options: ["Success", "Not found", "Server error", "Unauthorized"], answer: 1 },
      },
      {
        id: 3,
        title: "Authentication in APIs",
        duration: "25 min",
        content: {
          en: { title: "Authentication in APIs", description: "APIs need to verify who is making a request.", explanation: "JWT tokens are commonly sent in headers to authenticate each request.", example: 'Authorization: Bearer <token>' },
          ta: { title: "Authentication in APIs", description: "Request எடுக்கும் நபர் யாருன்னு API verify பண்ணணும்.", explanation: "JWT tokens ஒவ்வொரு request-ஐயும் authenticate பண்ண headers-ல் அனுப்பப்படும்.", example: 'Authorization: Bearer <token>' },
          hi: { title: "Authentication in APIs", description: "API को verify करना होता है कि request कौन कर रहा है।", explanation: "JWT tokens हर request को authenticate करने के लिए headers में भेजे जाते हैं।", example: 'Authorization: Bearer <token>' },
        },
        quiz: { question: "JWT tokens are sent in?", options: ["The URL path", "Request headers", "CSS files", "Database schema"], answer: 1 },
      },
    ],
  },

  // ====================================================
  // 14. Docker
  // ====================================================
  {
    id: "docker",
    title: "Docker Basics",
    category: "DevOps",
    level: "Intermediate",
    icon: "🐳",
    description: "Containerize applications using Docker.",
    video: {
      en: ytSearchLink("Docker full course in English"),
      ta: ytSearchLink("Docker full course in Tamil"),
      hi: ytSearchLink("Docker full course in Hindi"),
    },
    lessons: [
      {
        id: 1,
        title: "What is Docker",
        duration: "15 min",
        content: {
          en: { title: "What is Docker", description: "Docker packages an app and its dependencies into a container.", explanation: "Containers run the same way on any machine, avoiding 'it works on my machine' issues.", example: "docker run hello-world" },
          ta: { title: "Docker என்றால் என்ன", description: "Docker ஒரு app-ஐயும் அதன் dependencies-ஐயும் ஒரு container-ஆ package பண்ணும்.", explanation: "Containers எந்த machine-லயும் ஒரே மாதிரி run ஆகும்.", example: "docker run hello-world" },
          hi: { title: "Docker क्या है", description: "Docker एक app और उसकी dependencies को container में pack करता है।", explanation: "Containers किसी भी machine पर एक जैसे चलते हैं।", example: "docker run hello-world" },
        },
        quiz: { question: "Docker packages apps into?", options: ["Databases", "Containers", "Spreadsheets", "Browsers"], answer: 1 },
      },
      {
        id: 2,
        title: "Dockerfile Basics",
        duration: "20 min",
        content: {
          en: { title: "Dockerfile Basics", description: "A Dockerfile describes how to build a container image.", explanation: "FROM sets the base image, COPY adds files, RUN executes setup commands.", example: "FROM node:18\nCOPY . .\nRUN npm install\nCMD [\"node\", \"index.js\"]" },
          ta: { title: "Dockerfile Basics", description: "Dockerfile ஒரு container image-ஐ எப்படி build பண்றதுன்னு describe பண்ணும்.", explanation: "FROM base image set பண்ணும், COPY files add பண்ணும், RUN setup commands run பண்ணும்.", example: "FROM node:18\nCOPY . .\nRUN npm install\nCMD [\"node\", \"index.js\"]" },
          hi: { title: "Dockerfile Basics", description: "Dockerfile बताता है कि container image कैसे बनाई जाए।", explanation: "FROM base image set करता है, COPY files add करता है, RUN setup commands चलाता है।", example: "FROM node:18\nCOPY . .\nRUN npm install\nCMD [\"node\", \"index.js\"]" },
        },
        quiz: { question: "Which instruction sets the base image?", options: ["COPY", "RUN", "FROM", "CMD"], answer: 2 },
      },
      {
        id: 3,
        title: "Docker Compose",
        duration: "25 min",
        content: {
          en: { title: "Docker Compose", description: "Compose runs multiple containers together (e.g. app + database).", explanation: "A docker-compose.yml file defines services, and 'docker compose up' starts them all.", example: "services:\n  app:\n    build: .\n  db:\n    image: mongo" },
          ta: { title: "Docker Compose", description: "Compose பல containers-ஐ ஒன்னா run பண்ணும் (app + database).", explanation: "docker-compose.yml file services define பண்ணும், 'docker compose up' எல்லாத்தையும் start பண்ணும்.", example: "services:\n  app:\n    build: .\n  db:\n    image: mongo" },
          hi: { title: "Docker Compose", description: "Compose कई containers को एक साथ चलाता है (app + database)।", explanation: "docker-compose.yml file services define करती है, 'docker compose up' सबको start करता है।", example: "services:\n  app:\n    build: .\n  db:\n    image: mongo" },
        },
        quiz: { question: "docker-compose.yml defines?", options: ["Services", "CSS styles", "Git branches", "HTML tags"], answer: 0 },
      },
    ],
  },

  // ====================================================
  // 15. AWS
  // ====================================================
  {
    id: "aws",
    title: "AWS Cloud Fundamentals",
    category: "Cloud",
    level: "Beginner",
    icon: "☁️",
    description: "Get started with Amazon Web Services cloud computing.",
    video: {
      en: ytSearchLink("AWS full course in English"),
      ta: ytSearchLink("AWS tutorial in Tamil"),
      hi: ytSearchLink("AWS tutorial in Hindi"),
    },
    lessons: [
      {
        id: 1,
        title: "What is Cloud Computing",
        duration: "15 min",
        content: {
          en: { title: "What is Cloud Computing", description: "Cloud computing means renting computing resources over the internet.", explanation: "Instead of buying servers, you rent storage, computing power and databases from AWS.", example: "// No local server needed — AWS hosts it" },
          ta: { title: "Cloud Computing என்றால் என்ன", description: "Cloud computing னா internet மூலம் computing resources rent பண்றது.", explanation: "Server வாங்குறதுக்கு பதிலா, storage, computing power AWS-ல் rent பண்ணலாம்.", example: "// No local server needed — AWS hosts it" },
          hi: { title: "Cloud Computing क्या है", description: "Cloud computing का मतलब है internet से computing resources rent करना।", explanation: "Server खरीदने की बजाय, storage और computing power AWS से rent कर सकते हैं।", example: "// No local server needed — AWS hosts it" },
        },
        quiz: { question: "Cloud computing lets you?", options: ["Buy physical servers only", "Rent computing resources online", "Only store images", "Only send emails"], answer: 1 },
      },
      {
        id: 2,
        title: "EC2 & S3 Basics",
        duration: "20 min",
        content: {
          en: { title: "EC2 & S3 Basics", description: "EC2 gives you virtual servers; S3 gives you file storage.", explanation: "EC2 instances run your applications; S3 buckets store files like images and backups.", example: "// EC2 = compute, S3 = storage" },
          ta: { title: "EC2 & S3 Basics", description: "EC2 virtual servers தரும்; S3 file storage தரும்.", explanation: "EC2 instances applications run பண்ணும்; S3 buckets images, backups store பண்ணும்.", example: "// EC2 = compute, S3 = storage" },
          hi: { title: "EC2 & S3 Basics", description: "EC2 virtual servers देता है; S3 file storage देता है।", explanation: "EC2 instances applications चलाते हैं; S3 buckets images, backups store करते हैं।", example: "// EC2 = compute, S3 = storage" },
        },
        quiz: { question: "S3 is mainly used for?", options: ["Running servers", "File storage", "Writing code", "Sending SMS"], answer: 1 },
      },
      {
        id: 3,
        title: "IAM & Security Basics",
        duration: "25 min",
        content: {
          en: { title: "IAM & Security Basics", description: "IAM controls who can access which AWS resources.", explanation: "You create users, roles and permissions instead of sharing one login for everything.", example: "// IAM = Identity and Access Management" },
          ta: { title: "IAM & Security Basics", description: "IAM யார் எந்த AWS resource-ஐ access பண்ணலாம்னு control பண்ணும்.", explanation: "ஒரே login share பண்றதுக்கு பதிலா, users, roles, permissions create பண்ணலாம்.", example: "// IAM = Identity and Access Management" },
          hi: { title: "IAM & Security Basics", description: "IAM control करता है कौन कौन से AWS resource access कर सकता है।", explanation: "एक login share करने की बजाय, users, roles, permissions बनाई जाती हैं।", example: "// IAM = Identity and Access Management" },
        },
        quiz: { question: "IAM stands for?", options: ["Internet Access Method", "Identity and Access Management", "Internal App Manager", "Instance Access Module"], answer: 1 },
      },
    ],
  },

  // ====================================================
  // 16. Linux
  // ====================================================
  {
    id: "linux",
    title: "Linux Command Line",
    category: "Tools",
    level: "Beginner",
    icon: "🐧",
    description: "Learn essential Linux commands for developers.",
    video: {
      en: ytSearchLink("Linux command line full course in English"),
      ta: ytSearchLink("Linux command line tutorial in Tamil"),
      hi: ytSearchLink("Linux command line tutorial in Hindi"),
    },
    lessons: [
      {
        id: 1,
        title: "Navigating the File System",
        duration: "15 min",
        content: {
          en: { title: "Navigating the File System", description: "A few commands let you move around Linux folders.", explanation: "pwd shows your location, ls lists files, cd changes directory.", example: "pwd\nls\ncd projects" },
          ta: { title: "File System-ல் Navigate பண்றது", description: "சில commands Linux folders-ல் move பண்ண உதவும்.", explanation: "pwd location காட்டும், ls files list பண்ணும், cd directory மாற்றும்.", example: "pwd\nls\ncd projects" },
          hi: { title: "File System में Navigate करना", description: "कुछ commands से Linux folders में move कर सकते हैं।", explanation: "pwd location दिखाता है, ls files list करता है, cd directory बदलता है।", example: "pwd\nls\ncd projects" },
        },
        quiz: { question: "Which command lists files?", options: ["cd", "ls", "pwd", "rm"], answer: 1 },
      },
      {
        id: 2,
        title: "File Operations",
        duration: "20 min",
        content: {
          en: { title: "File Operations", description: "Create, copy, move and delete files from the terminal.", explanation: "touch creates a file, cp copies, mv moves/renames, rm deletes.", example: "touch notes.txt\ncp notes.txt backup.txt\nrm backup.txt" },
          ta: { title: "File Operations", description: "Terminal-ல் files create, copy, move, delete பண்ணலாம்.", explanation: "touch file create பண்ணும், cp copy பண்ணும், mv move/rename பண்ணும், rm delete பண்ணும்.", example: "touch notes.txt\ncp notes.txt backup.txt\nrm backup.txt" },
          hi: { title: "File Operations", description: "Terminal से files create, copy, move, delete कर सकते हैं।", explanation: "touch file बनाता है, cp copy करता है, mv move/rename करता है, rm delete करता है।", example: "touch notes.txt\ncp notes.txt backup.txt\nrm backup.txt" },
        },
        quiz: { question: "Which command deletes a file?", options: ["touch", "cp", "rm", "mv"], answer: 2 },
      },
      {
        id: 3,
        title: "Permissions & Processes",
        duration: "25 min",
        content: {
          en: { title: "Permissions & Processes", description: "Linux controls who can read, write or execute files.", explanation: "chmod changes permissions; ps and top show running processes.", example: "chmod +x script.sh\nps aux" },
          ta: { title: "Permissions & Processes", description: "யார் file-ஐ read/write/execute பண்ணலாம்னு Linux control பண்ணும்.", explanation: "chmod permissions மாற்றும்; ps, top running processes காட்டும்.", example: "chmod +x script.sh\nps aux" },
          hi: { title: "Permissions & Processes", description: "Linux control करता है कौन file को read/write/execute कर सकता है।", explanation: "chmod permissions बदलता है; ps, top running processes दिखाते हैं।", example: "chmod +x script.sh\nps aux" },
        },
        quiz: { question: "Which command changes file permissions?", options: ["chmod", "ls", "cd", "cat"], answer: 0 },
      },
    ],
  },

  // ====================================================
  // 17. Machine Learning
  // ====================================================
  {
    id: "machine-learning",
    title: "Machine Learning Basics",
    category: "AI/ML",
    level: "Intermediate",
    icon: "🤖",
    description: "Introduction to machine learning concepts and models.",
    video: {
      en: ytSearchLink("Machine learning full course in English"),
      ta: ytSearchLink("Machine learning tutorial in Tamil"),
      hi: ytSearchLink("Machine learning tutorial in Hindi"),
    },
    lessons: [
      {
        id: 1,
        title: "What is Machine Learning",
        duration: "15 min",
        content: {
          en: { title: "What is Machine Learning", description: "ML lets computers learn patterns from data instead of fixed rules.", explanation: "A model is trained on examples, then makes predictions on new, unseen data.", example: "// model.fit(trainingData) then model.predict(newData)" },
          ta: { title: "Machine Learning என்றால் என்ன", description: "ML computers-ஐ data-ல் இருந்து patterns learn பண்ண வைக்கும்.", explanation: "Model examples-ல் train ஆகி, புது data-க்கு predictions பண்ணும்.", example: "// model.fit(trainingData) then model.predict(newData)" },
          hi: { title: "Machine Learning क्या है", description: "ML computers को data से patterns सीखने देता है।", explanation: "Model examples पर train होता है, फिर नए data पर predictions करता है।", example: "// model.fit(trainingData) then model.predict(newData)" },
        },
        quiz: { question: "ML models learn from?", options: ["Fixed rules only", "Data/examples", "CSS files", "HTML tags"], answer: 1 },
      },
      {
        id: 2,
        title: "Supervised vs Unsupervised",
        duration: "20 min",
        content: {
          en: { title: "Supervised vs Unsupervised", description: "Supervised learning uses labeled data; unsupervised finds patterns without labels.", explanation: "Classification and regression are supervised; clustering is unsupervised.", example: "// Supervised: spam vs not-spam\n// Unsupervised: customer grouping" },
          ta: { title: "Supervised vs Unsupervised", description: "Supervised learning labeled data use பண்ணும்; unsupervised labels இல்லாம patterns கண்டுபிடிக்கும்.", explanation: "Classification, regression supervised; clustering unsupervised.", example: "// Supervised: spam vs not-spam\n// Unsupervised: customer grouping" },
          hi: { title: "Supervised vs Unsupervised", description: "Supervised learning labeled data का उपयोग करती है; unsupervised बिना labels के patterns ढूंढती है।", explanation: "Classification, regression supervised हैं; clustering unsupervised है।", example: "// Supervised: spam vs not-spam\n// Unsupervised: customer grouping" },
        },
        quiz: { question: "Clustering is an example of?", options: ["Supervised learning", "Unsupervised learning", "Manual coding", "Database design"], answer: 1 },
      },
      {
        id: 3,
        title: "Model Evaluation",
        duration: "25 min",
        content: {
          en: { title: "Model Evaluation", description: "We measure how well a model performs on unseen data.", explanation: "Accuracy, precision and recall are common metrics used to evaluate models.", example: "// accuracy = correct predictions / total predictions" },
          ta: { title: "Model Evaluation", description: "Model புது data-ல் எவ்ளோ நல்லா வேலை செய்யுதுன்னு measure பண்ணுவோம்.", explanation: "Accuracy, precision, recall common metrics-ஆ use ஆகும்.", example: "// accuracy = correct predictions / total predictions" },
          hi: { title: "Model Evaluation", description: "हम मापते हैं कि model नए data पर कितना अच्छा perform करता है।", explanation: "Accuracy, precision, recall सामान्य metrics हैं जो models को evaluate करने में उपयोग होते हैं।", example: "// accuracy = correct predictions / total predictions" },
        },
        quiz: { question: "Accuracy measures?", options: ["Code style", "Correct prediction rate", "Server speed", "File size"], answer: 1 },
      },
    ],
  },

  // ====================================================
  // 18. Cybersecurity
  // ====================================================
  {
    id: "cybersecurity",
    title: "Cybersecurity Fundamentals",
    category: "Security",
    level: "Beginner",
    icon: "🛡️",
    description: "Learn the basics of information security.",
    video: {
      en: ytSearchLink("Cybersecurity full course in English"),
      ta: ytSearchLink("Cybersecurity basics tutorial in Tamil"),
      hi: ytSearchLink("Cybersecurity basics tutorial in Hindi"),
    },
    lessons: [
      {
        id: 1,
        title: "Why Security Matters",
        duration: "15 min",
        content: {
          en: { title: "Why Security Matters", description: "Security protects data, systems and users from harm.", explanation: "Attacks can steal data, disrupt services, or damage a company's reputation.", example: "// CIA triad: Confidentiality, Integrity, Availability" },
          ta: { title: "Security ஏன் முக்கியம்", description: "Security data, systems, users-ஐ harm-ல் இருந்து protect பண்ணும்.", explanation: "Attacks data-ஐ steal பண்ணலாம், services-ஐ disrupt பண்ணலாம்.", example: "// CIA triad: Confidentiality, Integrity, Availability" },
          hi: { title: "Security क्यों ज़रूरी है", description: "Security data, systems, users को नुकसान से बचाती है।", explanation: "Attacks data चुरा सकते हैं, services को बाधित कर सकते हैं।", example: "// CIA triad: Confidentiality, Integrity, Availability" },
        },
        quiz: { question: "The CIA triad stands for?", options: ["Confidentiality, Integrity, Availability", "Code, Internet, App", "Cloud, Internet, Access", "Client, Interface, API"], answer: 0 },
      },
      {
        id: 2,
        title: "Common Attack Types",
        duration: "20 min",
        content: {
          en: { title: "Common Attack Types", description: "Phishing, malware and SQL injection are common attack methods.", explanation: "Phishing tricks users into giving up credentials; SQL injection abuses unsafe database queries.", example: "// Never trust raw user input in a query" },
          ta: { title: "Common Attack Types", description: "Phishing, malware, SQL injection common attack methods.", explanation: "Phishing users-ஐ credentials கொடுக்க வெச்சு ஏமாற்றும்; SQL injection unsafe queries-ஐ misuse பண்ணும்.", example: "// Never trust raw user input in a query" },
          hi: { title: "Common Attack Types", description: "Phishing, malware, SQL injection सामान्य attack methods हैं।", explanation: "Phishing users को credentials देने के लिए धोखा देती है; SQL injection unsafe queries का misuse करता है।", example: "// Never trust raw user input in a query" },
        },
        quiz: { question: "Phishing mainly targets?", options: ["Servers", "Human users", "Databases", "CSS files"], answer: 1 },
      },
      {
        id: 3,
        title: "Basic Security Practices",
        duration: "25 min",
        content: {
          en: { title: "Basic Security Practices", description: "Simple habits reduce most security risks.", explanation: "Strong passwords, two-factor authentication, and keeping software updated are key defenses.", example: "// Always validate and sanitize user input" },
          ta: { title: "Basic Security Practices", description: "Simple habits பெரும்பாலான security risks-ஐ குறைக்கும்.", explanation: "Strong passwords, two-factor authentication, software update key defenses.", example: "// Always validate and sanitize user input" },
          hi: { title: "Basic Security Practices", description: "Simple habits ज़्यादातर security risks कम कर देती हैं।", explanation: "Strong passwords, two-factor authentication, software update करना मुख्य defenses हैं।", example: "// Always validate and sanitize user input" },
        },
        quiz: { question: "Two-factor authentication adds?", options: ["An extra layer of security", "A CSS style", "A database index", "A file format"], answer: 0 },
      },
    ],
  },

  // ====================================================
  // 19. TypeScript
  // ====================================================
  {
    id: "typescript",
    title: "TypeScript for JavaScript Developers",
    category: "Programming",
    level: "Intermediate",
    icon: "🔷",
    description: "Add static typing to your JavaScript projects.",
    video: {
      en: ytSearchLink("TypeScript full course in English"),
      ta: ytSearchLink("TypeScript tutorial in Tamil"),
      hi: ytSearchLink("TypeScript tutorial in Hindi"),
    },
    lessons: [
      {
        id: 1,
        title: "Why TypeScript",
        duration: "15 min",
        content: {
          en: { title: "Why TypeScript", description: "TypeScript adds type-checking on top of JavaScript.", explanation: "It catches many bugs at compile time, before the code even runs.", example: "let age: number = 20;" },
          ta: { title: "TypeScript ஏன்", description: "TypeScript JavaScript-க்கு மேல type-checking சேர்க்கும்.", explanation: "Code run ஆவதற்கு முன்னாடியே பல bugs-ஐ compile time-ல் கண்டுபிடிக்கும்.", example: "let age: number = 20;" },
          hi: { title: "TypeScript क्यों", description: "TypeScript JavaScript के ऊपर type-checking जोड़ता है।", explanation: "यह कई bugs को code चलने से पहले ही compile time पर पकड़ लेता है।", example: "let age: number = 20;" },
        },
        quiz: { question: "TypeScript adds what to JavaScript?", options: ["Styling", "Type-checking", "Databases", "Servers"], answer: 1 },
      },
      {
        id: 2,
        title: "Interfaces & Types",
        duration: "20 min",
        content: {
          en: { title: "Interfaces & Types", description: "Interfaces describe the shape of an object.", explanation: "They help catch mistakes when an object is missing a required field.", example: "interface User {\n  name: string;\n  age: number;\n}" },
          ta: { title: "Interfaces & Types", description: "Interfaces object-ன் shape-ஐ describe பண்ணும்.", explanation: "Required field missing ஆனா mistakes catch பண்ண இது உதவும்.", example: "interface User {\n  name: string;\n  age: number;\n}" },
          hi: { title: "Interfaces & Types", description: "Interfaces object की shape describe करते हैं।", explanation: "Required field missing होने पर mistakes पकड़ने में मदद करते हैं।", example: "interface User {\n  name: string;\n  age: number;\n}" },
        },
        quiz: { question: "Interfaces describe?", options: ["CSS styles", "Object shape", "File paths", "Database tables"], answer: 1 },
      },
      {
        id: 3,
        title: "Generics",
        duration: "25 min",
        content: {
          en: { title: "Generics", description: "Generics let you write reusable code that works with multiple types.", explanation: "Instead of writing separate functions per type, a generic function adapts automatically.", example: "function identity<T>(value: T): T {\n  return value;\n}" },
          ta: { title: "Generics", description: "Generics மூலம் பல types-க்கும் வேலை செய்யுற reusable code எழுதலாம்.", explanation: "ஒவ்வொரு type-க்கும் தனி function எழுதுறதுக்கு பதிலா, generic function தானா adapt ஆகும்.", example: "function identity<T>(value: T): T {\n  return value;\n}" },
          hi: { title: "Generics", description: "Generics से आप ऐसा reusable code लिख सकते हैं जो कई types के साथ काम करे।", explanation: "हर type के लिए अलग function लिखने की बजाय, generic function खुद adapt हो जाता है।", example: "function identity<T>(value: T): T {\n  return value;\n}" },
        },
        quiz: { question: "Generics let functions work with?", options: ["Only strings", "Multiple types", "Only numbers", "Only arrays"], answer: 1 },
      },
    ],
  },

  // ====================================================
  // 20. System Design
  // ====================================================
  {
    id: "system-design",
    title: "System Design Basics",
    category: "Architecture",
    level: "Advanced",
    icon: "🏗️",
    description: "Learn how to design scalable software systems.",
    video: {
      en: ytSearchLink("System design full course in English"),
      ta: ytSearchLink("System design tutorial in Tamil"),
      hi: ytSearchLink("System design tutorial in Hindi"),
    },
    lessons: [
      {
        id: 1,
        title: "Scalability Basics",
        duration: "20 min",
        content: {
          en: { title: "Scalability Basics", description: "Scalability means a system can handle growing traffic and data.", explanation: "Vertical scaling adds more power to one server; horizontal scaling adds more servers.", example: "// Horizontal: add more servers behind a load balancer" },
          ta: { title: "Scalability Basics", description: "Scalability னா system growing traffic, data-வை handle பண்ண முடியும்.", explanation: "Vertical scaling ஒரே server-க்கு power கூட்டும்; horizontal scaling servers கூட்டும்.", example: "// Horizontal: add more servers behind a load balancer" },
          hi: { title: "Scalability Basics", description: "Scalability का मतलब है system बढ़ते हुए traffic, data को handle कर सके।", explanation: "Vertical scaling एक server में power बढ़ाता है; horizontal scaling servers बढ़ाता है।", example: "// Horizontal: add more servers behind a load balancer" },
        },
        quiz: { question: "Horizontal scaling means?", options: ["Adding more servers", "Upgrading one server", "Deleting servers", "Adding more CSS"], answer: 0 },
      },
      {
        id: 2,
        title: "Load Balancers & Caching",
        duration: "20 min",
        content: {
          en: { title: "Load Balancers & Caching", description: "Load balancers distribute traffic; caches store frequent results for speed.", explanation: "This reduces load on the main database and speeds up repeated requests.", example: "// Cache: store recent query results in memory (e.g. Redis)" },
          ta: { title: "Load Balancers & Caching", description: "Load balancers traffic distribute பண்ணும்; caches frequent results-ஐ speed-க்காக store பண்ணும்.", explanation: "இது main database-க்கு load குறைக்கும், repeated requests speed ஆகும்.", example: "// Cache: store recent query results in memory (e.g. Redis)" },
          hi: { title: "Load Balancers & Caching", description: "Load balancers traffic distribute करते हैं; caches frequent results को speed के लिए store करते हैं।", explanation: "इससे main database पर load कम होता है, repeated requests तेज़ हो जाते हैं।", example: "// Cache: store recent query results in memory (e.g. Redis)" },
        },
        quiz: { question: "Caching mainly helps with?", options: ["Styling", "Speed", "Security only", "File uploads"], answer: 1 },
      },
      {
        id: 3,
        title: "Databases at Scale",
        duration: "25 min",
        content: {
          en: { title: "Databases at Scale", description: "Large systems often split data across multiple database servers.", explanation: "Sharding spreads data by key; replication copies data for reliability and read speed.", example: "// Sharding: split users A-M on server 1, N-Z on server 2" },
          ta: { title: "Databases at Scale", description: "பெரிய systems data-வை பல database servers-ல் split பண்ணும்.", explanation: "Sharding key படி data spread பண்ணும்; replication reliability, read speed-க்கு data copy பண்ணும்.", example: "// Sharding: split users A-M on server 1, N-Z on server 2" },
          hi: { title: "Databases at Scale", description: "बड़े systems data को कई database servers में split करते हैं।", explanation: "Sharding key के आधार पर data spread करता है; replication reliability, read speed के लिए data copy करता है।", example: "// Sharding: split users A-M on server 1, N-Z on server 2" },
        },
        quiz: { question: "Sharding is used to?", options: ["Style pages", "Split data across servers", "Compress images", "Write CSS"], answer: 1 },
      },
    ],
  },
];

export default courses;