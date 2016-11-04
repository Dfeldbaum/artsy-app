
### Artsy App

---

### Deliverables

* Wireframes for views
* Completed simple full stack art and photos gallery app
* Git repository on GitHub with files of app: https://github.com/Dfeldbaum/artsy-app

--- 

### Technical Requirements

* App created within Node.js/Express server, which contains login, register, and profile page views 
* Maintained a KISS and DRY approach to code as much as possible (some refactoring still required)

--- 

### App Summary & User Stories 

* ARTSY is a full stack app built with Node.js, Express, MySQL, Handlebars, and Javascript
* Styling is comprised of custom CSS/SASS and element the Materialize.CSS framework
* MySQL database contains a users table and a photos table  
* Handlebar routes/views include a login page, where new users can register and returning users can login
* Upon landing on register page, users can sign up with unique first_name, last_name, username and password which feeds into photo table
* Returning users and registered users route to a profile page view where art and photos can be uploaded into gallery
* Images are uploaded into photos table as a base 64 string and then re-encoded as an image when queried into profile page gallery   
* Users can logout of their sessions by clicking logout in the nav bar which ends the user session and routes the user back to the login page

--- 

### To Do 

* Fix register session bugs, which prevent refreshing window
* Enhance gallery template that receives encoded images upon each upload and then query
* Add logout view and messaging
* Add Facebook sharing capabilities

--- 

### Ackowledgements

All art uploaded into app is property of original owners and artists




