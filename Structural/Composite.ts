abstract class DeliveryItem {
  items: DeliveryItem[] = []

  addItem(item: DeliveryItem) {
    this.items.push(item)
  }

  getItemPrices(): number {
    return this.items.reduce((acc: number, item: DeliveryItem) => (acc += item.getPrice()), 0)
  }

  abstract getPrice(): number
}

class DeliveryShop extends DeliveryItem {
  constructor(public deliveryFee: number) {
    super()
  }

  getPrice(): number {
    return this.getItemPrices() + this.deliveryFee
  }
}

class Package extends DeliveryItem {
  getPrice(): number {
    return this.getItemPrices()
  }
}

class ProductItem extends DeliveryItem {
  constructor(private price: number) {
    super()
  }

  getPrice(): number {
    return this.price
  }
}


const shop = new DeliveryShop(100)
shop.addItem(new ProductItem(1000))
const pack1 = new Package() 
pack1.addItem(new ProductItem(200))
pack1.addItem(new ProductItem(300))
shop.addItem(pack1)
const pack2 = new Package() 
pack2.addItem(new ProductItem(30))
shop.addItem(pack2)

shop.getPrice()
console.log("🚀 ~ file: Composite.ts ~ line 53 ~ shop.getPrice()", shop.getPrice())
//� ~ file: Composite.ts ~ line 53 ~ shop.getPrice() 1630
