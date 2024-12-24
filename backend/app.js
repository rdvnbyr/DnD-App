/*eslint-env node*/
const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/datasource');
const { protect, protectGraphql } = require('./middleware/auth');
const swaggerDocument = require('./config/swagger.json');
const morgan = require('morgan');
require('colors');
const pool = require('./config/datasource.mysql');
const { graphqlHTTP } = require('express-graphql');
const {graphql} = require('graphql');

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'app.log'), {
  flags: 'a',
});

dotenv.config();

const app = express();

connectDB();

// Init Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(morgan('combined', { stream: accessLogStream }));

// set the view engine to ejs
app.set('view engine', 'ejs');

// Use routes
app.use('/api/workspaces', protect, require('./routes/workspace'));
app.use('/api/boards', protect, require('./routes/board'));
app.use('/api/users', require('./routes/user'));
app.use('/api/aws', require('./routes/aws'));

// graphql routes and middleware
app.use('/graphql', protectGraphql);
app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphql.schemas,
    rootValue: graphql.resolvers,
    graphiql: true,
    customFormatErrorFn(err) {
      if (!err.originalError) {
        return err;
      }
      const data = err.originalError.data;
      const message = err.message || 'An error occurred.';
      const code = err.originalError.statusCode || 500;
      return { message: message, status: code, data: data };
    },
  })
);

// create swagger docs
const swaggerUi = require('swagger-ui-express');
const Feedback = require('./models/feedback');
app.use(
  '/explorer',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'DnD API Explorer',
    customfavIcon: path.join(__dirname, 'assets', 'favicon-dnd.webp'),
  })
);
app.get('/open-api', (req, res) => {
  res.sendFile(path.join(__dirname, 'config', 'swagger.json'));
});

app.get('/ping', (req, res) => {
  const host = req.protocol + '://' + req.get('host') + '/api';
  res.json({
    status: 200,
    message: 'Welcome to the DnD Api',
    api: host,
    controllers: {
      workspaces: host + '/workspaces',
      boards: host + '/boards',
      users: host + '/users',
    },
  });
});

app.get('/', (req, res) => {
  res.render(path.join(__dirname, 'public', 'index'), { title: 'Welcome to DnD' });
});

app.get('/mysql', async (_req, res) => {
  try {
    const [result] = await pool.query('SELECT * FROM `country`');
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

app.get('/feedback', (_req, res) => {
  res.render(path.join(__dirname, 'public/feedback', 'index'), { title: 'Send Feedback'});
});

app.post('/feed/create', async (req, res) => {
  try {
    const { title, email, comment } = req.body;
    if (!title || !email || !comment) {
      return res.redirect('/feedback');
    }
    const feedback = new Feedback({
      title,
      email,
      comment,
    });
    await feedback.save();
    req.app.emit('feedback-success', feedback);
  } catch (error) {
    req.app.emit('feedback-error', error);
  }
  res.redirect('/feedback/received');
});

app.get('/feedback/received', (req, res) => {
  req.app.on('feedback-error', (error) => {
    res.render(path.join(__dirname, 'public/feedback', 'error'), { error: error.message });
  });

  req.app.on('feedback-success', (feedback) => {
    res.render(path.join(__dirname, 'public/feedback', 'success'), { feedback });
  });
});

// define glabal error handler
app.use((err, _req, res) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: err,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Server running on ` + `http://localhost:${PORT}`.magenta);
  }
});
