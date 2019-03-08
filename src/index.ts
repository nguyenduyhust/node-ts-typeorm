import * as express from 'express';

import App from './application';

let app = new App();

app.initalize(express());
app.start();