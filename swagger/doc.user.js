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
