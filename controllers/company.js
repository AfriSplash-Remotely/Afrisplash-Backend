const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const mongoose = require("mongoose");
const joi = require("joi")





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

