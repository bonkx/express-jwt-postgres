function exclude(data, ...keys) {
    console.log(data);
    console.log(keys);
    for (let key of keys) {
        delete data[key];
    }
    return data;
}

module.exports = { exclude };
