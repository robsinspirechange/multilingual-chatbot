var resp_lang = "";
var voice = "";
var a = 1;

$(document).ready(function(){
resp_lang = "en"; 
    
$('#input_txt').keydown(function(event) {
    // enter has keyCode = 13, change it if you want to use another button
    if (event.keyCode == 13) {
    send(document.getElementById('input_txt').value);
    $("#input_txt").val('');
    }
 });    
    
if (annyang) {
  var commands = {
    'hello': function() { console.log('Hello world!');send("hello")},
    'jessie *tag': function(tag) { console.log(tag);send(tag) }
  };
  annyang.addCommands(commands);
  annyang.setLanguage('en-IN');
  annyang.start();
  annyang.addCallback('soundstart', function() {
  $('#status').html("<i class=\"fa fa-microphone fa-2x fa-fw text-danger\"></i><span class=\"sr-only\">Loading...</span>");
  console.log('sound detected');
});
annyang.addCallback('result', function() {
  $('#status').html("<i class=\"fa fa-microphone fa-2x fa-fw\"></i><span class=\"sr-only\">Loading...</span>");
  console.log('sound stopped');
  annyang.abort();  
  a =1;
});

  $('#status').click(function() {
    if (a == 0 ) {
      $('#status').html("<i class=\"fa fa-microphone fa-2x fa-fw\"></i><span class=\"sr-only\">Loading...</span>");
      console.log("stop");
      annyang.abort();  
      a =1;
    }
    else{
     $('#status').html("<i class=\"fa fa-microphone fa-2x fa-fw text-danger\"></i><span class=\"sr-only\">Loading...</span>");
      console.log("start");
      annyang.start();  
      a =0;   
    }
      
  });


  annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
  console.log(userSaid); // sample output: 'hello'
  console.log(commandText); // sample output: 'hello (there)'
  console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
});
}
});

// { autoRestart: true, continuous: false }

  function send(text) {
  			var accessToken = "32cb35d505354a489b950e93041e05bf";
			var baseUrl = "https://api.api.ai/v1/";
            var d = new Date();
            var n = d.toLocaleTimeString();
            $('#status').html("<i class=\"fa fa-spinner fa-pulse fa-2x fa-fw\"></i><span class=\"sr-only\">Loading...</span>");
            $.when(
                $.ajax({

			                method: "GET",
			                contentType: "text/plain",
			                headers: {
			                    'Content-Type': 'text/plain; charset=utf-8;'
			                },
			                url: "http://freebot.herokuapp.com/en/"+String(text),
			                success:function(data) {
								console.log(data + " converted text");
			                	var requestTXT='<li class="mar-btm"><div class="media-right"><img src="http://bootdey.com/img/Content/avatar/avatar2.png" class="img-circle img-sm" alt="Profile Picture"></div><div class="media-body pad-hor speech-right"><div class="speech"><a href="#" class="media-heading">Me</a><p>'+text+'</p><p class="speech-time"><i class="fa fa-clock-o fa-fw"></i> '+n+'</p></div></div></li>';
					            $("ul").append(requestTXT);
					            var objDiv = document.getElementById("for_scroll");
					         	objDiv.scrollTop = objDiv.scrollHeight;
			                },
			                error: function (err) {
			                    console.log('error' + err);
			                }
            			})
                ).then(function(results){  
                						$.when(
                								 $.ajax({
								                type: "POST",
								                url: baseUrl + "query?v=20150910",
								                contentType: "application/json; charset=utf-8",
								                dataType: "json",
								                headers: {
								                    "Authorization": "Bearer " + accessToken
								                },
								                data: JSON.stringify({ query: results, lang: "en", sessionId: "Scifiswapnil" }),
								                error: function() {
								                   console.log("Internal Server Error");
								                }
								            	})
                						).then(function(results_2) {
                									console.log(String(results_2.result.fulfillment.speech));
	                								$.ajax({
											                method: "GET",
											                contentType: "text/plain",
											                headers: {
											                    'Content-Type': 'text/plain; charset=utf-8;'
											                },
											                url: "http://freebot.herokuapp.com/"+resp_lang+"/\""+results_2.result.fulfillment.speech+"\"",
											                success:function (data) {
																	console.log(data+ " after conversion");
											              			var responeTXT='<li class="mar-btm"><div class="media-left"><img src="http://bootdey.com/img/Content/avatar/avatar1.png" class="img-circle img-sm" alt="Profile Picture"></div><div class="media-body pad-hor"><div class="speech"><a href="#" class="media-heading">Jessie</a><p>'+data+'</p><p class="speech-time"><i class="fa fa-clock-o fa-fw"></i>'+n+'</p></div></div></li>';
												                    $("ul").append(responeTXT);
												                    var objDiv = document.getElementById("for_scroll");
												                    objDiv.scrollTop = objDiv.scrollHeight;
												                    if (resp_lang == "hi") {
												                    	voice = "Hindi Female";
												                    }else if (resp_lang == "en") {
												                    	voice = "US English Female";
												                    }else if (resp_lang == "fr") {
												                    	voice = "French Female";
												                    }else if (resp_lang == "ru") {
												                    	voice = "Russian Female";
												                    }else if (resp_lang == "ja") {
												                    	voice = "Japanese Female";
												                    }else if (resp_lang == "es") {
												                    	voice = "Spanish Female";
												                    }
												                    responsiveVoice.setDefaultVoice(voice);
												                    responsiveVoice.speak(data);
                                                                    $('#status').html("<i class=\"fa fa-microphone fa-2x fa-fw\"></i><span class=\"sr-only\">Loading...</span>");
											                },
											                error: function (err) {
											                    console.log('error' + err);
											                }
								            			})
                						});
			            				});
        		}

                function changeLang(val)
                {
                    console.log(val);
                    if(val == "English")
                    {
                    annyang.setLanguage('en-IN'); 
                    resp_lang = "en";   
                    console.log("English it is");
                    }
                    else if (val == "Hindi")
                    {
                    annyang.setLanguage('en-IN'); 
                    resp_lang = "hi";   
                    console.log("Hindi it is");
                    }
                    else if(val == "Spanish")
                    {
                    annyang.setLanguage('es-ES'); 
                    resp_lang = "es"; 
                    console.log("Spanish it is");  
                    }
                    else if (val == "French")
                    {
                    annyang.setLanguage('fr-FR'); 
                    resp_lang = "fr";   
                    console.log("French it is");
                    }
                    else if(val == "Russian")
                    {
                    annyang.setLanguage('ru-RU'); 
                    resp_lang = "ru"; 
                    console.log("Russian it is");  
                    }
                    else if (val == "Japanese")
                    {
                    annyang.setLanguage('ja-JA'); 
                    resp_lang = "ja";   
                    console.log("Japanese it is");
                    }                    
                }

