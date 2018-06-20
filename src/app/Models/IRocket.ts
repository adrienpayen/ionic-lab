import {IFirststage, ISecondstage} from "./ILaunch";


export interface IRocket {
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
  first_stage: IFirststage;
  second_stage: ISecondstage;
}


