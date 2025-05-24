import express from "express";
import ErrorHandling from "./handler/error-handler.js";
import Router from "./routes/index.js"; // gunakan .js di akhir untuk ES module

const app = express();
app.use(express.json());

// app.use("/", (req, res) => {
//   res.json("Hello aaaa");
// });

app.use(Router);

app.use(ErrorHandling);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
