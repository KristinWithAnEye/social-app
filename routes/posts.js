const express = require("express"); // to build out the API
const router = express.Router(); // to handle routing
const upload = require("../middleware/multer"); // to upload images
const postsController = require("../controllers/posts"); // location of postsController
const { ensureAuth, ensureGuest } = require("../middleware/auth"); // middleware to check whether user is logged in 

// post routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost);

router.post("/createPost", upload.single("file"), postsController.createPost);

router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
