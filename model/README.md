## Database Schema 

The Aggregate in Mongoose(Mongod) is Quite Similar with That Of Sequelize

Here A Link Explaining how [Schema Work](https://masteringjs.io/tutorials/mongoose/schema)

___

## List Of Schema

The Schema Will Be Updated Many Times to fit Some Query 

It's Contain Attributes Which May Seen As Bad Or **Unnecessary** to Help Mongoose perform Well 

<!-- trust Me -->

### 1. auth (recuiter friendly)

This Table Manages The Users For authentications 

To Make the query faster its contain only the `Authenications Data` 

| Attribute       | Type        
| ------------- |:-------------:| 
| _ID | PRIMARY_KEY table(SELF)|
| User | FOREIGN_KEY table(users)|
| Email | String - Require - True |
| Account_Setup_Completed | Boolean - Require - True |
| Email_verify | Boolean - Require - True |
| Password | 64bit(Hash)- Require - False  | <!-- GOOGLE OAUTh -->
<!-- I Am Speed -->

<!-- 
    Account Setup is to resume or take Back User to Finish The onboarding process
    User Type is to handle the recuiter and candidate data 
    Auth Expires in 2 week 
-->

### 2. user (recuiter friendly)

This Table Manages The Users Details 

its contain a the `Foreign key` Pointing to the `auth table` 

| Attribute       | Type        
| ------------- |:-------------:| 
| _ID | PRIMARY_KEY table(SELF)|
| User | FOREIGN_KEY table(auth)|
| Account_Setup_Completed | Boolean - Require - True |
| User_Type | String - Require |
| First Name     | String - Require - True|
| Last Name     | String - Require - True|
| Email | String - Require - True |
| Bio     | String - Require - False|
|<!--Files-->|
| Profile Picture     | String/URL - Require - True|
| Smaller Profile Picture     | String/URL - Require - false|
| Cover Letter     | String/URL - Require - False|
| CV     | String/URL - Require - False|
| Langauge | Array[Object] - Require - True |
| Location     | String - Require - True|
| Role (Work Detail)     | String - Require - False|
| Avalibity (Time OnJob)     | Array - Require - False|
| Badge(User Reputation) | Number - Default - 0 - Max - 5  |
| Phone | String/Number - Require - True |
| Skill | Array[String] - Require - False|
| Experience | Array[Object] - Require - True |
| Education | Array[Object] - Require - True |
| Jobs | Array[Object] - Require - True |
 |<!--User Deatil-->|
| Setting | Object - Require - True |
| Hide_Detail | Boolean - Require - True |
| Ready_to_interveiw | Boolean - Require - True |
| Password | 64bit(Hash)- Require - True  |
| Friends | Array[Obejct]|
| Company_ID | FOREIGN_KEY table(company) |
| Company_ROLE | String |
| Extra_Email | String - Require - False |
| Notifications | [FOREIGN_KEY table(notifications)]|
| Gifts | [FOREIGN_KEY table(gift)]|
| Work_History |  Array[Object] - Require - False |


### 3. Companies

This Table Manages The Companies Registered  

| Attribute       | Type        
| ------------- |:-------------:| 
| Name     | String - Require - True|
| Logo     | String/URL - Require - True|
| thumbnail     | String/URL - Require - True|
| Website    | String/URL - Require - False|
| Location     | String - Require - True|
| map     | String - Require - false|
| Market     | Array[String] - Require - True|
| Number_Of_Employee(Staff)     | Number - Require - True |
| Team_Members   (Members)  | Array[ObjectID] - Require - True |
| One_Line_Pitch    | String - Require - True|
| Description (About)    | String - Require - False|
|<!--Company Contact-->|
| Email | String - Require - True |
| Phone | String/Number - Require - True |
| Socials | Array[Object] |
| Verify | Boolean - Require - True |
| CreateBy | FOREIGN_KEY table(user)|
| invites     | Array[String] - Require - True|

### 4. Sponsor

This Table Manages The Sponsor Post  
<!-- Add a Expire system with a cron job o manage  b  -->

| Attribute       | Type        
| ------------- |:-------------:| 
| Name     | String - Require - True|
| Url    | String/URL - Require - True|
| Image     | String/URL - Require - True|
| Theme Colour     | String - Require - True|
| Description     | String - Require - True|
| Action     | String - Require - True|
| Disable | Boolean - Require - True |


### 5. Notification (recuiter friendly)

This Table Manages The Notifications For A User  
<!-- Add a Expire system with a cron job o manage  b  -->

| Attribute       | Type        
| ------------- |:-------------:| 
| Title     | String - Require - True|
| Message     | String - Require - True|
| Action    | String/URL - Require - True|
| To     |  FOREIGN_KEY table (`User`)|
| From     |  FOREIGN_KEY table (`User`)|
| From_Des     |  String - Not Require|
| created_at     | Date|
| Seen | Boolean - Require - True |
| Theme | String - Require - Colour |

### 6. Gifts (recuiter friendly)

This Table Manages The Gift Avaliable For A User Or Company  
<!-- Add To A Particular Group  -->

| Attribute       | Type        
| ------------- |:-------------:| 
| Title     | String - Require - True|
| Message     | String - Require - True|
| Image     | String/URL - Require - True|
| Action / Url To Explains    | String/URL - Require - True|
| Theme | String - Require - Colour |
| Created | Date  |
| Expire | Date  |
| For | schema {Object}  |


### 7. Jobs
<!-- I am tempeted to host this data on a different server -->
This Table Manages The Jobs Created Registered  

| Attribute       | Type        
| ------------- |:-------------:| 
| Name     | String - Require - True|
| Website    | String/URL - Require - True|
| Logo     | String/URL - Require - True|
| Level     | String - Require - True|
| Location     | String - Require - True|
| Type     | String - Require - True|
| Salary | String - Require - True |//
| Market     | Array[String] - Require - True|
| Number_Of_Employee     | Number - Require - True|//
| One_Line_Pitch    | String - Require - True|
| Salary     | Array[Object] - Require - True |
| Phone | String/Number - Require - True|
| About     | String - Require - False|
| Socials | Array[Object] |
| Private | Boolean - Require - True |
| Verify | Boolean - Require - True |
| _Author | PRIMARY_KEY table(user)|
| _comapny | FOREIGN_KEY table(company)|


### 8. Post Table (Blog)

This Table is for blogs hosted on the system   

| Attribute       | Type        
| ------------- |:-------------:| 
| _ID | PRIMARY_KEY table(SELF)|
| _Author | FOREIGN_KEY table(user)|
| _content | FOREIGN_KEY table(post_body)|
| Title     | String - Require - True|
| Url     | String - Require - True|
| Categories    | String - Require - True|
| Tags | Array[string] |
| Summary     | String - Require - True|
| Read_Time     | Number - Require - True |
| Cover_Image     | String/URL - Require - True|
| Thumbnail     | String/URL - Require - True|
| veiws     | Number - Require - True |
| Created_at | Date  |
| Update_at | Date  |
| Disable_Comment | Boolean - Require - True |


### 9. Comment (Blog)

This Table Manages Of A Post Single Chainning   

| Attribute       | Type        
| ------------- |:-------------:| 
| _ID | PRIMARY_KEY table(SELF)|
| _post | FOREIGN_KEY table(post)|
| body    | String - Require - True|
| Replies | Array[Object] |
| Likes | Number  |
| Created | Date  |
| user | Object |



### 10. Post Content (blog)

This Contain the content or body of a blog  
<!--Reason
    Since the front end is using a WYSIWYG package
    image, video and other assest would / might be converted to a 64 bit 
    So it would make a row appromixate greater than > 5mb if not correctly optimized 
   -->

| Attribute       | Type        
| ------------- |:-------------:| 
| _ID | PRIMARY_KEY table(SELF)|
| _post | FOREIGN_KEY table(post) |
| Message     | String - Require - False|
