export interface ILogZone {
  id: number;
  name: string;
  encounters: ILogEncounter[];
}

interface ILogEncounter {
  id: number;
  name: string;
}
