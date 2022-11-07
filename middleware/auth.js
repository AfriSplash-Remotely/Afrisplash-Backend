const jwt = require("jsonwebtoken");
const asyncHandler = require("./async");
const ErrorResponse = require("../utils/errorResponse");
const User = require("../model/user");

/**Route Graud For `Candidate` -- *MIDDLEWARE* */
exports.C_protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
    // Set token from cookie
  }
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.user_id);
    if(req.user.user_type == "candidate"){
      if(req.user.account_setup_completed){
        next()
      }else if(!req.user.account_setup_completed && req.originalUrl == "/api/v1/candidate/onboarding" ){
        next()
      }else{
        res.redirect("/candidate/onboarding")
      }
    }else if (req.user.user_type == "recuiter"){
      return next(new ErrorResponse("Not authorized to access this route", 401));
    }else{
      return next(new ErrorResponse("User Data Is Not Valid", 400));
    }
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});

/**Route Graud For `Recuiter` -- *MIDDLEWARE* */ 
exports.R_protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(" ")[1];
    // Set token from cookie
  }
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.user_id);

    if(req.user.user_type == "recuiter"){
      next()
    }else if (req.user.user_type == "candidate"){
      return next(new ErrorResponse("Not authorized to access this route", 401));
    }else{
      return next(new ErrorResponse("User Data Is Not Valid", 400));
    }
  } catch (err) {
    return next(new ErrorResponse("Not authorized to access this route", 401));
  }
});

// Grant access to specific roles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
};
