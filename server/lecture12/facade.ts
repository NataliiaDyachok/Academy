import Creator from './creator';
import Personage from './personage';
import EnumPersonage from './enums';

class Facade {  
    
    createPersonageSoldier(): Personage {
        return Creator.createObject(EnumPersonage.SOLDIER);
    }
    createPersonageThief(): Personage {
        return Creator.createObject(EnumPersonage.THIEF);
    }
    createPersonageMagician(): Personage {
        return Creator.createObject(EnumPersonage.MAGICIAN);
    }
}

const PERSONAGE_SOLDIER = new Facade().createPersonageSoldier();
console.log(PERSONAGE_SOLDIER.name);
const PERSONAGE_THIEF = new Facade().createPersonageThief();
console.log(PERSONAGE_THIEF.name);