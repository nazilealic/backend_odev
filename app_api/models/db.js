const mongoose = require("mongoose");

// Vercel'de dotenv gerekmez, ama local için sorun çıkarmaz
require("dotenv").config();

const dbURI = process.env.MONGODB_URI;

if (!dbURI) {
  console.error("MONGODB_URI TANIMLI DEGIL!");
} else {
  console.log("MongoDB URI alindi");
}

mongoose.connect(dbURI)
  .then(() => {
    console.log("MongoDB baglandi");
  })
  .catch(err => {
    console.error("MongoDB baglanti hatasi:", err.message);
  });

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB baglantisi kesildi");
});

process.on("SIGINT", function () {
  mongoose.connection.close();
  console.log("Uygulama kapandi, MongoDB kapandi");
  process.exit(0);
});

require("./venue");
