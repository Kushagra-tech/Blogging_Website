const express = require("express");
const router = express.Router();
const authorization = require("../middleware/authorization");
const {
  getAllPosts,
  createPost,
  handleLike,
  getMyPosts,
  deletePost,
  editPost,
} = require("../controllers/post.controller");

router.get("/post", getAllPosts);
router.post("/", authorization, createPost);
router.get("/myPost/:id", getMyPosts);
router.post("/:postId/handlelike", authorization, handleLike);
router.delete("/:postId/delete", authorization, deletePost);
router.put("/:postId/edit", authorization, editPost);

module.exports = router;
