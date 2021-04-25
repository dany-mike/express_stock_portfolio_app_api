const Wallet = require('../../models/Wallet.model')
const User = require('../../models/User.model')

async function createWallet(req, res, next) {
    const user = await User.findOne({username: req.params.username})

    if(!user) {
        res.rawStatus = 400
        res.rawResponse = `Username: ${req.params.username} does not exists`
        return next();
    }

    const wallet = new Wallet({
        walletName: req.body.walletName,
        description: req.body.description,
        user: user._id,
    })

    try {
        wallet.save()
        res.rawStatus = 200
        res.rawResponse = "Wallet created successfully !"
        return next()
    } catch(err) {
        res.rawStatus = 500
        res.rawResponse = err.message
        return next()
    }
}

module.exports = createWallet