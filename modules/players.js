const { getPlayersBySerie } = require('./api')


module.exports = (() => {

    const getPlayers = (serie = 'a') => {
        return new Promise((resolve, reject) => {
            if ( !(/^(a|b)$/).test(serie.toLowerCase()) ) return reject('Série não disponível')

            getPlayersBySerie(serie.toLowerCase())
            .then( data => resolve(data) )
            .catch( err => reject(err.message) )
        })
    }

    return {
        getPlayers: (serie) => getPlayers(serie)
    }

})()