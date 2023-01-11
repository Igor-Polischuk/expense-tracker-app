import { setDoc, getDoc, collection, doc } from 'firebase/firestore';
import { db } from '../firebase';

export class FirestoreHandle {
    private uid: string;
    constructor(uid: string) {
        this.uid = uid
    }

    async setData(data: { [x: string]: any; }, ref = '') {
        const userRef = collection(db, "users");
        return await setDoc(doc(userRef, this.uid + ref), data)
    }

    async getData() {
        const docRef = doc(db, "users", this.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            return docSnap.data()
        } else {
            throw new Error('Cannot get user data')
        }
    }

}