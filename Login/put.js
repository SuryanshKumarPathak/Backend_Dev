import express from "express";
import {validation} from "./middleware.js"
import {credentials} from "./credentials.js"
const app = express();
app.use(express.json());



//GET Request
app.get("/auth/users", (req, res) => {
  res.json({
    message: "All Users Fetched Successfully",
    users: credentials
  });
});


app.put("/auth/reset", validation, (req, res) => {
    const { email,password, newPassword } = req.body;
    const user = credentials.find(
      (cred) => cred.email == email && cred.password == password,
    );
    if (user) {
      user.password = newPassword;
      res.json({ message: "Password Reset Successful", user });
    } else {
      res.json({ message: "Invalid Credential" });
}
});

//Forget Password route
app.put("/auth/forget",validation,(req, res) => {
    const { email, newPassword } = req.body;
    const user = credentials.find(cred => cred.email == email);
    if (!user) {
        return res.status(400).json({ message: "Email Not Found" });
    }
    // Update the password

    user.password = newPassword;
    res.json({ message: "Password Updated Successfully", user });

});

//Email Reset route
app.put("/auth/email-reset", (req, res) => {
    const { email,password, newEmail } = req.body;
    const user = credentials.find(
      (cred) => cred.email == email && cred.password == password,
    );
    if (user) {
      user.email = newEmail;
      res.json({ message: "Email Updated Successfully", user });
    } else {
      res.json({ message: "Invalid Credential" });
}
});



app.listen(8000,() => console.log("Server Started"))