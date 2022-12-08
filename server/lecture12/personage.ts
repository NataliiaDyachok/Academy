class Personage {

  private health: Number;
  name = 'Personage';

  public getHealth(): Number {
    return this.health;
  };

  public setHealth(num: Number): void {
    this.health = num;
  };

  public attack: Function
  public capabilities: Function

}

export default Personage;