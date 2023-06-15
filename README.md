<div align="center">
<h1>MegaAdsBack</h1>
<p>
Sales Advertisements
</p>
<hr>

<h4>
    <a href="https://wyso.networkmanager.pl/">View Demo</a>
</h4>
<hr>
<strong>
    More information on the application described in [FE]
</strong>
<h4>
    <a href="https://github.com/MWyso/MegaAdsFront/blob/main/README.md">MegaAdsFront</a>
</h4>
<hr>
  </p>


</div>

## Table of contents
* [Technologies](#technologies)
* [Setup](#setup)

## Technologies
**Backend** is created with:
* Node.js
* Express.js
* TypeScript
* mySQL
* packages like: leaflet
## Setup

### Step1
``
$ git clone https://github.com/MWyso/MegaAdsBack.git
``
### Step2
***Database***
<br>
To import the database using [phpMyAdmin](http://localhost/phpmyadmin), follow these steps:

1. Open phpMyAdmin and connect to the server.
2. Create a new database and import the "db.sql" file.
3. After completing the above steps, the database and values will be imported into your project.

***Environment Variables***
<br>
To configure environment variables in your project, follow these steps:

1. In the **config** folder, create a file named **config.ts** and open it.
   Copy the contents of the config.example.ts file into it - this file contains example values for environment variables.
2. In the **config.ts** file, fill in the data for each environment variable value and save it.
3. After completing the above steps, the environment variables will be configure
### Step3
Use script from package.json
<br>
````
"scripts": {
"start": "ts-node index.ts",
"start:dev": "tsnd index.ts",