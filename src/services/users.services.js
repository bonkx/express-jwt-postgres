/* eslint-disable import/no-unresolved */
const db = require('@src/entity/models');
const { splitSortBy } = require('@src/utils/db');

const { User, Profile, Role } = db;
const { Op } = db.Sequelize;

async function findAll(req) {
    const {
        search, limit, offset, sort,
    } = req.query;

    const sortBy = splitSortBy(sort);

    const condition = search
        ? {
            [Op.or]: [
                { first_name: { [Op.iLike]: `%${req.query.search}%` } },
                { last_name: { [Op.iLike]: `%${req.query.search}%` } },
                { email: { [Op.iLike]: `%${req.query.search}%` } },
            ],
        }
        : null;

    try {
        const data = await User.findAll({
            where: condition,
            order: sortBy,
            offset: offset ?? 0,
            limit: limit ?? 10,
            include: [
                { model: Profile, as: 'profile' },
                { model: Role, as: 'role' },
            ],
        });
        return data;
    } catch (err) {
        throw new Error(err.message);
    }
}

function findUserByEmail(email) {
    return User.findOne({ where: { email } });
}

function findUserByUsername(username) {
    return User.findOne({ where: { username } });
}

function findUserByBothUnique(email, username) {
    return User.findAll({
        where: {
            [Op.or]: [
                { username: { [Op.endsWith]: `%${username}%` } },
                { email: { [Op.endsWith]: `%${email}%` } },
            ],
        },
    });
}

function findUserById(id) {
    return User.findOne({ where: { id } });
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
    console.log(payload);
    const user = await User.create(payload);
    return user;

    // return Profile.create({
    //     data: {
    //         bio: `${payload.first_name} ${payload.last_name}`,
    //         user: {
    //             connectOrCreate: {
    //                 where: {
    //                     email: payload.email,
    //                 },
    //                 create: payload,
    //             },
    //         },
    //     },
    // });
}

module.exports = {
    findAll,
    findUserByEmail,
    findUserById,
    createUser,
    findUserByBothUnique,
    findUserByUsername,
};
