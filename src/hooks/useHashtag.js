import axios from 'axios';
import { useQuery } from 'react-query';

const fetchHashtags = ({ queryKey }) => {
  const niche = queryKey[1];
  return axios.get(`${process.env.REACT_APP_URL}/captions/hashtags`, {
    params: {
      niche: niche,
    },
  });
};

export const useHashtag = niche => {
  let result = false;
  if (niche) {
    result = true;
  }
  return useQuery(['hashtags', niche], fetchHashtags, {
    enabled: result,
    refetchInterval: 100000000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchIntervalInBackground: 10000000,
  });
};
