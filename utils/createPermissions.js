const Permission = require('../model/permission');
const permissionsArray = require('../config/permissions.string');

module.exports = async () => {
  try {
    const permissionData = permissionsArray;

    for (let i = 0; i < permissionData.length; i++) {
      const permissionName = permissionData[i];

      // check if permission already exist
      const existintPermission = await Permission.findOne({
        name: permissionName
      });

      if (!existintPermission) {
        const permission = new Permission({
          name: permissionName
        });
        await permission.save();
        console.log(`Created permission: ${permissionName}`);
      }
    }
  } catch (error) {
    console.error('Error creating permissions', error);
  }
};
