import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const userLogin = async (req, res) => {
    //Check if user with given ID exists
    const { id, password } = req.body;
    const user = await User.findOne({id});
    
    try {
    //If user is false, it means no matching ID was found.
    //Status 401 used to not give away unnecessary details regarding database information (i.e. prevent brute-forcing)
        if (!user){
            return res.status(401).json({message: 'Auth failed.'})
        }
    
    //If credientials correct, generator and return JWT token
        if (password === user.password && id === user.id){
            const token = jwt.sign({id}, process.env.JWT_SECRET_KEY, {expiresIn: '2h'});
            return res.status(200).json({message: 'Auth successful.',
                                         token: token});

        } else {
            return res.status(401).json({message: 'Auth failed.'});
        }

    } catch (error) {
        res.status(500).json({message: 'Login failed.'});
    }
}