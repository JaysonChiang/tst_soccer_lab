var _getInverseZone = function(zone) {
    switch (zone + "") {
        case "1":
            return "6";
            break;
        case "2":
            return "5";
            break;
        case "3":
            return "4";
            break;
        case "4":
            return "3";
            break;
        case "5":
            return "2";
            break;
        case "6":
            return "1";
            break;
        default:
            return "0"
            break;
    }
}

module.exports = _getInverseZone;