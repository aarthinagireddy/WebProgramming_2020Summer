import { Component, OnInit } from '@angular/core';
import {getOriginalError} from "@angular/core/src/errors";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  result: any;
  constructor() {

    this.result = "hello";
  }

  ngOnInit() {
  }

  SearchBooks(){

    var search = $("#books").val();
    if (search == "") {
      alert("Please enter something in the field");
    } else {
      var url = "";
      var img = "";
      var title = "";
      var author = "";

      $.get("https://www.googleapis.com/books/v1/volumes?q=" + search, function (response) {
        this.result = response;
        console.log(response);
        var content ="";
        for ( var i = 0; i < response.items.length; i++) {




           content ='<h5 class="center-align white-text">' + response.items[i].volumeInfo.title + '</h5>';
           content += '<h5 class="center-align white-text"> By:' + response.items[i].volumeInfo.authors + '</h5>';


          content +=  '<img class="aligning card z-depth-5" id="dynamic"><br><a href=' + response.items[i].volumeInfo.infoLink + '><button id="imagebutton" class="btn red aligning">Read More</button></a>';
          //url = response.items[i].volumeInfo.imageLinks.thumbnail;
          // img.attr('src', url);
          // title.appendTo('#result');
          // author.appendTo('#result');
          // img.appendTo('#result');

        }
        $("#result").html(content);
      });

    }

  }

}
