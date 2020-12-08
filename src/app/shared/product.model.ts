import {Composition} from './composition.model';

export class Product {
  public id: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public  compositions: Composition[];
  constructor(id: number, name: string, desc: string, imagePath: string, compositions: Composition[]) {
    this.id = id;
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.compositions = compositions;
  }
}
