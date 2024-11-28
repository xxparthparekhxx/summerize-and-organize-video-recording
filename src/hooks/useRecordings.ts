import useSWR from 'swr';

interface UseRecordingsProps {
  date?: string;
  status?: string;
  tag?: string;
}

export function useRecordings({ date, status, tag }: UseRecordingsProps = {}) {
  const params = new URLSearchParams();
  if (date) params.append('date', date);
  if (status) params.append('status', status);
  if (tag) params.append('tag', tag);

  const { data, error, mutate } = useSWR(
    `/api/recordings?${params.toString()}`,
    async (url) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch recordings');
      return response.json();
    }
  );

  return {
    recordings: data?.recordings,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
}
