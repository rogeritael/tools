const getToken = (req) => {

    const token = req.headers['x-access-token'];
    return token;

};

module.exports = getToken;