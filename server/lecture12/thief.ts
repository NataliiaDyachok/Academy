import Personage from './personage';

class Thief extends Personage {

  constructor() {
    super()
    this.name = 'Thief'
    this.attack = this.archeryShot;
    this.capabilities = this.runAway;
  }
  
  private archeryShot(): void {
     
  } 

  private runAway(): void {
     
  } 
}

export default Thief;