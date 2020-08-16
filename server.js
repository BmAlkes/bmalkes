const express = require("express");
const nunjucks = require("nunjucks");

const server = express();
const videos = require("./data");

server.use(express.static("public"));
server.set("view engine", "njk");
nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true,
});

server.get("/", function (req, res) {
  const data = {
    avatar_url: "",
    name: "Bruno Malkes",
    role:
      "I'm a enthusiast of the best web & mobile development technologies.<br>Currently a student focused on OmniStack (Javascript, Node.js, ReactJS and React Native, Vue.Js).",
    links: [
      {
        name: "Github",
        url: "https://www.github.com/BmAlkes",
      },
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/bruno-malkes-a05a72150/",
      },
      {
        name: "Facebook",
        url: "https://www.facebook.com/bmalkes/",
      },
      {
        name: "WhatsApp",
        url: "https://wa.me/9720549547355",
      },
    ],
  };

  return res.render("about", { data });
});
server.get("/portifolio", function (req, res) {
  return res.render("portifolio", { items: videos });
});

server.get("/video", function (req, res) {
  const id = req.query.id
  const video = videos.find(function (video) {
    return video.id === id
  })
  if (!video) {
    return res.send("video not found");
  }

  return res.render("video", { item: video });
});


const port = process.env.PORT || 5000;

server.listen(port, function () {
  console.log("server is running");
});
