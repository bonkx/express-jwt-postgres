/* eslint-disable camelcase */
/* eslint-disable import/no-unresolved */
const { PrismaClient } = require('@prisma/client');

const db = new PrismaClient();

const {
    splitSortBy, getPagination, getPagingData, exclude,
} = require('@src/utils/db');

const { User = db.users, Profile = db.profiles, Role = db.roles } = db;

async function findAll(req) {
    const {
        search, page, page_size, sort,
    } = req.query;

    const { limit, offset } = getPagination(page, page_size);
    console.log('limit: ', limit);
    console.log('offset: ', offset);

    const sortBy = splitSortBy(sort);
    console.log(sortBy);

    const condition = search
        ? {
            OR: [
                { first_name: { contains: `%${req.query.search}%` } },
                { last_name: { contains: `%${req.query.search}%` } },
                { email: { contains: `%${req.query.search}%` } },
            ],
        }
        : null;

    try {
        const count = await User.count();
        const data = await User.findMany({
            // where: condition,
            orderBy: sortBy,
            skip: offset,
            take: limit,
            // include: {
            //     roles: true,
            //     profiles: true,
            // },
            // include: [
            //     { model: Profile, as: 'profile' },
            //     { model: Role, as: 'role' },
            // ],
        });
        // const xData = exclude(data, ['password']);

        const response = getPagingData(data, count, page, limit);
        return response;
    } catch (err) {
        throw new Error(err.message);
    }
}

function findUserByEmail(email) {
    return User.findUnique({ where: { email } });
}

function findUserByUsername(username) {
    return User.findUnique({ where: { username } });
}

function findUserByBothUnique(email, username) {
    return User.findMany({
        where: {
            OR: [
                { username: { contains: `%${username}%` } },
                { email: { contains: `%${email}%` } },
            ],
        },
    });
}

function findUserById(id) {
    return User.findUnique({ where: { id } });
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
        const user = await User.create({ data: payload });
        delete user.password;

        // create user profile
        await Profile.create({
            data: {
                bio: `${payload.first_name} ${payload.last_name}`,
                user_id: user.id,
            },
        });

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
        return await User.destroy({ where: { id: req.params.id } });
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
