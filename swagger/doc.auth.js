// *************************API DOCUMENTATION******************************

// *************************USER REGISTER******************************
/**
 * @openapi
 * /auth/register:
 *  post:
 *      tags:
 *      - Auth
 *      summary: Register as a user
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          first_name:
 *                              type: string
 *                              example: Timothy
 *                          last_name:
 *                              type: string
 *                              example: Developer
 *                          user_type:
 *                              type: string
 *                              example: recruiter
 *                          gender:
 *                              type: string
 *                              example: male
 *                          email:
 *                              type: string
 *                              example: timo.dev@example.com
 *                          password:
 *                              type: string
 *      responses:
 *          403:
 *              description: Email Address Is Required
 *          400:
 *              description: Email Address already exist
 *          200:
 *              description: Registered successfully
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          $ref: '#/components/schemas/User'
 *          500:
 *              description: Internal server eeror
 */

// *************************USER LOGIN******************************
/**
 * @openapi
 * /auth/login:
 *  post:
 *      tags:
 *      - Auth
 *      summary: Login
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: timo.dev@example.com
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: Logged In successfully
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object 
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: Please provide an email and password
 *          401:
 *              description: Invalid credentials
 */

// *************************USER LOGOUT******************************
/**
 * @openapi
 * /auth/logout:
 *  get:
 *      tags:
 *      - Auth
 *      summary: Logout
 *      responses:
 *          200:
 *              description: Logged In successfully
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object 
 *                          properties:
 *                              success:
 *                                  example: true
 *                              data:
 *                                  example: {}
 */

// *************************FORGOT PASSWORD******************************
/**
 * @openapi
 * /auth/forgot-password:
 *  post:
 *      tags:
 *      - Auth
 *      summary: Forgot Password
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: timo.dev@example.com
 *      responses:
 *          400:
 *              description: There is no user with that email
 *          200:
 *              description: Email sent successfully
 *          500:
 *              description: Email could not be sent
 */

// *************************RESET PASSWORD******************************
/**
 * @openapi
 * /auth/reset-password:
 *  put:
 *      tags:
 *      - Auth
 *      summary: Reset Password
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: timo.dev@example.com
 *                          new_password:
 *                              type: string
 *      responses:
 *          400:
 *              description: There is no user with that email
 *          200:
 *              description: Password reset successfully
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object 
 *                          properties:
 *                              success:
 *                                  example: true
 *                              token:
 *                                  type: string
 *                              user:
 *                                  type:
 *                                  $ref: '#/components/schemas/User'
 */