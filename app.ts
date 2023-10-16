import express from 'express'

const expressApp = express();

expressApp.use((req, res, next) => {
	res.send("<h1>Hello, World!</h1>");
});

expressApp.listen(3000);
