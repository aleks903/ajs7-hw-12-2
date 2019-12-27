import Buyable from './Buyable';

export default class Smartphone implements Buyable {
  constructor(
    readonly id: number,
    readonly name: string,
    readonly price: number,
    public amount: number,
    readonly osversion: string,
    readonly firm: string,
  ){}
}