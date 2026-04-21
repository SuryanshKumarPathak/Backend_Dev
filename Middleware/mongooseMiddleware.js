// Mongoose Middleware: These properties are followed by operation like save, validate, remove, updateOne, deleteOne, findOneAndUpdate, findOneAndDelete, insertMany etc. can perform the databse operation to be run

// Type 1 : Pre Middleware: It is executed before the specified operation is performed. It can be used to perform tasks such as data validation, modifying the document before saving, or logging information before an operation is executed.
// Example : hash value


// Type 2 : Post Middleware: It is executed after the specified operation is performed. It can be used to perform tasks such as logging information after an operation is executed, modifying the result of a query, or handling errors that occur during an operation.
// Example : hash value then print the output

// flow  :Request ->Save ->Pre Middleware ->DB Operation -> Post Middleware -> Server response 

// Bcrypt: it convert the password into hash value and store in database. It is a one way function, it is not possible to convert hash value into original password. It is used for security purpose, so that even if the database is compromised, the original passwords are not exposed. 

// Bcrypt : convert the passwords into the irreversible hash value and add salt for security.

// package : npm i bycrypt

// salt ek random value generate krta hai jo hash value ko unique banata hai, even if two users have the same password, their hash values will be different due to the unique salt. It adds an additional layer of security to the hashing process, making it more resistant to attacks such as rainbow table attacks.

import bcrypt from "bcrypt";

const password ="123456";
const hashedPassword = await bcrypt.hash(password,10);
console.log("Hashed Password:", hashedPassword);

// Compare the password with the hashed password
const isMatch = await bcrypt.compare(password, hashedPassword);
console.log("Password Match:", isMatch);

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
