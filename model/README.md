## Database Schema 

The Aggregate in Mongoose(Mongod) is Quite Similar with That Of Sequelize

Here A Link Explaining how [Schema Work](https://masteringjs.io/tutorials/mongoose/schema)

___

## List Of Schema

The Schema Will Be Updated Many Times to fit Some Query 

It's Contain Attributes Which May Seen As Bad Or **Unnecessary** to Help Mongoose perform Well 

<!-- trust Me -->

### 1. users (recuiter friendly)

This Table Manages The Users For authentications 

To Make the query faster its contain only the `Authenications Data` 

| Attribute       | Type        
| ------------- |:-------------:| 
| _ID | PRIMARY_KEY table(SELF)|
| Talent_Type     | String/URL - Require |
| Email | String - Require - True |
| Email_verify | Boolean - Require - True |
| Password | 64bit(Hash)- Require - True  |
<!-- I Am Speed -->

### 2. user_detail (recuiter friendly)

This Table Manages The Users Details 

its contain a the `Foreign key` Pointing to the `users table` 

| Attribute       | Type        
| ------------- |:-------------:| 
| _ID | PRIMARY_KEY table(SELF)|
| User | FOREIGN_KEY table(users)|
| First Name     | String - Require - True|
| Last Name     | String - Require - True|
| Date of Birth     | Date - Require - True|
| Gender     | String - Require - True|
| Talent_Type     | String/URL - Require - False|
| Bio     | String - Require - False|
|<!--Files-->|
| Profile Picture     | String/URL - Require - True|
| Cover Letter     | String/URL - Require - False|
| CV     | String/URL - Require - False|
| Langauge | Array[Object] - Require - True |
| Location     | String - Require - True|
| Role (Work Detail)     | String - Require - False|
| Avalibity (Time OnJob)     | String - Require - False|
| Badge(User Reputation) | Number - Default - 0 - Max - 5  |
| Phone | String/Number - Require - True |
| Skill | Array[String] - Require - False|
| Experince | Array[Object] - Require - True |
| Education | Array[Object] - Require - True |
 |<!--User Deatil-->|
| Setting | Object - Require - True |
| Hide_Detail | Boolean - Require - True |
| Ready_to_interveiw | Boolean - Require - True |
| Password | 64bit(Hash)- Require - True  |
| Friends | Array[Obejct]|
| Company_ID | FOREIGN_KEY table(company) |
| Company_ROLE | FOREIGN_KEY table(company) |
| Extra_Email | String - Require - False |
| Work_History |  Array[Object] - Require - False |


### 2. Companies

This Table Manages The Companies Registered  

| Attribute       | Type        
| ------------- |:-------------:| 
| Name     | String - Require - True|
| Website    | String/URL - Require - True|
| Logo     | String/URL - Require - True|
| Last Name     | String - Require - True|
| Location     | String - Require - True|
| Co-Ordinate     | String - Require - True|
| Market     | Array[String] - Require - True|
| Number_Of_Employee     | Number - Require - True |
| One_Line_Pitch    | String - Require - True|
| Team_Members     | Array[Object] - Require - True |
|<!--Company Contact-->|
| Email | String - Require - True |
| Phone | String/Number - Require - True |
| About     | String - Require - False|
| Socials | Array[Object] |
| Verify | Boolean - Require - True |
| Hide_Detail | Boolean - Require - True |