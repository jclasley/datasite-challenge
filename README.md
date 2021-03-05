Code Test 
================================

## Test description & expectation

We have three endpoints

* https://5c3ce12c29429300143fe570.mockapi.io/api/registeredusers returns all the registered users in the system
* https://5c3ce12c29429300143fe570.mockapi.io/api/unregisteredusers returns all the unregistered users in the system
* https://5c3ce12c29429300143fe570.mockapi.io/api/projectmemberships returns all the project memberships for all users, registered and unregistered, in the system

Your task is to implement a new service with a single endpoint that will return all the users, registered and unregistered, including the project ids the users belong to.  If users do not belong to a project, project ids attribute would contain an empty array in the response payload. 

The service can be implemented in any language/platform that you are most comfortable with.  Having said that, we do have primary languages on our team so you would get mucho respect & bonus points if the solution is implemented in the following languages.
```
java
groovy
kotlin
node (es6+ | typescript)
```  

The endpoint must use http protocol.  The endpoint must return json by default.

Example of json payload to be returned from the new endpoint
```
[
  {
    "id": "1",
    "city": "Jaydashire",
    "company": "Goyette - Renner",
    "country": "South Africa",
    "firstName": "firstName 1",
    "lastName": "lastName 1",
    "organizationType": "organizationType 1",
    "phone": "524.276.1570 x487",
    "state": "SD",
    "zipCode": "68048",
    "disclaimerAccepted": false,
    "languageCode": "en",
    "emailAddress": "last1@mail.com",
    "projectIds": ["1","2"]
  },
  {  
    "id":"21",
    "emailAddress":"email1@somewhere.com",
    "languageCode":"en",
    "registrationId":"jwsMJNOk3oM3hVM5bGcF1",
    "registrationIdGeneratedTime":"156165026851",
    "projectIds": []
  }   
]
```  

The solution must include tests

Once you have complete the solution, please do the following

1. Fill in the [Test solution](#test-solution-a-namesolutiona) 
2. Push it as a public repo on github.com. 
3. Send us the link to your repo and we will take a look.  Thank you very much! 

## Test solution <a name="solution"></a>

Provide the instructions below.  Please double check your instruction to make certain that it works.    

**Required components for running the application in development mode**
```
Tell us what components we need to run your solution locally
```
<ins>Running</ins>

Node

<ins>Testing</ins>

Jest, Supertest

**Install**
```
Tell us what commands we have to run to install your solution dependencies locally
```
If only running for functionality, nothing
If you are wanting to run `npm run test`, you will need to `npm i` and possibly `npm i -g jest` which will globally install jest for CLI use. You can read more about global installation [here](https://docs.npmjs.com/downloading-and-installing-packages-globally) if you'd like to remove jest after installation.

**Start the internal application in development mode**
```
Tell us what commands/things we have to do to run your solution locally
Tell us what commands/things we have to do to execute the endpoint locally 
```
Ensure port 8080 is available then `npm run start`

If you have issues with 8080, try `<PORT #> nodemon server/start.js`, which will change the env variable and run on that port

To execute the endpoint: `curl localhost:<PORT>/api/alldata`


**Optional but would really impress us**
```
Build a dockerfile and include instructions how to build the image, start the container and execute the endpoint for that container locally
```

`docker run -dp 8080:8080 jclasley/datasitechallenge`
`curl localhost:8080/api/alldata`

Posted on dockerhub so you don't need to `docker build`!

**Informational**
```
Tell us anything else we should know
```