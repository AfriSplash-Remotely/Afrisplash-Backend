/**
 * @openapi
 * /contact-us:
 *  post:
 *      tags:
 *          - Message
 *      summary: Contact us
 *      description: Contact us
 *      requestBody:
 *          description: Contact us
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          first_name:
 *                              type: string
 *                              required: true
 *                          last_name:
 *                              type: string
 *                              required: true
 *                          email:
 *                              type: string
 *                              format: email
 *                              required: true
 *                          message:
 *                              type: string
 *                              required: true
 *                          additional_details:
 *                              type: string
 *                              required: false
 *      responses:
 *          200:
 *              description: Message sent successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  example: true
 *                              message:
 *                                  type: string
 *                                  example: Message sent successfully
 *          400:
 *              description: Bad request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  example: false
 *                              message:
 *                                  type: string
 *                                  example: Please enter a valid Email address
 *                              error:
 *                                  type: object
 *                                  example: { details: [{ message: "Please enter a valid Email address", path: ["email"], type: "string.email" }] }
 *          500:
 *              description: Internal Server Error
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  type: boolean
 *                                  example: false
 *                              message:
 *                                  type: string
 *                                  example: Unable to send message
 *                              error:
 *                                  type: object
 *                                  example: { message: "Unable to send message" }
 */
