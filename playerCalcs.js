export function calculateFantasyForPlayer(player) {
    let score = 0.0;
    for (let i = 0; i<calcFuncs.length; i++) {
        score += calcFuncs[i](player)
    }
    return Math.round(100*score)/100;
}

const calcFuncs = [calculatePointsForKills, calculatePointsForDeaths, calculatePointsForLastHitAndDenies,
     calculatePointsForGPM, calculatePointsForTowerKills, calcualtePointsForRoshKills,
     calculatePointsForTeamFightParticipation, calculatePointsForWardsPlaced, calculatePointsForCampsStacked,
     calculatePointsForRuneTaken, calculatePointsForFirstBlood, calculatePointsForStuns]
    

// .3 per player kill
function calculatePointsForKills(player) {
    return .3 * player.kills
}

// 3 -.3*death
function calculatePointsForDeaths(player) {
    return 3 - (.3 * player.deaths)
}

// .003 for each last hit/deny
function calculatePointsForLastHitAndDenies(player) {
    return .003 * (player.last_hits + player.denies)
}

// .002 points per GPM
function calculatePointsForGPM(player) {
    return .002 * player.gold_per_min
}

// 1 point for tower kills
function calculatePointsForTowerKills(player) {
    return 1 * player.towers_killed
}

// 1 point for rosh kills
function calcualtePointsForRoshKills(player) {
    return 1 * player.roshans_killed
}

// 3 * teamfight percent
function calculatePointsForTeamFightParticipation(player) {
    return 3 * player.teamfight_participation
}

// .5 per ward
function calculatePointsForWardsPlaced(player) {
    return .5 * player.obs_placed
}

// .5 per stack
function calculatePointsForCampsStacked(player) {
    return .5 * player.camps_stacked
}

// .25 for rune taken/bottled
function calculatePointsForRuneTaken(player) {
    return .25 * player.rune_pickups
}

// 4 points for first blood
function calculatePointsForFirstBlood(player) {
    return 4 * player.firstblood_claimed
}

// .05 points per second of stun
function calculatePointsForStuns(player) {
    return .05 * player.stuns
}
