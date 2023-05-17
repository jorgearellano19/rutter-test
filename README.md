# RUTTER TEST TASK

This Task contains an API based on the Shopifiy API (https://rutterapi.notion.site/Technical-Take-home-Question-Contractors-only-a989ec40c1b84d399a31e8f7061ea70b)

## TOOLS USED
  - NodeJS with ExpressJS
  - TypeScript
  - PostgreSQL
  - Prisma ORM

  - The Shopify connection is on prisma/seed.ts file. There you can find how I handle the Pagination API requests. 
  - On src files you can find an express server divided on services, routes, middlewares and errors.


## How to Run for the first time
- Make sure you have the environment variables in your .env file based on the .env.example 
- If you don't have a DB you can use this one shared in this link: https://onetimesecret.com/private/6hbaj54c0sw1j6aqbrijo9drf6rvgva
- Run the following scripts:
  - npm install
  - npm run prisma:migrate for dev environment and npm run prisma:migrate-prod for prod environment 
  - npx prisma db:seed
  - npx prisma generate
  - npm run start:dev for dev environment
  - npm run start for production build.

If you already have your data on the db just do:
 - npm install 
 - npm run prisma:generate
 - npm run start:dev

## How to use the server:

getProducts() -- GET /products/
Query Params: 
  - Size - number (Must be 15, 25 or 25)
  - Page - number

Success Response Format:
```JSON
{
    "statusCode": 200,
    "data": [
        {
            "line_items": [
                {
                  "product_id": string | null
                }
            ],
            "id": string,
            "platform_id": string
        },
    ]
}
```

getOrders() -- GET /products/
Query Params: 
  - Size - number (Must be 15, 25 or 25)
  - Page - number

Success Response Format:

```JSON
{
    "statusCode": 200,
    "data": [
        {
            "id": string,
            "platform_id": string,
            "name": string
        },
    ]
}  
    
```

Error Response Format:
```JSON
{
    "message": string,
    "name": string
}
```