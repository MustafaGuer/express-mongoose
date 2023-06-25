const path = require('path');
require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById('649791b49e5e726f9abe027a')
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.hsqg5qy.mongodb.net/node_shop?retryWrites=true&w=majority`)
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: 'MusG', email: "musg@test.com", cart: {
            items: []
          }
        });
        user.save().then(() => console.log('User created'));
      }
    });
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
