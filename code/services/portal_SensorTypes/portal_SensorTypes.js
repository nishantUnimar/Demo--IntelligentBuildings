function portal_SensorTypes(req, resp){
    var floor="01";
    ClearBlade.init({ "request": req });
    log(req);
    var ret = [];
    var query = ClearBlade.Query();
    var devices=ClearBlade.Device();
    
    var groupBy = function(xs, key) {
        return xs.reduce(function(rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
        }, {});
    };
    
    var returnTypes=function(err,data) {
        if (err) {log(err);resp.err(data)}
        else
            for (var i=0;i<data.length;i++) {
                ret.push(data[i]);
        }
        var g=groupBy(ret, "description");
        resp.success(Object.getOwnPropertyNames(g).sort());
    };
    
    query.ascending("description");
    //if (req.params.floor)
    //    floor=req.params.floor;
    query.equalTo("floorid", floor.toString());
    query.columns(["description"]);
    query.setPage(0, 0);
    devices.fetch(query, returnTypes);
}