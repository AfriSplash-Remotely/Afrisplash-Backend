const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const joi = require("joi");
const Comment = require('../model/comment');
const Post = require('../model/post')
const Content = require("../model/content");
const User = require("../model/user");
const mongoose = require("mongoose");
const _ = require("lodash");


/**
 * @author Name <Email>
 * @description Sample Code Snippet  
 * @route `/api/v1/blog/test`
 * @access Public
 * @type GET
 */
 exports.SampleCode = asyncHandler(async (req, res, next) => {
  const data = {
    message: 'hello from blog endpoint'
  }
  res.status(200).json({
    success: true,
    data: data
  })
});



/**
 * @author Cyril Ogoh
 * @description to create a new comment under a post  
 * @route `/comment/create/:postid`
 * @access Public
 * @type POST
 */
 exports.postNewComment = asyncHandler(async (req, res, next) => {
  const {postID, body, name, email, image} = req.body;
  const data = await Comment.create({
    _post: postID,
    body:body,
    name:name || "",
    email:email,
    profile_pic:image || "",
    replies:[],
    like:0
  })
  res.status(201).json({
    success: true,
    data: data
  })
});

/**
 * @author Jehoshaphat Egbe <jehoshaphategbe1@gmail.com>
 * @description to create a new reply under a comment  
 * @route `/comment/reply/:id`
 * @access Public
 * @type POST
 */
 exports.postNewReply = asyncHandler(async (req, res, next) => {
  const { comment, name } = req.body
  const data = await Comment.findByIdAndUpdate(req.body.id, {$push: {replies: {
    comment : comment,
    name : name
  }}})
  res.status(201).json({
    success: true,
    data: data
  })
});


/**
 * @author Jehoshaphat Egbe <jehoshaphategbe1@gmail.com>
 * @description to edit a comment  
 * @route `/comment/edit/:id`
 * @access Public
 * @type PUT
 */
 exports.editComment = asyncHandler(async (req, res, next) => {
  const { body } = req.body
  const data = await Comment.findByIdAndUpdate( req.body.id, {
    body: body
  })
  res.status(200).json({
    success: true,
    data: data
  })
});

/**
 * @author Jehoshaphat Egbe <jehoshaphategbe1@gmail.com>
 * @description to delete a comment  
 * @route `/comment/delete/:id`
 * @access Public
 * @type DELETE
 */
 exports.deleteComment = asyncHandler(async (req, res, next) => {
  const data = await Comment.findOneAndDelete( {_id: req.body.id}, {body:{_id: req.params.id}})
  res.status(200).json({
    success: true,
    data: data
  })
});

/**
 * @author Jehoshaphat Egbe <jehoshaphategbe1@gmail.com>
 * @description to delete a reply  
 * @route `/comment/reply/delete/:id`
 * @access Public
 * @type DELETE
 */
 exports.deleteReply = asyncHandler(async (req, res, next) => {
  const data = await Comment.findByIdAndUpdate( req.body.id, {$pull: {replies:{_id: req.params.id}}})
  res.status(200).json({
    success: true,
    data: data
  })
});

/**
 * @author Jehoshaphat Egbe <jehoshaphategbe1@gmail.com>
 * @description to get all comments  
 * @route `/comment/:postid`
 * @access Public
 * @type GET
 */
 exports.getAllComments = asyncHandler(async (req, res, next) => {
  const data = await Comment.find({}).select({
    email:0
  })
  res.status(200).json({
    success: true,
    data: data
  })
});


/**
 * @author Cyril Ogoh <cyrilogoh@gmail.com> 
 * @description Func to get all post content 
 * @route `/posts`
 * @access Public
 * @type GET
 */
 exports.allPosts = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

/**
 * @author Cyril Ogoh <cyrilogoh@gmail.com> 
 * @description Func to get one 
 * @route `/post/:id`
 * @access Public
 * @type GET
 */
 exports.onePost = asyncHandler(async (req, res, next) => {
    const post = await Post.findOne({url:req.params.url.toLowerCase()}).select({})
    try {
      if (_.isEmpty(post)) {
        return next(new ErrorResponse("404 Content Does Not Exist Or Has Been Deleted", 404));
      }
      const content = await Content.findOne({_post:post._id}).select({
        message:1,
        _id:0
      })
      const author = await User.findOne({_id:post._author}).select({
        first_name:1,
        last_name:1,
        email:1,
        bio:1,
        thumbnail:1,
        profile_image:1,
        role:1
      })
      let data = {
        post,
        author,
        body:content ? content : {
          message:"Unable to load Content from Server"
        },
      }

      await Post.findOneAndUpdate({url:req.params.url.toLowerCase()}, {$inc:{"views":1}}, {
        new: false,
        runValidators: true,
      });

      res.status(200).json({
        success: true,
         data
      })
    } catch (error) {
      console.log(error)
      return next(new ErrorResponse("Server Error", 500));
    }

});

/**
 * @author Cyril Ogoh <cyrilogoh@gmail.com> 
 * @description Get Post by an Author
 * @route `/post/manage`
 * @access Private
 * @type GET
 */
 exports.getMyPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find({_author:req.user._id});
  res.status(200).json({
    success: true,
    data: posts
  })
});

/**
 * @author Cyril Ogoh <cyrilogoh@gmail.com> 
 * @description Create a New Post or article
 * @route `/post/create`
 * @access Private
 * @type POST
 */
 exports.createNewPost = asyncHandler(async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {content, title, categories, tags, summary, read_time, cover_image, thumbnail, disable_comments } = req.body;

    const link = title.toLowerCase().split(" ").join("_")
    let url = link + "_" + Date.now().toString().slice(-4)

    const newPost = await Post.create([{
      _author:req.user._id,
      title:title,
      categories:categories,
      tags,
      url,
      summary,
      read_time,
      cover_image,
      thumbnail,
      disable_comments
    }]);
    await newPost[0].save();
    const postContent = await Content.create([{
      _post:newPost[0]._id,
      message:content
    }]);
    await postContent[0].save();
    await Post.findOneAndUpdate({
      _id: newPost[0]._id
    },
    {
      _content : postContent[0]._id
    },
    { new: true, runValidators: true, session: session }
    );
    await session.commitTransaction();
    session.endSession();
    res.status(201).json({
      success: true,
      data: newPost[0]
    })
  } catch (error) {
    session.endSession();
    next(error);
  }
});



/**
 * @author Cyril Ogoh <cyrilogoh@gmail.com>
 * @description to delete a Post And all it child  
 * @route `/delete/:id`
 * @access Private
 * @type DELETE
 */
 exports.deletePost = asyncHandler(async (req, res, next) => {
  await Post.findOneAndDelete({_id:req.params.id})
  await Comment.deleteMany({_post:req.params.id})
  await Content.findOneAndDelete({_post:req.params.id})
  res.status(200).json({
    success: true,
    data: {}
  })
});


/**
 * @author Cyril Ogoh <cyrilogoh@gmail.com>
 * @description to Edit a Post
 * @route `/edit/:id`
 * @access Private
 * @type PATCH
 */
 exports.editPost = asyncHandler(async (req, res, next) => {
  const data =  req.body
  delete data._author
  delete data._content
  delete data.views

  const post = await Post.findByIdAndUpdate(req.params.id, data, {
    new: true,
    runValidators: true,
  });
  console.log(post)

  res.status(200).json({
    success: true,
    status: "success",
    data: post,
  });
});


/**
 * @author Cyril Ogoh <cyrilogoh@gmail.com>
 * @description to Edit a Post content
 * @route `/edit/body/:id`
 * @access Private
 * @type PATCH
 */
 exports.editContent = asyncHandler(async (req, res, next) => {
  const data =  req.body

  delete data._post
  const content = await Content.findOneAndUpdate({_post:req.params.id}, data, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    status: "success",
    data: content,
  });
});
