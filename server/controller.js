const houses = require('./db.json')

let id = houses.length + 1
// let id = 4

module.exports = {
    getHouses: (req, res) => {
        res.status(200).send(houses)
    },
    deleteHouses: (req, res) => {
        const index = houses.findIndex(elem => elem.id === +req.params.id)
        houses.splice(index, 1)
        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        // {
        //     "id": 1,
        //     "address": "1600 Pennsylvania Avenue NW",
        //     "price": 290000,
        //     "imageURL" : "https://www.washingtonian.com/wp-content/uploads/2020/07/Official-White-House-Photo-by-Andrea-Hanks-1.jpg"
        //   },

        const { address, price, imageURL } = req.body

        const newHouse = {
            id: id,
            address,
            price: +price,  // force the price to be a number
            imageURL
        }
        houses.push(newHouse)
        id++
        res.status(200).send(houses)
    },
    updateHouse: (req, res) => {
        const index = houses.findIndex(elem => elem.id === +req.params.id)

        switch (req.body.type) {
            case 'plus':
                houses[index].price += 10000
                res.status(200).send(houses)
                return
            case 'minus':
                if(houses[index].price > 10000) {
                    houses[index].price -= 10000
                    res.status(200).send(houses)
                } else {
                    res.status(400).send(`Price can't go below 0`)
                }
                return
            default:
                res.status(400).send(`Bad type`)
        }
    }
}