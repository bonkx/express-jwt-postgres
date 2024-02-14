const bcrypt = require('bcryptjs');
const db = require('@models');
const User = db.users;
const Role = db.roles;
const Profile = db.profiles;
const Op = db.Sequelize.Op;

async function findAll(req) {
    const search = req.query.search;
    const limit = req.query.limit;
    const offset = req.query.offset;
    var condition = search
        ? {
              [Op.or]: [
                  { first_name: { [Op.iLike]: `%${req.query.search}%` } },
                  { last_name: { [Op.iLike]: `%${req.query.search}%` } },
                  { email: { [Op.iLike]: `%${req.query.search}%` } },
              ],
          }
        : null;

    try {
        data = await User.findAll({
            where: condition,
            offset: offset ?? 0,
            limit: limit ?? 10,
            include: [Profile, Role],
        });
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
}

function findUserByEmail(email) {
    return db.user.findUnique({
        where: {
            email,
        },
    });
}

function findUserByUsername(username) {
    return db.user.findUnique({
        where: {
            username,
        },
    });
}

function findUserByBothUnique(email, username) {
    return db.user.findFirst({
        where: {
            username,
            email,
        },
    });
}

function findUserById(id) {
    return db.user.findUnique({
        where: {
            id,
        },
    });
}

async function createUser(req) {
    const payload = {
        username: req.body.username,
        email: req.body.email,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: req.body.password,
        phone_number: req.body.phone,
    };
    // console.log(payload);
    payload.password = bcrypt.hashSync(payload.password, 12);
    console.log(payload);
    // const user = await db.users.create({
    //     data: payload,
    // });

    return db.profile.create({
        data: {
            bio: `${payload.first_name} ${payload.last_name}`,
            user: {
                connectOrCreate: {
                    where: {
                        email: payload.email,
                    },
                    create: payload,
                },
            },
        },
    });
}

module.exports = {
    findAll,
    findUserByEmail,
    findUserById,
    createUser,
    findUserByBothUnique,
    findUserByUsername,
};
