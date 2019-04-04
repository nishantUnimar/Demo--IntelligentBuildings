function ZT_VF_copy(req, resp){
    // use this as a template to fix the rule builder.  When you edit the portal widget, it will blow away the data

    var reqObject;

    try {
        reqObject = JSON.parse(req.params.body);
    } catch(e) {
        reqObject = req.params.body;
    }
  
  log (reqObject);
    
  var zt = parseInt (reqObject["Zone Temperature"]);
  var zs = parseInt(reqObject["Zone Setpoint"]) ;
  var dat = parseInt(reqObject["Discharge Air Temperature"]);
  var diff = 5.0 ;
  
  log ( zt + " , " + zs + " , " + dat ) ;
  
  //82 , 75 , 73
   log ( zt + " , " + (zs + diff)  + " , " +  dat ) ;
  
  if ( zt > (zs + diff) && dat < zt){
    callAlertProvider();
  }
  
  //log ("ZT : " + reqObject["Zone Temperature"] + " " + (parseInt(reqObject["Zone Setpoint"]) + 5.0 ));
  
//  if ((reqObject["Zone Temperature"] > (reqObject["Zone Setpoint"] + 5)) && ((reqObject["Discharge Air Temperature"]+5) > reqObject["Zone Temperature"])) {
  //  callAlertProvider();
  //}
  
    function callAlertProvider () {
    
        ClearBlade.init({request:req});
        ClearBlade.Code().execute("ZoneTemperatureValueFailure", {}, true, function (err, body){
            if(err) {
                log("Failure while executing ZoneTemperatureValueFailure; " + JSON.stringify(err));
                resp.error(body);
            } else {
                log("Successfully executed ZoneTemperatureValueFailure");
                resp.success(body);
            }
        })
    
    }
   
}