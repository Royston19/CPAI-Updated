import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import type { IEventRepo } from "./IEventRepo";
import { db, storage } from "$lib/config/FirebaseConfig";
import type { IEvent } from "../models/IEvent";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export class FirebaseEventRepo implements IEventRepo {
    private collection = "events";

    async saveEvent(event: IEvent): Promise<boolean> {
        const ref = doc(collection(db, this.collection));
        event.id = ref.id;
        return setDoc(ref, event)
            .then(() => {
                return true;
            })
            .catch((e) => {
                console.log(e);
                return false;
            });
    }

    async updateEvent(event: IEvent): Promise<boolean> {
        const ref = doc(collection(db, this.collection), event.id);
        return setDoc(ref, event)
            .then(() => true)
            .catch((e) => {
                console.log(e);
                return false;
            });
    }
    async deleteEvent(event: IEvent): Promise<boolean> {
        return deleteDoc(doc(db, this.collection, event.id))
            .then(() => {
                console.log("product Deleted");

                return true;
            })
            .catch((error) => {
                console.log("error occur" + error);
                return false;
            });
    }

    async ListEvent(): Promise<IEvent[]> {
        const events: IEvent[] = [];
        try {
            let data = await getDocs(collection(db, this.collection));
            if (data.docs.length == 0) return [];
            data.docs.map((doc) => {
                events.push(doc.data() as IEvent);
            });
            return events;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async imageToUrl(title: string, imageFile: File) {
        var storageRef = ref(storage, "/event-images/" + title + imageFile.name);

        //Upload file
        var task = uploadBytesResumable(storageRef, imageFile);

        //Update progress bar

        const unsubscribe = task.on(
            "state_changed",
            function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            },
            function error(err) {
                console.error(err);
            }
        );

        await task;
        unsubscribe();
        let url = await getDownloadURL(task.snapshot.ref);
        return url;
    }

    async getUserById(id: string) {
        return getDocs(query(collection(db, this.collection), where("id", "==", id)))
            .then(({ docs }) => {
                return docs[0].data() as IEvent;
            })
            .catch((e) => {
                console.error(e);
                return null;
            });
    }
}
