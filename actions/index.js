import axios from 'axios';
import {AsyncStorage} from 'react-native';

const axiosInstance = axios.create({
  baseURL: 'https://deezerdevs-deezer.p.rapidapi.com/',
  timeout: 2000,
  headers: {
    'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com',
    'x-rapidapi-key': '7adb122ed0mshf544829633f866fp1c34d1jsneb26207d800c',
  }
});

export const SearchTracks = singerName => {
  return axiosInstance.get(`search?q=${singerName}`);
}

export const SearchAlbum = albumId => {
  return axiosInstance.get(`album/${albumId}`);
}

export const storeData = async (key, value) => {
  const stringifyValue = JSON.stringify(value);
  try {
    await AsyncStorage.setItem(key, stringifyValue);
    return value;
  } catch (error) {
    // Error saving data
  }
};

export const retrieveData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    // Error retrieving data
  }
};

export const clearData = async (key) => {
  try {
    await AsyncStorage.clear();
    return key;
  } catch (error) {
    // Error retrieving data
  }
}
