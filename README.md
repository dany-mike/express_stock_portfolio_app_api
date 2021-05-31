# Wallet App API

Wallet App API is the server side of the ["Wallet App"](https://react-app-stock-portfolio.herokuapp.com/signin) application I made with React.js

## Features

* **JWT** Authentication (Signin Signup)
* Route **verification**
* **CRUD** operation on users, wallets, company shares and favorites
* MongoDB conception:
  * Each user **has one** or many wallet
  * Each company created **belongs to** a wallet
* **Search engine endpoint** with regex to find S&P500 companies on Values collection:
  * Search a value by name
  * Search a value by sector
* Send notification **email with Nodemailer**:
  * Add a company to favorite to receive a daily email
* GET S&P500 Companies data:
  * GET stock price by symbol (marketstack API)
  * GET company profile by symbol (financial modelling API)
  
## Installation

Clone the project and move to the project directory

```bash
git clone https://github.com/dany-mike/stock_portfolio_app_api.git
cd stock_portfolio_app_api/
```

Install dependencies

```bash
npm install
```

Set global values by creating a **env** file

[MarketStack API](https://marketstack.com/)

[Financial modeling API](https://financialmodelingprep.com/developer)

```.env
API_KEY_MARKETSTACK=marketstack_api_key
API_KEY_FINANCIAL_MODELING=financial_modeling_api_key
API_URL_MARKETSTACK=http://api.marketstack.com/v1/
API_URL_FINANCIAL_MODELING=https://financialmodelingprep.com/api/v3/
PORT=3000
MONGO_URL=mongodb+srv://<username>:<password>@clustername.hmjbq.mongodb.net/<DB_NAME>?retryWrites=true&w=majority
TOKEN_SECRET=token_secret_value
EMAIL_NODEMAILER=yourProviderEmail
PASSWORD_NODEMAILER=passwordProviderEmail
```

### Import Values collection in db

import the values.json file with **mongoimport** into **Values** collection to search companies by name and sector

[Mongoimport documentation](https://docs.mongodb.com/database-tools/mongoimport/)

Using --uri

```bash
mongoimport --uri "mongodb://root:<PASSWORD>@atlas-host1:27017,atlas-host2:27017,atlas-host3:27017/<DATABASE>?ssl=true&replicaSet=myAtlasRS&authSource=admin" --collection values --drop --file /somedir/values.json
```

Using --host

```bash
mongoimport --host myAtlasRS/atlas-host1:27017,atlas-host2:27017,atlas-host3:27017 --ssl -u myAtlasAdminUser -p 'myAtlasPassword' --authenticationDatabase admin  --db dbname --collection values --drop --file /somedir/values.json
```

Start the local server for development

```bash
npm run start:dev
```

Thats it for the local installation !

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
