function portal_LightData(req, resp){
    
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

    // generate synthetic light data

    var ctr = 0 ;
    for (var i = 0; i < 11; i++) {
        for ( var j=0; j < 8; j++ ) {
            ctr ++ ;
            if ( j == 7 && i < 2) continue;  // skip the lower right corner of the floor
            var ddo = {};
            ddo.backgroundColor = "#cfe0fc";
            ddo.name = "light 26-" + ctr ;  // name is important ... portal uses this to uniquely identify lights
            ddo.present_value = Math.floor(Math.random() * 100);
            ddo.x = 100  + (i * 90);
            ddo.y = 100 + (100*j) ; // + (i * 50);
            ddo.floor = 26;
            ddo.groupid = i ;
            ddo.buildingside = "" ;
            ddo.description = "Lumens";
            ddo.type = "light" ;
            ddo.backgroundColor = "#ffcc00" ;
            ret.push(ddo);
        }
        /*
        for (var j = 0; j < zoneTempColorRange.length; j++) {
            if (zoneTempColorRange[j].value > data[i].present_value) {
                ddo.backgroundColor = zoneTempColorRange[j].color;
                break;
            }
        }
        */

    }
    resp.success(ret);
}