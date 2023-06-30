const cron = require('node-cron');
const jobs = require('../model/jobs');

const cronjob = cron.schedule('0 0 * * *', async () => {
  // get current date
  const currentDate = new Date();

  // Find all jobs Active and have expiry date less than or equal to current date
  const expiredJobs = await jobs.find({
    status: 'Active',
    expiry: { $lte: currentDate }
  });

  // update status of expired jobs to Expired
  const updatePromises = expiredJobs.map(async (job) => {
    job.status = 'Expired';
    await job.save();
  });

  await Promise.all(updatePromises);
});

module.exports = cronjob;
