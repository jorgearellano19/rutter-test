# RUTTER TEST TASK

This Task contains an API based on the Shopifiy API (https://rutterapi.notion.site/Technical-Take-home-Question-Contractors-only-a989ec40c1b84d399a31e8f7061ea70b)

## TOOLS USED
  - NodeJS with ExpressJS
  - TypeScript
  - PostgreSQL
  - Prisma ORM

## How to Run Locally
- Make sure you have the environment variables in your .env file

- Run the following scripts:
  - npm install
  - npm run prisma:migrate for dev environment and npm run prisma:migrate-prod for prod environment 
  - npx prisma db:seed
  - npx prisma generate
  - npm run start:dev for dev environment
  - npm run start for production build.


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