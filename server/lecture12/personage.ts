class Personage {

  private health: Number;

  public getHealth(): Number {
    return this.health;
  };

  public setHealth(num: Number): void {
    this.health = num;
  };

  public attack(){}
  public capabilities(){}

}

export default Personage;