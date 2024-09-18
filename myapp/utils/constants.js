var Constants = {
    get_api_base_url: function () {

      if(location.hostname == 'localhost'){
        return "http://localhost:80/eduPlanner/rest/";
      } else {
        return "https://eduplanner-4l5e.onrender.com/rest/";
      }
    }
  };