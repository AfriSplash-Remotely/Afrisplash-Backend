// *************************GET ALL CANDIDATES******************************
/**
 * @openapi
 * /users/candidates/:
 *  get:
 *      tags:
 *      - Users
 *      summary: Get all Candidates
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: number
 *          description: page number to get
 *          required: false
 *        - in: query
 *          name: limit
 *          schema:
 *            type: number
 *          description: limit number to get
 *          required: false
 *      responses:
 *          200:
 *              description: All Candidates
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
 *                                      $ref: '#/components/schemas/User'
 */

// *************************GET USERS BY EMAIL******************************
/**
 * @openapi
 * /users/email/{email}:
 *  get:
 *      tags:
 *      - Users
 *      summary: Get a user by email
 *      parameters:
 *        - in: path
 *          name: email
 *          schema:
 *            type: string
 *          description: Email of the user
 *          required: true
 *      responses:
 *          200:
 *              description: User retrieved successfully
 *              content:
 *                  application/json:
 *                      schema:
 *          404:
 *              description: Not found
 *          500:
 *              description: Internal server error
 */

// *************************UPLOAD IMAGE******************************
/**
 * @openapi
 * /users/upload:
 *  post:
 *      tags:
 *      - Users
 *      summary: Upload image file
 *      requestBody:
 *          required: true
 *          content:
 *              multipart/form-data:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          image:
 *                              type: string
 *                              format: binary
 *      responses:
 *          200:
 *              description: Image uploaded successfully
 *              content:
 *                  application/json:
 *                      schema:
 *          500:
 *              description: Internal server error
 */
