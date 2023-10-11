// *************************API DOCUMENTATION******************************

// *************************ADMIN INVITE******************************
/**
 * @openapi
 * /admins/invite:
 *  post:
 *      tags:
 *      - Admins
 *      summary: Invite an Admin
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
 *                          admin_type:
 *                              type: string
 *                              enum:
 *                                  - admin
 *                                  - super-admin
 *                              example: admin
 *                          permissions:
 *                              type: array
 *                              items:
 *                                  type: string
 *                                  example: "blog_access"
 *      responses:
 *          409:
 *              description: Account already exist
 *          400:
 *              description: Bad request
 *          201:
 *              description: Admin invited successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Admin'
 *          500:
 *              description: Internal server eeror
 */

// *************************USER LOGIN******************************
/**
 * @openapi
 * /admins/login:
 *  post:
 *      tags:
 *      - Admins
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
 *                          $ref: '#/components/schemas/Admin'
 *          400:
 *              description: Invalid request data
 *          404:
 *              description: Account does not exist
 *          401:
 *              description: Password incorrect
 *          500:
 *              description: Internal server error
 */

// *************************USER LOGOUT******************************
/**
 * @openapi
 * /admins/logout:
 *  get:
 *      tags:
 *      - Admins
 *      summary: Logout
 *      responses:
 *          200:
 *              description: Logged out successfully
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

// *************************GET ALL ADMINS******************************
/**
 * @openapi
 * /admins/:
 *  get:
 *      tags:
 *      - Admins
 *      summary: Get all Admins
 *      responses:
 *          200:
 *              description: All Admins
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  example: true
 *                              status:
 *                                  example: success
 *                              total:
 *                                  type: number
 *                              count:
 *                                  type: number
 *                              pagination:
 *                                  type: number
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      $ref: '#/components/schemas/Admin'
 */

// *************************UPDATE PASSWORD******************************
/**
 * @openapi
 * /admins/update-password:
 *  patch:
 *      tags:
 *      - Admins
 *      security:
 *          - BearerAuth: []
 *      summary: Update my password
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: Password updated successfully
 *          500:
 *              description: Unable to update password
 */
