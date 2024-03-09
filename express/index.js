import { reverse } from "dns";
import express from "express";

const app = express();

app.use(express.json());

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

// ======================USERS==============================

app.get("/getAllUsers", (req, res, next) => {
  res.send(users);
});
app.post("/addUser", (req, res, next) => {
  const { email } = req.body;
  const emailChecker = users.find((ele) => {
    return ele.email == email;
  });
  if (emailChecker) {
    res.send("email already exist");
  } else {
    users.push(req.body);
    res.send(users);
  }
});
app.get("/grtUsersSorted", (req, res, next) => {
  const usersSorted = users.sort((x, y) => {
    if (x.name < y.name) {
      return -1;
    } else if (x.name > y.name) {
      return 1;
    } else {
      return 0;
    }
  });
  res.send(usersSorted);
});
app.get("/getUserById", (req, res, next) => {
  const { id } = req.body;
  const user = users.find((ele) => {
    return ele.id == id;
  });
  if (user) {
    res.send(user);
  } else {
    res.send("user not found");
  }
});
app.delete("/deleteUser", (req, res, next) => {
  const { id } = req.body;
  const user = users.find((ele) => {
    return ele.id == id;
  });
  if (user) {
    const usersDeleted = users.filter((ele) => {
      return ele.id != id;
    });
    res.send(usersDeleted);
  } else {
    res.send("user not found");
  }
});
app.put("/updateUser", (req, res, next) => {
  const { id } = req.body;
  const user = users.find((ele) => {
    return ele.id == id;
  });
  if (user) {
    const usersUpdated = users.map((ele) => {
      if (ele.id == id) {
        return { ...ele, ...req.body };
      } else {
        return ele;
      }
    });
    res.send(usersUpdated);
  } else {
    res.send("user not found");
  }
});

// ======================POSTS==============================

app.get("/getAllPosts", (req, res, next) => {
  res.send(posts);
});
app.post("/addPost", (req, res, next) => {
  posts.push(req.body);
  res.send(posts);
});
app.get("/getPostsReversed", (req, res, next) => {
  const reversedPosts = [...posts].reverse();
  res.send(reversedPosts);
});
app.get("/getPostById", (req, res, next) => {
  const { id } = req.body;
  const post = posts.find((ele) => {
    return ele.id == id;
  });
  if (post) {
    res.send(post);
  } else {
    res.send("Post Not Found");
  }
});
app.delete("/deletePost", (req, res, next) => {
  const { id } = req.body;
  const post = posts.find((ele) => {
    return ele.id == id;
  });
  const postsDeleted = posts.filter((ele) => {
    return ele.id != id;
  });
  if (post) {
    res.send(postsDeleted);
  } else {
    res.send("Post Not Found");
  }
});
app.put("/updatePost", (req, res, next) => {
  const { id } = req.body;
  const post = posts.find((ele) => {
    return ele.id == id;
  });
  if (post) {
    const postsUpdated = posts.map((ele) => {
      if (ele.id == id) {
        return { ...ele, ...req.body };
      } else {
        return ele;
      }
    });
    res.send(postsUpdated);
  } else {
    res.send("Post Not Found");
  }
});

app.listen(4007, () => {
  console.log("Server started on port 4007");
});
