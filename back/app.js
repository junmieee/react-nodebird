const express = require('express');
const userRouter = require('./routes/user')
const cors = require('cors')
const session = require('express-session');
const cookieParser = require('cookie-parser');
const db = require('./models')
const app = express();
const passport = require('passport');
const passportConfig = require('./passport');

const path = require('path');
const postRouter = require('./routes/post')
// const hashtagRouter = require('./routes/hashtag');


const postsRouter = require('./routes/posts');

const dotenv = require('dotenv')

dotenv.config();



db.sequelize.sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error);

passportConfig();



app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));


app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(process.env.COOKIE_SECRET));



app.get('/', (req, res) => {
    res.send('hello express');
});



app.use('/posts', postsRouter)
app.use('/post', postRouter)
app.use('/user', userRouter)
// app.use('/hashtag', hashtagRouter);



app.listen(3065, () => {
    console.log('서버 실행 중')
});