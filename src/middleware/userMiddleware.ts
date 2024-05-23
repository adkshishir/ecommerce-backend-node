import * as jwt from 'jsonwebtoken'

const getUser = async (req: any, res: any, next: any) => {
    try {
        const authHeader = req.header('Authorization');
        let token = authHeader && authHeader.split(' ')[1];

        if (!authHeader) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        return decoded;
    } catch (error) {
        return false
    }
};
export default getUser