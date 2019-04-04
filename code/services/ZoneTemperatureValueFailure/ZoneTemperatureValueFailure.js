function ZoneTemperatureValueFailure(req, resp){
    
    // for now hard code the rule object.  It would be great if the rulebuilder did this automatically
    var rule = {
        "id": 1,
        "alerttype": "Zone Temperature Valve",
        "groupid": "26-24",
        "status": "red"
    }
    
    ClearBlade.init({ "request": req });

    log("fired") ;
    
    var topic = "alerts" ;
    var msg = ClearBlade.Messaging();
    //log (rule);
	//log("Publishing topic: " + topic + " with payload " + JSON.stringify(rule));
	msg.publish(topic, JSON.stringify(rule));
	
	resp.success ("fired");
}