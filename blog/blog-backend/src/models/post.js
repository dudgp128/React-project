import mongoose from 'mongoose';

const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String,
  body: String,
  tages: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
});
