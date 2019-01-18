const request = require('request')
const cheerio = require('cheerio')

module.exports = (() => {
    
    const getPlayersBySerie = (serie) => {
        return new Promise((resolve, reject) => {
            request(`https://globoesporte.globo.com/futebol/brasileirao-serie-${serie}/`, (err, res, body) => {
                if ( err ) return reject(err)
                
                const $ = cheerio.load(body)
                const data = []
                
                $(".ranking-item-wrapper").each(function() {
                    const player = $(this).find(".jogador .jogador-nome").text().trim()
                    const scores = $(this).find(".jogador .jogador-gols").text().trim()
                    const position = $(this).find(".jogador .jogador-posicao").text().trim()
                    data.push({ player, scores, position })
                })
        
                resolve(data)
            })
        })
    }

    return {
        getPlayersBySerie: (serie) => getPlayersBySerie(serie)
    }
})()