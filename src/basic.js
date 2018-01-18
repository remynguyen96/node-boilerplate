const part = () => {
    const Allmembers = [
        {name: 'DungLT', team: null},
        {name: 'Tung', team: 'DungLT'},
        {name: 'Tan', team: 'DungLT'},
        {name: 'Khanh', team: 'Tung'},
        {name: 'Chi', team: 'Khoi'},
        {name: 'DungTC', team: 'Tan'},
        {name: 'Khoi', team: null},
        {name: 'Tuong', team: 'Tung'},
        {name: 'Duoc', team: 'Khoi'},
        {name: 'Toan', team: 'Duoc'},
        {name: 'Thien', team: 'Toan'},
    ];

    const recursive = (name) => {
        const results = {};
        Allmembers
            .filter((item) => item.team === name)
            .forEach((item) => results[item.name] = recursive(item.name));
        return results;
    };

    const recursive2 = (name) => (Allmembers
            .filter((item) => item.team === name)
            .reduce((results, item) => {
                results[item.name] = recursive2(item.name);
                return results;
            }, {}));
    const result = JSON.stringify(recursive2(null), null, 2);
    return result;
};

const part1 = () => {
    const scope = (name, value) => {
        let balance = value;
        return {
            plus(income) {
                balance = balance + income;
            },
            abstract(outcome) {
                balance = balance - outcome;
            },
            view() {
                return `This is ${name} with money have is ${balance} !`;
            },
        };
    };
    const testScope = scope('Remy', 10);
    testScope.plus(10);
    testScope.abstract(5);
    testScope.view();
    return testScope;
};

const part2 = () => {
    const votes = [
        'AngularJS',
        'VueJS',
        'ReactJS',
        'ReactJS',
        'Ember',
        'AngularJS',
        'AngularJS',
        'ReactJS',
        'VueJS',
        'ReactJS',
        'ReactJS',
    ];
    const initialValue = {};
    const reducers = (tally, vote) => {
        if (!tally[vote]) {
            tally[vote] = 1;
        } else {
            tally[vote] = tally[vote] + 1;
        }
        return tally;
    };
    return votes.reduce(reducers, initialValue);
};

const part3 = () => {
    const data = [
        {team: 'Team 1', name: 'Remy 1'},
        {team: 'Team 2', name: 'Chau Nguyen'},
        {team: 'Team 3', name: 'Remy 2'},
        {team: 'Team 4', name: 'Remy 3'},
        {team: 'Team 5', name: 'Remy 4'},
        {team: 'Team 6', name: 'Chau Nguyen'},
        {team: 'Team 7', name: 'Remy 6'},
        {team: 'Team 8', name: 'Remy Nguyen'},
        {team: 'Team 9', name: 'Remy 7'},
        {team: 'Team 10', name: 'Chau Nguyen'},
        {team: 'Team 11', name: 'Remy 8'},
        {team: 'Team 12', name: 'Remy 9'},
        {team: 'Team 13', name: 'Remy Nguyen'},
        {team: 'Team 14', name: 'Remy 10'},
    ];
    const objName = {};
    return data.map((item) => {
        const {name, team} = item;
        if (objName[name]) {
            objName[name] = objName[name].concat(team);
        } else {
            objName[name] = [team];
        }
        return {team: objName[name], name};
    }).map((data) => {
        const {name} = data;
        let resultTeam;
        if (objName[name]) {
            resultTeam = objName[name];
            delete objName[name];
        }
        return {team: resultTeam, name};
    }).filter((result) => {
        if (result.team !== undefined) {
            return result;
        }
    });
};

part();
part1();
part2();
part3();

