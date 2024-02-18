/* eslint-disable camelcase */
// const { PrismaClient } = require('@prisma/client');

// const db = new PrismaClient();

function splitSortBy(sort) {
    const sortBy = [];
    if (sort) {
        const sp = sort.split('|');
        sortBy.push(sp);
    }
    return sortBy;
}

const getPagination = (page, size) => {
    const limit = size ? +size : 10;
    const page_size = page ? (page - 1) : 0;
    const offset = page_size * limit;
    return { limit, offset };
};

const getPagingData = (res, page, limit) => {
    const { count, rows: data } = res;
    const currentPage = page ? +page : 1;
    const totalPages = Math.ceil(count / limit);

    return {
        count, totalPages, currentPage, data,
    };
};

module.exports = { splitSortBy, getPagination, getPagingData };
