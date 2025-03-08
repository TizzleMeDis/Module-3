function Character(name, classType, level, health) {
    this.name = name;
    this.classType = classType;
    this.level = level;
    this.health = health;
    this.maxHealth = health;
    this.inventory = [];
    this.stats = {
        attack: 10*this.level,
        defense: 8*this.level,
        speed: 5*this.level
    };
}

Character.prototype.levelUp = function() {
    this.level += 1
    this.stats.attack += 5;
    this.stats.defense += 5;
    this.stats.speed += 2;
    console.log(`${this.name} leveled up! Now at level ${this.level}`)
}

Character.prototype.takeDamage = function(damage) {
    this.health -= damage;
    if (this.health < 0) this.health = 0;
    console.log(`${this.name} took ${damage} damage! Health: ${this.health}`);
}

Character.prototype.getSummary = function() {
    console.log(`Character Summary:\n\nName:${this.name}\nClass:${this.classType}\nLevel:${this.level}\nHealth:${this.health}`);
    console.log('Stats:')
    for (let stat in this.stats)
        console.log(`${stat}: ${this.stats[stat]}`);
}

Character.prototype.addItem = function(item) {
    this.inventory.push(item)
    console.log(`${item} has been added to your inventory: ${this.inventory}`)
}
let jeff = new Character("jeff", "Warrior", 1, 100)
let mike = new Character("mike", "Warrior", 2, 100)

jeff.getSummary();
jeff.levelUp();
jeff.getSummary();
console.log(`${jeff.name} stats:\n`)
for (let key in jeff.stats)
    console.log(`${key}: ${jeff.stats[key]}`)

mike.getSummary();
mike.takeDamage(50);
mike.getSummary();
console.log(`${mike.name} Health: ${mike.health}`)

jeff.addItem("potion");
jeff.addItem("Chest Armor");