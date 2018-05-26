var request=require("request");

var alpha=[0,0,0];
var prevOmega=[0,0,0];
var currentOmega=[0,0,0];

var checkGyro=function(){
	request.get("http://192.168.43.1:8080/sensors.json?sense=gyro",function(e,r,b)
		{
			if(!e && r.statusCode==200)
			{
				var d=JSON.parse(b);
				if(d.gyro)
				{
					currentOmega=d.gyro.data[d.gyro.data.length-1][1];
					for(var i=0;i<3;i++)
					{
						// alpha[i]=alpha[i]+((d.gyro.data[d.gyro.data.length-1][1][i]-d.gyro.data[d.gyro.data.length-2][1][i])*(d.gyro.data[d.gyro.data.length-1][0]-d.gyro.data[d.gyro.data.length-2][0])*180)/3.14;
						alpha[i]=alpha[i]+((currentOmega[i]-prevOmega[i])*0.025*180)/3.14;
						if(alpha[i]>180)
						{
							alpha[i]=alpha[i]-360;
						}
						else if(alpha[i]<-180)
						{
							alpha[i]=alpha[i]+360;
						}
					}
				}
				
			}
			else
			{
				console.log(e);
				alpha=[0,0,0];
				prevOmega=[0,0,0];
			}
		});
	console.log(alpha);
}

var gyroIntervalId=setInterval(checkGyro,10);