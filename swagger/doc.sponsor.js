// *************************GET ALL ACTIVE SPONSERS******************************
/**
 * @openapi
 * /sponsor/:
 *  get:
 *      tags:
 *      - Sponsor
 *      summary: Get all active sponsors
 *      responses:
 *          200:
 *              description: All active sponsors
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  example: true
 *                              data:
 *                                  type:
 *                                  $ref: '#/components/schemas/Sponsor'
 */

// *************************CREATE A SPONSOR******************************
/**
 * @openapi
 * /sponsor/:
 *  post:
 *      tags:
 *      - Sponsor
 *      summary: Create a sponsor
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              example: Sponsor Company
 *                          image:
 *                              type: string
 *                              example: http://example.com/sponsor_image.jpg
 *                          theme:
 *                              type: string
 *                              example: "#FF5733"
 *                          description:
 *                              type: string
 *                              example: Sponsor description
 *                          action:
 *                              type: string
 *                              enum:
 *                                  - Download
 *                                  - Register
 *                                  - Visit
 *                                  - Apply
 *                              example: Visit
 *                          url:
 *                              type: string
 *                              example: http://example.com/sponsor
 *      responses:
 *          201:
 *              description: Sponsor created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              success:
 *                                  example: true
 *                              data:
 *                                  type:
 *                                  $ref: '#/components/schemas/Sponsor'
 *          500:
 *              description: Internal server eeror
 */

// *************************EDIT A SPONSOR******************************
/**
 * @openapi
 * /sponsor/{id}:
 *  patch:
 *      tags:
 *      - Sponsor
 *      summary: Edit a sponsor
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *      requestBody:
 *          description: edit a sponsor
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              example: Sponsor Company
 *                          image:
 *                              type: string
 *                              example: http://example.com/sponsor_image.jpg
 *                          theme:
 *                              type: string
 *                              example: "#FF5733"
 *                          description:
 *                              type: string
 *                              example: Sponsor description
 *                          action:
 *                              type: string
 *                              enum:
 *                                  - Download
 *                                  - Register
 *                                  - Visit
 *                                  - Apply
 *                              example: Visit
 *                          url:
 *                              type: string
 *                              example: http://example.com/sponsor
 *      responses:
 *          400:
 *              description: Bad or Invalid input field
 *          404:
 *              description: No User Found
 *          200:
 *              description: Job updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  example: true
 *                              data:
 *                                  type:
 *                                  $ref: '#/components/schemas/Sponsor'
 */

// *************************DELETE/DISABLE A SPONSOR******************************
/**
 * @openapi
 * /sponsor/{id}:
 *  delete:
 *      tags:
 *      - Sponsor
 *      security:
 *          - BearerAuth: []
 *      summary: Delete/disable a sponsor
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          404:
 *              description: No User Found
 *          200:
 *              description: Sponsor deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  example: true
 *                              data:
 *                                  type:
 *                                  $ref: '#/components/schemas/Sponsor'
 */


// *************************GET ALL SPONSERS HISTORY******************************
/**
 * @openapi
 * /sponsor/history:
 *  get:
 *      tags:
 *      - Sponsor
 *      summary: Get all sponsor history
 *      responses:
 *          200:
 *              description: All sponsor history
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  example: true
 *                              data:
 *                                  type:
 *                                  $ref: '#/components/schemas/Sponsor'
 */