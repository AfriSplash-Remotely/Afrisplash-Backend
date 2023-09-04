// *************************GET ALL BLOG POSTS******************************
/**
 * @openapi
 * /blog/posts:
 *  get:
 *      tags:
 *      - Blog
 *      summary: Get all blog posts
 *      responses:
 *          500:
 *              description: Internal server error
 *          200:
 *              description: All blog posts
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  example: true
 *                              status:
 *                                  example: success
 *                              count:
 *                                  type: number
 *                              pagination:
 *                                  type: number
 *                              data:
 *                                  type:
 *                                  $ref: '#/components/schemas/Post'
 */

// *************************CREATE A JOB******************************
/**
 * @openapi
 * /blog/create:
 *  post:
 *      tags:
 *      - Blog
 *      security:
 *          - BearerAuth: []
 *      summary: Create a blog post
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              example: Introduction to backend development...
 *                          content:
 *                              example: This a 2 week course on the developing scalable backend web applications..
 *                          summary: 
 *                              example: Learn about backend development
 *                          categories:
 *                              example: "Technology"
 *                          tags:
 *                              type: array
 *                              example: ["Technology", "Web"]
 *                          read_time:
 *                              example: 10
 *                          cover_image:
 *                              example: http://example.com/cover_image.jpg
 *                          thumbnail: 
 *                              example: http://example.com/thumbnail.jpg
 *                          
 *
 *      responses:
 *          200:
 *              description: Blog post created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          properties:
 *                              success:
 *                                  example: true
 *                              data:
 *                                  type:
 *                                  $ref: '#/components/schemas/Post'
 *          500:
 *              description: Internal server eeror
 */

// *************************GET A BLOG POST DETAILS******************************
/**
 * @openapi
 * /blog/post/{url}:
 *  get:
 *      tags:
 *      - Blog
 *      summary: Get a blog post details
 *      parameters:
 *          - in: path
 *            name: url
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          500: 
 *              description: Internal server error
 *          404: 
 *              description: 404 Content Do Not Exist Or Has Been Deleted
 *          200:
 *              description: Blog post details
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  example: true
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      post:
 *                                          type: object
 *                                      author:
 *                                          type: object
 *                                      body:
 *                                          type: string                                     
 */


// *************************GET MY POSTS******************************
/**
 * @openapi
 * /blog/manage:
 *  get:
 *      tags:
 *      - Blog
 *      summary: Get all my blog posts
 *      responses:
 *          200:
 *              description: Blog posts retrieved successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  example: true
 *                              data:
 *                                  type:
 *                                  $ref: '#/components/schemas/Post'
 */


// *************************DELETE A BLOG POST******************************
/**
 * @openapi
 * /blog/delete/{id}:
 *  delete:
 *      tags:
 *      - Blog
 *      security:
 *          - BearerAuth: []
 *      summary: Delete a blog post
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          200:
 *              description: Blog post deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  example: true
 *                              data:
 *                                  example: {}
 */

// *************************EDIT BLOG POST DETAILS******************************
/**
 * @openapi
 * /blog/edit/{id}:
 *  patch:
 *      tags:
 *      - Blog
 *      security:
 *          - BearerAuth: []
 *      summary: Edit blog post details
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *      requestBody:
 *          description: edit blog post details
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type:
 *                      $ref: '#/components/schemas/Post'
 *      responses:
 *          200:
 *              description: Blog post updated successfully
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

// *************************EDIT BLOG POST CONTENT******************************
/**
 * @openapi
 * /blog/edit/content/{id}:
 *  patch:
 *      tags:
 *      - Blog
 *      security:
 *          - BearerAuth: []
 *      summary: Edit blog post content
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *              required: true
 *      requestBody:
 *          description: edit blog post content
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              example: Your blog post content message here
 *      responses:
 *          200:
 *              description: Blog post content updated successfully
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
 *                                  $ref: '#/components/schemas/Content'
 */

// *************************GET ALL COMMENTS FOR A BLOG POST******************************
/**
 * @openapi
 * /blog/comment/{postid}:
 *  get:
 *      tags:
 *      - Blog
 *      summary: Get a blog post details
 *      parameters:
 *          - in: path
 *            name: url
 *            schema:
 *              type: string
 *              required: true
 *      responses:
 *          500: 
 *              description: Internal server error
 *          404: 
 *              description: 404 Content Do Not Exist Or Has Been Deleted
 *          200:
 *              description: Blog post details
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              success:
 *                                  example: true
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      post:
 *                                          type: object
 *                                      author:
 *                                          type: object
 *                                      body:
 *                                          type: string                                     
 */