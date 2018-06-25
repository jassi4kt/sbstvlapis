const express = require('express');


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


module.exports = inProgressRouter;
