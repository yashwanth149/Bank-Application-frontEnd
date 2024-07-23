import { FormControl } from "@angular/forms";


export class CustomValid{
    static nospaceValid = (control : FormControl) => {
        if(control.value!=null && control.value.indexOf(' ') !=-1){
            return {nospaceValid:true}
        }
        return null;
    }
}