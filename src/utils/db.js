/* eslint-disable camelcase */
// const { PrismaClient } = require('@prisma/client');

// const db = new PrismaClient();

function splitSortBy(sort) {
    let sortBy = {};
    if (sort) {
        const sp = sort.split('|');
        sortBy = { [sp[0]]: sp[1] };
        // console.log(orderBy);
    }
    return sortBy;
}

const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const page_size = page ? (page - 1) : 0;
    const offset = page_size * limit;
    return { limit, offset };
};

const getPagingData = (data, count, page, limit) => {
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(count / limit);

    return {
        count, totalPages, currentPage, data,
    };
};

// Exclude keys from user
function exclude(model, keys) {
    return Object.fromEntries(
        Object.entries(model).filter(([key]) => !keys.includes(key)),
    );
}

module.exports = {
    splitSortBy, getPagination, getPagingData, exclude,
};
