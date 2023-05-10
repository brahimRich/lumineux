import { Component, OnInit ,  Output, EventEmitter  } from "@angular/core";
import {FormBuilder, Validators} from '@angular/forms';
import { PointLumineux ,ProductService} from '../products';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-intervention-form',
  templateUrl: './intervention-form.component.html',
  styleUrls: ['./intervention-form.component.css']
})
export class InterventionFormComponent implements OnInit {


  Mofifer : boolean = false;
  boutonDesactive: boolean = true;
  errorMessageN='';
  errorMessageLa='';
  errorMessageLo='';
  PointLumineux : PointLumineux = {
    reference: 86,
    type : '',
    longitude: 0,
    latitude: 0,
    allume: true,
    numero :0,
    marque : '',
    degre_prot : '',
    puissance_max : 0,
    temperature : 0,
    class_electrique : '',
    date_accussition : '',
    adresse : {
      rue: '',
      quertier: '',
    },
    coordonnees :{
      x: 0, 
      y: 0,
    }
  };

  @Output() productAdded = new EventEmitter<PointLumineux>();
  
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  
  isLinear = false;

  constructor(private _formBuilder: FormBuilder,private productService: ProductService,private route: ActivatedRoute,private formBuilder: FormBuilder) {}
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const pointLumineux = Number(routeParams.get('pointLumineux'));
    if(pointLumineux){
      this.Mofifer=true;
      this.errorMessageN='';
      this.errorMessageLa='';
      this.errorMessageLo='';
      this.boutonDesactive = false;
    this.productService.FindById(pointLumineux).subscribe(
      pointLumineux => {
        this.PointLumineux = pointLumineux;
      },
      error => {
        console.error(error);
      }
    );
    }
  }

  updateErrorMessagee() {
    if(this.PointLumineux.type=='') this.errorMessageN='Ce champ est obligatoire';
    else this.errorMessageN='';
    if(this.PointLumineux.latitude==null || this.PointLumineux.latitude==0) this.errorMessageLa='Le champ Latitude est obligatoire';
    else this.errorMessageLa='';
    if(this.PointLumineux.longitude==null || this.PointLumineux.longitude==0) this.errorMessageLo='Le champ Longitude est obligatoire';
    else this.errorMessageLo='';
    if (this.errorMessageN=='' && this.errorMessageLa=='' && this.errorMessageLo=='') {
      console.log('eror vide')
      this.boutonDesactive = false; 
    } else {
      this.boutonDesactive = true; 
    }
  }

  //  step : any = 1;

  // submit(){
  //   this.step = this.step + 1; 
  // }

  // previous(){
  //   this.step = this.step - 1; 
  // }
}
