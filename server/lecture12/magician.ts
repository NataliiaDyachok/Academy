import Personage from './personage';

class Magician extends Personage {

  constructor() {
    super()
    this.name = 'Magician'
    this.attack = this.fireball;
    this.capabilities = this.bewitch;
  }
  
  private fireball(): void {
     
  } 

  private bewitch(): void {
     
  } 
}

export default Magician;