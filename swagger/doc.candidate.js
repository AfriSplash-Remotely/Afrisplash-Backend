/**
 * @openapi
 * /candidate/onboarding:
 *  post:
 *      tags:
 *      - Candidate
 *      security:
 *          - BearerAuth: []
 *      summary: Complete your account setup as a Candidate
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/User'
 *      responses:
 *          400:
 *              description: Account has been Onboarded Already
 *          200:
 *              description: Onboarded successfully
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          $ref: '#/components/schemas/User'
 */