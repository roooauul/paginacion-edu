import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

import { EstadoTarea, EstadoTareaDescripcion, Tarea } from './models/Tarea.models';
import { Usuario } from './models/Usuario.models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  form!: FormGroup;
  listaTareas!: Tarea[];
  listaPensionistas!: Usuario[];
  estado = EstadoTarea;
  estadoDescripcion = EstadoTareaDescripcion;
  idTareaModificar!: number;
  tareaCalificadaId: any;
  tareaVer!: Tarea;
  estadisticaCargada = false;
  dataSource = null;
  /** PAGINACION **/
  ultimaPagina!: number;
  totalPaginas!: number[];
  totalElementos!: number;
  listaPaginacion!: Tarea[];
  filtro = new FormControl();
  elementosPorPagina = new FormControl(10); // Parametro inicial, no modificar
  opcionElementosPorPagina = [10, 15, 20];  // Parametro inicial, no modificar
  maximoPaginacion = 5;                     // Parametro inicial, no modificar
  actualPaginacion = 5;                     // Parametro inicial, no modificar
  paginaActual = 1;                         // Parametro inicial, no modificar
  /** PAGINACION **/

  constructor(
    private sanitizer: DomSanitizer
  ) {

  }

  ngOnInit(): void
  {
    this.traerLista();
    this.traerPensionistas();
    this.form = new FormGroup({
      pensionistaAsignadoId: new FormControl("", [Validators.required]),
    });
  }
  
  public traerLista()
  {
    this.listaTareas = [];
    for (let i = 0; i < 100; i++) {
      this.listaTareas.push(this.getNewTarea(i + 1));
    }
    /** PAGINACION **/
    this.setPaginacion();
    /** PAGINACION **/
  }

  /** PAGINACION **/
  public cambiarNumeroPorPaginas(numero: number): void {
    this.elementosPorPagina.setValue(numero);
    this.setPaginacion();
  }

  public buscar(): void {
    this.paginaActual = 1;
    this.setPaginacion();
  }

  public get numeroPorPaginas(): number {
    return this.elementosPorPagina.value;
  }

  public setPaginacion(): void {
    const filtro = this.filtro.value;
    const listaPaginacionTemp = filtro && filtro !== '' ? this.listaTareas.filter((tarea) => tarea.nombreTarea.includes(filtro)) : this.listaTareas;
    const indexMax = this.paginaActual * this.numeroPorPaginas;
    const indexMin = indexMax - this.numeroPorPaginas;
    this.totalElementos = listaPaginacionTemp.length;
    this.totalPaginas = this.getTotalPaginas();
    this.listaPaginacion = listaPaginacionTemp.filter((tarea, index) => index >= indexMin && index < indexMax);
  }

  public seMuestra(index: number): boolean {
    return index <= this.actualPaginacion && this.actualPaginacion - this.maximoPaginacion < index;
  }

  public cambiarPagina(index: number): void {
    if (index === this.paginaActual) return;
    const avanza = index > this.paginaActual;
    this.paginaActual = index;
    if (index === 1) this.actualPaginacion = this.maximoPaginacion;
    else {
      if (avanza && this.ultimaPagina !== this.actualPaginacion && this.actualPaginacion - this.paginaActual === 0) this.actualPaginacion++;
      if (!avanza && this.actualPaginacion - (this.maximoPaginacion - 1) === index) this.actualPaginacion--;
    }
    this.setPaginacion();
  }

  public atras(): void {
    this.paginaActual--;
    if (this.actualPaginacion !== this.maximoPaginacion) this.actualPaginacion--;
    this.setPaginacion();
  }

  public siguiente(): void {
    this.paginaActual++;
    if (this.ultimaPagina !== this.actualPaginacion) this.actualPaginacion++;
    this.setPaginacion();
  }

  private getTotalPaginas(): number[] {
    const total: number[] = [];
    const quotient = Math.floor(this.totalElementos/this.numeroPorPaginas);
    const remainder = this.totalElementos % this.numeroPorPaginas;
    const finalNumber = quotient + (remainder > 0 ? 1 : 0);
    for (let i = 1; i <= finalNumber; i++) {
      total.push(i);
    }
    this.ultimaPagina = total.length;
    return total;
  }
  /** PAGINACION **/
  public getNewTarea(index: number){
    const hoy = new Date();
    const tarea = new Tarea();
    tarea.esPeriodica = false;
    tarea.nombreTarea = 'Tarea ' + index;
    tarea.descripcionTarea = 'Descripcion Tarea ' + index;
    tarea.fechainicioTarea = hoy;
    tarea.horainicioTarea = hoy;
    hoy.setDate(2);
    tarea.fechaterminoTarea = hoy;
    tarea.horaterminoTarea = hoy;
    tarea.calificacionTarea = 1;
    tarea.tipoUsuarioTarea = 1;
    tarea.comentario = 'Comentario ' + index;
    tarea.estadoTarea = EstadoTarea.Calificada;
    tarea.id = index;
    return tarea;
  }

  async eliminar(id: any)
  {
    alert('eliminar()');
  }

  editar(id: any): void
  {
    alert('editar()');
  }

  public traerPensionistas()
  {
    this.listaPensionistas = [];
  }

  private async editarTarea()
  {
    alert('editarTarea()');
  }

  seleccionaTarea(idTarea: number)
  {
    this.idTareaModificar = idTarea;
  }

  calificarTarea(tareaCalificadaId: any): void {
    this.tareaCalificadaId = tareaCalificadaId;
  }

  reiniciar(): void {
    this.cerrarModal();
    this.traerLista();
  }

  cerrarModal(): void {
    alert('cerrarModal()');
  }

  verTarea(id: any): void
  {
    this.tareaVer = this.listaTareas.find((tarea) => tarea.id == id) ?? new Tarea();
  }

  transform(base64: string) {
    const image = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/png;base64," + base64);
    return image;
  }

  goToTarea(): void
  {
    alert('goToTarea()');
  }

  transformText(text: string): string {
    if (!text) return "";
    return text
      // insert a space before all caps
      .replace(/([A-Z])/g, ' $1')
      // uppercase the first character
      .replace(/^./, function (str) { return str.toUpperCase(); })
  }

}
