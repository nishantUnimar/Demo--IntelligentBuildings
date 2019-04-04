const COLLECTIONNAME = "sensorMetaData";
var floor;
var description="Zone Temperature";
const MAXSENSORS=0;
var DEFAULTRANGE=24*14;

var executionStartTime = Date.now();

function loadSensorHistoryByDescription(req, resp){
    ClearBlade.init({ "request": req });
    var ret = [];
    var promises = [];
    var code = ClearBlade.Code();
    var query = ClearBlade.Query({ collectionName: COLLECTIONNAME });
    range=req.params.range;
    if (!range) {
        range=DEFAULTRANGE;
    }

    var getSensorHistoryPromise = function(sensorObject, range) {
        var deferred = Q.defer();
        var code = ClearBlade.Code();
        var payload = { "sensorObject": sensorObject, "range": range };
        code.execute("loadSensorDataHistory", payload, false, function(err, data) {
            data = JSON.parse(data);
            var success = (!err && data.success) ? "PASS" : "FAIL";
            log(success + ": " + sensorObject.device_name);
            ret.push(data.results);
            deferred.resolve(data);
        });
        return deferred.promise;
    };

    var processSensorList = function(err, data) {
        if (err) {
            resp.error(JSON.stringify(err));
        } else {
            var sensorObject = [];
            for (i = 0; i < data.DATA.length; i++) {
                sensorObject.push(data.DATA[i]);
            }
            for (i = 0; i < sensorObject.length; i++) {
                promises.push(getSensorHistoryPromise(sensorObject[i], DEFAULTRANGE));
            }
            Q.all(promises).then(function() {
                try {
                    var executionTime=JSON.stringify(((Date.now() - executionStartTime) / 1000));
                    log("Execution Time: " + executionTime);
                    ret.totalexecutionTime = executionTime;
                    resp.success(ret);
                } catch (error) {
                    log("Error" + JSON.stringify(error.message));
                    resp.error(JSON.stringify(error.message));
                }
                

            });
        }
    };


    if (req.params.floor)
        floor= req.params.floor.toString();
    if (req.params.description)
        description=req.params.description;
    else
        resp.error("Invalid Parameter");

    query.ascending("device_name");
    if (floor)
        query.equalTo("floorid",floor);
    query.equalTo("description", description);
    query.setPage(0, 0);
    log(JSON.stringify(req));
    query.fetch(processSensorList);
}
