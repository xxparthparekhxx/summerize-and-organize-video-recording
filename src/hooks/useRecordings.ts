import { useQuery } from '@tanstack/react-query';

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

  return useQuery({
    queryKey: ['recordings', { date, status, tag }],
    queryFn: async () => {
      const response = await fetch(`/api/recordings?${params.toString()}`);
      if (!response.ok) throw new Error('Failed to fetch recordings');
      return response.json();
    }
  });
}
