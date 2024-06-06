const { isJobExpired, isSameDay } = require('../utils/isSameDay');
const settings = require('../model/settings');
const axios = require('axios');
const Xjob = require('../model/xjobs');

const empllo = async () => {
  try {
    const API_URL = 'https://empllo.com/api/v1';

    let LAST_EMPLLO_API_UPDATE = null;
    let sameDay = false;

    const settingDoc = await settings.findOne({ name: 'Settings' });
    if (settingDoc) {
      LAST_EMPLLO_API_UPDATE = settingDoc.empllo_api_update;
    }

    const pingAPI = await axios.get(`${API_URL}?limit=1`);
    const get_last_update_at = new Date(pingAPI.data.updated_at * 1000);

    if (LAST_EMPLLO_API_UPDATE != null) {
      sameDay = isSameDay(LAST_EMPLLO_API_UPDATE, get_last_update_at);

      const newSetting = await settings.create({
        name: 'Settings',
        empllo_api_update: get_last_update_at
      });
      await newSetting.save();
    }

    if (sameDay === false) {
      console.log('RUNNING......');
      // Fetch jobs
      const query = await axios.get(`${API_URL}`).data;
      const total_count = query.total_count;
      const jobs = query.jobs;

      jobs.forEach(async (job) => {
        // check if job has expired
        const expireDate = new Date(job.expiryDate * 1000);
        const jobExpired = isJobExpired(expireDate);

        if (jobExpired === false) {
          const [
            title,
            // description,
            companyName,
            companyLogo,
            minSalary,
            maxSalary,
            seniority,
            categories,
            publishedDate,
            expiryDate,
            applicationLink,
            jobType,
            workModel
          ] = [
            job.title,
            // jobs.excerpt,
            job.companyName,
            job.companyLogo,
            job.minSalary,
            job.maxSalary,
            job.seniorityLevel,
            job.tags,
            job.pubDate,
            job.expiryDate,
            job.applicationLink,
            job.jobType,
            job.workModel
          ];
          // create job
          const newJob = await Xjob.create(
            [
              {
                title,
                description,
                companyName,
                companyLogo,
                minSalary,
                maxSalary,
                seniority,
                categories,
                publishedDate,
                expiryDate,
                applicationLink,
                jobType,
                workModel,
                source: 'empllo'
              }
            ],
            { new: true }
          );

          await newJob[0].save();
        }
      });
    }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = empllo;
