import { Component , OnInit, ChangeDetectorRef} from '@angular/core';
import { InterventionService,Intervention } from '../intervention';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-list-inter-t-tech',
  templateUrl: './list-inter-t-tech.component.html',
  styleUrls: ['./list-inter-t-tech.component.css']
})
export class ListInterTTechComponent implements OnInit{

  ListeIntervention : any[]=[];
  Tech :any ;
  searchText ='';
  Intervention: Intervention | undefined;

  constructor(private InterventionService: InterventionService,private sessionStorage: SessionStorageService,private cdRef: ChangeDetectorRef) { }


  ngOnInit(): void {
    this.Tech   = this.sessionStorage.retrieve('userTech');
    console.log()
    this.InterventionService.getAllInterventions(this.Tech.id).subscribe(
      data => {
        this.ListeIntervention = data;
        console.log(data[0].date_intervention)
      }, 
      error => {
        console.log(error);
      }
    );
    }
    ngAfterViewInit() {
      this.cdRef.detectChanges();
    }
    onSearchTermChanged() {
      this.ListeIntervention=this.filteredArmoires();
      if(this.searchText=='') this.ngOnInit()
    }
  
    filteredArmoires() {
      console.log("checheee");
      return this.ListeIntervention.filter(Intervention =>
        Intervention.intitule_Intervention.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
    
}
