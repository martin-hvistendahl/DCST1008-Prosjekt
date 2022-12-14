CREATE TABLE `Tournament` (
    `id` int(11) NOT NULL,
    `TournamentID` int(11) NOT NULL,
    `TournamentName` varchar(20) NOT NULL,
    `TournamentType` varchar(35) NOT NULL,
    `TournamentGamemode` varchar(35) NOT NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

    ALTER TABLE `Tournament`
        ADD PRIMARY KEY (`id`);

    ALTER TABLE `Tournament`
        MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;




CREATE TABLE `GameMatch` (
    `MatchID` int(11) NOT NULL,
    `TournamentID` int(11) NOT NULL,
    `MatchNumber` int(11) NOT NULL,
    `RoundNumber` int(11) NOT NULL,
    `Team1` int(11) DEFAULT NULL,
    `Team2` int(11) DEFAULT NULL,
    `Team1Score` int(11) NOT NULL,
    `Team2Score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

    ALTER TABLE `GameMatch`
        ADD PRIMARY KEY (`MatchID`);

    ALTER TABLE `GameMatch`
        MODIFY `MatchID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `Team` (
    `id` int(11) NOT NULL,
    `TeamID` int(11) DEFAULT NULL,
    `TeamName` varchar(20) DEFAULT NULL,
    `IsShadow` tinyint(1) NOT NULL,
    `TournamentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

    ALTER TABLE `Team`
        ADD PRIMARY KEY (`id`);

    ALTER TABLE `Team`
        MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;



CREATE TABLE `TeamMember` (
    `PlayerID` int(11) NOT NULL,
    `PlayerName` varchar(20) NOT NULL,
    `PlayerTrophies` int(11) NOT NULL,
    `TeamID` int(11) NOT NULL,
    `TournamentID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

    ALTER TABLE `TeamMember`
        ADD PRIMARY KEY (`PlayerID`);
    ALTER TABLE `TeamMember`
        MODIFY `PlayerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;


