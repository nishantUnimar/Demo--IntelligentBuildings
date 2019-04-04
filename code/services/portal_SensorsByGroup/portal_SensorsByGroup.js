var floor="26";
var group="1";

function portal_SensorsByGroup(req, resp){
    ClearBlade.init({ "request": req });
    if (req.params.floor)
        floor=req.params.floor;
    if (req.params.group)
        group=req.params.group;
    
    //log(req) ;
    
    devices=ClearBlade.Device();
    query=ClearBlade.Query();
    if (group.length==1)
        group="0" + group;
    query.columns(["name", "description", "present_value", "groupid"]);
    query.equalTo("groupid", floor + "-" + group);
    query.ascending("description");
    devices.fetch(query,function(err,data){
        if (err)
            resp.err(data);
        else
            //log(data);
            sendtoq(data);
            resp.success(data);
    });
}

function sendtoq(payload) {
    // added by dflinn to just splat to a message queue for the rule builder to use
    var topic = "sensors" ;
    var msg = ClearBlade.Messaging();
    var obj = {} ;
    for (var i=0; i < payload.length; i++ ) {
       // log(payload[i]);
        var boo = payload[i] ;
        var foo = boo.description;
        obj[foo] = boo.present_value ;
    }
    //log (obj);
	//log("Publishing topic: " + topic + " with payload " + JSON.stringify(payload));
	msg.publish(topic, JSON.stringify(obj));
}