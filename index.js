const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('./utils/config');
const urlModel = require('./db/url-model');
const { hashGenerator } = require('./db/hash-generator');
const { invalidUrl, invalidHash } = require('./db/query-validator');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('./public'));

app.get('/url', async (_, res, next) => {
  try {
    const result = await urlModel.list();
    res.send(result);
  } catch (error) {
    next(error);
  }
});
app.post('/url', async (req, res, next) => {
  try {
    const { url } = req.body;
    if (!url || invalidUrl(url)) {
      return next({ message: 'Ohh you litle nasty gnome' });
    }
    const hash = hashGenerator();
    await urlModel.add({ url, hash });
    res.send([{ hash, url }]);
  } catch (error) {
    next(error);
  }
});
app.get('/:hash', async (req, res, next) => {
  try {
    const { hash } = req.params;
    if (!hash || invalidHash(hash)) {
      return next({ message: 'Wrong hash format!' });
    }
    const { url } = await urlModel.read(hash);
    if (url) {
      res.redirect(url);
    } else {
      res.send({ message: 'Hash not found :/' });
    }
  } catch (error) {
    next(error);
  }
});
app.get('/url/:providedHash', async (req, res, next) => {
  try {
    const { providedHash } = req.params;
    if (!providedHash || invalidHash(providedHash)) {
      return next({ message: 'Wrong hash format!' });
    }
    const { url, hash } = await urlModel.read(providedHash);
    if (!url || !hash) {
      return res.send({ message: 'Hash not found :/' });
    }
    res.send({ url, hash });
  } catch (error) {
    next(error);
  }
});

app.use((err, req, res, next) => {
  res.json({
    message:
      err.message || 'Something didnot work as expected, please try again.',
  });
});
app.listen(config.port, () =>
  console.log('server is up and listening on port: ' + config.port)
);
