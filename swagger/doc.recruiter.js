// *************************ONBOARD RECRUITER******************************
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

// *************************RECRUITER PROFILE******************************
/**
 * @openapi
 * /recruiter/:
 *  get:
 *      tags:
 *      - Recruiter
 *      security:
 *          - BearerAuth: []
 *      summary: Get recruiter profile
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

// *************************UPDATE ACTIVELY HIRING******************************
/**
 * @openapi
 * /recruiter/activelyhiring:
 *  patch:
 *      tags:
 *      - Recruiter
 *      security:
 *          - BearerAuth: []
 *      summary: Update hiring status
 *      responses:
 *          200:
 *              description: Hiring status changed successfully
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

// *************************UPDATE PRIVATE MODE******************************
/**
 * @openapi
 * /recruiter/privatemode:
 *  patch:
 *      tags:
 *      - Recruiter
 *      security:
 *          - BearerAuth: []
 *      summary: Update privacy mode
 *      responses:
 *          200:
 *              description: Privacy mode changed successfully
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
 * /recruiter/edit/add/experience:
 *  patch:
 *      tags:
 *      - Recruiter
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
 */

// *************************REMOVE WORK EXPERIENCE******************************
/**
 * @openapi
 * /recruiter/edit/remove/experience/{id}:
 *  delete:
 *      tags:
 *      - Recruiter
 *      security:
 *          - BearerAuth: []
 *      summary: Remove work experience
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string 
 *              required: true
 *      responses:
 *          200:
 *              description: Work experiences removed successfully
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

// *************************ADD EDUCATION******************************
/**
 * @openapi
 * /recruiter/edit/add/education:
 *  patch:
 *      tags:
 *      - Recruiter
 *      security:
 *          - BearerAuth: []
 *      summary: Add education
 *      requestBody:
 *          description: Array of work education to add
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Education'
 *      responses:
 *          200:
 *              description: Education added successfully
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
 *          Education:
 *              type: object
 *              properties:
 *                  institution_name:
 *                      type: string
 *                  degree:
 *                      type: string
 *                  field_of_study:
 *                      type: string
 *                  date_start:
 *                      type: string
 *                  date_end:
 *                      type: string
 *                  description:
 *                      type: string
 */

// *************************REMOVE EDUCATION******************************
/**
 * @openapi
 * /recruiter/edit/remove/education/{id}:
 *  delete:
 *      tags:
 *      - Recruiter
 *      security:
 *          - BearerAuth: []
 *      summary: Remove education
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string 
 *              required: true
 *      responses:
 *          200:
 *              description: Education removed successfully
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

// *************************ADD SKILLS******************************
/**
 * @openapi
 * /recruiter/edit/add/skill:
 *  patch:
 *      tags:
 *      - Recruiter
 *      security:
 *          - BearerAuth: []
 *      summary: Add skill
 *      requestBody:
 *          description: Array of skills to add
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          type: string
 *      responses:
 *          200:
 *              description: Skills added successfully
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

// // *************************REMOVE SKILL******************************
// /**
//  * @openapi
//  * /recruiter/edit/remove/skill/{id}:
//  *  delete:
//  *      tags:
//  *      - Recruiter
//  *      security:
//  *          - BearerAuth: []
//  *      summary: Remove skill
//  *      parameters:
//  *          - in: path
//  *            name: id
//  *            schema:
//  *              type: string 
//  *              required: true
//  *      responses:
//  *          200:
//  *              description: Skill removed successfully
//  *              content:
//  *                  application/json:
//  *                      schema: 
//  *                          type: object
//  *                          properties:
//  *                              success:
//  *                                  example: true
//  *                              status:
//  *                                  example: success
//  *                              data:
//  *                                  type:
//  *                                  $ref: '#/components/schemas/User'
//  */

// *************************ADD LANGUAGE******************************
/**
 * @openapi
 * /recruiter/edit/add/language:
 *  put:
 *      tags:
 *      - Candidate
 *      security:
 *          - BearerAuth: []
 *      summary: Add language
 *      requestBody:
 *          description: Array of languages and level to add
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Language'
 *      responses:
 *          200:
 *              description: Languages added successfully
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
 *          Language:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  level:
 *                      type: string
 */

// *************************REMOVE Language******************************
/**
 * @openapi
 * /recruiter/edit/remove/language/{id}:
 *  delete:
 *      tags:
 *      - Candidate
 *      security:
 *          - BearerAuth: []
 *      summary: Remove language
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string 
 *              required: true
 *      responses:
 *          200:
 *              description: Language removed successfully
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

// *************************UPDATE CONTACT******************************
/**
 * @openapi
 * /recruiter/edit/user/contact:
 *  patch:
 *      tags:
 *      - Recruiter
 *      security:
 *          - BearerAuth: []
 *      summary: Update my contact
 *      requestBody:
 *          description: user contacts
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type:
 *                      $ref: '#/components/schemas/Contact'
 *      responses:
 *          200:
 *              description: Contact updated successfully
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