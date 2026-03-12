import jwt from "jsonwebtoken"

export function verifiedToken(req, res, next)
{
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({message: "Token lipsă"});
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err)
        {
            return res.status(403).json({message: "Token invalid"})
        }

        req.user = decoded
        next()
    })

}
