const express = require('express');
const app = express();
const campaignsList = require('./v1/routes/campaigns-list');
const activeCampaigns= require('./v1/routes/active-campaigns');
const closedCampaigns = require('./v1/routes/closed-campaigns');


app.use('/api/v1/listcampaigns',campaignsList);
app.use('/api/v1/activecampaigns',activeCampaigns);
app.use('/api/v1/closedcampaigns',closedCampaigns);

app.listen(3000,()=>{
    console.log('Listening on port 3000');
})