# Listo Marketplace - API Aplication

Listo is a marketplace platform.

## Acknowledgments

TBD

## API carachteristics

- Stack used: Node, Express, Mongoose, Cors, Passport, Bcrypt, Multer, Cloudinary-Multer
- Requests inplemented: GET, POST, PUT, PATCH & DELETE
- Deployed at: Heroku

- Link to API: [https://localhost]
- Endpoints: TBD

- Link to Front-End aplication: [https://localhosy]
- Link to Front-End repository: [https://github.com/paulanicioli/ironhack-project-module-3-front]

## Additional implementations and improvements

TBD

## Contributing

Please feel free to fork/clone this repo to look deeper into the logics of this API and contribute with some of the above improvements if you like.
By forking this repo, use '$ npm install' in your terminal to add all dependencies needed. You will also need to create a ".env" file in your root folder and add some keys:

- PORT=YOUR_LOCALHOST_ACCESS_PORT
- MONGODB_URI=mongodb://localhost/YOUR_COLLECTION_NAME_IN_MONGODB
- cloudKey=YOUR_CLOUDINARY_KEY
- cloudName=YOUR_CLOUDINARY_NAME
- cloudSecret=YOUR_CLOUDINARY_SECRET

You will also need to set up CORS middleware to ensure that the requests sent from the front-end will be accepted. Just go to "index.js" file and set up the origin link at line TBD (example below).

_app.use(cors({_
_credentials: true,_
**origin: ['http://localhost:3000']**
_}));_

## Authors & Version Control

API developed by **Antonio Vital - https://github.com/vitalb2b**, **Paula Nicioli - https://github.com/paulanicioli** & **Thais Bitencourt - https://github.com/bit-sahti** - _ListoProGeek API App Version 0.1_ - **Published in TBD**
