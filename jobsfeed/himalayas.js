const { isJobExpired, isSameDay } = require('../utils/isSameDay');
const settings = require('../model/settings');
const axios = require('axios');
const Xjob = require('../model/xjobs');

const himalayas = async () => {
  try {
    const API_URL = 'https://himalayas.app/jobs/api';

    let LAST_HIMALAYAS_API_UPDATE = null;
    let sameDay = false;

    // const settingDoc = await settings.findOne({ name: 'Settings' }).exec();
    // if (settingDoc) {
    //   LAST_HIMALAYAS_API_UPDATE = settingDoc.himalayas_api_update;
    // }

    const pingAPI = await axios.get(`${API_URL}?limit=1`, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:126.0) Gecko/20100101 Firefox/126.0'
      }
    });

    const get_last_update_at = new Date(pingAPI.data.updated_at * 1000);

    if (LAST_HIMALAYAS_API_UPDATE === null) {
      const newSetting = await settings.create({
        name: 'Settings',
        himalayas_api_update: get_last_update_at
      });
      await newSetting.save();
    } else {
      sameDay = isSameDay(LAST_HIMALAYAS_API_UPDATE, get_last_update_at);
    }

    // if (sameDay === false) {
    console.log('RUNNING....');
    // Fetch jobs
    const query = await axios.get(`${API_URL}`, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent':
          'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:126.0) Gecko/20100101 Firefox/126.0'
      }
    });
    const total_count = query.data.total_count;
    const jobs = query.data.jobs;

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
          new Date(job.pubDate * 1000),
          new Date(job.expiryDate * 1000),
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
    // }

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// himalayas();
module.exports = himalayas;
