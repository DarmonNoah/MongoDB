// recuperer le modele User
// import User from '../models/userModel';
const getUsers = (req, res, next) => {
    // recuperer les users depuis la base de donnees
  
    res.json({
      message: "GET /user",
      users: [
        {
          id: 1,
          name: "John Doe",
          email: "john@mail.com",
        },
      ],
    });
  };
  
  export default userController = {
    getUsers,
  };