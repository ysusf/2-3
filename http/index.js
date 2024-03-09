import http from "http";

const users = [
  {
    id: 1,
    name: "soho",
    email: "soho@gmail.com",
  },
  {
    id: 2,
    name: "mafdy",
    email: "mafdy@gmail.com",
  },
  {
    id: 3,
    name: "yoyo",
    email: "yoyo@gmail.com",
  },
];

const posts = [
  {
    id: 1,
    body: "post 1 body",
  },
  {
    id: 2,
    body: "post 2 body",
  },
  {
    id: 3,
    body: "post 3 body",
  },
];

http
  .createServer((req, res) => {
    const { url, method } = req;

    // ======================USERS==============================

    if (url === "/getAllUsers" && method === "GET") {
      res.write(JSON.stringify(users));
      res.end();
    } else if (url === "/addUser" && method === "POST") {
      let data;
      req.on("data", (chunck) => {
        data = JSON.parse(chunck);
      });
      req.on("end", () => {
        const { email } = data;
        const emailCheck = users.find((ele) => {
          return ele.email == email;
        });
        if (emailCheck) {
          res.write("email already exists");
          res.end();
        } else {
          users.push(data);
          res.write(JSON.stringify(users));
          res.end();
        }
      });
    } else if (url === "/getUsersSorted" && method === "GET") {
      const sortedUsers = users.sort((x, y) => {
        if (x.name < y.name) {
          return -1;
        } else if (x.name < y.name) {
          return 1;
        } else {
          return 0;
        }
      });
      res.write(JSON.stringify(users));
      res.end();
    } else if (url === "/getUserById" && method === "GET") {
      let data;
      req.on("data", (chunck) => {
        data = JSON.parse(chunck);
      });
      req.on("end", () => {
        const { id } = data;
        const user = users.find((ele) => {
          return ele.id == id;
        });
        if (user) {
          res.write(JSON.stringify(user));
          res.end();
        } else {
          res.write("user not found");
          res.end();
        }
      });
    } else if (url === "/deleteUser" && method === "DELETE") {
      let data;
      req.on("data", (chunck) => {
        data = JSON.parse(chunck);
      });
      req.on("end", () => {
        const { id } = data;
        const user = users.find((ele) => {
          return ele.id == id;
        });
        if (user) {
          const usersDeleted = users.filter((ele) => {
            return ele.id != id;
          });
          res.write(JSON.stringify(usersDeleted));
          res.end();
        } else {
          res.write("user not found");
          res.end();
        }
      });
    } else if (url === "/updateUser" && method === "PUT") {
      let data;
      req.on("data", (chunck) => {
        data = JSON.parse(chunck);
      });
      req.on("end", () => {
        const { id } = data;
        const user = users.find((ele) => {
          return ele.id == id;
        });
        if (user) {
          const usersUpdated = users.map((ele) => {
            if (ele.id == id) {
              return { ...ele, ...data };
            } else {
              return ele;
            }
          });
          res.write(JSON.stringify(usersUpdated));
          res.end();
        } else {
          res.write("User Not Found");
          res.end();
        }
      });
    }

    // ======================POSTS==============================
    else if (url === "/getAllPosts" && method === "GET") {
      res.write(JSON.stringify(posts));
      res.end();
    } else if (url === "/addPost" && method === "POST") {
      let data;
      req.on("data", (chunck) => {
        data = JSON.parse(chunck);
      });
      req.on("end", () => {
        posts.push(data);
        res.write(JSON.stringify(posts));
        res.end();
      });
    } else if (url === "/getPostsReversed" && method === "GET") {
      const reversedPosts = [...posts].reverse();
      res.write(JSON.stringify(posts));
      res.write(JSON.stringify(reversedPosts));
      res.end();
    } else if (url === "/getPostById" && method === "GET") {
      let data;
      req.on("data", (chunck) => {
        data = JSON.parse(chunck);
      });
      req.on("end", () => {
        const { id } = data;
        const post = posts.find((ele) => {
          return ele.id == id;
        });
        if (post) {
          res.write(JSON.stringify(post));
          res.end();
        } else {
          res.write("post not found");
          res.end();
        }
      });
    } else if (url === "/deletePost" && method === "DELETE") {
      let data;
      req.on("data", (chunck) => {
        data = JSON.parse(chunck);
      });
      req.on("end", () => {
        const { id } = data;
        const post = posts.find((ele) => {
          return ele.id == id;
        });
        if (post) {
          const postsDeleted = posts.filter((ele) => {
            return ele.id != id;
          });
          res.write(JSON.stringify(postsDeleted));
          res.end();
        } else {
          res.write("post not found");
          res.end();
        }
      });
    } else if (url === "/updatePost" && method === "PUT") {
      let data;
      req.on("data", (chunck) => {
        data = JSON.parse(chunck);
      });
      req.on("end", () => {
        const { id } = data;
        const post = posts.find((ele) => {
          return ele.id == id;
        });
        if (post) {
          const postsUpdated = posts.map((ele) => {
            if (ele.id == id) {
              return { ...ele, ...data };
            } else {
              return ele;
            }
          });
          res.write(JSON.stringify(postsUpdated));
          res.end();
        } else {
          res.write("Post Not Found");
          res.end();
        }
      });
    } else {
      res.write("no");
      res.end();
    }
  })
  .listen(3007, () => {
    console.log("you are on port 3007");
  });
