import {Composition} from './composition.model';

export class Product {
  public name: string;
  public description: string;
  public imagePath: string;
  public  compositions: Composition[];
  constructor(name: string, desc: string, imagePath: string, compositions: Composition[]) {
    this.name = name;
    this.description = desc;
    this.imagePath = imagePath;
    this.compositions = compositions;
  }
}
