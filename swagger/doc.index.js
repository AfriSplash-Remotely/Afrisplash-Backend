/**
 * @openapi
 * /:
 *  get:
 *      tags:
 *      - Index
 *      summary: Ping API
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object 
 *                          properties:
 *                              success:
 *                                  example: true
 *                              status:
 *                                  example: true
 *                              data:
 *                                  example: Hello From AfriSplash Server
 */