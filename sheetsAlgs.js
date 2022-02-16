function main() {

    const firstRow = 3
    const scoreRow = 3
    const requiredRows = 18

    for(let i=0; i<requiredRows; i++) {
        let num = firstRow + i
        console.log(`=SUM( VLOOKUP(D${num}, fantasy_scores!A2:C76, ${scoreRow}, false),  VLOOKUP(E${num}, fantasy_scores!A2:C76, ${scoreRow}, false),  VLOOKUP(F${num}, fantasy_scores!A2:C76, ${scoreRow}, false),  VLOOKUP(G${num}, fantasy_scores!A2:C76, ${scoreRow}, false), VLOOKUP(H${num}, fantasy_scores!A2:C76, ${scoreRow}, false))`)
    }

}


main()