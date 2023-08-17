/**
 * @openapi
 * /recruiter/onboarding:
 *  post:
 *      tags:
 *      - Recruiter
 *      security:
 *          - BearerAuth: []
 *      summary: Complete your account setup as a Recruiter
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