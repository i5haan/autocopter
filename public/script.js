var plus=document.querySelector(".plus");
var minus=document.querySelector(".minus");

var l=0;
function makeRequest(id)
	{
		var myRequest = new XMLHttpRequest();
		myRequest.open('GET', '/'+id);
		myRequest.send();
	};

plus.addEventListener("click",function()
	{
		if(l<255)
		{
			l=l+1;
		}
		makeRequest(l);
	});

minus.addEventListener("click",function()
	{;
		if(l>0)
		{
			l=l-1;
		}
		makeRequest(l);
	});