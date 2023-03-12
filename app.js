require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8001;
const { connectDb } = require("./db");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const session = require("express-session");

connectDb();

const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");

app.use(express.json());
app.use(
  session({
    secret: "amazingcoding",
    resave: false,
    saveUninitialized: false,
  })
);

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETKEY;
const User = require("./models/user");
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new JwtStrategy(opts, async function (payload, done) {
    const user = await User.findByPk(payload.id);
    // console.log({user})
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  })
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findByPk(id).then(function (user) {
    if (user) {
      done(null, user.get());
    } else {
      done(user.errors, null);
    }
  });
});

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

app.listen(PORT, () => {
  console.log(`Server is on port ${PORT}`);
});
