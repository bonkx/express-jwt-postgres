/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
const db = require('@src/entity/models');
const { splitSortBy, getPagination, getPagingData } = require('@src/utils/db');

const { User, Profile, Role } = db;
const { Op } = db.Sequelize;

async function findAll(req) {
    const {
        search, page, page_size, sort,
    } = req.query;

    const { limit, offset } = getPagination(page, page_size);

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
        const data = await User.findAndCountAll({
            where: condition,
            order: sortBy,
            offset,
            limit,
            include: [
                { model: Profile, as: 'profile' },
                { model: Role, as: 'role' },
            ],
        });
        const response = getPagingData(data, page, limit);
        // console.log(response);
        // console.log({ limit, offset });
        return response;
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
    try {
        const payload = {
            username: req.body.username,
            email: req.body.email,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            password: req.body.password,
            phone_number: req.body.phone,
            role_id: 2,
        };
        // console.log(payload);
        const user = await User.create(payload);

        // create user profile
        await Profile.create({
            bio: `${payload.first_name} ${payload.last_name}`,
            user_id: user.id,
        });

        delete user.password;
        return user;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function getUser(req) {
    try {
        const obj = await User.findByPk(req.params.id, {
            include: [
                { model: Profile, as: 'profile' },
                { model: Role, as: 'role' },
            ],
        });
        return obj;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function updateUser(req) {
    try {
        console.log(req.body);
        const obj = await User.findByPk(req.params.id);
        return obj;
    } catch (err) {
        throw new Error(err.message);
    }
}

async function deleteUser(req) {
    try {
        return await User.destroy({ where: { id: req.params.id }, force: true });
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = {
    findAll,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    findUserByEmail,
    findUserById,
    findUserByBothUnique,
    findUserByUsername,
};
