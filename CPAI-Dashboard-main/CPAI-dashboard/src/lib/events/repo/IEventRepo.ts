import type { IEvent } from "../models/IEvent";

export interface IEventRepo {
    saveEvent(event: IEvent): Promise<boolean>;
    updateEvent(event: IEvent): Promise<boolean>;
    deleteEvent(event: IEvent): Promise<boolean>;
    ListEvent(): Promise<IEvent[]>;
    imageToUrl(title: string, imageFile: File): Promise<string>;
    getUserById(id: string): Promise<IEvent | null>;
}
