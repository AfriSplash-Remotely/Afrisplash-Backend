// *************************GET ALL COMPANIES******************************
/**
 * @openapi
 * /company/:
 *  get:
 *      tags:
 *      - Company
 *      security:
 *          - BearerAuth: []
 *      summary: Get all companies
 *      responses:
 *          200:
 *              description: All companies
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  example: true
 *                              data:
 *                                  type:
 *                                  $ref: '#/components/schemas/Company'
 */

// *************************CREATE A COMPANY******************************
/**
 * @openapi
 * /company/:
 *  post:
 *      tags:
 *      - Company
 *      security:
 *          - BearerAuth: []
 *      summary: Create a company
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type:
 *                      $ref: '#/components/schemas/Company'
 *
 *      responses:
 *          400:
 *              description: A field is required
 *          200:
 *              description: Company created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/Company'
 *          500:
 *              description: Internal server eeror
 */

// *************************VERIFY COMPANY******************************
/**
 * @openapi
 * /company/verify:
 *  patch:
 *      tags:
 *      - Company
 *      summary: Verify a company
 *      requestBody:
 *          description: company id
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id:
 *                              type: string
 *                              example: 64e3de4224d36119c23d74c7
 *      responses:
 *          200:
 *              description: Company verified successfully
 */

// *************************EDIT COMPANY DETAILS******************************
/**
 * @openapi
 * /company/{id}:
 *  patch:
 *      tags:
 *      - Company
 *      security:
 *          - BearerAuth: []
 *      summary: Update company details
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *      requestBody:
 *          description: update company details
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type:
 *                      $ref: '#/components/schemas/Company'
 *      responses:
 *          200:
 *              description: Company updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  example: true
 *                              status:
 *                                  example: success
 *                              data:
 *                                  type:
 *                                  $ref: '#/components/schemas/Company'
 */

// *************************DELETE A COMPANY******************************
/**
 * @openapi
 * /company/{id}:
 *  delete:
 *      tags:
 *      - Company
 *      security:
 *          - BearerAuth: []
 *      summary: Delete a company
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: Company deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  example: true
 *                              data:
 *                                  example: null
 */
