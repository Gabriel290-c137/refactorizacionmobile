import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products: any[] = []; // Almacena la lista de productos
  totalPrice: number = 0; // Almacena el precio total de los productos seleccionados
  isLoading: boolean = false; // Indica si se están cargando datos
  statusMessage: string = ''; // Almacena mensajes de estado para el usuario

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadProducts();
  }

  /**
   * Carga los productos desde la API y actualiza la lista
   */
  loadProducts() {
    this.isLoading = true;
    this.http.get<any[]>('https://api.example.com/data').subscribe(
      (data) => {
        this.products = data;
        this.calculateTotal();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar productos', error);
        this.statusMessage = 'Error al cargar datos';
        this.isLoading = false;
      }
    );
  }

  /**
   * Agrega un nuevo producto a la lista y recalcula el total
   */
  addProduct(product: any) {
    this.products.push(product);
    this.calculateTotal();
  }

  /**
   * Elimina un producto de la lista por índice y recalcula el total
   */
  removeProduct(index: number) {
    this.products.splice(index, 1);
    this.calculateTotal();
  }

  /**
   * Calcula el precio total de los productos seleccionados
   */
  calculateTotal() {
    this.totalPrice = this.products.reduce((total, product) => {
      return product.isSelected ? total + product.price * product.quantity : total;
    }, 0);
  }

  /**
   * Guarda la lista de productos en la API
   */
  saveProducts() {
    this.isLoading = true;
    this.http.post('https://api.example.com/save', this.products).subscribe(
      () => {
        this.statusMessage = 'Guardado correctamente';
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al guardar', error);
        this.statusMessage = 'Error al guardar';
        this.isLoading = false;
      }
    );
  }
}
