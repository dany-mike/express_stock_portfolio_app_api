const Wallet = require('../../models/Wallet.model')
const User = require('../../models/User.model')

async function editWallet(req, res, next) {
    const user = await User.findOne({username: req.params.username})

    if(!user) {
        res.rawStatus = 400
        res.rawResponse = `Username: ${req.params.username} does not exist`
        return next();
    }

    const wallet = await Wallet.findOne({_id: req.params.walletId})

    if(!wallet) {
        res.rawStatus = 400
        res.rawResponse = `id ${req.params.walletId} does not exist`
        return next();
    }

    const filter = {
        walletName: wallet.walletName,
        user: user._id  
    };

    const update = {
        walletName: req.body.walletName,
        description: req.body.description,
    }

    try {
        await Wallet.findOneAndUpdate(filter, update)
        res.rawStatus = 200
        res.rawResponse = "Wallet updated successfully !"
        return next()
    } catch(err) {
        res.rawStatus = 500
        res.rawResponse = err.message
        return next()
    }
}

module.exports = editWallet