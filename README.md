# Fantasy Dota2 Script

To run this with expected results the following files must be created and formatted correctly.

## runner.js
Houses the logic to calcualte fantasy points for every player in the provided matches.

### `secrets.json`
```
{
    "api_key": "your-opendota2-api-key"
}

```

### `playerList.json`
```
[
    {
      "name": "Player1Name", // Human readable name
      "id": 1234566 // Dota2 ID
    },
    ...
]
```
This file is responsible for formatting all expected players in which fantasy points are intended to be tracked. Only required if a copyable output is required.

### `series.json`
```
[
        [1234,1235],
        [345,346]
]
```
This file tells the scripts what matches to analyze. Split into series for future automation. Technically all games can exist inside one array.

## sheetsAlgs.js
Only function is to print out google sheets formulas for copy/paste ease.  