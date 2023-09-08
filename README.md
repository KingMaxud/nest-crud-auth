# CRUD with Auth using Nestjs, TypeORM, Passport, REST API

## Installation

You can use docker for running project

```bash
docker compose build    
docker compose up
```

## Usage

Open Postman and use API
# Register
```postman
    POST http://localhost:3000/authentication/register
```
```json
{
    "email": "test@gmail.com",
    "name": "test",
    "password": "1234567"
}
```

# Login
```postman
    POST http://localhost:3000/authentication/log-in
```
```json
{
    "email": "test@gmail.com",
    "password": "1234567"
}
```

# Refresh Token
```postman
    GET http://localhost:3000/authentication/refresh
```

# Create News
```postman
    POST http://localhost:3000/news
```
```json
{
    "title": "First title",
    "content": "First content"
}
```

# Update News
```postman
    PUT http://localhost:3000/news/${NEWS ID HERE}
```
```json
{
    "title": "Changed title",
    "content": "Changed content"
}
```

# Get News
```postman
    GET http://localhost:3000/news
```

# Delete News
```postman
    DELETE http://localhost:3000/news/${NEWS ID HERE}
```
