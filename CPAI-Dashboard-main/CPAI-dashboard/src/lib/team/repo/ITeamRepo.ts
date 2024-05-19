import type { ITeam } from "../models/ITeam";

export interface ITeamRepo {
    saveTeam(Team: ITeam): Promise<boolean>;
    updateTeam(Team: ITeam): Promise<boolean>;
    deleteTeam(Team: ITeam): Promise<boolean>;
    ListTeam(): Promise<ITeam[]>;
    imageToUrl(title: string, imageFile: File): Promise<string>;
    getUserById(id: string): Promise<ITeam | null>;
}
