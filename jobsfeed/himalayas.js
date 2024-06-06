const { isJobExpired, isSameDay } = require('../utils/isSameDay');
const settings = require('../model/settings');
const axios = require('axios');
const Xjob = require('../model/xjobs');

const himalayas = async () => {
  try {
    const API_URL = 'https://himalayas.app/jobs/api';

    let LAST_HIMALAYAS_API_UPDATE = null;
    let sameDay = false;

    const settingDoc = await settings.findOne({ name: 'Settings' });
    if (settingDoc) {
      LAST_HIMALAYAS_API_UPDATE = settingDoc.himalayas_api_update;
    }

    const pingAPI = await axios.get(`${API_URL}?limit=1`);
    const get_last_update_at = new Date(pingAPI.data.updated_at * 1000);

    if (LAST_HIMALAYAS_API_UPDATE != null) {
      sameDay = isSameDay(LAST_HIMALAYAS_API_UPDATE, get_last_update_at);

      const newSetting = await settings.create({
        name: 'Settings',
        himalayas_api_update: get_last_update_at
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
            description,
            companyName,
            companyLogo,
            minSalary,
            maxSalary,
            seniority,
            categories,
            publishedDate,
            expiryDate,
            applicationLink
          ] = [
            job.title,
            job.excerpt,
            job.companyName,
            job.companyLogo,
            job.minSalary,
            job.maxSalary,
            job.seniority,
            job.categories,
            job.pubDate,
            job.expiryDate,
            job.applicationLink
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
                source: 'himalayas'
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

module.exports = himalayas;
