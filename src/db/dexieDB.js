// src/lib/dexieDB.js
import Dexie from "dexie";

// Create a new Dexie instance
const db = new Dexie("BusinessPlanDB");

// Define your database schema
db.version(1).stores({
  projects: "_id, project_name, clerk_id, createdAt", // _id is primary key
  // users: "id, name, email", // optional for later
  // settings: "key", // optional for app settings
  // notifications: "++id, read, createdAt" // optional table
});

// You can add hooks or methods if needed
// db.projects.hook('creating', (primKey, obj) => { console.log("Adding:", obj); });

export default db;
