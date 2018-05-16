import * as express from 'express';
import * as path from 'path';
import * as expressValidator from 'express-validator';
import * as session from 'express-session';
import * as bodyParser from 'body-parser';
import * as nodeConfig from 'config';
import * as passport from 'passport';
const flash = require('connect-flash');
const glob = require('glob');

const typeorm = require('./typeorm/typeorm');
const sessionConfig: session.SessionOptions = nodeConfig.get('session');

export default class App {
  private app: express.Express;

  constructor() {
  }

  public async initalize(app: express.Express) {
    this.app = app;

    // set port
    app.set('port', process.env.PORT || 3000);

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');

    // validator
    app.use(expressValidator());

    // bodyParser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));

    // public folder path
    app.use(
      express.static(path.join(__dirname, 'public'), {
        maxAge: 31557600000
      })
    );

    // Initialize connect-flash
    app.use(flash());

    // session
    app.use(session({
      secret: sessionConfig.secret,
      resave: sessionConfig.resave,
      saveUninitialized: sessionConfig.saveUninitialized,
      cookie: sessionConfig.cookie,
    }));

    // Connect to database
    await typeorm(app);

    // Setup middlewares
    // Passport
    let middlewares = glob.sync(__dirname + '/middlewares/*.+(js|jsx|ts|tsx)');
    middlewares.forEach(function (middleware: string) {
      console.log('Loading middleware : ' + middleware);
      try {
        require(middleware)(app);
      } catch (err) {
        console.log(err);
        process.exit(1);
      }
    });

    // Setup routes
    let routes = glob.sync(__dirname + '/routes/*.+(js|jsx|ts|tsx)');
    routes.forEach((route: string) => {
      console.log('Loading route : ' + route);
      require(route)(app);
    });

    // catch 404 and forward to error handler
    app.use((req: any, res: any, next: any) => {
      let err: any = new Error('Not Found Error');
      err.status = 404;
      next(err);
    });
  }

  public start() {
    let port = this.app.get('port');

    this.app.listen(port, () => {
      console.log('Express server listening on port ' + port);
    });
  }
}