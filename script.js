var apikey = '91df4711deb6a6fa8e7c694207940394218396cd'; // Put your API key here

// Use this function to do stuff with your results. 
// It is called after 'search' is executed.


var results;
function searchCallback(results) {
    console.log(results);
    for(var i=0; i < 9; i++) {
    	if(i % 3 == 0){
    		$(".mainList").append("<div class='row'></div>")
    	}
        if(i < 3){
           $(".row").last().append("<div class='col-md-4 well r'><button class='btn btn-sm btn-success remove'>Remove</button><div id='game"+ i + "' class='column'><h1 class='game'>" + results[i].name + "</h1></br><div class='icon hidden-sm hidden-xs'><img src='" + results[i].image.small_url + "'/></div><div class='game'>" + results[i].deck + "</div></div></div>");
        }else if (i > 5){
            $(".row").last().append("<div class='col-md-4 well b'><button class='btn btn-sm btn-success remove'>Remove</button><div id='game"+ i + "' class='column'><h1 class='game'>" + results[i].name + "</h1></br><div class='icon hidden-sm hidden-xs'><img src='" + results[i].image.small_url + "'/></div><div class='game'>" + results[i].deck + "</div></div></div>");
        }else {
            $(".row").last().append("<div class='col-md-4 well g'><button class='btn btn-sm btn-success remove'>Remove</button><div id='game"+ i + "' class='column'><h1 class='game'>" + results[i].name + "</h1></br><div class='icon hidden-sm hidden-xs'><img src='" + results[i].image.small_url + "'/></div><div class='game'>" + results[i].deck + "</div></div></div>");
        }
}
$(".remove").on("click", function(){
  $(this).parent().fadeOut();
});
$("#restore").on("click", function(){
  $(this).siblings().children().fadeIn();
});
}
$(".mainList").on("click", ".column",function(){
    $(".game").slideUp(1000);
    if ($(this).data("open")){
        $(this).data("open", false);
    }
    else{
        $(this).data("open", true);
        $(this).children().slideDown(1000);
    }
});

$(document).ready(function() {

	// Start the search here!
	search("Final Fantasy")
	// search();


});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
       type: 'GET',
       dataType: 'jsonp',
       crossDomain: true,
       jsonp: 'json_callback',
       url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
       complete: function() {
           console.log('ajax complete');
       },
       success: function(data) {
           searchCallback(data.results);
       }
   });
}