// *************************ONBOARD CANDIDATE******************************
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


// *************************CANDIDATE PROFILE******************************
/**
 * @openapi
 * /candidate/:
 *  get:
 *      tags:
 *      - Candidate
 *      security:
 *          - BearerAuth: []
 *      summary: Get candidate profile
 *      responses:
 *          200:
 *              description: User profile
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              success:
 *                                  example: true
 *                              data:
 *                                  type:
 *                                  $ref: '#/components/schemas/User'
 */

// *************************GET A CANDIDATE DETAIL******************************
/**
 * @openapi
 * /candidate/{id}:
 *  get:
 *      tags:
 *      - Candidate
 *      summary: Get a candidate details
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string 
 *              required: true
 *      responses:
 *          200:
 *              description: Candidate profile details
 *              content:
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          properties:
 *                              success:
 *                                  example: true
 *                              data:
 *                                  type:
 *                                  $ref: '#/components/schemas/User'
 */

// *************************UPDATE READY TO INTERVIEW******************************
/**
 * @openapi
 * /candidate/readytointerview:
 *  put:
 *      tags:
 *      - Candidate
 *      security:
 *          - BearerAuth: []
 *      summary: Update readiness to interview
 *      responses:
 *          200:
 *              description: Status changed successfully
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
 *                                  $ref: '#/components/schemas/User'
 */

// *************************ADD EXPERIENCE******************************
/**
 * @openapi
 * /candidate/edit/add/experience:
 *  put:
 *      tags:
 *      - Candidate
 *      security:
 *          - BearerAuth: []
 *      summary: Add work experience
 *      requestBody:
 *          description: Array of work experiences to add
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/WorkExperience'
 *      responses:
 *          200:
 *              description: Work experiences added successfully
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
 *                                  $ref: '#/components/schemas/User'
 * components:
 *      schemas:
 *          WorkExperience:
 *              type: object
 *              properties:
 *                  company_name:
 *                      type: string
 *                  position_held:
 *                      type: string
 *                  location:
 *                      type: string
 *                  job_type:
 *                      type: string
 *                  date_start:
 *                      type: string
 *                  date_end:
 *                      type: string
 *                  description:
 *                      type: string
 */
