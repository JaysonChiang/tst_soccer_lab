var _passChance = function(_position, _zone) {
    var _zone = _zone+"";

	var weights=[];//[0.25,0.25,0.25,0.25];
        switch (_position) {
            case "FW":
                switch (_zone) {
                    case "1":
                        weights = [0.25, 0.25, 0.25, 0.25];
                        break;
                    case "2":
                        weights = [0.4, 0.4, 0.2, 0];
                        break;
                    case "3":
                        weights = [0.45, 0.45, 0.1, 0];
                        break;
                    case "4":
                        weights = [0.45, 0.45, 0.1, 0];
                        break;
                    case "5":
                        weights = [0.4, 0.4, 0.2, 0];
                        break;
                    case "6":
                        weights = [0.4, 0.4, 0.2, 0];
                        break;
                }
                break;
            case "MF":
                switch (_zone) {
                    case "1":
                        weights = [0.25, 0.25, 0.25, 0.25];
                        break;
                    case "2":
                        weights = [0.4, 0.4, 0.2, 0];
                        break;
                    case "3":
                        weights = [0.45, 0.45, 0.1, 0];
                        break;
                    case "4":
                        weights = [0.45, 0.45, 0.1, 0];
                        break;
                    case "5":
                        weights = [0.4, 0.4, 0.2, 0];
                        break;
                    case "6":
                        weights = [0.4, 0.4, 0.2, 0];
                        break;
                }
                break;
            case "DF":
                switch (_zone) {
                    case "1":
                        weights = [0.25, 0.25, 0.25, 0.25];
                        break;
                    case "2":
                        weights = [0.35, 0.4, 0.15, 0.1];
                        break;
                    case "3":
                        weights = [0.45, 0.45, 0.1, 0];
                        break;
                    case "4":
                        weights = [0.45, 0.45, 0.1, 0];
                        break;
                    case "5":
                        weights = [0.4, 0.4, 0.2, 0];
                        break;
                    case "6":
                        weights = [0.4, 0.4, 0.2, 0];
                        break;
                }
                break;
            case "GK":
                    weights = [0.4, 0.4, 0.3, 0];

                break;
        }
        return weights;
    }
module.exports = _passChance;