var request=require("request");
request=request.defaults({jar:true});
var rn="101503097";
var pass="RAS0905";

function run()
{
	request.post("https://webkioskintra.thapar.edu:8443/",
				function(e,r,b)
				{
					if(e || r.statusCode==400)
					{
						console.log(e);
					}
					else
					{
						console.log(b);
						// request.post("https://webkioskintra.thapar.edu:8443/StudentFiles/Academic/Studhostelchoice.jsp",function(e,r,b)
						// {
						// 	if(e || r.statusCode==400)
						// 	{
						// 		console.log(e);
						// 	}
						// 	else
						// 	{
						// 		const dom=new JSDOM(b);
						// 		console.log(dom.window.document.querySelectorAll("table")[2].innerHTML);
						// 	}
						// });
					}
				});
}




