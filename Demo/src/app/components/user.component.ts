import { Component } from '@angular/core';

@Component ({
   selector: 'user',
   template: `
        <h1> Jeu d'allumettes</h1>
        <h3>Paramètres du jeu</h3>
        <ul>
            <li><strong>Nombre Allumettes de départ: </strong>{{nbrAllumettesDepart}}</li>
            <li><strong>Nombre Allumettes restants: </strong>{{nbrAllumettes.length}}</li>
            <li><strong>A qui le tour: </strong>{{joueurDepart ? "Vous" : "Votre adversaire"}}</li>
            <li><strong>Dernier tir adversaire: </strong>{{nbrPCtire}}</li>
        </ul>
        <BR>
        <BR>

        Celui qui prend la dernière allumette gagne la partie !<br>
        
        <form name="formulaire">
            <img *ngFor="let alumette of nbrAllumettes; let i = index" src='http://www.gifmania.com/Gif-Animados-Objetos/Imagenes-Tabaco/Cerillas/Cerillo-72375.gif' style="width:50px; heigh:100px;" name='{{i}}'>
            <br>
            <div>
                
                <p *ngIf="nbrAllumettes.length && joueurDepart==1">
                    {{nbrAllumettes.length ? "Combien prenez-vous d'allumettes ?" : "Bravo!!!! C'est gagné !"}} 
                        <button *ngFor="let n of nbrMaxPrise; let i = index" (click)="joueurPrincipal(i+1)">{{i+1}}</button>
                </p>

                <p *ngIf="joueurDepart==0">
                    {{joueurAutomatique()}}                   
                </p>
            </div>
        </form>
   `,
})
export class UserComponent  { 
    
    nbrAllumettes = new Array(Math.floor(Math.random()*(21-12+1)+12));
    nbrMaxPrise = new Array(3); // Nombre maximum de prise (3)
    joueurDepart: number; // Le joueur à commencer en premier
    nbrPCtire: number; // Nombre de prise du joueur automatique
    nbrAllumettesDepart: number;  //Nombre des allumettes de départ

    constructor(){
        this.nbrAllumettesDepart = this.nbrAllumettes.length;
        this.joueurDepart = Math.floor(Math.random()*2); //Le joueur qui va commencer va être choisit au hasard
        this.nbrPCtire = 0;
    }

    // Le joueur pout tirer entre 1 à 3 allumettes
    joueurPrincipal(i: number){
        if(this.nbrAllumettes.length){
            // le nombre d'allumettes pris est déduit du nombre total des allumettes
            this.nbrAllumettes.length = this.nbrAllumettes.length-i ; 
            this.joueurAutomatique();
        }else{
            alert("Bravo ! Vous êtes le grand gagnant :D");
            alert("Allez pour gagner une autre partie !")
            location.reload();
        }
    }

    joueurAutomatique(){       
        var nbrAlumRestant = this.nbrAllumettes.length;
        var nbrPriseMaxi = this.nbrMaxPrise.length;

        this.nbrPCtire = nbrAlumRestant - (Math.floor(nbrAlumRestant/(nbrPriseMaxi+1))*(nbrPriseMaxi+1)); 
        
        if(this.nbrPCtire==0){
            this.nbrPCtire=1+Math.floor(Math.random()*nbrPriseMaxi);
        }
        
        this.nbrAllumettes.length = nbrAlumRestant - this.nbrPCtire;
        
        // Le joueur auto gagne si il n'y a plus d'allumettes
        if(this.nbrAllumettes.length==0){
            alert("Qui c'est le meilleur ? :D");
            alert("Vous êtes le meilleur? Ok on joue une autre partie ;)")
            location.reload();
        }
        this.joueurDepart=1;
    }   
}

interface address{
    street : string;
    city : string;
    state : string;
}