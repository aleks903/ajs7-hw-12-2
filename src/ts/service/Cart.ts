import Buyable from '../domain/Buyable';

export default class Cart {
  private _items: Buyable[] = [];
  add(item: Buyable): void {
    const indexProduct = this._items.findIndex(items => items.id == item.id);
    if (indexProduct === -1) {
      this._items.push(item);
    } else {
      let tempProduct = this._items[indexProduct].amount;
      if (tempProduct !== undefined && item.amount !== undefined) {
        tempProduct += item.amount;
        this._items[indexProduct].amount = tempProduct;
      }
    }
  }

  get items(): Buyable[] {
    return [...this._items];
  }

  amountPrice(percent: number = 1): number {
    return this._items.reduce(function(sum, current) {
      if (current.amount !== undefined) {
        return sum += ((current.price * current.amount) * percent);
      }
      return sum += ((current.price) * percent);
    } , 0);
  }

  delItem(id: number): void {
    let idDel = this._items.findIndex(item => item.id == id);
    if (idDel === -1) {
      throw new Error('Не найден элемен');
    }
    this._items.splice(idDel, 1);
  }

  minusProduct(id: number): void {
    const indexProduct: number = this._items.findIndex(item => item.id == id);
    let tempAmount = this._items[indexProduct].amount;
    if(indexProduct !== -1 && tempAmount !== undefined) {
      if(tempAmount > 1) {
        tempAmount -= 1;
        this._items[indexProduct].amount = tempAmount;
      } else {
        this.delItem(id);
      }
    }
  }
}