import PostMessage from '../models/postMessage.js';
import mongoose from 'mongoose';

export const getPosts = async (req, res) => {
  try {
    const postList = await PostMessage.find();

    res.status(200).json(postList)
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() })
  try {
    newPost.save();

    res.status(201).json(newPost)
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that ID.');

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ... post, _id }, { new: true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID.');

  await PostMessage.findByIdAndRemove(id);

  res.json({ message: 'Post Deleted' });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) return res.json({ message: 'Unauthorized action' })

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that ID.');

  const post = await PostMessage.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId));

  if (index === -1) {
    // like
    post.likes.push(req.userId);
  } else {
    //dislike
    post.likes.filter((id) => id !== String(req.userId))
  }
  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

  res.json(updatedPost);
}