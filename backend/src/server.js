require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 3200;

app.listen(PORT, () => {
  console.log(`HireHub server running on port ${PORT}`);
});