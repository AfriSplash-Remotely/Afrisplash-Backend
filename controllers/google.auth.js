const jwt = require("jsonwebtoken");

exports.loginFailed = (req, res) => {
    res.status(401).json({
        message: 'Failed Login'
    })
}

/**
 * @author Timothy Adeyeye <adeyeyetimothy33@gmail.com>
 * @description Authenticaton with Google OAuth
 * @route `/api/v1/auth/register`
 * @access Public
 * @type GET
 */
exports.profile = (req, res) => {
    const user = req.user
    // generate token
    const getSignedJwtToken = function () {
        return jwt.sign({
            user: user._id
        }, process.env.JWT_SECRET)
    }
    const token = getSignedJwtToken()

    const options = {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      };

    if (process.env.NODE_ENV === "production") {
        options.secure = true;
    }

    res.status(200)
        .cookie("token", token, options)
        .json({
            success: true,
            token,
            user: user
        })
}