import { AbstractControl, ValidatorFn } from "@angular/forms";

//This works as a validator.. but doesn't accept any parameters. You can put a breakpoint within.
// export function urlValidator(control: AbstractControl): {[key: string]: any} | null {
    
//     var validationStatus: Boolean;
//     if (control.value.indexOf("http:") == 0 || control.value.indexOf("https:") == 0) {
//         validationStatus = true;
//         return null;
//     } else {
//         validationStatus = false;
//         return {'urlInvalid': {value: control.value}};
//     }
// }

//This works.. but doesn't appear that I can put a breakpoint within this function
export function urlValidator(badPrefixes: string[]): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
    
        var validationStatus: Boolean;
        if (control.value.indexOf(badPrefixes[0]) == 0 || control.value.indexOf(badPrefixes[1]) == 0) {
            validationStatus = true;
            return null;
        } else {
            validationStatus = false;
            return {'urlInvalid': {value: control.value}};
        }
    };
}