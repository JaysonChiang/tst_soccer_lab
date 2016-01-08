var _actionChance = function(_position, _zone) {
	var _zone = _zone+"";
	var weights=[];//[0.25,0.25,0.25,0.25];
        switch (_position) {
            case "FW":
                switch (_zone) {
                    case "1":
                        weights = [0, 0.45, 0.45, 0.1];
                        break;
                    case "2":
                        weights = [0, 0.4, 0.4, 0.2];
                        break;
                    case "3":
                        weights = [0, 0.35, 0.35, 0.3];
                        break;
                    case "4":
                        weights = [0.3, 0.3, 0.4, 0];
                        break;
                    case "5":
                        weights = [0.1, 0.2, 0.2, 0.5];
                        break;
                    case "6":
                        weights = [0.2, 0, 0.2, 0.6];
                        break;
                }
                break;
            case "MF":
                switch (_zone) {
                    case "1":
                        weights = [0, 0.45, 0.45, 0.1];
                        break;
                    case "2":
                        weights = [0, 0.4, 0.4, 0.2];
                        break;
                    case "3":
                        weights = [0, 0.35, 0.35, 0.3];
                        break;
                    case "4":
                        weights = [0, 0.3, 0.3, 0.4];
                        break;
                    case "5":
                        weights = [0.05, 0.2, 0.25, 0.5];
                        break;
                    case "6":
                        weights = [0.1, 0, 0.3, 0.6];
                        break;
                }
                break;
            case "DF":
                switch (_zone) {
                    case "1":
                        weights = [0, 0.2, 0.7, 0.1];
                        break;
                    case "2":
                        weights = [0, 0.2, 0.6, 0.2];
                        break;
                    case "3":
                        weights = [0, 0.2, 0.5, 0.3];
                        break;
                    case "4":
                        weights = [0, 0.2, 0.4, 0.4];
                        break;
                    case "5":
                        weights = [0, 0.1, 0.4, 0.5];
                        break;
                    case "6":
                        weights = [0.1, 0, 0.3, 0.6];
                        break;
                }
                break;
            case "GK":
                    weights = [0, 0, 1, 0];

                break
        }
        return weights;
    }
module.exports = _actionChance;