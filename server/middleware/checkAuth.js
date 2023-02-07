import jwt from 'jsonwebtoken';

//Verify for valid JWT token
export const checkAuth = (req, res, next) => {
    try{
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.userData = decoded;
    next();

    } catch(err) {
        res.status(401).json({message: 'Auth failed.'});
    }
}