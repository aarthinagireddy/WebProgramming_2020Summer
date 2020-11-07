import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(){

  }
   getWeather() {

    $ ('weatherResponse').html('');
    var cityName = $('#cityName').val();
    var apiCall='https://api.openweathermap.org/data/2.5/weather?q=' +cityName + '&appid=a0bcc36118659331dd1395354ac5be94';
    $.getJSON(apiCall, weatherCallback);

    function weatherCallback(weatherData){
      var cityName = weatherData.name;
      var country = weatherData.sys.country;
      var description =weatherData.weather[0].description;
      $('.weatherResponse').append("The Weather in " + cityName + " " + country + " is currently" + description)
    }
  }

}


