import useSWR from 'swr';
import axios from 'axios';

const API_URL = '/api/post';

const fetcher = url => axios.get(url).then(({ data }) => data?.data);

export function usePosts({ page = 1, sort = -1, tag = '' }) {
  const url = `${API_URL}?page=${page}&sort=${sort}&tag=${tag}`;
  const { data, error } = useSWR(url, fetcher);
  return {
    data: data,
    error,
    loading: !data && !error,
  };
}

export default function usePost(id) {
  const url = `${API_URL}/${id}`;
  const { data, error, mutate } = useSWR(url, fetcher);
  const answer = async params => {
    await axios.post('/api/post/answer', { ...params, question: id });
    await mutate({ ...data });
  };
  const vote = async (id, type) => {
    await axios.post(`${url}/vote`, { post: id, type });
    await mutate({ ...data });
  };
  return {
    data,
    error,
    loading: !data && !error,
    answer,
    vote,
  };
}

export const ask = async params => {
  const { data } = await axios.post('/api/post/question', params);
  return data?.data?.id;
};