import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'user'
})
export class UserPipe implements PipeTransform {

  transform(user: any, searchBy: any): any {
    if(!user || !searchBy  ){
    return user; 
    }
    else {
 return user.filter(e=>
  e.name == searchBy
      )}
}

}
