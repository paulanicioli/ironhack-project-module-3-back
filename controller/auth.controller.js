const Users = require('../models/User');
const passwordManager = require('../utils/password.utils');
const jwtManager = require('../utils/jwt.utils');

const Maps = require('../controller/mapsApi.controller');

class AuthController {
  constructor() {
    this.Users = Users;
    this.passwordManager = passwordManager;
    this.jwtManager = jwtManager;
  }

  signup = async (req, res, next) => {
    try {
      const userFromDb = await this.Users.findOne({ email: req.body.email });

      if (userFromDb) {
        return res.status(400).json({ message: 'Email já cadastrado em nosso banco de dados.' });
      }
      
      const { street, city, state, zipCode } = req.body.address
      const fullAddress = `${street}, ${city}, ${state}, ${zipCode}`
      const userCoordinates = await Maps.geocode(fullAddress)

      const encryptedPassword = this.passwordManager.encrypt(req.body.password);

      const newUser = new this.Users({
        ...req.body,
        address: {
          ...req.body.address,
          location: {
            type: "Point",
            coordinates: userCoordinates
          }
        },
        password: encryptedPassword,
      });

      console.log(newUser)
      await newUser.save();

      res.status(201).json({
        message: `Cadastro completado com sucesso.`,
      });
    } catch (error) {
      console.log(error)
    }
  };

  login = async (req, res, next) => {
    try {
      const userFromDb = await this.Users.findOne({ email: req.body.email });

      if (!userFromDb) {
        return res.status(400).json({
          message: 'Credenciais inválidas. Por favor, tente novamente.',
        });
      }

      const checkPassword = await this.passwordManager.verify(
        req.body.password,
        userFromDb.password
      );

      if (!checkPassword) {
        return res.status(400).json({
          message: 'Credenciais inválidas. Por favor, tente novamente.',
        });
      }

      const token = await this.jwtManager.generateAuthToken(userFromDb);
      const role = userFromDb.role
      // console.log(token, role)

      return res.status(200)
                .json({ 
                  message: {
                    token,
                    role
                  } 
                });
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = new AuthController();
