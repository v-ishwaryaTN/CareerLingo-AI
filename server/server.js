// server.js

const path = require("path");
const dotenv = require("dotenv");

// Load backend .env first
dotenv.config({
  path: path.resolve(__dirname, ".env"),
});

// Also allow project-root .env
dotenv.config({
  path: path.resolve(__dirname, "..", ".env"),
});

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const translateRoutes = require("./routes/translate");
const chatRoutes = require("./routes/chat");
const courseRoutes = require("./routes/courses");
const authRoutes = require("./routes/auth");
const interviewRoutes = require("./routes/interview");
const resumeRoutes = require("./routes/resume");
const jobRoutes = require("./routes/jobs");
const emailRoutes = require("./routes/email");

const app = express();


// ======================================================
// CONFIG
// ======================================================

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  process.env.CLIENT_URL,

  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:5173",

  "http://127.0.0.1:3000",
  "http://127.0.0.1:3001",
  "http://127.0.0.1:5173",

  "http://localhost:5000",
].filter(Boolean);

console.log("=================================");
console.log("CareerLingo Backend");
console.log("=================================");
console.log("PORT:", PORT);
console.log("Allowed origins:", allowedOrigins);


// ======================================================
// CORS
// ======================================================

app.use(
  cors({
    origin: (origin, callback) => {
      // Browserless / Postman / server-to-server
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.warn("Blocked CORS origin:", origin);

      // Don't crash the server.
      return callback(null, false);
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
    ],
  })
);


// ======================================================
// BODY PARSER
// ======================================================

// Audio base64 can be large.
app.use(
  express.json({
    limit: "25mb",
  })
);

app.use(
  express.urlencoded({
    limit: "25mb",
    extended: true,
  })
);


// ======================================================
// REQUEST LOGGER
// ======================================================

app.use((req, res, next) => {
  const started = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - started;

    // Don't spam logs for OPTIONS
    if (req.method !== "OPTIONS") {
      console.log(
        `[API] ${req.method} ${req.originalUrl} -> ${res.statusCode} (${duration}ms)`
      );
    }
  });

  next();
});


// ======================================================
// ROOT HEALTH
// ======================================================

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "CareerLingo Backend is running",
    api: "/api",
    translate: "/api/translate",
  });
});


// ======================================================
// TRANSLATE HEALTH
// ======================================================

app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    service: "CareerLingo Backend",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});


// ======================================================
// API ROUTES
// ======================================================

app.use("/api/translate", translateRoutes);

app.use("/api/chat", chatRoutes);

app.use("/api/courses", courseRoutes);

app.use("/api/auth", authRoutes);

app.use("/api/interview", interviewRoutes);

app.use("/api/resume", resumeRoutes);

app.use("/api/jobs", jobRoutes);

app.use("/api/email", emailRoutes);


// ======================================================
// 404
// ======================================================

app.use((req, res) => {
  console.warn(
    `[404] ${req.method} ${req.originalUrl}`
  );

  res.status(404).json({
    success: false,
    error: "route_not_found",
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});


// ======================================================
// ERROR HANDLER
// ======================================================

app.use((err, _req, res, _next) => {
  console.error("=================================");
  console.error("SERVER ERROR");
  console.error("=================================");
  console.error(err);

  if (res.headersSent) {
    return;
  }

  res.status(err.status || 500).json({
    success: false,
    error: "server_error",
    message:
      err.message || "Internal Server Error",
  });
});


// ======================================================
// START SERVER
// ======================================================

const startServer = async () => {
  try {
    console.log("Connecting to database...");

    await connectDB();

    console.log("Database connected successfully.");

    app.listen(PORT, () => {
      console.log("---------------------------------");
      console.log("CareerLingo server running");
      console.log(`http://localhost:${PORT}`);
      console.log(`Translate API: http://localhost:${PORT}/api/translate`);
      console.log(
        `Audio API: http://localhost:${PORT}/api/translate/audio`
      );
      console.log("---------------------------------");
    });
  } catch (error) {
    console.error("=================================");
    console.error("SERVER STARTUP ERROR");
    console.error("=================================");
    console.error(error);

    process.exit(1);
  }
};

startServer();