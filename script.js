class Hero {
  constructor(health) {
    if (this.constructor === Hero) {
      throw new Error("Hero is not instantiable");
    }
    this.inventory = new Inventory();
    this.health = health;
    this.weapon = null;
  }

  takeWeapon(weapon) {
    this.inventory.addItem(weapon);
    this.weapon = weapon;
  }

  dropWeapon() {
    const activeWeapon = Object.assign({}, this.weapon);
    this.weapon = this.inventory.nextItem();
    this.inventory.removeItem();
    return activeWeapon;
  }

  takeDamage(damage) {
    this.health -= damage;
  }
}

class Wizard extends Hero {
  static HEALTH = 150;
  constructor() {
    super(Wizard.HEALTH);
  }

  takeWeapon(weapon) {
    if (weapon instanceof Sword || weapon instanceof Spear) {
      throw new Error("Wizard cannot take sword or spear");
    }
    super.takeWeapon(weapon);
  }

  strike() {
    return 20;
  }
}

class Swordsman extends Hero {
  static HEALTH = 100;
  constructor() {
    super(Swordsman.HEALTH);
  }

  takeWeapon(weapon) {
    if (weapon instanceof Spell) {
      throw new Error("Swordsman cannot learn spells");
    }
    super.takeWeapon(weapon);
  }

  strike() {
    if (this.weapon instanceof Sword) {
      return 10;
    }
    if (this.weapon instanceof Spear) {
      return 15;
    }
  }
}

class Weapon {
  constructor() {}
}

class Sword extends Weapon {}

class Spear extends Weapon {}

class Spell extends Weapon {}

class Inventory {
  MAX_INVENTORY_NUM = 2;
  constructor() {
    this.items = [];
    this.activeItem = 0;
  }
  nextItem() {
    if (this.items.length === 0) {
      throw new NoWeapon("No weapon in inventory");
    }
    if (this.activeItem <= this.items.length) {
      this.selectItem(this.activeItem);
    } else {
      this.selectItem(this.items.length - 1);
    }
    return this.items[this.activeItem];
  }
  addItem(item) {
    if (this.items.length === this.MAX_INVENTORY_NUM) {
      throw new Error("Cannot add more items");
    }
    this.items.push(item);
  }
  removeItem() {
    this.items.splice(this.activeItem, 1);
    this.nextItem();
  }
  selectItem(index) {
    if (index >= 0 && index <= this.items.length - 1) {
      this.activeItem = index;
    }
  }
}

class NoWeapon extends Error {
  constructor(message) {
    super(message);
    this.name = "No Weapon";
  }
}

class Monster {
  constructor(health) {
    this.health = health;
  }

  strike() {
    return 5;
  }

  takeDamage(damage) {
    this.health -= damage;
  }
}

class Dragon extends Monster {
  static HEALTH = 100;
  constructor() {
    super(Dragon.HEALTH);
  }

  vomitingFire() {
    return 20;
  }
}

class Spider extends Monster {
  static HEALTH = 100;
  constructor() {
    super(Spider.HEALTH);
  }

  bite() {
    return 8;
  }
}

(function () {
  const wizard = new Wizard();
  const spider = new Spider();
  while (wizard.health > 0 && spider.health > 0) {
    console.log(wizard.health, spider.health);
    const random = Math.random() * 100;
    if (random < 50) {
      spider.takeDamage(wizard.strike());
    } else {
      const random = Math.random() * 10;
      if (random < 5) {
        wizard.takeDamage(spider.bite());
      } else {
        wizard.takeDamage(spider.strike());
      }
    }
  }
  if (wizard.health <= 0) {
    console.log("Spider wins");
  }
  if (spider.health <= 0) {
    console.log("Wizard wins");
  }
  const wizard1 = new Wizard();
  const swordsman1 = new Swordsman();
  const swordsman2 = new Swordsman();

  const weapon1 = new Sword();
  const weapon2 = new Spear();
  const weapon3 = new Sword();

  swordsman1.takeWeapon(weapon1);
  swordsman1.takeWeapon(weapon2);

  console.log(swordsman1.inventory);

  //   swordsman1.takeWeapon(weapon3); throws Error

  console.log(swordsman2.inventory);
  swordsman2.takeWeapon(swordsman1.dropWeapon());
  console.log(swordsman1.inventory);
  console.log(swordsman2.inventory.items);
})();
