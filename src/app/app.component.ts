import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  sessionConnecte = sessionStorage.getItem('token');
  nomUser = sessionStorage.getItem('nomUser');

  constructor(
    private router: Router
  ){}

  ngOnInit(): void {
    // this.router.navigate(['/accueil']);
  }

  deconnexion(){
    sessionStorage.removeItem('nomUser');
    sessionStorage.removeItem('token');
    this.router.navigate(['/']).then(() => { 
      window.location.reload();
    });
  }

  menuToggle(){
    $.noConflict();
    "use strict";
    // Menu Trigger
    $('#menuToggle').on('click', function(event) {
      var windowWidth = $(window).width();   		 
      if (windowWidth<1010) { 
        $('body').removeClass('open'); 
        if (windowWidth<760){ 
          $('#left-panel').slideToggle(); 
        } else {
          $('#left-panel').toggleClass('open-menu');  
        } 
      } else {
        $('body').toggleClass('open');
        $('#left-panel').removeClass('open-menu');  
      } 
        
    }); 

    
    $(".menu-item-has-children.dropdown").each(function() {
      $(this).on('click', function() {
        var $temp_text = $(this).children('.dropdown-toggle').html();
        $(this).children('.sub-menu').prepend('<li class="subtitle">' + $temp_text + '</li>'); 
      });
    });

    // Load Resize 
    $(window).on("load resize", function(event) { 
      var windowWidth = $(window).width();  		 
      if (windowWidth<1010) {
        $('body').addClass('small-device'); 
      } else {
        $('body').removeClass('small-device');  
      } 
      
    });
  }

  ouvrirRecherche(){
    $('.search-trigger').on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      $('.search-trigger').parent('.header-left').addClass('open');
    });
  }

  fermerRecherche(){
    $('.search-close').on('click', function(event) {
      event.preventDefault();
      event.stopPropagation();
      $('.search-trigger').parent('.header-left').removeClass('open');
    });
  }
}
