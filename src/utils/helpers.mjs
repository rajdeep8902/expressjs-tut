import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPass = (password) => {
    const salt = bcrypt.genSaltSync(saltRounds);
    console.log(salt);
    return bcrypt.hashSync(password, salt);
}

export const comparePass = (plain, hashed) => {
    return bcrypt.compareSync(plain, hashed);
}