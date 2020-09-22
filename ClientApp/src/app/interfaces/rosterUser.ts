import { IRaidInfo } from "./raidInfo";

export interface IRosterUser {
  discord: string;
  nickname: string;
  rank: string;
  armory: string;
  role: string;
  rankNumber: number;
  class: string;
  days: IRaidInfo;
  roleColor: string;
  classColor: string;
}
