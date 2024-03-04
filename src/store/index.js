import { configureStore } from '@reduxjs/toolkit'
import { usersReducer } from './slices/usersSlice'
import { setupListeners } from '@reduxjs/toolkit/query';
import { albumsApi } from './apis/albumsApi';
import { photosApi} from './apis/photosApi';


export const store = configureStore({
    reducer: {
        users: usersReducer,
        albums: albumsApi.reducer,
        photos: photosApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware()
            .concat(albumsApi.middleware)
            .concat(photosApi.middleware);
    }
});

setupListeners(store.dispatch);

//export de tout ce qui peut étre exporté depuis fetchUsers
export * from './thunks/fetchUsers'
export * from './thunks/addUsers'
export * from './thunks/removeUser'
export { useFetchAlbumsQuery, useAddAlbumMutation, useRemoveAlbumMutation } from './apis/albumsApi';
export { useFetchPhotosQuery, useRemovePhotoMutation, useAddPhotoMutation } from './apis/photosApi';