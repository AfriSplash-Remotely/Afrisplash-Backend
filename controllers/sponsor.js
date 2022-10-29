const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const mongoose = require("mongoose");
const _ = require("lodash");
const joi = require("joi")
const sponsor = require("../model/sponsor");




/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Create A New Sponsor Post For The Landing Page And Other Screen 
 * @route `/api/v1/sponsor/create`
 * @access Private
 * @type POST
 */
 exports.create = asyncHandler(async (req, res, next) => {
    const { name, image,theme, description, url, action } = req.body;
    // TODO Validator
    const data = await sponsor.create({
      name:name,
      image:image,
      theme:theme,
      description:description,
      url:url,
      action:action
    })

    res.status(201).json({
      success: true,
      data: data
    })
});

/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Get Active Sponsor Post For The Landing Page And Other Screen 
 * @route `/api/v1/sponsor`
 * @access Public
 * @type GET
 */
 exports.activeSponsor = asyncHandler(async (req, res, next) => {
  const data = await sponsor.find({disable:false}).sort({_id:-1}).select({disable:0})
  res.status(200).json({
    success: true,
    data: data
  })
});


/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Delete a Sponsor or remove from list
 * @route `/api/v1/sponsor`
 * @access Private
 * @type Delete
 */
 exports.delSponsor = asyncHandler(async (req, res, next) => {
  const isTrue = await sponsor.findById(req.params.id)
  if(!isTrue){
    return next(new ErrorResponse("No User Found", 404));
  }
  const data = await sponsor.findOneAndUpdate(
    {_id:req.params.id},
    {disable:true},
    { new: false, runValidators: true })

  res.status(200).json({
    success: true,
    data: data
  })
});


/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Edit A Sponsor Post
 * @route `/api/v1/sponsor`
 * @access Private
 * @type PUT
 */
 exports.editSponsor = asyncHandler(async (req, res, next) => {
  //TODO Add Joi Vaildator
  const input =  req.body
  try {
    const isTrue = await sponsor.findById(req.params.id)
    if(!isTrue){
      return next(new ErrorResponse("No User Found", 404));
    }
    const data = await sponsor.findOneAndUpdate(
      {_id:req.params.id},
      {input},
      { new: false, runValidators: true })
    res.status(200).json({
      success: true,
      data: data
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      data: "Your Input Field is either bad or not allow"
    })
  }
});

/**
 * @author Cyril ogoh <cyrilogoh@gmail.com>
 * @description Get All history on Post Created For The Landing Page And Other Screen 
 * @route `/api/v1/history`
 * @access Public
 * @type GET
 */
 exports.history = asyncHandler(async (req, res, next) => {
  const data = await sponsor.find({}).sort({_id:-1})
  res.status(200).json({
    success: true,
    data: data
  })
});