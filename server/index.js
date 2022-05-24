const express = require("express");

const app = express();

const history = require("connect-history-api-fallback");
//token解密的密钥
app.set("secret", "sdjkogh1s65fdg4d65dsdd5f465");

app.use(history());
app.use(require("cors")());
app.use(express.json());

require("./routes/userMenu")(app);
require("./plugins/db")(app);

//静态文件托管
app.use("/", express.static(__dirname + "/admin"));

app.listen(4000, () => {
  console.log("http://localhost:4000");
});
