// *************************GET ALL JOBS******************************
/**
 * @openapi
 * /jobs/:
 *  get:
 *      tags:
 *      - Job
 *      summary: Get all jobs
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
 *                                  $ref: '#/components/schemas/Job'
 */

// *************************GET A PUBLIC JOB DETAIL******************************
/**
 * @openapi
 * /jobs/v/{id}:
 *  get:
 *      tags:
 *      - Job
 *      summary: Get a job details
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: Job details
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

// *************************CREATE A JOB******************************
/**
 * @openapi
 * /jobs/:
 *  post:
 *      tags:
 *      - Job
 *      security:
 *          - BearerAuth: []
 *      summary: Create a job
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type:
 *                      $ref: '#/components/schemas/Job'
 *
 *      responses:
 *          400:
 *              description: Company is required
 *          201:
 *              description: Company created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              success:
 *                                  example: true
 *                              data:
 *                                  type:
 *                                  $ref: '#/components/schemas/Job'
 *          500:
 *              description: Internal server eeror
 */

// *************************UPDATE JOB DETAILS******************************
/**
 * @openapi
 * /jobs/e/{id}:
 *  patch:
 *      tags:
 *      - Job
 *      security:
 *          - BearerAuth: []
 *      summary: Update job details
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *      requestBody:
 *          description: update job details
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type:
 *                      $ref: '#/components/schemas/Job'
 *      responses:
 *          404:
 *              description: No Job Found
 *          401:
 *              description: Not Authorized
 *          200:
 *              description: Job updated successfully
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
 *                                  $ref: '#/components/schemas/Job'
 */

// *************************UPDATE JOB DETAILS******************************
/**
 * @openapi
 * /jobs/form-apply/{jobId}:
 *  post:
 *      tags:
 *      - Job
 *      summary: Apply to job through form submission
 *      parameters:
 *          - in: path
 *            name: jobId
 *            schema:
 *              type: string
 *              required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type:
 *                      $ref: '#/components/schemas/JobForm'
 *      responses:
 *          404:
 *              description: Job no longer exists
 *          200:
 *              description: Application sent successfully
 *          409:
 *              description: User already applied for this job
 */

// *************************VIEW JOBS PRIVATE ONLY TO COMPANY MEMBERS******************************
/**
 * @openapi
 * /jobs/p/{id}:
 *  get:
 *      tags:
 *      - Job
 *      summary: Get a job details private only to company members
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: Job details
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

// *************************VIEW ALL JOBS PRIVATE ONLY TO COMPANY MEMBERS********************
/**
 * @openapi
 * /jobs/p/:
 *  get:
 *      tags:
 *      - Job
 *      security:
 *          - BearerAuth: []
 *      summary: Get all jobs private only to company members
 *      responses:
 *          200:
 *              description: All private jobs
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
 *                                  $ref: '#/components/schemas/Job'
 */

// *************************CANDIDATE APPLY FOR A JOB******************************
/**
 * @openapi
 * /jobs/a/{id}:
 *  post:
 *      tags:
 *      - Job
 *      summary: Candidate Apply for a job
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          409:
 *              description: User has applied for this job already
 *          200:
 *              description: Job application successfull
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  example: true
 *                              status:
 *                                  example: success
 */

// *************************VIEW ALL APPLICANTS FOR A JOB**********************
/**
 * @openapi
 * /jobs/applicants/{id}:
 *  get:
 *      tags:
 *      - Job
 *      summary: Get all applicants for a job
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          401:
 *              description: Not Authorized
 *          200:
 *              description: All job's applicants
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
 *                                  type: array
 */

// *************************VIEW ALL FORM APPLICANTS FOR A JOB**********************
/**
 * @openapi
 * /jobs/form-applicants/{jobId}:
 *  get:
 *      tags:
 *      - Job
 *      security:
 *          - BearerAuth: []
 *      summary: Get all form applicants for a job
 *      parameters:
 *          - in: path
 *            name: jobId
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          401:
 *              description: Not Authorized
 *          200:
 *              description: All job's applicants
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
 *                                  type: array
 */

// *************************CLOSE A JOB******************************
/**
 * @openapi
 * /jobs/c/{id}:
 *  patch:
 *      tags:
 *      - Job
 *      security:
 *          - BearerAuth: []
 *      summary: Close a job
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          404:
 *              description: No Job Found
 *          401:
 *              description: Not Authorized
 *          400:
 *              description: Job is already closed
 *          200:
 *              description: Job closed successfully
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
 *                                  $ref: '#/components/schemas/Job'
 */

// *************************OPEN A JOB******************************
/**
 * @openapi
 * /jobs/o/{id}:
 *  patch:
 *      tags:
 *      - Job
 *      security:
 *          - BearerAuth: []
 *      summary: Open a job
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          404:
 *              description: No Job Found
 *          401:
 *              description: Not Authorized
 *          400:
 *              description: Job is already closed
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
 *                                  $ref: '#/components/schemas/Job'
 */

// *************************DELETE A JOB******************************
/**
 * @openapi
 * /jobs/{id}:
 *  delete:
 *      tags:
 *      - Job
 *      security:
 *          - BearerAuth: []
 *      summary: Delete a job
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          404:
 *              description: No Resource Found
 *          401:
 *              description: NOt Authorized, can not perform actions
 *          200:
 *              description: Job deleted successfully
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

// *************************UPDATE JOB STATUS******************************
/**
 * @openapi
 * /jobs/{id}/status:
 *  patch:
 *      tags:
 *      - Job
 *      security:
 *          - BearerAuth: []
 *      summary: Update a job status
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          404:
 *              description: No Job Found
 *          200:
 *              description: Job status updated successfully
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
 *                                  $ref: '#/components/schemas/Job'
 */

// *************************SEARCH JOBS BY COMPANY******************************
/**
 * @openapi
 * /jobs/search/c/{company}:
 *  get:
 *      tags:
 *      - Job
 *      summary: Search jobs by company
 *      parameters:
 *          - in: path
 *            name: company
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: All jobs in company
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
 *                                  $ref: '#/components/schemas/Job'
 */

// *************************SEARCH JOBS BY TYPE******************************
/**
 * @openapi
 * /jobs/search/t/{type}:
 *  get:
 *      tags:
 *      - Job
 *      summary: Search jobs by type
 *      parameters:
 *          - in: path
 *            name: type
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          400:
 *              description: Job type can only be any of [Onsite, Remote, Hybrid]
 *          200:
 *              description: All jobs in by type
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
 *                                  $ref: '#/components/schemas/Job'
 */

// *************************SEARCH JOBS BY LOCATION******************************
/**
 * @openapi
 * /jobs/search/l/{location}:
 *  get:
 *      tags:
 *      - Job
 *      summary: Search jobs by location
 *      parameters:
 *          - in: path
 *            name: location
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: All jobs in location
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
 *                                  $ref: '#/components/schemas/Job'
 */

// *************************SEARCH JOBS BY DATE RANGE******************************
/**
 * @openapi
 * /jobs/search/d:
 *  get:
 *      tags:
 *      - Job
 *      summary: Search jobs by date range
 *      parameters:
 *        - in: query
 *          name: timeRange
 *          description: The time range for job search.
 *          schema:
 *            type: string
 *            enum: [past24hours, pastweek, pastmonth, anytime]
 *          required: true
 *      responses:
 *          400:
 *              description: Search date range should be any of type [past24hours, pastweek, pastmonth, anytime]
 *          200:
 *              description: All jobs in date range
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
 *                                  $ref: '#/components/schemas/Job'
 */

// *************************SEARCH JOBS BY SALARY**********************************
/**
 * @openapi
 * /jobs/search/s/{salary}:
 *  get:
 *      tags:
 *      - Job
 *      summary: Search jobs by salary
 *      parameters:
 *          - in: path
 *            name: salary
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: All jobs with the salary
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
 *                                  $ref: '#/components/schemas/Job'
 */
