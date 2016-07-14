$(document).ready(function(){

	$.get("/gettop", function(data,status){
		//console.log(data);
		//console.log(data[0].title);
		for (var i = 0; i < data.length ; i++){
			$(".top-posts-list").append("<a href='#'class='list-group-item top-post' id='"+data[i].url+"'><span class='badge'>"+data[i].rating+"</span>"+data[i].title+"</a>");
		}
	}).fail(function(){
		console.log('error getting posts');
	});

	$.get("/getSubsaiddits", function(data,status){
		//console.log(data);
		//console.log(data[0].title);
		for (var i = 0; i < data.length ; i++){
			$(".subsaiddits-list").append("<button class='list-group-item' id='subsaiddits'>"+data[i].title+"</button>");
		}
	}).fail(function(){
		console.log('error getting posts');
	});



	$('body').on('click','#subsaiddits', function(data){
		//alert(this.innerHTML);
		var route = "/api/"+this.innerHTML;
		window.location = route;
		
	});

	$('body').on('click','.top-post', function(data){
		//alert(this.innerHTML);
		window.location = "/api" + this.id;
	});


	

});