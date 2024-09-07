var responseService = {

    interval: null,
    generateResponse: function () {
        var out = document.getElementById("output");
        var userInput = document.getElementById("text").value;

        $.ajax({
            url: Constants.get_api_base_url() + "generateResponse",
            method: "POST",
            data: JSON.stringify({ prompt: userInput }), // Stringify the data to be sent
            contentType: "application/json",
            dataType: "json",
            beforeSend: function (xhr) {
                if (localStorage.getItem('current_user')) {
                    xhr.setRequestHeader("Authentication", localStorage.getItem('token'));
                }
            },
            success: function (response) {
                console.log('response', response);
                if (response && response.result && response.result.length > 0) {
                    out.value = '';
                    userInput.value = '';
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

document.querySelector('.btn1').addEventListener('click', function () {
    responseService.generateResponse();
});

document.querySelector('.btn2').addEventListener('click', function () {
    responseService.stopGenerate();
});
