import { create } from "zustand";
/* Esto es un store */
const useEventsResults = create((set) => ({
  data: [],
  error: null,
  isLoading: false,
  fetchEvents: async (params) => {
    try {
      const url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${
        import.meta.env.VITE_TICKETMASTER_API_KEY
      }&countryCode=MX${params?.length ? params : ""}`;

      await set(() => ({ isLoading: true }));

      const res = await fetch(url);
      const data = await res.json();

      await set(() => ({ data, isLoading: false }));
    } catch (error) {
      await set(() => ({ error }));
    }
  },
}));

export default useEventsResults;
