import { Menu } from '../interfaces/menuInterface';


const days = [
  "Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"
];
// Datos de ejemplo para el menú
const sampleMenus: Menu[] = [
  {
    id: '1',
    name: `Menú del Día - ${days[new Date().getDay()]}`,  
    date: new Date().toISOString(),
    type: 'daily',
    items: [
      {
        id: '101',
        name: 'Ensalada César',
        description: 'Lechuga romana, crutones, queso parmesano, aderezo césar',
        price: 89,
        category: 'Entrada',
        isVegetarian: true
      },
      {
        id: '102',
        name: 'Pollo a la Parrilla',
        description: 'Pechuga de pollo a la parrilla con vegetales al vapor',
        price: 129,
        category: 'Plato Fuerte',
        isVegetarian: false,
        isGlutenFree: false
      }
    ]
  },
  // Agrega más menús de ejemplo según sea necesario
];

export const menuService = {
  getSampleMenus: (): Menu[] => sampleMenus,
  // Aquí puedes agregar más métodos para llamadas a la API

  async getMenus(): Promise<Menu[]> {
    // Simular llamada a API
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...sampleMenus]);
      }, 500);
    });
  },
};
