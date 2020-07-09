import { observable, computed, action } from 'mobx';

export class Bug {
  @observable id: string = Math.random.toString();
  @observable name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class BugStore {
  @observable bugs: Bug[] = [new Bug('mosha')];

  // Computed values should do more than access observables
  @computed get bugsByLength(): Bug[] {
    return this.bugs.sort((a, b) => a.name.length - b.name.length);
  }

  @computed get bugCount(): number {
    return this.bugs.length;
  }

  // import to bind `this`; hence the .bound on the end
  @action.bound
  addBug(name: string) {
    this.bugs.push(new Bug(name));
  }
}
