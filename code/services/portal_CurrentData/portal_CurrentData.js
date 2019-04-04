function portal_CurrentData(req, resp) {
    log(JSON.stringify(req));
    var description = "Zone Temperature";
    var floor = 26;
    var zoneTempColorRange = [
        { "value": 68, color: "#33cccc" },
        { "value": 69, color: "#00ffcc" },
        { "value": 70, color: "#00ff99" },
        { "value": 71, color: "#00ff00" },
        { "value": 72, color: "#33cc33" },
        { "value": 73, color: "#009900" },
        { "value": 74, color: "#99ff33" },
        { "value": 75, color: "#99cc00" },
        { "value": 75, color: "#ffcc66" },
        { "value": 76, color: "#ffcc00" },
        { "value": 77, color: "#ff9933" },
        { "value": 78, color: "#cc6600" },
        { "value": 79, color: "#ff6633" },
        { "value": 80, color: "#b34700" },
        { "value": 100, color: "red" }
    ];

    ClearBlade.init({ request: req });
    var ret = [];
    log(JSON.stringify(req));

    var callback = function(err, data) {
        if (err) {
            log("error : " + JSON.stringify(data));
            resp.error(data);
        } else {
            for (var i = 0; i < data.length; i++) {
                var ddo = {};
                ddo.backgroundColor = "#cfe0fc";
                ddo.name = data[i].name;
                ddo.present_value = data[i].present_value;
                ddo.x = data[i].mapxcoordinates;
                ddo.y = data[i].mapycoordinates;
                ddo.floor = data[i].floorid;
                //ddo.groupid = data[i].groupid;
                ddo.groupid = data[i].groupid.split("-")[1];
                ddo.buildingside = data[i].buildingside;
                //ddo.groupid=data[i].groupid;
                ddo.description = data[i].description;
                for (var j = 0; j < zoneTempColorRange.length; j++) {
                    if (zoneTempColorRange[j].value > data[i].present_value) {
                        ddo.backgroundColor = zoneTempColorRange[j].color;
                        break;
                    }
                }
                if (ddo.present_value == "active") {
                    ddo.backgroundColor = "#87ffa1";
                }
                if (ddo.present_value == "inactive") {
                    ddo.backgroundColor = "#ff8787";
                }
                ret.push(ddo);
            }
            resp.success(ret);
        }
    };

    var query = ClearBlade.Query();
    var devices = ClearBlade.Device();
    if (req.params.floor!==undefined)
        floor = req.params.floor;
    if (req.params.description !== undefined)
        description = req.params.description;
    query.equalTo("description", description);
    query.equalTo("floorid", floor.toString());
    query.setPage(0, 0);
    devices.fetch(query,callback);
}