## ROOMNER
#### Description :
Web app which helps to find the ideal room partner for you based on your personality.
<a href="https://roomner-aa868.web.app">Check it Out</a>

#### Technologies Used :
- ##### Frontend
    - ReactJS (ES6)
    - CSS3
    - Axios
- ##### UI Design
    - Adobe XD
- ##### Backend
    - NodeJS + ExpressJS
    - Firebase
        - Auth
        - Realtime Database
        - Hosting Frontend
    - Heroku
        - Hosting API
- ##### Testing
    - C++ (For testing Matching Algorithm)

#### Working :
- The Fronted (hosted on Firebase) authenticates user with google authentication. Then the user can fill in their information and answer the questions.
- After submiting the form, Roomner API (hosted on heroku) calculates the score of the user with other users and return the recommendation array.
- The User can remove themselves from the recommendation process by "Don't recommend" button.
- Firebase Realtime Database is used for storing user data
