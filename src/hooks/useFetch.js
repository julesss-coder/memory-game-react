import { useState, useEffect, useRef } from "react";

const useFetch = (url, options) => {
  const [data, setData] = useState(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);
  const optionsRef = useRef(options).current;


  
  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      console.log(options);
      setPending(true);

      try {
        const response = await fetch(url, {signal: controller.signal});

        if (response.ok === false) {
          throw new Error("Could not fetch data: " + response.statusText);
        }

        const json = await response.json();
        setData(json);
        setError(null);
      } catch(error) {
        if (error.name === "AbortError") {
          console.log("fetch aborted", error);
        } else {
          setError(error.message);
        }
      } finally {
        setPending(false);
      }
    };
    
    fetchData();

    return () => {
      controller.abort();
    }
  }, [url, optionsRef]);

return { data, pending, error };
};

export default useFetch;