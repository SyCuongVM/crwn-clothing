import ShopActionTypes from './shop.types';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

export const fetchCollectionsStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_START
});
export const fetchCollectionsSuccess = collectionsMap => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
  payload: collectionsMap
});
export const fetchCollectionsFailure = errorMessage => ({
  type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
  payload: errorMessage
});

export const fetchCollectionStartAsync = () => {
  return dispacth => {
    const collectionRef = firestore.collection('collections');
    dispacth(fetchCollectionsStart());

    collectionRef.get().then(snapshot => {
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      dispacth(fetchCollectionsSuccess(collectionsMap));
    }).catch(error => dispacth(fetchCollectionsFailure(error.message)));

    // collectionRef.onSnapshot(async snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   dispacth(fetchCollectionsSuccess(collectionsMap));
    // }).catch(error => dispacth(fetchCollectionsFailure(error.message)));

    // fetch('https://firestore.googleapis.com/v1/projects/crwn-clothing-8717c/databases/(default)/documents/collections')
    //   .then(response => response.json())
    //   .then(collections => {
    //     console.log(collections);
    //   })
  }
};