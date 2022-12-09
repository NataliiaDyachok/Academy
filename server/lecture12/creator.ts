import Personage from './personage';
import Soldier from './soldier';
import Thief from './thief';
import Magician from './magician';
import EnumPersonage from './enums';

class Creator {
  static createObject(someProperty: string): Personage {
      if (someProperty === EnumPersonage.MAGICIAN) {
          return new Magician()
      } else if (someProperty === EnumPersonage.THIEF) {
          return new Thief()
      } else {
          return new Soldier()
      }
  }
}

export default Creator;
