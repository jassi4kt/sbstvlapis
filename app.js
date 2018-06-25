const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 3000;

const inProgressRouter = express.Router();
const inProgressRequests = [
  {
    title: 'Trip To Miami',
    type: 'Air',
    timetolive: '4 Hrs',
    description: 'This is the request for Air booking from Toronto to Miami',
  },
  {
    title: 'Trip To Canada',
    type: 'Air',
    timetolive: '5 Days',
    description: 'This is the request for Air booking from Houston to Calgary',
  },
  {
    title: 'Miami Hotel Stay',
    type: 'Hotel',
    timetolive: '4 Hrs',
    description: 'This is the request for Hotel booking in Miami',
  },

];
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(morgan('tiny'));

app.use(express.static(path.join(__dirname, '/public/')));

app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');


inProgressRouter.route('/')
  .get((req, res) => {
    res.render(
      'inprogress',
      {
        nav: [{ link: '/inprogress', title: 'In progress' },
          { link: '/proposals', title: 'Proposals Submitted' }],
        title: 'In Progress Requests',
        inProgressRequests,
      },
    );
  });

app.use('/inprogress', inProgressRouter);

app.get('/', (req, res) => {
  res.render(
    'index',
    {
      nav: [{ link: '/inprogress', title: 'In progress' },
        { link: '/proposals', title: 'Proposals Submitted' }],
      title: 'Customer Requests',
    },
  );
});

app.listen(port, () => {
  debug(`This app is listening at port ${chalk.green(port)}`);
});
