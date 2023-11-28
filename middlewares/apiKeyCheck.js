const checkApiHeaders = (req, res, next) => {
    const apiKey = req.headers['x-api-key'];

    if (!apiKey || apiKey !== 'abcd-efgh-ijlk-1234') {
        return res.status(401).json({ message: 'Unauthorized: Invalid API key' });
    }

    next();
};

module.exports = checkApiHeaders;
