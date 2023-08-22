// *************SCHEMA DEFINITIONS***********************************

// *************SECURITY SCHEMA***********************************
/**
 * @openapi
 * components:
 *      securitySchemes:
 *          BearerAuth:
 *              type: http
 *              scheme: bearer
 *              bearerFormat: JWT
 */

// *************AUTH SCHEMA***********************************
/**
 * @openapi
 * components:
 *  schemas:
 *   Auth:
 *    type: object
 *    required:
 *     - account_verify
 *     - account_setup_completed
 *     - email
 *     - password
 *    properties:
 *          _id:
 *              type: string
 *              example: 64ddbca37ff26a9ea19a7737
 *          email:
 *              type: string
 *              example: username@gmail.com
 *          password:
 *              type: string
 *              example: "$2a$10$h0OT/iSymt7A7I.ac5ZpWu2o4hVgUQhgc7ii1kvJZ7xIDh3Sn9r3K"
 *          account_verify:
 *              type: boolean
 *              default: false
 *          account_setup_completed:
 *              type: boolean
 *              default: false
 *          userID:
 *              type: string
 *              example: 64ddbca37ff26a9ea19a773a
 *          created_at:
 *              type: string
 *              example: 2023-08-17T06:22:27.136+00:00
 *  */

// *************USER SCHEMA***********************************
/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - auth_id
 *         - user_type
 *         - first_name
 *         - last_name
 *         - gender
 *         - email
 *       properties:
 *         _id:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a7738
 *         auth_id:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a7737
 *         user_type:
 *           type: string
 *           enum: ['recruiter', 'candidate']
 *           example: candidate
 *         first_name:
 *           type: string
 *           example: Timothy
 *         last_name:
 *           type: string
 *           example: Developer
 *         gender:
 *           type: string
 *           enum: ['male', 'female']
 *           example: male
 *         email:
 *           type: string
 *           example: tim.dev@example.com
 *         bio:
 *           type: string
 *           example: Software Developer
 *         profile_image:
 *           type: string
 *           example: http://example.com/profile.jpg
 *         thumbnail:
 *           type: string
 *           example: http://example.com/thumbnail.jpg
 *         cover_letter:
 *           type: string
 *           example: Cover letter content
 *         cv:
 *           type: string
 *           example: http://example.com/cv.pdf
 *         language:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Yoruba
 *               level:
 *                 type: string
 *                 example: Native
 *         account_setup_completed:
 *           type: boolean
 *           default: false
 *         location:
 *           type: string
 *           example: Berlin, Germany
 *         role:
 *           type: string
 *           example: Manager
 *         availability:
 *           type: array
 *           items:
 *             type: string
 *             example: Full-time Remote
 *         badge:
 *           type: number
 *           minimum: 0
 *           maximum: 5
 *           example: 3
 *         phone_number:
 *           type: string
 *           example: +1234567890
 *         skills:
 *           type: array
 *           items:
 *             type: string
 *             example: JavaScript
 *         experience:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               company_name:
 *                 type: string
 *                 example: Afrisplash
 *               position_held:
 *                 type: string
 *                 example: Backend Engineer
 *               location:
 *                 type: string
 *                 example: San Francisco
 *               job_type:
 *                 type: string
 *                 example: Full-time
 *               date_start:
 *                 type: string
 *                 example: 2023-01-01
 *               date_end:
 *                 type: string
 *                 example: 2025-12-31
 *               description:
 *                 type: string
 *                 example: Developed web applications...
 *         education:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               institution_name:
 *                 type: string
 *                 example: University of Example
 *               degree:
 *                 type: string
 *                 example: Bachelor of Science
 *               field_of_study:
 *                 type: string
 *                 example: Computer Science
 *               date_start:
 *                 type: string
 *                 example: 2019-09-01
 *               date_end:
 *                 type: string
 *                 example: 2023-05-31
 *               description:
 *                 type: string
 *                 example: Studied computer science...
 *         jobs:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _job:
 *                 type: string
 *                 example: 64ddbca37ff26a9ea19a7739
 *               date:
 *                 type: string
 *                 example: 2023-08-17
 *               state:
 *                 type: string
 *                 enum: ['accepted', 'pending', 'rejected']
 *                 default: pending
 *         settings:
 *           type: object
 *         hide_detail:
 *           type: boolean
 *           default: false
 *         ready_to_interview:
 *           type: boolean
 *           default: false
 *         activelyHiring:
 *           type: boolean
 *           default: false
 *         privateMode:
 *           type: boolean
 *           default: false
 *         friends:
 *           type: array
 *           items:
 *             type: string
 *             example: friend_id
 *         _company:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a773a
 *         company_role:
 *           type: string
 *           example: Software Engineer
 *         work_history:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               company_name:
 *                 type: string
 *                 example: Example Corp
 *               position_held:
 *                 type: string
 *                 example: Senior Developer
 *               date_start:
 *                 type: string
 *                 example: 2020-01-01
 *               date_end:
 *                 type: string
 *                 example: 2022-12-31
 *               description:
 *                 type: string
 *                 example: Led a team of developers...
 *         extra_email:
 *           type: array
 *           items:
 *             type: string
 *             example: extra@example.com
 *         notifications:
 *           type: array
 *           items:
 *             type: string
 *             example: 64ddbca37ff26a9ea19a773b
 *         gifts:
 *           type: array
 *           items:
 *             type: string
 *             example: 64ddbca37ff26a9ea19a773c
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: 2023-08-17T06:22:27.136Z
 */

// *************ADMIN SCHEMA***********************************
/**
 * @openapi
 * components:
 *   schemas:
 *     Admin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - permissions
 *         - account_verify
 *       properties:
 *         _id:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a7738
 *         email:
 *           type: string
 *           example: admin@example.com
 *         password:
 *           type: string
 *           example: "$2a$10$h0OT/iSymt7A7I.ac5ZpWu2o4hVgUQhgc7ii1kvJZ7xIDh3Sn9r3K"
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *             example: 64ddbca37ff26a9ea19a7739
 *         account_verify:
 *           type: boolean
 *           default: false
 *         created_at:
 *           type: string
 *           format: date-time
 *           example: 2023-08-17T06:22:27.136Z
 */

// *************COMPANY SCHEMA***********************************
/**
 * @openapi
 * components:
 *   schemas:
 *     Company:
 *       type: object
 *       required:
 *         - name
 *         - logo
 *         - thumbnail
 *         - location
 *         - role
 *         - staff
 *         - one_Line_Pitch
 *         - company_email
 *         - verified
 *         - created_by
 *       properties:
 *         _id:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a7738
 *         name:
 *           type: string
 *           example: Afrisplash Remotely.
 *         role:
 *           type: string
 *           example: Project Manager
 *         logo:
 *           type: string
 *           example: http://example.com/logo.jpg
 *         thumbnail:
 *           type: string
 *           example: http://example.com/thumbnail.jpg
 *         website:
 *           type: string
 *           example: http://example.com
 *         location:
 *           type: string
 *           example: New York, USA
 *         map:
 *           type: object
 *         market:
 *           type: array
 *           items:
 *             type: string
 *             example: Technology
 *         staff:
 *           type: number
 *           example: 50
 *         members:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: 64ddbca37ff26a9ea19a7739
 *               link:
 *                 type: string
 *                 example: http://example.com/user_profile
 *         one_Line_Pitch:
 *           type: string
 *           example: No. 1 Remote marketplace for Africa's talents
 *         description:
 *           type: string
 *           example: Harnessing the power of community to promote diversity in the global remote workforce through African talents, while creating opportunities for talents to ...
 *         company_email:
 *           type: string
 *           example: info@example.com
 *         company_phone:
 *           type: string
 *           example: +1234567890
 *         socials:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               platform:
 *                 type: string
 *                 example: Twitter
 *               handle:
 *                 type: string
 *                 example: example_twitter
 *               link:
 *                 type: string
 *                 example: http://twitter.com/example_twitter
 *         verified:
 *           type: boolean
 *           default: false
 *         created_by:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a773a
 *         jobs:
 *           type: array
 *           items:
 *             type: string
 *             example: 64ddbca37ff26a9ea19a773b
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2023-08-17T06:22:27.136Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2023-08-18T08:15:43.256Z
 */

// *************JOB SCHEMA***********************************
/**
 * @openapi
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - title
 *         - industry
 *         - description
 *         - requirement
 *         - experience
 *         - type
 *         - status
 *         - location
 *         - salary
 *         - redirect
 *         - verify
 *         - private
 *         - promoted
 *         - publish
 *         - expiry
 *       properties:
 *         _id:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a7738
 *         _company:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a7739
 *         _author:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a773a
 *         title:
 *           type: string
 *           example: Software Developer
 *         industry:
 *           type: string
 *           example: Technology
 *         description:
 *           type: string
 *           example: We're looking for a skilled developer...
 *         requirement:
 *           type: string
 *           example: Proficiency in JavaScript and React...
 *         benefit:
 *           type: string
 *           example: Competitive salary, remote work...
 *         experience:
 *           type: string
 *           enum: ['Intermediate', 'Beginner', 'Senior', 'Junior', 'All']
 *           example: Intermediate
 *         type:
 *           type: string
 *           enum: ['Remote', 'Onsite', 'Hybrid']
 *           example: Remote
 *         status:
 *           type: string
 *           enum: ['Active', 'Expired', 'Archived']
 *           example: Active
 *         location:
 *           type: string
 *           example: New York, USA
 *         salary:
 *           type: object
 *           properties:
 *             amount:
 *               type: number
 *               example: 70000
 *             currency:
 *               type: string
 *               example: USD
 *             period:
 *               type: string
 *               example: Yearly
 *         redirect:
 *           type: boolean
 *           example: false
 *         redirect_url:
 *           type: string
 *           example: http://example.com/job_redirect
 *         verify:
 *           type: boolean
 *           example: false
 *         private:
 *           type: boolean
 *           example: false
 *         promoted:
 *           type: boolean
 *           example: false
 *         publish:
 *           type: boolean
 *           example: true
 *         expiry:
 *           type: string
 *           format: date-time
 *           example: 2023-12-31T23:59:59.999Z
 *         external_data:
 *           type: object
 *           properties:
 *             image:
 *               type: string
 *               example: http://example.com/job_image.jpg
 *             url:
 *               type: string
 *               example: http://example.com/external_job
 *             date:
 *               type: string
 *               format: date-time
 *               example: 2023-08-17T06:22:27.136Z
 *         applicants:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _user:
 *                 type: string
 *                 example: 64ddbca37ff26a9ea19a773b
 *               date:
 *                 type: string
 *                 example: 2023-08-17
 *               rejected:
 *                 type: boolean
 *                 example: false
 *               accepted:
 *                 type: boolean
 *                 example: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2023-08-17T06:22:27.136Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2023-08-18T08:15:43.256Z
 */

// *************PERMISSION SCHEMA***********************************
/**
 * @openapi
 * components:
 *   schemas:
 *     Permission:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         _id:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a7738
 *         name:
 *           type: string
 *           enum: [job_access, forum_access, blog_access, deals_access, all_access]
 *           example: job_access
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2023-08-17T06:22:27.136Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2023-08-18T08:15:43.256Z
 */

// *************POST SCHEMA***********************************
/**
 * @openapi
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - _author
 *         - title
 *         - categories
 *         - summary
 *         - read_time
 *         - cover_image
 *         - thumbnail
 *         - views
 *         - disable_comments
 *       properties:
 *         _id:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a7738
 *         _author:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a7739
 *         _content:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a773a
 *         title:
 *           type: string
 *           example: Introduction to Node.js
 *         url:
 *           type: string
 *           example: hello
 *         categories:
 *           type: string
 *           example: Technology
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *             example: JavaScript
 *         summary:
 *           type: string
 *           example: Learn about the basics of Node.js...
 *         read_time:
 *           type: number
 *           example: 10
 *         cover_image:
 *           type: string
 *           example: http://example.com/cover_image.jpg
 *         thumbnail:
 *           type: string
 *           example: http://example.com/thumbnail.jpg
 *         views:
 *           type: number
 *           example: 1000
 *         disable_comments:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2023-08-17T06:22:27.136Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2023-08-18T08:15:43.256Z
 */

// *************COMMENT SCHEMA***********************************
/**
 * @openapi
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - _post
 *         - body
 *       properties:
 *         _id:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a7738
 *         _post:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a7739
 *         body:
 *           type: string
 *           example: This is a great post!
 *         replies:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *                 example: I agree!
 *               time:
 *                 type: string
 *                 format: date-time
 *                 example: 2023-08-17T06:22:27.136Z
 *               name:
 *                 type: string
 *                 example: John Doe
 *         likes:
 *           type: number
 *           example: 10
 *         name:
 *           type: string
 *           example: Jane Smith
 *         email:
 *           type: string
 *           example: jane@example.com
 *         profile_pic:
 *           type: string
 *           example: http://example.com/profile_pic.jpg
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2023-08-17T06:22:27.136Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2023-08-18T08:15:43.256Z
 */

// *************CONTENT SCHEMA***********************************
/**
 * @openapi
 * components:
 *   schemas:
 *     Content:
 *       type: object
 *       required:
 *         - _post
 *       properties:
 *         _id:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a7738
 *         _post:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a7739
 *         message:
 *           type: string
 *           example: This is the content of the post.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2023-08-17T06:22:27.136Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2023-08-18T08:15:43.256Z
 */

// *************GIFT SCHEMA***********************************
/**
 * @openapi
 * components:
 *   schemas:
 *     Gift:
 *       type: object
 *       required:
 *         - title
 *         - image
 *         - url
 *         - disable
 *         - expire
 *       properties:
 *         _id:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a7738
 *         title:
 *           type: string
 *           example: Special Gift
 *         image:
 *           type: string
 *           example: http://example.com/gift_image.jpg
 *         theme:
 *           type: string
 *           example: #FF5733
 *         message:
 *           type: string
 *           example: Congratulations!
 *         url:
 *           type: string
 *           example: http://example.com/gift
 *         disable:
 *           type: boolean
 *           example: false
 *         expire:
 *           type: string
 *           example: 2023-12-31
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2023-08-17T06:22:27.136Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2023-08-18T08:15:43.256Z
 */

// *************NOTIFICATION SCHEMA***********************************
/**
 * @openapi
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - to
 *         - title
 *         - message
 *         - seen
 *         - action
 *       properties:
 *         _id:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a7738
 *         to:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a7739
 *         from:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a773a
 *         title:
 *           type: string
 *           example: New Message
 *         message:
 *           type: string
 *           example: You have a new message.
 *         seen:
 *           type: boolean
 *           example: false
 *         action:
 *           type: string
 *           example: view_message
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2023-08-17T06:22:27.136Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2023-08-18T08:15:43.256Z
 */

// *************REPORT SCHEMA***********************************
/**
 * @openapi
 * components:
 *   schemas:
 *     Report:
 *       type: object
 *       required:
 *         - reporter
 *         - reported_item
 *         - reason
 *         - type
 *       properties:
 *         _id:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a7738
 *         reporter:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a7739
 *         reported_item:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a773a
 *         reason:
 *           type: string
 *           example: Offensive content
 *         type:
 *           type: string
 *           enum:
 *             - post
 *             - user
 *             - company
 *             - job
 *             - comment
 *           example: post
 *         resolved:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2023-08-17T06:22:27.136Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2023-08-18T08:15:43.256Z
 */

// *************SPONSOR SCHEMA***********************************
/**
 * @openapi
 * components:
 *   schemas:
 *     Sponsor:
 *       type: object
 *       required:
 *         - name
 *         - image
 *         - action
 *         - url
 *         - disable
 *       properties:
 *         _id:
 *           type: string
 *           example: 64ddbca37ff26a9ea19a7738
 *         name:
 *           type: string
 *           example: Sponsor Company
 *         image:
 *           type: string
 *           example: http://example.com/sponsor_image.jpg
 *         theme:
 *           type: string
 *           example: #FF5733
 *         description:
 *           type: string
 *           example: Sponsor description
 *         action:
 *           type: string
 *           enum:
 *             - Download
 *             - Register
 *             - Visit
 *             - Apply
 *           example: Visit
 *         url:
 *           type: string
 *           example: http://example.com/sponsor
 *         disable:
 *           type: boolean
 *           example: false
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2023-08-17T06:22:27.136Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2023-08-18T08:15:43.256Z
 */

// *************************WORK EXPERIENCE SCHEMA******************************
/**
 * @openapi
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

// *************************USER CONTACT SCHEMA******************************
/**
 * @openapi
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

// *************************USER DETAILS SCHEMA******************************
/**
 * @openapi
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
