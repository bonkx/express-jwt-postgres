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

module.exports = { splitSortBy };
