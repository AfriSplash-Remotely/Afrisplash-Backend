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

// // *************************GET A CANDIDATE DETAIL******************************
// /**
//  * @openapi
//  * /candidate/{id}:
//  *  get:
//  *      tags:
//  *      - Candidate
//  *      summary: Get a candidate details
//  *      parameters:
//  *          - in: path
//  *            name: id
//  *            schema:
//  *              type: string
//  *              required: true
//  *      responses:
//  *          200:
//  *              description: Candidate profile details
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          type: object
//  *                          properties:
//  *                              success:
//  *                                  example: true
//  *                              data:
//  *                                  type:
//  *                                  $ref: '#/components/schemas/User'
//  */

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
 */

// *************************REMOVE WORK EXPERIENCE******************************
/**
 * @openapi
 * /candidate/edit/remove/experience/{id}:
 *  delete:
 *      tags:
 *      - Candidate
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
 * /candidate/edit/add/education:
 *  put:
 *      tags:
 *      - Candidate
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
 * /candidate/edit/remove/education/{id}:
 *  delete:
 *      tags:
 *      - Candidate
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
 * /candidate/edit/add/skill:
 *  put:
 *      tags:
 *      - Candidate
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
//  * /candidate/edit/remove/skill/{id}:
//  *  delete:
//  *      tags:
//  *      - Candidate
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
 * /candidate/edit/add/language:
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
 * /candidate/edit/remove/language/{id}:
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
 * /candidate/edit/user/contact:
 *  put:
 *      tags:
 *      - Candidate
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
 * components:
 *      schemas:
 *          Contact:
 *              type: object
 *              properties:
 *                  phone:
 *                      type: string
 *                  email:
 *                      type: string
 *                  location:
 *                      type: string
 */

// *************************UPDATE USER BIO******************************
/**
 * @openapi
 * /candidate/edit/user/bio:
 *  put:
 *      tags:
 *      - Candidate
 *      security:
 *          - BearerAuth: []
 *      summary: Update my bio
 *      requestBody:
 *          description: bio
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          bio:
 *                              type: string
 *                              example: I'm a badass in this backend engineering thingy
 *      responses:
 *          200:
 *              description: Bio updated successfully
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

// *************************UPDATE USER DETAILS******************************
/**
 * @openapi
 * /candidate/edit/user:
 *  put:
 *      tags:
 *      - Candidate
 *      security:
 *          - BearerAuth: []
 *      summary: Update my details
 *      requestBody:
 *          description: update details
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type:
 *                      $ref: '#/components/schemas/UserDetails'
 *      responses:
 *          200:
 *              description: Bio updated successfully
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
 *          UserDetails:
 *              type: object
 *              properties:
 *                  profile_image:
 *                      type: string
 *                  thumbnail:
 *                      type: string
 *                  role:
 *                      type: string
 *                  availability:
 *                      type: array
 *                  first_name:
 *                      type: string
 *                  last_name:
 *                      type: string
 */

// *************************GET NOTIFICATIONS******************************
/**
 * @openapi
 * /candidate/notifications:
 *  get:
 *      tags:
 *      - Candidate
 *      security:
 *          - BearerAuth: []
 *      summary: Get my notifications
 *      responses:
 *          200:
 *              description: Retrieved notifications successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  example: true
 *                              data:
 *                                  type:
 *                                  $ref: '#/components/schemas/Notification'
 */

// *************************GET GIFTS******************************
/**
 * @openapi
 * /candidate/gifts:
 *  get:
 *      tags:
 *      - Candidate
 *      security:
 *          - BearerAuth: []
 *      summary: Get my gifts
 *      responses:
 *          200:
 *              description: Retrieved gifts successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  example: true
 *                              data:
 *                                  type:
 *                                  $ref: '#/components/schemas/Gift'
 */

// *************************GET JOBS******************************
/**
 * @openapi
 * /candidate/jobs:
 *  get:
 *      tags:
 *      - Candidate
 *      security:
 *          - BearerAuth: []
 *      summary: Get my jobs
 *      responses:
 *          200:
 *              description: Retrieved jobs successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  example: true
 *                              data:
 *                                  type:
 *                                  $ref: '#/components/schemas/Job'
 */

// *************************SAVE A JOB******************************
/**
 * @openapi
 * /candidate/job/save/{id}:
 *  patch:
 *      tags:
 *      - Candidate
 *      security:
 *          - BearerAuth: []
 *      summary: Save a job
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          404:
 *              description: Job not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  example: false
 *                              data:
 *                                  example: null
 *          200:
 *              description: Job saved successfully
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

// *************************UNSAVE A JOB******************************
/**
 * @openapi
 * /candidate/job/unsave/{id}:
 *  delete:
 *      tags:
 *      - Candidate
 *      security:
 *          - BearerAuth: []
 *      summary: UNSave a job
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: Job unsaved successfully
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
