 <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      margin: 20px;
    }

    h1 {
      text-align: center;
      color: #333;
    }

    h2 {
      color: #007BFF;
    }

    h3 {
      color: #6C757D;
    }

    ul {
      list-style: none;
    }

    li {
      margin-bottom: 5px;
    }

    p {
      margin-bottom: 10px;
    }

    strong {
      color: #DC3545;
    }
  </style>
<h1 style= "text-allign:center">
GStop </h1>
<h2>Overview</h2>
<h3> 
Welcome to GStop, your one-stop destination for all your online gaming needs! GStop is a web application designed to provide a seamless and enjoyable experience for gamers looking to explore, purchase, and stay updated on the latest and greatest games in the industry.</h3>
<h2>Technologies used</h2>
<ul>
  <li><h3>ReactJs</h3></li>
  <li><h3>ASP.NET</h3></li>
  <li><h3>Entity Framework Core</h3></li>
  <li><h3>Microsoft Identity</h3></li>
</ul>
<h2>How to run</h2>
<h3>1. Open your cloned folder in your VS code</h3>
<h3>2. In the client/GStop/package.json you should change the route of the "start:api" with the equivalent route to the api </h3>
<h3>3. Run the commands:
</br> -cd GStop-Final/client/GStop </br>
-npm i</h3>
<h3>The project is set to run concurrently with the -npm start command</h3>

<h2>Users</h2>
<h3>Guest</h3>
<p>Guests have access only to the home page and to the login pages</p>
<h3>User</h3>
<p>Users have access  to all pages that do not require admin role and to the following functionality 
<ul>
  <li>Add money</li>
  <li>Like game</li>
  <li>Comment game</li>
  <li>Delete own comment</li>
  <li>Buy game</li>
  <li>View Details</li>
  <li>Browse the shop</li>

</ul></p>
<h3>Admin</h3>
<p>Admins have access to all pages and all the functionality of users including the functionality to <ul>
  <li>Add games</li>
  <li>Edit Game</li>
  <li>Delete Game</li>
  <li>Delete Comments</li>
</ul> </p>
<strong>NOTE</strong><p>To register as admin you must do it from the API method register-admin directly! </p>
<h2>Database</h2>
<h3>The Database of GStop is a relational database that has the following Entities: 
  <ul>
    <li>Games </li>
    <li>Comments </li>
    <li>Likes</li>
    <li>Users</li>
  </ul><h3>
