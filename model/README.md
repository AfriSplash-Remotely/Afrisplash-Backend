## Database Schema 

The Aggregate in Mongoose(Mongod) is Quite Similar with That Of Sequelize

Here A Link Explaining how [Schema Work](https://masteringjs.io/tutorials/mongoose/schema)

___

## List Of Schema

The Schema Will Be Updated Many Times to fit Some Query 

It's Contain Attributes Which May Seen As Bad Or **Unnecessary** to Help Mongoose perform Well 

<!-- trust Me -->

### 1. Users (Not recuiter friendly)

This Is the Table That Manage The Branches

| Attribute       | Type        
| ------------- |:-------------:| 
| First Name     | String - Require - True|
| Last Name     | String - Require - True|
| Date of Birth     | Date - Require - True|
| Gender     | String - Require - True|
| Bio     | String - Require - False|
| Profile Picture     | String/URL - Require - True|
| Langauge | Array[Object] - Require - True |
| Location     | String - Require - True|
| Role (Work Detail)     | String - Require - False|
| Avalibity (Time OnJob)     | String - Require - False|
| Badge(User Reputation) | Number - Default - 0 - Max - 5  |
| Phone | String/Number - Require - True |
| Email | String - Require - True |
| Skill | Array[String] - Require - False|
| Experince | Array[Object] - Require - True |
| Education | Array[Object] - Require - True |
 |<!--User Deatil-->|
| Email_verify | Boolean - Require - True |
| Setting | Object - Require - True |
| Hide_Detail | Boolean - Require - True |
| Ready_to_interveiw | Boolean - Require - True |
| Password | 64bit(Hash)- Require - True  |
|Friends | Array[Obejct]|
