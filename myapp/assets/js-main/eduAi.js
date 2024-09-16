var responseService = {

    interval: null,
    generateResponse: function (message = null, silentMode = false) {
        var out = document.getElementById("output");
        var userInput = "From now on you should only answer questions which are of an educational type, which are related to school and which are useful for students to learn." +document.getElementById("text-eduAI").value;

        var promptText = message || userInput;

        $.ajax({
            url: Constants.get_api_base_url() + "generateResponse",
            method: "POST",
            data: JSON.stringify({ prompt: promptText }), // Stringify the data to be sent
            contentType: "application/json",
            dataType: "json",
            beforeSend: function (xhr) {
                if (localStorage.getItem('current_user')) {
                    xhr.setRequestHeader("Authentication", localStorage.getItem('token'));
                }
            },
            success: function (response) {
                console.log('response', response);
                if (!silentMode) {
                    if (response && response.result && response.result.length > 0) {
                        out.value = ''; // Clear the output
                        document.getElementById("text-eduAI").value = '';

                        var text = response.result;
                        var i = 0;

                        responseService.interval = setInterval(function () {
                            if (i < text.length) {
                                out.value += text.charAt(i);
                                i++;
                            } else {
                                clearInterval(responseService.interval);
                            }
                        }, 20);
                    } else {
                        console.log("No valid response received.");
                        out.value = "No response from AI.";
                    }
                }
            },

            error: function (xhr, status, error) {
                console.log("Error: " + error);
                out.value = "An error occurred.";
            }
        });
    },

    stopGenerate: function () {
    
        if (responseService.interval) {
            clearInterval(responseService.interval);
            responseService.interval = null;           
            console.log("Generation stopped.");
        }
    }
};

/*window.addEventListener('load', function () {
    var defaultMessage = "From now on you should only answer questions which are of an educational type, which are related to school and which are useful for students to learn.";
    responseService.generateResponse(defaultMessage, true);
    console.log('Default message sent!');
});*/


document.querySelector('.btn1').addEventListener('click', function () {
    responseService.generateResponse();
});

document.querySelector('.btn2').addEventListener('click', function () {
    responseService.stopGenerate();
    var userInput = document.getElementById("text-eduAI");
    var AiOutput = document.getElementById("output");

    userInput.value = "";
    AiOutput.value = "";

});
