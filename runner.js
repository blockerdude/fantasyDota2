// var XMLHttpRequest = require('xhr2');
import fetch from "node-fetch";
import fs from 'fs'
import {calculateFantasyForPlayer} from './playerCalcs.js'
// var fetch = require('node-fetch')


async function fetchGameByID(matchID, apiKey) {
    let response = await fetch(`https://api.opendota.com/api/matches/${matchID}?api_key=${apiKey}`)
    let data = await response.json()
    return data
}

function getAPIKey() {
    const data = fs.readFileSync(`secrets.json`, 'utf-8')
    return JSON.parse(data).api_key
}

function loadMatchFileByID(matchID) {
    const data = fs.readFileSync(`./game_responses/${matchID}.json`, 'utf-8')
    return JSON.parse(data)
}

function isMatchFileSaved(matchID) {
    return fs.existsSync(`./game_responses/${matchID}.json`)
}

// returns an array of arrays
function loadSeries() {
    const data = fs.readFileSync('series.json', 'utf-8')
    return JSON.parse(data)
}

function saveMatchFile(gameResults) {
    const fileName = `./game_responses/${gameResults.match_id}.json`
    fs.writeFileSync(fileName, JSON.stringify(gameResults), 'utf-8')
}

function loadExpectedPlayers() {
    const data = fs.readFileSync('./playerList.json', 'utf8')
    return JSON.parse(data)
}

function printResultsForSpreadSheet(results) {
    console.log("-----------------------------------------------")
    for(let i=0; i<results.length; i++) {
        console.log(results[i].score || '-')
    }
    console.log("-----------------------------------------------")

}

function saveResultsForHumanUse(prefix, results) {
    const curDate = new Date()
    const fileName = './run_results/' + prefix+"_"+curDate.getDate()+"_"+(curDate.getMonth()+1)+"_"+curDate.getFullYear()+".json"
    fs.writeFileSync(fileName, JSON.stringify(results), 'utf-8')
}

async function main() {
    const expectedPlayers = loadExpectedPlayers()
    const unexpectedPlayers = []

    const temp = expectedPlayers.map(t => t.id)
    let expectedPlayersMap = {}
    temp.forEach(element => {
        expectedPlayersMap[element] = {}
    });

    const series = loadSeries()

    for(let i=0; i<series.length; i++) {
        await processForSeries(series[i], expectedPlayersMap, unexpectedPlayers)
    }

    // Applies the total score to the player for printing purposes
    for (let j = 0; j<expectedPlayers.length; j++) {
        let curPlayer = expectedPlayers[j]
        let foundResult = expectedPlayersMap[curPlayer.id]
        let tally = 0
        for(const [key, value] of Object.entries(foundResult)) {
            tally += value
        }
        curPlayer.score = tally
    }
    

    printResultsForSpreadSheet(expectedPlayers)
    saveResultsForHumanUse("goodResults", expectedPlayersMap)
    saveResultsForHumanUse("badResults", unexpectedPlayers)

}

function processGame(gameFile, expectedPlayersMap, unexpectedPlayers){
        
    for (let i = 0; i<gameFile.players.length; i++) {
        let curPlayer = gameFile.players[i]
        
        const found = expectedPlayersMap[curPlayer.account_id]
        if (found) {
            expectedPlayersMap[curPlayer.account_id][gameFile.match_id] = calculateFantasyForPlayer(curPlayer)
        } else {
            unexpectedPlayers.push({"name": curPlayer.personaname, "id": curPlayer.account_id, "matchID": gameFile.match_id, "score": calculateFantasyForPlayer(curPlayer)})
        }
    }  
}

async function processForSeries(seriesIDs, expectedPlayersMap, unexpectedPlayers) {
    const apiKey = getAPIKey()

    for (let i =0; i<seriesIDs.length; i++) {
        var game
        if (isMatchFileSaved(seriesIDs[i])) {
            console.log('game already saved', seriesIDs[i])
            game = loadMatchFileByID(seriesIDs[i])
        } else {
            console.log('game does not exist fetching', seriesIDs[i])
            game = await fetchGameByID(seriesIDs[i], apiKey)
        }
        
        processGame(game, expectedPlayersMap, unexpectedPlayers)
        saveMatchFile(game)
    }
}


main().then(res => {
    console.log('done', res)
})
