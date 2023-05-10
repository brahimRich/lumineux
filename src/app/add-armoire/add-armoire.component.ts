import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ArmoireService ,Armoire,typeArmoire,armoireListe} from '../armoire';

import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators,FormBuilder } from '@angular/forms';

 

import { Router } from '@angular/router';

@Component({ 
  selector: 'app-add-armoire',
  templateUrl: './add-armoire.component.html',
  styleUrls: ['./add-armoire.component.css']
})

export class AddArmoireComponent implements OnInit {
  Mofifer : boolean = false;
  boutonDesactive: boolean = true;
  errorMessageMarque='';
 


  typeArmoire : typeArmoire = {
    nom : '',
  };
 

  armoireListe : armoireListe = {
    marque : '',
    calibre : '',
    nombre : 0,
    typeArmoire :{
      nom : '',
    }
  };


  Armoire : Armoire = {
    id:88,
    armoireListe : [{
      marque : '',
      calibre : '',
      nombre : 0,
      typeArmoire :{
        nom : 'Sectionneur',
      },
    },
    {
      marque : '',
      calibre : '',
      nombre : 0,
      typeArmoire :{
        nom : 'Porte fusible',
      },
    },
    {
      marque : '',
      calibre : '',
      nombre : 0,
      typeArmoire :{
        nom : 'Repartiteur',
      },
    },
    {
      marque : '',
      calibre : '',
      nombre : 0,
      typeArmoire :{
        nom : 'Contacteur',
      },
    }
    ,{
      marque : '',
      calibre : '',
      nombre : 0,
      typeArmoire :{
        nom : 'Horloge',
      },
    },
    {
      marque : '',
      calibre : '',
      nombre : 0,
      typeArmoire :{
        nom : 'Disj uni C32',
      },
    },{
      marque : '',
      calibre : '',
      nombre : 0,
      typeArmoire :{
        nom : 'Bornes',
      },
    },{
      marque : '',
      calibre : '',
      nombre : 0,
      typeArmoire :{
        nom : 'Cablage',
      },
    }
  ]
  };

  

  constructor(private ArmoireService: ArmoireService,private route: ActivatedRoute,private formBuilder: FormBuilder,private router: Router) { 
  }

  ngOnInit(): void {
      const routeParams = this.route.snapshot.paramMap;
      const Armoire = Number(routeParams.get('armoire'));
      if(Armoire){
        this.Mofifer=true;
        this.errorMessageMarque='';
        this.boutonDesactive = false;
      this.ArmoireService.FindById(Armoire).subscribe(
        Armoire => {
          this.Armoire = Armoire;
        },
        error => {
          console.error(error);
        }  
      );
      }

      /* this.ArmoireService.FindById(5).subscribe(data => {
        const jsonData = JSON.stringify(data); 
        this.Armoire=data;
        console.log(this.Armoire.id); 
        console.log(jsonData); 
    });*/


  }


updateErrorMessagee() {
  if (this.errorMessageMarque=='') {
    console.log('erreur vide')
    this.boutonDesactive = false; 
  } else {
    this.boutonDesactive = true; 
  }

}

submitProduct(): void {
  this.ArmoireService.AddArmoire(this.Armoire);
  const currentUrl = this.router.url;
  if (currentUrl === '/AddArmoire' || currentUrl === '') {
    this.router.navigateByUrl('/AddDepart', { skipLocationChange: false });
  }
}

updatePoint(): void {
  window.alert("modification " + this.Armoire.id);
  const ArmoireJson = JSON.stringify(this.Armoire);
  console.log('modification 111 ********************' + ArmoireJson);
  this.ArmoireService.updateArmoire(this.Armoire);
}


} 