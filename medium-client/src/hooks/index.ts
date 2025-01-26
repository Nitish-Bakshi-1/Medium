import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface Blog {
  title: string;
  content: string;
  id: string;
  author: {
    name: string;
  };
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log("inside useeffect");
        const response = await axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
          headers: {
            authentication: `${localStorage.getItem("token")}`,
          },
        });

        setBlogs(response.data.posts || []);
        setLoading(false);
        console.log("done useeffect");
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { loading, blogs };
};
