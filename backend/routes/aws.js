const express = require('express');
const router = express.Router();

// const SellingPartner = require('amazon-sp-api');

// const getSpClient = () => {
//   return new SellingPartner({
//     region: 'eu',
//     refresh_token: '',
//     options: {
//       auto_request_tokens: true,
//     },
//     credentials: {
//       SELLING_PARTNER_APP_CLIENT_ID: process.env.SELLING_PARTNER_APP_CLIENT_ID,
//       SELLING_PARTNER_APP_CLIENT_SECRET: process.env.SELLING_PARTNER_APP_CLIENT_SECRET,
//     },
//   });
// };

router.get('/ping', (req, res) => {

  res.json({
    status: 200,
    message: 'Welcome to the DnD Api',
    process: process.env,
  });
});

module.exports = router;
