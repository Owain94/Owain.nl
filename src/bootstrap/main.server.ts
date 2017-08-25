import '../polyfills/polyfills.server';

import { enableProdMode } from '@angular/core';
import { AppServerModule } from '../app/modules/app.server.module';
import { ngExpressEngine } from '../app/modules/ng-express-engine/express-engine';

import * as express from 'express';
import { Request, Response } from 'express';
import { ROUTES } from '../helpers/routes';

const http = require('http');
const expressStaticGzip = require('express-static-gzip');
const compression = require('compression');

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
} else {
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}

const app = express();

app.set('port', 8061);

app.set('view engine', 'html');
app.set('views', process.env.NODE_ENV === 'production' ? 'Owain.nl/dist' : 'dist');
app.use('/', expressStaticGzip(process.env.NODE_ENV === 'production' ? 'Owain.nl/dist' : 'dist', {
  enableBrotli: true
}));
app.use(compression());

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule
}));

ROUTES.forEach((route: string) => {
  app.get(route, (req: Request, res: Response) => {
    res.render('index', {
      req: req,
      res: res
    });
  });
});

app.get('*', (req: Request, res: Response) => {
  res.redirect('/');
});

const server = http.createServer(app);

server.listen(app.get('port'), () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Listening at: ${host}:${port}`);
});
