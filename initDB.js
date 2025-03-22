import connectMoongoose from "./lib/connectMongoose.js";
import User from "./models/User.js";
import Product from "./models/Product.js";
import Tag from "./models/Tag.js";
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
await initTags();
await initProducts();

connection.close();

// create initial products
async function initProducts() {
  // delete all products
  const deleteResult = await Product.deleteMany();
  console.log(`Deleted ${deleteResult.deletedCount} products.`);

  const [admin, user1, joha] = await Promise.all([
    User.findOne({ email: "admin@example.com" }),
    User.findOne({ email: "user1@example.com" }),
    User.findOne({ email: "joha@kc.io" }),
  ]);

  // Create the inital data for Tag table

  const [lifestyleTag, workTag, motorTag, mobileTag] = await Promise.all([
    Tag.findOne({ tagname: "lifestyle" }),
    Tag.findOne({ tagname: "work" }),
    Tag.findOne({ tagname: "motor" }),
    Tag.findOne({ tagname: "mobile" }),
  ]);

  const image = "/multiple-products.jpg";

  // create initial products
  const insertResult = await Product.insertMany([
    {
      product: "Camiseta",
      price: 20,
      image,
      tags: [lifestyleTag._id],
      owner: joha._id,
    },
    {
      product: "Pantalon",
      price: 30,
      image,
      tags: [lifestyleTag._id],
      owner: joha._id,
    },
    {
      product: "Zapatillas",
      price: 100,
      image,
      tags: [workTag._id],
      owner: admin._id,
    },
    {
      product: "Smarthphone",
      price: 430,
      image,
      tags: [mobileTag._id],
      owner: user1._id,
    },
    {
      product: "Casco",
      price: 90,
      image,
      tags: [motorTag._id],
      owner: joha._id,
    },
  ]);
  console.log(`Created ${insertResult.length} products.`);
}

//initTags

async function initTags() {
  const deleteResult = await Tag.deleteMany();
  console.log(`Deleted ${deleteResult.deletedCount} tags.`);

  const tagsToInsert = ["lifestyle", "work", "motor", "mobile"];
  const insertResult = await Tag.insertMany(
    tagsToInsert.map((tagname) => ({ tagname }))
  );
  console.log(`Created ${insertResult.length} tags.`);
}

//initUsers

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
