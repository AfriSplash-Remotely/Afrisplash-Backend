// *************************GET ALL XJOBS******************************
/**
 * @openapi
 * /xjobs/:
 *  get:
 *      tags:
 *      - Xternal Job
 *      summary: Get all Xjobs
 *      parameters:
 *          - in: query
 *            name: page
 *            schema:
 *              type: number
 *              required: false
 *          - in: query
 *            name: limit
 *            schema:
 *              type: number
 *              required: false
 *      responses:
 *          200:
 *              description: All external jobs
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
 *                                  type:
 *                                  $ref: '#/components/schemas/XJob'
 */
