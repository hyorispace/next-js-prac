const jsonServer = require("json-server");
const path = require("path");

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "db.json"));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.patch("/users", (req, res) => {
  const { idList } = req.body;

  if (!Array.isArray(idList) || idList.length === 0) {
    return res
      .status(400)
      .json({ error: "idList는 길이가 1 이상인 배열이어야 합니다." });
  }

  const db = router.db;

  const userList = idList.map((id) => {
    const oldUser = db.get("users").find({ id }).value();

    if (oldUser) {
      db.get("users").find({ id }).assign({ isDeleted: true }).write();
      const newUser = db.get("users").find({ id }).value();

      return newUser;
    }

    return null;
  });

  res.status(200).json({ success: true, idList, userList });
});

server.use(router);

server.listen(9000, () => {
  console.log("JSON Server is running on port 9000");
});
