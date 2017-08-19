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
const bodyParser = require('body-parser');

if (process.env.NODE_ENV === 'production') {
  enableProdMode();
} else {
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}

const app = express();

app.set('port', 8061);

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModule
}));

app.set('view engine', 'html');
app.set('views', process.env.NODE_ENV === 'production' ? 'Owain.nl/dist' : 'dist');

app.get('/', (req: Request, res: Response) => {
  res.render('index', {req});
});

app.use(compression());
app.use('/', expressStaticGzip(process.env.NODE_ENV === 'production' ? 'Owain.nl/dist' : 'dist', {
    indexFromEmptyFile: false,
    enableBrotli: true
  }
));
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));

ROUTES.forEach((route: string) => {
  app.get(route, (req: Request, res: Response) => {
    res.render('index', {
      req: req,
      res: res
    });
  });
});

const server = http.createServer(app);

server.listen(app.get('port'), () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`Listening at: ${host}:${port}`);
});
