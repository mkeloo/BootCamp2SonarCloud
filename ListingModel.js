/* Import Sequalize and other libraires */
//Syntax for importing ES Modules - https://www.geeksforgeeks.org/how-to-use-an-es6-import-in-node-js/
import { Sequelize, DataTypes } from '@sequelize/core';

//imports dontenv module and allows us to access stored environment variables stored in .env file
import 'dotenv/config';

/* Connect to your database 
  See: Sequalize Getting Started - Connecting to a database by passing a URI - Read: https://sequelize.org/docs/v6/getting-started/#connecting-to-a-database
  Copy URI/URL string from ElephantSQL - under details. 
  Security Best Practice: Don't use the URL/URI string (postgres://username:password@hostname/databasename) directly in applciation code. Store the database URL as the API_URL environment variable within the .env file. 
  BAD Implementation - const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres
  Good Implementation - const sequelize = new Sequelize(process.env.API_URL);
  Read - artilce to learn more about environment variables - https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786
*/
//ADD CODE HERE to connect to you database
const sequelize = new Sequelize(process.env.API_URL);

/* Create your Sequalize Model for Listing */
/*Hint: Take a look at listings.json to figure out the model attributes we need to define.
  We are creating this model to define the format of our table.
  Read up on how to define a model using sequelize.define - https://sequelize.org/docs/v6/core-concepts/model-basics/
  Also Check out - //Data Types - https://sequelize.org/docs/v6/core-concepts/model-basics/#data-types
*/
const Listing = sequelize.define(
  'Listing',
  {
    // Model attributes are defined here
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // Other model options go here
    tableName: 'Listings',
  }
);

// `sequelize.define` also returns the model
console.log(Listing === sequelize.models.Listing); // true
console.log(sequelize.define());
// checking the model definition to print the model attributes and their types
// console.log(Listing.modelDefinition);
// print the model raw attributes and their types
// Object.keys(Listing.modelDefinition.rawAttributes).forEach((attribute) => {
//   console.log(
//     `Attribute: ${attribute}, Type: ${Listing.modelDefinition.rawAttributes[attribute].type}`
//   );
// });

/* Export the model to make it avaiable to other parts of your Node application */
//Read article "ES6 Modules and How to Use Import and Export in JavaScript" https://www.digitalocean.com/community/tutorials/js-modules-es6
//Export the model 'Listing' in a single statement at the end of the module
export { Listing };
