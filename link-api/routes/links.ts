import express from 'express';
import { LinkMutation } from '../types';
import mongoose from 'mongoose';
import Link from '../models/Link';

const randomStringId = () => {
  let result = '';
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const length = Math.floor(Math.random() * 2) + 6;

  for (let i = 0; i < length; i++) {
    result += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }

  return result;
};

const linksRouter = express.Router();

linksRouter.post('/links', async (req, res, next) => {
  try {
    let shortUrl: string | undefined;
    let isUnique = false;

    while (!isUnique) {
      const newShortUrl = randomStringId();
      const existingLink = await Link.findOne({ shortUrl: newShortUrl });

      if (!existingLink) {
        shortUrl = newShortUrl;
        isUnique = true;
      }
    }

    if (!shortUrl) {
      return res
        .status(500)
        .send({ error: 'Failed to generate a unique short URL' });
    }

    const LinkMutation: LinkMutation = {
      shortUrl,
      originalUrl: req.body.originalUrl,
    };

    const link = new Link(LinkMutation);
    await link.save();

    return res.send(link);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

linksRouter.get('/:shortUrl', async (req, res, next) => {
  try {
    const link = await Link.findOne({ shortUrl: req.params.shortUrl });

    if (!link) {
      return res.status(404).send({ error: 'Link not found' });
    }

    return res.status(301).redirect(link.originalUrl);
  } catch (error) {
    next(error);
  }
});

export default linksRouter;
