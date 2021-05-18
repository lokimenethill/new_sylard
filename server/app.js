import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import indexRouter from '@routes/index';
import usersRouter from '@routes/users';

import configTemplateEngine from '@s-config/template-engine.js';

// webpack
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotmiddleware from 'webpack-hot-middleware';
import webpackConfig from '../webpack.dev.config';

const app = express();
// webpack middleware
const env = process.env.NODE_ENV || 'development';
if (env === 'development') {
  console.log('> Executing on development mode with webpack hot reloading');
  webpackConfig.entry[
    ('webpack-hot-middleware/client?=reload=true&timeout=1000',
    webpackConfig.entry)
  ];
  webpackConfig.plugins.push(new webpack.HotModuleRemplacementPlugin());
  const compiler = webpack(webpackConfig);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
    }),
  );
  app.use(webpackHotmiddleware(compiler));
} else {
  console.log('>Executing on production mode');
}
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs');
//view engine setup
configTemplateEngine(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
