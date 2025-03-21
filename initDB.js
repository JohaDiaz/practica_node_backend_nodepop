import connectMoongoose from "./lib/connectMongoose.js";
import User from "./models/User.js";
import readline from "node:readline";

const connection = await connectMoongoose();
console.log("Connected to MongoDB:", connection.name);

const questionResponse = await ask(
  "Estás seguro que deseas borrar la base de datos?"
);
if (questionResponse.toLowerCase() !== "yes") {
  console.log("Operation aborted.");
  process.exit();
}

await initUsers();

connection.close();

async function initUsers() {
  //detele all users
  const deleteResult = await User.deleteMany();
  console.log(`Deleted ${deleteResult.deletedCount} users.`);

  // create initial users
  const insertResult = await User.insertMany([
    { email: "admin@example.com", password: await User.hashPassword("1234") },
    { email: "user1@example.com", password: await User.hashPassword("1234") },
    { email: "joha@kc.io", password: await User.hashPassword("1234") },
  ]);
  console.log(`Created ${insertResult.length} users.`);
}

function ask(questionText) {
  return new Promise((resolve, reject) => {
    const consoleInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    consoleInterface.question(questionText, (answer) => {
      consoleInterface.close();
      resolve(answer);
    });
  });
}
