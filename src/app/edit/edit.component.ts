import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, isFormArray } from '@angular/forms';
import { TableService } from '../services/table.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{
  selectedTime: any;
  constructor(private fb:FormBuilder,private tableService:TableService) {}
  formInfo!:FormGroup;
  selectedItem:any;
  observations:any[]=[];
  properties:any
  @Input() formsData:any;
  ngOnInit(): void {
    this.tableService.fetchData().subscribe((data:any)=>{
     setTimeout(() => {
      this.observations=data;
      this.properties=this.observations[0].Datas[0].Properties

      this.onChangesDetect(this.observations[0].Datas[0].SamplingTime)

      this.formInfo=this.fb.group({
        projectName:new FormControl(this.properties[0]?.Value),
        constructionCount:new FormControl(this.properties[1]?.Value),
        isConstructionCompleted:new FormControl(this.properties[2]?.Value),
        lengthOfTheRoad:new FormControl(this.properties[3]?.Value),
      })
     }, 1500);
    })
  }

  onChangesDetect(time:any) {
    this.selectedTime=time
   let wholedata=[]
   let sample=this.observations[0].Datas.find((item:any)=>item.SamplingTime==time);
    wholedata.push(sample)
    for (const iterator of wholedata) {
    this.properties=iterator?.Properties
    }
  }

  selectItem(item: any) {
  this.selectedItem = item;
}

jsonData:any= {
      Name: 'New Observation',
      Datas: [
        {
          SamplingTime: '2021-04-21T11:00:05.5051255+05:30',
          Properties: [
            { Value: 'Road Construction 1', Label: 'Project Name' },
            { Value: 40, Label: 'Construction Count' },
            { Value: false, Label: 'Is Construction Completed' },
            { Value: 5.6, Label: 'Length of the road' },
          ],
        },
        {
          SamplingTime: '2021-04-22T11:00:05.5081232+05:30',
          Properties: [
            { Value: 'Road Construction 2', Label: 'Project Name' },
            { Value: 40, Label: 'Construction Count' },
            { Value: true, Label: 'Is Construction Completed' },
            { Value: 3.1, Label: 'Length of the road' },
          ],
        },
        {
          SamplingTime: '2021-04-23T11:00:05.5081232+05:30',
          Properties: [
            { Value: 'Road Construction 3', Label: 'Project Name' },
            { Value: 40, Label: 'Construction Count' },
            { Value: false, Label: 'Is Construction Completed' },
            { Value: 3.2, Label: 'Length of the road' },
          ],
        },
      ],
    }


  Submit(Value:any) {

    const putDataDetails={
      SamplingTime:this.selectedTime,
      Properties:[
        {
          "Value": Value.projectName,
          "Label": "Project Name"
        },
        {
          "Value": Value.constructionCount,
          "Label": "Construction Count"
        },
        {
          "Value": Value.isConstructionCompleted,
          "Label": "Is Construction Completed"
        },
        {
          "Value": Value.lengthOfTheRoad,
          "Label": "Length of the road"
        }
      ]
      }

      for (let [index,iterator] of this.jsonData.Datas.entries()) {
        if(iterator.SamplingTime==putDataDetails.SamplingTime){
          this.jsonData.Datas[index]=putDataDetails
        iterator=putDataDetails;
        }
        }
    this.tableService.updateData(this.jsonData);
    this.tableService.fetchData();
    window.location.reload();
  }

}
