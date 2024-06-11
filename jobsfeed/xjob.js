const Xjob = require('../model/xjobs');

/**
 * @author Timothy-py <adeyeyetimothy@gmail.com>
 * @description Get All X Jobs
 * @route `/api/v1/xjobs/`
 * @access PUBLIC
 * @type GET
 */
exports.getXjobs = async (req, res) => {
  try {
    let { page, limit } = req.query;

    page = page ? +page : 0;
    limit = limit ? +limit : 25;
    console.log(page, limit);

    const data = await Xjob.paginate(
      {},
      {
        page: page,
        limit: limit
      }
    );

    const jobs = data.docs;

    return res.status(200).json({
      status: 'success',
      message: 'Jobs retrieved successfully',
      data: jobs,
      totalDocs: data.totalDocs,
      offset: data.offset,
      limit: data.limit,
      totalPages: data.totalPages,
      page: data.page,
      pagingCounter: data.pagingCounter,
      hasPrevPage: data.hasPrevPage,
      hasNextPage: data.hasNextPage,
      prevPage: data.prevPage,
      nextPage: data.nextPage
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'An error occurred',
      error: error
    });
  }
};
