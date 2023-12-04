import { app } from "./app";
import { config } from "./config";

app.set("trust proxy", true);
app.listen(config.server.port, () => {
  console.log(`Server listening on port ${config.server.port}`);
});
