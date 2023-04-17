function sleep(s) {
    s *= 1000;
    return new Promise(resolve => setTimeout(resolve, s));
};

module.exports = {sleep};