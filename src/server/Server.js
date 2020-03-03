import path from 'path';
import http from 'http';
import confit from 'confit';
import express from 'express';
import meddleware from 'meddleware';
import handlers from 'shortstop-handlers';
import shortstopRegex from 'shortstop-regex';
import 'fetch-everywhere';
import readConfiguration from '../lib/utils/readConfiguration.js';
import betterRequire from '../lib/utils/betterRequire'

export default class Server {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
  }

  configurations = []

  async addConfigurationOverrides() {
    let lastConfig;
    for (const config of this.configurations.reverse()) {
      if (lastConfig) {
        config.addOverride(lastConfig._store);
      }
      lastConfig = await readConfiguration(config);
    }
    return lastConfig;
  }

  addDefaultConfiguration(rootDirectory) {
    const configFactory = confit({
      basedir: path.join(rootDirectory, 'config'),
      protocols: {
        root: handlers.path(rootDirectory),
        path: handlers.path(['development', 'test'].includes(process.env.NODE_ENV)
          ? path.join(rootDirectory, 'src')
          : path.join(rootDirectory, 'build')),
        require: betterRequire(rootDirectory),
        regex: shortstopRegex(),
        env: handlers.env(),
      }
    });
    this.configurations.push(configFactory);
  }

  async start() {
    this.addDefaultConfiguration(process.cwd());

    const config = await this.addConfigurationOverrides();

    this.config = config;

    // disable X-Powered-By header
    this.app.disable('x-powered-by')

    if (config.get('trustProxy')) {
      this.app.enable('trust proxy');
    }

    this.app.use((req, res, next) => {
      req.config = config;
      next();
    });

    // NOTE: configure using webpack-dev-middleware and webpack-hot-middleware earlier than other middlewares
    // for hot- reloading to work. Changing order may not guarantee live browser refresh.
    if (process.env.NODE_ENV === 'development') {
      const webpack = require('webpack');
      const compiler = webpack(require('../../webpack.config.js'));
      this.app.use(require('webpack-dev-middleware')(compiler, {
        stats: { colors: true },
      }));
      this.app.use(require('webpack-hot-middleware')(compiler));
    }

    const middleware = config.get('meddleware');
    if (middleware) {
      this.app.use(meddleware(middleware));
    }

    return new Promise((resolve, reject) => {
      const port = ['staging', 'production'].includes(process.env.NODE_ENV) ? process.env.PORT : config.get('port');
      this.server.listen(port, () => {
        resolve(port);
      });
    });
  }

  stop(callback) {
    this.server.close(callback);
  }
}
