# Psychiatric Patient Registration System

A web backend for a psychiatric patient registration system. Psychiatrists can register patients through a mobile/web portal, and various functionalities are provided, including patient registration and fetching hospital details.

## Major Libraries/Frameworks Used

- **Express.js**: Used as the web framework for handling HTTP Server which handle the requests and routing and helps to make REST Api's .
- **Mongoose**: ODM library for MongoDB, used for data modeling and interactions with the database,we can talk to Database or query it without writing mongodb query .
- **express-validator**: Library for input validation used as a middleware.
- **Dotenv**: Library for loading the environment variables.
- **Bcrypt**: Library for hashing the password.
- **cookie-parser**:It parse the Cookie which is send by client and we can easily access it.
- **cors**: We can used to talk any frontend to backend.
- **jsonwebtoken**: it Create the JWT Secret hash and use to hashing.
- **helmet**: It make the attacker to hard and attack the aur node js app .
- **multer**: Library for to upload image.
- **morgan**: It is a library it tell which route is called now and how much time to take to complete it in milli second.
- **http-errors**: Library for easily create the http errors.

## API Endpoints

## Base URL:http://localhost:8080/api/v1

### Hospital

### Get Hospital Details

- **Endpoint**: `${URL}/hospital/`
- **Method**: `GET`
- **Description**: Get Hospital Details from DB
- **Request Body**:

```json
{
  "HospitalId": "id"
}
```

- **Response**:

```json
{
  "success": "true",
  "msg": "One Patient can assigned more than 1 Psychiatrists",
  "hospital": {
    "hospitalName": "hospital name",
    "totalPsychiatrist": 1,
    "totalPatient": 1,
    "psychiatrist": [
      {
        "id": "pst id",
        "name": "name",
        "patientCount": 1,
        "Patient": [
          {
            "_id": "664c5cf2693f8594f5e79fca",
            "name": "patient name",
            "email": "patient email"
          }
        ]
      }
    ]
  }
}
```

### Register Hospital

- **Endpoint**: `${URL}/hospital/register`
- **Method**: `POST`
- **Description**: Register Hospital and save in DB
- **Request Body**:

```json
{
  "name": "Hospital name"
}
```

- **Response**:

```json
{
  "success": "true",
  "msg": "Hospital register Successfully"
}
```

### Psychiatrists Api's

### Register Patient Details by only Psy

- **Endpoint**: `${URL}/psy/add`
- **Method**: `POST`
- **Description**: Register the new Patient.
- **Request Body:**

```json
{
  "name": "John Doe",
  "address": "123 Main Street, Springfield, IL",
  "email": "john.doe@example.com",
  "phone": {
    "countryCode": "+91",
    "phoneNumber": "9876543210"
  },
  "password": "securePassword123",
  "photo": {
    "data": "<base64-encoded-photo>",
    "contentType": "image/jpeg"
  },
  "role":"psy"
  "psychiatrists": ["60c72b2f9b1d4c3a8e7e4b44"]
}
```

- **Response**:

```json
{
  "success": "true",
  "msg": "Patient register Successfully"
}
```

### Login Psychiatric

- **Endpoint**: `${{URL}}/psy/login`
- **Method**: `POST`
- **Request Body**:

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123",
   "role":"psy"
}
```

- **Response**:

```json
{
  "success": "true",
  "msg": "Psychiatric login Successfully"
}
```

### Logout Psychiatric

- **Endpoint**: `${{URL}}/psy/logout`
- **Method**: `POST`

- **Response**:

```json
{
  "success": "true",
  "msg": "Psychiatric Logout Successfully"
}
```

### Patient Api's




### Login Patient

- **Endpoint**: `${{URL}}/patient/login`
- **Method**: `POST`
- **Request Body**:

```json
{
  "email": "john.doe@example.com",
  "password": "securePassword123",
   "role":"Patient"
}
```

- **Response**:

```json
{
  "success": "true",
  "msg": "Patient login Successfully"
}
```

### get Patient
- **Endpoint**: `${{URL}}/patient/:id`
- **Method**: `GET`
- **Request Body**:
```json
{
   "role":"Patient"
}
```

- **Response**:

```json
{
  "success": "true",
  "msg": "Patient login Successfully"
}
```


### Logout Patient

- **Endpoint**: `${{URL}}/patient/logout`
- **Method**: `POST`

- **Response**:

```json
{
  "success": "true",
  "msg": "Patient Logout Successfully"
}
```

## Postman Documentation

- [Postman Collection Link](hospitalSystem.postman_collection.json)

## Database

- Database Name: `lattice`
- Collections: `patients`, `hospitals`, `psychiatrists`
- Data files for MongoDB collections:
  - [patients.json](database/patients.json)
  - [hospitals.json](database/hospitals.json)
  - [psychiatrists.json](database/psychiatrists.json)
