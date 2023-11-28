
module.exports = {
    getCategories: (req, res) => { console.log('double ok'); },
    addProduct: (req, res) => { console.log('ok'); },
    getCategoryProducts: (req, res) => { console.log(req.query); }
}