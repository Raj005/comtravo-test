# Comtravo techincal challenge

### I decided to create a microservice architecture in Nodejs using Design principles and patterns like SOLID principles, Dependency Injection (DI), Facade etc.

## How to Run and Test

- npm install
- npm run test
- npm start

### Run the server with `npm start` and then visit `localhost:5000/api/v1/flights` using browser or use any tool like postman to hit this api.

### Response looks like this

```
{
    "flights": [
        {
            "slices": [
                {
                    "origin_name": "Schonefeld",
                    "destination_name": "Stansted",
                    "departure_date_time_utc": "2019-08-08T08:00:00.000Z",
                    "arrival_date_time_utc": "2019-08-08T10:00:00.000Z",
                    "flight_number": "8543",
                    "duration": 120
                },
                {
                    "origin_name": "Stansted",
                    "destination_name": "Schonefeld",
                    "departure_date_time_utc": "2019-08-10T06:50:00.000Z",
                    "arrival_date_time_utc": "2019-08-10T08:40:00.000Z",
                    "flight_number": "145",
                    "duration": 110
                }
            ],
            "price": 147.9
        },
        {
            "slices": [
                {
                    "origin_name": "Schonefeld",
                    "destination_name": "Luton",
                    "departure_date_time_utc": "2019-08-08T07:55:00.000Z",
                    "arrival_date_time_utc": "2019-08-08T09:50:00.000Z",
                    "flight_number": "2102",
                    "duration": 115
                },
                {
                    "origin_name": "Luton",
                    "destination_name": "Schonefeld",
                    "departure_date_time_utc": "2019-08-10T05:25:00.000Z",
                    "arrival_date_time_utc": "2019-08-10T07:20:00.000Z",
                    "flight_number": "2101",
                    "duration": 115
                }
            ],
            "price": 148.87
        }
    ]
}
```
