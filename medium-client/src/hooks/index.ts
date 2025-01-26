import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Blog {
  title: string;
  content: string;
  id: number;
  author: {
    name: string;
  };
}

export function useBlogs() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            Authentication: localStorage.getItem("token"),
          },
        });
        setBlogs(response.data.blogs);
        setLoading(false);
      } catch (e) {
        console.log(e);
        return null;
      }
    };
    fetchData();
  }, []);
  return { loading, blogs };
}
