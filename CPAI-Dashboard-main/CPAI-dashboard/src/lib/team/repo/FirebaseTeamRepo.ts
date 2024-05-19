import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import type { ITeamRepo } from "./ITeamRepo";
import { db, storage } from "$lib/config/FirebaseConfig";
import type { ITeam } from "../models/ITeam";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export class FirebaseTeamRepo implements ITeamRepo {
    private collection = "Teams";

    async saveTeam(Team: ITeam): Promise<boolean> {
        const ref = doc(collection(db, this.collection));
        Team.id = ref.id;
        return setDoc(ref, Team)
            .then(() => {
                return true;
            })
            .catch((e) => {
                console.log(e);
                return false;
            });
    }

    async updateTeam(Team: ITeam): Promise<boolean> {
        const ref = doc(collection(db, this.collection), Team.id);
        return setDoc(ref, Team)
            .then(() => true)
            .catch((e) => {
                console.log(e);
                return false;
            });
    }
    async deleteTeam(Team: ITeam): Promise<boolean> {
        return deleteDoc(doc(db, this.collection, Team.id))
            .then(() => {
                console.log("product Deleted");

                return true;
            })
            .catch((error) => {
                console.log("error occur" + error);
                return false;
            });
    }

    async ListTeam(): Promise<ITeam[]> {
        const Teams: ITeam[] = [];
        try {
            let data = await getDocs(collection(db, this.collection));
            if (data.docs.length == 0) return [];
            data.docs.map((doc) => {
                Teams.push(doc.data() as ITeam);
            });
            return Teams;
        } catch (e) {
            console.log(e);
            return [];
        }
    }

    async imageToUrl(title: string, imageFile: File) {
        var storageRef = ref(storage, "/team-images/" + title + imageFile.name);

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
                return docs[0].data() as ITeam;
            })
            .catch((e) => {
                console.error(e);
                return null;
            });
    }
}
