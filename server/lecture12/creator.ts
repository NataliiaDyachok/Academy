import Personage from './personage';
import Soldier from './soldier';
import Thief from './thief';
import Magician from './magician';


class Creator {
  static createObject(someProperty: string): Personage {
      if (someProperty === 'm') {
          return new Magician()
      } else if (someProperty === 't') {
          return new Thief()
      } else {
          return new Soldier()
      }
  }
}

const PERSONAGE = Creator.createObject('m')
console.log(PERSONAGE.name);
const PERSONAGE2 = Creator.createObject('t')
console.log(PERSONAGE2.name);