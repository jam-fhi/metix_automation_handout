const express = require('express');
const dashboard = new express();
const port = 3001;

dashboard.use(express.static('cucumber/dashboard/public'));

dashboard.listen(port, () => {
	console.log('We are live on ' + port);
});