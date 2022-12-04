enum EnumStatusTask {
  TODO = 'TO DO',
  InProgress = 'In progress',
  QA = 'QA',
  Done = 'Done'
}

class Task {
  constructor(
    public numberTask: number,
    public nameStaff: string,
    public statusTask: EnumStatusTask
  ) {};
}

interface AbstractStaff {
  createPM(name: string): AbstractPosition;

  createQA(name: string): AbstractPosition;
}

class ConcreteStaff implements AbstractStaff {
  public createPM(name: string): AbstractPosition {
      return new ConcretePM(name);
  }

  public createQA(name: string): AbstractPosition {
      return new ConcreteQA(name);
  }
}

interface AbstractPosition {
  name: string;
  responsibilitiesFunction(): string;
  createTask(numberTask: number, nameStaff: string, statusTask: EnumStatusTask): Task;
  changeStatusTask(task: Task, newStatus: EnumStatusTask): void;
}

class ConcretePosition implements AbstractPosition {

  constructor(
    public name: string,
  ) {};


  public responsibilitiesFunction(): string {
    return 'The responsibilities of position is great.';
  };

  public createTask(numberTask: number, nameStaff: string, statusTask: EnumStatusTask): Task {
    return new Task(numberTask, nameStaff, statusTask);
  }

  public changeStatusTask(task: Task, newStatus: EnumStatusTask): void {
    if (task.nameStaff === this.name) task.statusTask = newStatus;  
  }
}

class ConcretePM extends ConcretePosition {
  public responsibilitiesFunction(): string {
      return 'The responsibilities of PM is great.';
  } 
}

class ConcreteQA extends ConcretePosition {
  public responsibilitiesFunction(): string {
    return 'The responsibilities of QA is great.';
  }
}

function bootStaff() {
  const PM_Ivan = new ConcreteStaff().createPM('Ivan');
  const QA_Oleg = new ConcreteStaff().createQA('Oleg');

  const taskFromIvanToOleg = PM_Ivan.createTask(1, 'Oleg', EnumStatusTask.TODO);
  QA_Oleg.changeStatusTask(taskFromIvanToOleg, EnumStatusTask.QA);

  console.log(`The status of task number ${taskFromIvanToOleg.numberTask} is ${taskFromIvanToOleg.statusTask}`);

  QA_Oleg.changeStatusTask(taskFromIvanToOleg, EnumStatusTask.Done);
  console.log(`The status of task number ${taskFromIvanToOleg.numberTask} is ${taskFromIvanToOleg.statusTask}`);

}

bootStaff();
