import Personage from './personage';

class Soldier extends Personage {

  constructor() {
    super()
    this.name = 'Soldier'
    this.attack = this.swordStrike;
    this.capabilities = this.protection;
  }
  
  private swordStrike(): void {
     
  } 

  private protection(): void {
     
  } 
}

export default Soldier;