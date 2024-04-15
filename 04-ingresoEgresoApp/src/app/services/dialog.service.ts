import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  abrirLoading(){
    Swal.fire({
      title: "Espere por favor",
      didOpen: () => {
        Swal.showLoading();
      },
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
  }

  cerrarLoading(){
    Swal.close()
  }

  error(error:string){
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error
    });
  }
}
