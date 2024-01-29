import { Injectable } from '@angular/core';
import { Auth, UserInfo, updateProfile, getAuth } from '@angular/fire/auth'
import { Firestore, query, orderBy, limit, collectionData, startAfter, getDocs, where, doc, setDoc, addDoc, startAt, endAt, getDoc, updateDoc, runTransaction, arrayUnion, arrayRemove } from '@angular/fire/firestore'
import { collection, Timestamp, disableNetwork, enableNetwork, OrderByDirection } from '@firebase/firestore';
import { concatMap, Observable, of, from } from 'rxjs';
import { MainUser } from 'src/app/shared/interface/mainuser';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  lastVisible: any;
  constructor(
    private auth: Auth,
    private firestore: Firestore,
  ) { }


  async getDataListWithLimitFrom(collectionname: any, limitnum: any) {

    const datalistref = query(collection(this.firestore, collectionname), where('publishStatus', '==', true), orderBy('publishdate', "desc"), limit(limitnum));
    const documentSnapshots = await getDocs(datalistref);
    this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      const data: any = element.data()
      data.key = element.id;
      data.id = element.id;
      dataarry.push(data)
    });

    return (dataarry)
  }


  async loadMoreDataFrom(collectionname: any, limitnum: any) {

    const datalistref = query(collection(this.firestore, collectionname), where('publishStatus', '==', true), orderBy('publishdate', "desc"), startAfter(this.lastVisible), limit(limitnum));

    const documentSnapshots = await getDocs(datalistref);
    this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];


    let dataarry: any = []
    documentSnapshots.forEach(element => {

      const data: any = element.data()
      data.key = element.id;
      data.id = element.id;
      dataarry.push(data)
    });

    return (dataarry)


    // const datalistref = query(collection(this.firestore,collectionname),orderBy('publishdate','desc'),startAfter(lastviewed),limit(limitnum));
    // const documentSnapshots = await getDocs(datalistref);


  }


  async getLatestDocumentFrom(collectionname: any, orderby: any) {
    const datalistref = query(collection(this.firestore, collectionname), orderBy(orderby, 'desc'), limit(1));
    const documentSnapshots = await getDocs(datalistref);
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      const data = element.data()
      data['id'] = element.id;
      dataarry.push(data)
      // dataarry.push(element.data())
    });

    return (dataarry)

  }
  async getCollectionDocumentFrom(collectionname: any) {
    const datalistref = query(collection(this.firestore, collectionname));
    const documentSnapshots = await getDocs(datalistref);
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      const data = element.data()
      data['id'] = element.id;
      dataarry.push(data)
      // dataarry.push(element.data())
    });

    return (dataarry)

  }
  async getCollectionDocumentByRoleFrom(collectionname: any, role: any) {
    const datalistref = query(collection(this.firestore, collectionname));
    const documentSnapshots = await getDocs(datalistref);
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      const data = element.data()
      data['id'] = element.id;
      dataarry.push(data)
      // dataarry.push(element.data())
    });

    return (dataarry)

  }

  async getDocumentByIDFrom(collectionname: any, key: any) {
    const datalistref = (doc(this.firestore, collectionname, key));
    const docsnap = await getDoc(datalistref);
    if (docsnap.exists()) {
      let obj: any = docsnap.data();
      obj.key = docsnap.id;
      return (obj);
    } else {
      // doc.data() will be undefined in this case
      // 
    }

  }

  async updateDocumentWithIDOF(collectionname: any, key: any, dataobj: any) {
    const sfDocRef = doc(this.firestore, collectionname, key);
    try {

      await runTransaction(this.firestore, async (transaction) => {

        const sfDoc = await transaction.get(sfDocRef);
        if (!sfDoc.exists()) {
          throw "Document does not exist!";
        }
        transaction.update(sfDocRef, Object.assign({}, dataobj), { merge: true });
      })

      return (true)

    } catch (e) {

      return false;
    }


  }

  async updateArrayUnionInDocumentWithIDOF(collectionname: any, key: any, propname: string, propval: any) {


    const sfDocRef = doc(this.firestore, collectionname, key);
    try {
      await updateDoc(sfDocRef, {
        [propname]: arrayUnion(propval)
      });

      return (true)

    } catch (e) {

      return false;
    }
  }

  async updateArrayRemoveInDocumentWithIDOF(collectionname: any, key: any, propname: string, propval: any) {
    const sfDocRef = doc(this.firestore, collectionname, key);
    try {
      await updateDoc(sfDocRef, {
        [propname]: arrayRemove(propval)
      });

      return (true)

    } catch (e) {

      return false;
    }
  }



  async getAllDataAssignedByUserFrom(collectionname: any, sd: any, uid: any) {

    const startdate = Timestamp.fromDate(new Date(sd.sdate.getFullYear(), sd.sdate.getMonth(), sd.sdate.getDate())).toMillis();
    const enddate = Timestamp.fromDate(new Date(sd.edate.getFullYear(), sd.edate.getMonth(), sd.edate.getDate())).toMillis();


    const datalistref = query(collection(this.firestore, collectionname), where('bywhom', '==', uid), where('cdate', '>=', startdate), where('cdate', '<=', enddate));
    const documentSnapshots = await getDocs(datalistref);
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      const data: any = element.data()
      data.key = element.id;
      data.id = element.id;
      dataarry.push(data)
    });

    return (dataarry)
  }

  async getAllDataAssignedToUser(collectionname: any, uid: any) {

    const datalistref = query(collection(this.firestore, collectionname), where('towhom', '==', uid));
    const documentSnapshots = await getDocs(datalistref);
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      const data = element.data()
      data['id'] = element.id;
      dataarry.push(data)
      // dataarry.push(element.data())
    });

    return (dataarry)
  }
  async getAllDataAssignedwithProperties(collectionname: any, uid: any, field: any) {

    const datalistref = query(collection(this.firestore, collectionname), where(field, '==', uid));
    const documentSnapshots = await getDocs(datalistref);
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      const data = element.data()
      data['id'] = element.id;
      dataarry.push(data)
      // dataarry.push(element.data())
    });

    return (dataarry)
  }

  async getAllDataAssignedToUserFrom(collectionname: any, sd: any, uid: any) {


    const startdate = Timestamp.fromDate(new Date(sd.sdate.getFullYear(), sd.sdate.getMonth(), sd.sdate.getDate())).toMillis();
    const enddate = Timestamp.fromDate(new Date(sd.edate.getFullYear(), sd.edate.getMonth(), sd.edate.getDate())).toMillis();


    const datalistref = query(collection(this.firestore, collectionname), where('towhom', '==', uid), where('cdate', '>=', startdate), where('cdate', '<=', enddate));
    const documentSnapshots = await getDocs(datalistref);
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      const data: any = element.data()
      data.key = element.id;
      data.id = element.id;
      dataarry.push(data)
    });

    return (dataarry)
  }


  async getAllDataFrom(collectionname: any, sd: any) {


    const startdate = Timestamp.fromDate(new Date(sd.sdate.getFullYear(), sd.sdate.getMonth(), sd.sdate.getDate())).toMillis();
    const enddate = Timestamp.fromDate(new Date(sd.edate.getFullYear(), sd.edate.getMonth(), sd.edate.getDate())).toMillis();

    // 
    const datalistref = query(collection(this.firestore, collectionname), orderBy('cdate', 'desc'), where('cdate', '>=', startdate), where('cdate', '<=', enddate));
    const documentSnapshots = await getDocs(datalistref);
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      const data: any = element.data();
      data.key = element.id;
      data.id = element.id;
      dataarry.push(data)
    });

    return (dataarry)
  }

  async getSortedData(collectionname: any, sd: any, field: any, value: any) {
    const startdate = Timestamp.fromDate(new Date(sd.sdate.getFullYear(), sd.sdate.getMonth(), sd.sdate.getDate())).toMillis();
    const enddate = Timestamp.fromDate(new Date(sd.edate.getFullYear(), sd.edate.getMonth(), sd.edate.getDate())).toMillis();

    const datalistref = query(collection(this.firestore, collectionname), orderBy('cdate', 'desc'), where('cdate', '>=', startdate), where('cdate', '<=', enddate), where(field, '==', value));
    const documentSnapshots = await getDocs(datalistref);
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      const data: any = element.data()
      data.key = element.id;
      data.id = element.id;
      dataarry.push(data)
    });

    return (dataarry)
  }

  async getSortedDataByUser(collectionname: any, sd: any, field: any, value: any, uid: any) {
    const startdate = Timestamp.fromDate(new Date(sd.sdate.getFullYear(), sd.sdate.getMonth(), sd.sdate.getDate())).toMillis();
    const enddate = Timestamp.fromDate(new Date(sd.edate.getFullYear(), sd.edate.getMonth(), sd.edate.getDate())).toMillis();

    // 
    const datalistref = query(collection(this.firestore, collectionname), orderBy('cdate', 'desc'), where('bywhom', '==', uid), where('cdate', '>=', startdate), where('cdate', '<=', enddate), where(field, '==', value));
    const documentSnapshots = await getDocs(datalistref);
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      const data: any = element.data()
      data.key = element.id;
      data.id = element.id;
      dataarry.push(data)
    });

    return (dataarry)
  }
  async getFilteredDataByUser(collectionname: any, field: any, value: any, uid: any) {
    const datalistref = query(collection(this.firestore, collectionname), where('bywhom', '==', uid), where(field, '==', value));
    const documentSnapshots = await getDocs(datalistref);
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      const data: any = element.data()
      data.key = element.id;
      data.id = element.id;
      dataarry.push(data)
    });

    return (dataarry)
  }
  async getSortedLatestDocumentFrom(collectionname: any, orderby: any, propname: any, propval: any) {
    const datalistref = query(collection(this.firestore, collectionname), where(propname, '==', propval), orderBy(orderby, 'desc'), limit(1));
    const documentSnapshots = await getDocs(datalistref);
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      let obj: any = element.data();
      obj.key = element.id;
      dataarry.push(obj)
    });

    return (dataarry)

  }

  async setDocumentToWithCustomKey(collectionname: any, formdataobj: any, key: string) {
    await setDoc(doc(this.firestore, collectionname, key), Object.assign({}, formdataobj), { merge: true });
  }








  async getDocFromPath(docid: string, userid: string, path: string, cid: any) {
    // const datalistref = (doc(this.firestore, 'announcementview/' + docid + '/viewlist', userid));
    const datalistref = (doc(this.firestore, path));
    const docsnap = await getDoc(datalistref);
    if (docsnap.exists()) {
      return (true);
    } else {
      return (false);
    }

  }
  async getCollectionListFromPath(path: string) {
    // const datalistref = (doc(this.firestore, 'announcementview/' + docid + '/viewlist', userid));
    const datalistref = query(collection(this.firestore, path));


    const documentSnapshots = await getDocs(datalistref);
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      let obj: any = element.data();
      obj.key = element.id;
      dataarry.push(obj)
    });

    return (dataarry)


  }
  async getCollectionListFromPathwithOrder(path: string, propname: string, propval: OrderByDirection) {
    // const datalistref = (doc(this.firestore, 'announcementview/' + docid + '/viewlist', userid));
    const datalistref = query(collection(this.firestore, path), orderBy(propname, propval));


    const documentSnapshots = await getDocs(datalistref);
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      let obj: any = element.data();
      obj.key = element.id;
      dataarry.push(obj)
    });

    return (dataarry)


  }

  async getCollectionListFromPathWithCondition(path: string, propname: string, propval: string) {
    // const datalistref = (doc(this.firestore, 'announcementview/' + docid + '/viewlist', userid));
    const datalistref = query(collection(this.firestore, path), where(propname, '==', propval));


    const documentSnapshots = await getDocs(datalistref);
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      let obj: any = element.data();
      obj.key = element.id;
      dataarry.push(obj)
    });

    return (dataarry)


  }
  async setDocToPathId(collection: string, docid: string, form: any) {
    const datalistref = (doc(this.firestore, collection + '/' + docid));
    const docsnap = await setDoc(datalistref, (Object.assign({}, form)), { merge: true });
    return new Promise((resolve) => {
      resolve(docsnap);
    });
  }









  async addDocumentTo(formdataobj: any) {

    // const datalistref = query(collection(this.firestore, collectionname), where('refno', '==', formdataobj.refno));
    // const documentSnapshots = await getDocs(datalistref);

    // if (documentSnapshots.size > 0) {

    //   return;
    // } else {
    //   const docRef = await addDoc(collection(this.firestore, 'users-list'), Object.assign({}, formdataobj));
    //   return new Promise((resolve) => {
    //     resolve(docRef.id);
    //   });
    // }
    formdataobj.id = doc(collection(this.firestore, "id")).id
    // console.log(user?.uid);
    return addDoc(collection(this.firestore, 'users-list'), formdataobj);





  }



  async getCollectionList(collectionname: any, orderby: any, orderdirection: any) {
    const datalistref = query(collection(this.firestore, collectionname), orderBy(orderby, orderdirection));
    const documentSnapshots = await getDocs(datalistref);
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      // dataarry.push(element.data())
      const id = element.id;
      const data: any = element.data();
      data.key = element.id;
      data.id = element.id;
      dataarry.push(data)
    });

    return (dataarry)

  }


  async getDocFromWhereEqual(collectionname: any, propname: any, propval: any) {
    const datalistref = query(collection(this.firestore, collectionname), where(propname, '==', propval));
    const documentSnapshots = await getDocs(datalistref);
    let dataarry: any = [];
    documentSnapshots.forEach(element => {
      let obj: any = element.data();
      obj.key = element.id;
      dataarry.push(obj)
    });

    return (dataarry)
  }
  async getDocFromWhereEqualMultiple(collectionname: any, propname1: any, propval1: any, propname2: any, propval2: any) {
    const datalistref = query(collection(this.firestore, collectionname), where(propname1, '==', propval1), where(propname2, '==', propval2));
    const documentSnapshots = await getDocs(datalistref);
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      let obj: any = element.data();
      obj.key = element.id;
      dataarry.push(obj)
    });

    return (dataarry)
  }


  // async getObjectfromid(collectionname: any, id: any) {

  //   const docref = doc(this.firestore, collectionname, id)
  //   const documentSnapshots = await getDoc(docref)
  //   if (documentSnapshots.exists()) {
  //     return (documentSnapshots.data())
  //   }


  // }








  async getAllDataFromOtherDate(collectionname: any, sd: any, datevariable: any) {


    const startdate = Timestamp.fromDate(new Date(sd.sdate.getFullYear(), sd.sdate.getMonth(), sd.sdate.getDate())).toMillis();
    const enddate = Timestamp.fromDate(new Date(sd.edate.getFullYear(), sd.edate.getMonth(), sd.edate.getDate())).toMillis();

    // 
    const datalistref = query(collection(this.firestore, collectionname), orderBy(datevariable, 'desc'), where(datevariable, '>=', startdate), where(datevariable, '<=', enddate));
    const documentSnapshots = await getDocs(datalistref);
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      const data: any = element.data()
      data.key = element.id;
      data.id = element.id;
      dataarry.push(data)
    });

    return (dataarry)
  }








  async getPostLike(postid: any) {

    const datalistref = query(collection(this.firestore, 'Post-likes'), where('pid', '==', postid));
    const documentSnapshots = await getDocs(datalistref);
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      const data = element.data()
      data['id'] = element.id;
      dataarry.push(data)
      // dataarry.push(element.data())
    });

    return (dataarry)

  }

  async addLike(dataobj: any) {

  }


  async getLatestByCdateFrom(collectionname: any, num: any) {
    const datalistref = query(collection(this.firestore, collectionname), orderBy('cdate', 'desc'), limit(num));
    const documentSnapshots = await getDocs(datalistref);
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      let obj = { key: element.id, data: element.data() }
      dataarry.push(obj)
    });

    return (dataarry)

  }

  async getDataListWithLimitFromGeneral(collectionname: string, limitnum: number, orderby: string) {

    const datalistref = query(collection(this.firestore, collectionname), orderBy(orderby, "desc"), limit(limitnum));
    const documentSnapshots = await getDocs(datalistref);
    this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    let dataarry: any = []
    documentSnapshots.forEach(element => {
      const data: any = element.data()
      data.key = element.id;
      data.id = element.id;

      dataarry.push(data)
    });

    return (dataarry)
  }


  async loadMoreDataFromGeneral(collectionname: string, limitnum: number, orderby: string) {

    const datalistref = query(collection(this.firestore, collectionname), orderBy(orderby, "desc"), startAfter(this.lastVisible), limit(limitnum));

    const documentSnapshots = await getDocs(datalistref);
    this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];


    let dataarry: any = []
    documentSnapshots.forEach(element => {

      const data: any = element.data()
      data.key = element.id;
      data.id = element.id;
      dataarry.push(data)
    });

    return (dataarry);


  }



  async getAuthUserProfile() {
    return new Promise(async (resolve, reject) => {
      await this.getUserDetails().then(async (res: any) => {
        if (res) {
          await this.getUserProfile(res.uid).then((resp) => {
            resolve(resp);
          })
        }
        else {
          resolve('No Auth User');
        }
      })
    })
  }

  async getUserProfile(currentUID: string) {
    return new Promise(async (resolve, reject) => {
      await this.getDocumentByIDFrom('users-list', currentUID).then((res) => {
        if (res) {
          resolve(res);
        }
        else {
          resolve('No user Details');
        }
      })
    })

  }

  async getUserDetails() {
    return new Promise((resolve) => {
      resolve(this.auth.currentUser);
    })
  }


  async updateAuthDetails(propname: string, propval: any) {
    let currentUser: any = getAuth().currentUser;
    let thisauth: any = this.auth.currentUser;
    try {
      await updateProfile(currentUser, {
        [propname]: propval
      });

    } catch (e: any) {

    }
  }



  async updateAuthDetailsImg(url: string) {
    let currentUser: any = getAuth().currentUser;
    try {
      await updateProfile(currentUser, {
        photoURL: url
      });

    } catch (e: any) {

    }
  }

  async disableNetwork() {
    await disableNetwork(this.firestore);
  }
  async enableNetwork() {
    await enableNetwork(this.firestore);
  }

  // **********************************************notes**************************************//
  // getAuth().currentUser====this.auth.currentUser


}
