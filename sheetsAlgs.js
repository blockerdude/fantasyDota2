function printPoints() {

    const firstRow = 2
    const scoreRow = 4 // This is the index into the points map, Week 1 = 3, week 2= 4...
    const requiredRows = 30

    for(let i=0; i<requiredRows; i++) {
        let num = firstRow + i
        console.log(`=SUM( VLOOKUP(D${num}, fantasy_scores!A$2:H$76, ${scoreRow}, false),  VLOOKUP(E${num}, fantasy_scores!A$2:H$76, ${scoreRow}, false),  VLOOKUP(F${num}, fantasy_scores!A$2:H$76, ${scoreRow}, false),  VLOOKUP(G${num}, fantasy_scores!A$2:H$76, ${scoreRow}, false), VLOOKUP(H${num}, fantasy_scores!A$2:H$76, ${scoreRow}, false))`)
    }

}

function printPlayerCount() {

    const firstRow = 2
    const scoreRow = 4 // This is the index into the points map, Week 1 = 3, week 2= 4...
    const requiredRows = 30

    for(let i=0; i<requiredRows; i++) {
        let num = firstRow + i
        console.log(`=SUM( COUNTIF(VLOOKUP(D${num}, fantasy_scores!A$2:H$76, ${scoreRow}, false), ">0"),  COUNTIF(VLOOKUP(E${num}, fantasy_scores!A$2:H$76, ${scoreRow}, false), ">0"),  COUNTIF(VLOOKUP(F${num}, fantasy_scores!A$2:H$76, ${scoreRow}, false), ">0"),  COUNTIF(VLOOKUP(G${num}, fantasy_scores!A$2:H$76, ${scoreRow}, false), ">0"), COUNTIF(VLOOKUP(H${num}, fantasy_scores!A$2:H$76, ${scoreRow}, false), ">0"))`)
    }

}

function printScoreSummary() {

    const firstRow = 2
    const requiredRows = 40


    for(let i=0; i< requiredRows; i++) {
        console.log(`=(Sum(C${firstRow+i}:M${firstRow+i}))`)
    }

}


// printPoints()
// printPlayerCount()
printScoreSummary()