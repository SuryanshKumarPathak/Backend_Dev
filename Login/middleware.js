export const validation = (req, res, next) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    let data = req.body;
        if (!passwordRegex.test(data.password)) {
            return res.status(400).send("Password must contain at least one uppercase letter, one lowercase letter, and one digit");
        }
    next();
}