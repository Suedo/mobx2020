import { observable, computed, action } from 'mobx';

export class Complaint {
  @observable id: string = Math.random.toString();
  @observable name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class ComplaintStore {
  @observable complaints = [new Complaint('legacy code is a pain')];

  @computed get complaintByLength(): Complaint[] {
    return this.complaints.sort((a, b) => a.name.length - b.name.length);
  }

  @computed get complaintCount(): number {
    return this.complaints.length;
  }

  @action.bound
  addComplaint(name: string) {
    this.complaints.push(new Complaint(name));
  }
}
