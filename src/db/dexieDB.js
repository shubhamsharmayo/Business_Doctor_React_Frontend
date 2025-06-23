// src/lib/dexieDB.js
import Dexie from "dexie";

// Create a new Dexie instance
const db = new Dexie("BusinessPlanDB");

// Define your database schema

db.version(1).stores({
  projects: "_id, project_name, clerk_id, createdAt", // full project list (optional)
  selected_project: "_id", // stores the full selected project object
});


// You can add hooks or methods if needed
// db.projects.hook('creating', (primKey, obj) => { console.log("Adding:", obj); });

export default db;
