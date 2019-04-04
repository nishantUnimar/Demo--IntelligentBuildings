//Globals
var _resp;
function updateSensorFloorPlanCoordinates(req, resp){
    ClearBlade.init({request:req});
    //req.params={};
    //req.params.x=50;
    //req.params.y=60;
    req.params.name="FC-1.CAC-26-01.HI-TEMP-A";
    _resp=resp;
    var devices=ClearBlade.Device();
    var query=ClearBlade.Query();
    query.equalTo("name", req.params.name);
    devices.fetch(query, function(err,data){
        if (err) {
            //log(JSON.stringify(data));
            resp.error(data);
        }
        else
            log(JSON.stringify(data));
            getDevicesByGroupID(data[0].groupid, req);
        }
    );
}

function getDevicesByGroupID(groupID, req) {
    var devices=ClearBlade.Device();
    var query=ClearBlade.Query();
    //query.equalTo("groupid", req.params.groupid); //Filter By Group ID
    query.matches("name", groupID); //Update for that entire group of sensors
    devices.fetch(query, function (err, data) {
    if (err) {
            log(JSON.stringify(data));
            _resp.error(data);
        } else {
            log(JSON.stringify(data));
            //_resp.success(data);
            for(var i=0;i<data.length;i++) {
                updateDevice(data[i].name, req);
            }
        }
        });
}

function updateDevice(deviceName, req) {
        ClearBlade.updateDevice(deviceName, {"mapxcoordinates": req.params.x,"mapycoordinates": req.params.y},  function (err, data) {
		if(err) {
			resp.error("Unable to update device: " + JSON.stringify(data));
		}
		_resp.success(data);
	});

}
