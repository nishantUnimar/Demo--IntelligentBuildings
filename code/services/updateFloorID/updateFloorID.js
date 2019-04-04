
var _resp;
function updateFloorID(req, resp){
    ClearBlade.init({request:req});
    _resp=resp;
    var devices=ClearBlade.Device();
    var query = ClearBlade.Query();
    var floor="27";
    var group="01";
    query.matches("name", "-" + floor + "-" + group);
    var changes = {
        floorid: floor//,
        //groupid: floor + "-" + group
    };
    query.setPage(0, 0);
    devices.fetch(query, function (err, data) {
        if (err) {
            log(JSON.stringify(err));
            resp.error('failed');
        } else {
            for (var i=0;i<data.length;i++) {
                updateDevice(data[i].name, changes);
            }
        }
        resp.success=data;
    });
}

function updateDevice(deviceName, changes) {
    ClearBlade.updateDevice(deviceName, changes, true, function(err, data) {
    if(err) {
        log("Unable to update device: " + JSON.stringify(data));
	}
        log(deviceName);
	});
}