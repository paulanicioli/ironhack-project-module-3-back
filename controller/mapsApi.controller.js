const {Client} = require("@googlemaps/google-maps-services-js");

class Maps {
    constructor() {
        this.client = new Client({})
    }

    geocode = async (address) => {
        try {
            const formattedAddress = address.replace(/(\s)/g, '+');
            
            const response = await this.client
                .geocode({
                    params: {
                        address: formattedAddress,
                        key: process.env.MAPS_API_KEY,
                    },
                    timeout: 1000, // milliseconds
                    })

            if (!response.data.results.length) return [];

            const { lat, lng } = response.data.results[0].geometry.location;

            return [lng, lat]
        } catch (error) {
            error.response ? 
                console.log(error.response.data) :
                console.log(error)
        }
    }

    getGeocode = async (req, res, next) => {
        try {
            const { address } = req.query;

            const coordinates = await this.geocode(address);

            res.status(200).json({ message: coordinates})
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new Maps()