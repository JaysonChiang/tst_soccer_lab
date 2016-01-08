
var  myplayers = [{
        name: "Allen",
        position: "MF",
        alignment:3,
        skill: {
            "SH": 4,
            "DR": 5,
            "PS": 5,
            "DF": 4
        }
    }, {
        name: "Jayson",
        position: "FW",
        alignment:4,
        skill: {
            "SH": 6,
            "DR": 5,
            "PS": 4,
            "DF": 3
        }
    }, {
        name: "Yu-yi",
        position: "FW",
        alignment:2,
        skill: {
            "SH": 6,
            "DR": 4,
            "PS": 5,
            "DF": 3
        }
    }, {
        name: "Andrew",
        position: "DF",
        alignment:2,
        skill: {
            "SH": 3,
            "DR": 6,
            "PS": 5,
            "DF": 4
        }
    },{
        name: "Julie",
        position: "DF",
        alignment:4,
        skill: {
            "SH": 3,
            "DR": 5,
            "PS": 6,
            "DF": 4
        }
    },  {
        name: "Emily",
        position: "GK",
        alignment:3,
        skill: {
            "SH": 2,
            "DR": 2,
            "PS": 5,
            "DF": 6
        }
    }];

    var  yourplayers = [{
        name: "PC_A",
        position: "MF",
        alignment:3,
        skill: {
            "SH": 4,
            "DR": 5,
            "PS": 5,
            "DF": 4
        }
    }, {
        name: "PC_B",
        position: "FW",
        alignment:2,
        skill: {
            "SH": 6,
            "DR": 4,
            "PS": 5,
            "DF": 3
        }
    }, {
        name: "PC_C",
        position: "FW",
        alignment:4,
        skill: {
            "SH": 6,
            "DR": 5,
            "PS": 4,
            "DF": 3
        }
    }, {
        name: "PC_D",
        position: "DF",
        alignment:2,
        skill: {
            "SH": 3,
            "DR": 6,
            "PS": 5,
            "DF": 4
        }
    }, {
        name: "PC_E",
        position: "DF",
        alignment:4,
        skill: {
            "SH": 3,
            "DR": 5,
            "PS": 6,
            "DF": 4
        }
    }, {
        name: "PC_G",
        position: "GK",
        alignment:3,
        skill: {
            "SH": 2,
            "DR": 2,
            "PS": 5,
            "DF": 6
     }
 }];

    var data = {};
    data.myplayers = myplayers;
    data.yourplayers = yourplayers;
    module.exports = data;
