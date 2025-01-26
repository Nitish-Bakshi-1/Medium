import { useNavigate } from "react-router-dom";
import { BlogComp } from "../components/BlogComp";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const navigate = useNavigate();
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div className="w-full h-screen text-slate-900 font-[300] text-7xl flex justify-center items-center">
        ...Loading
      </div>
    );
  }

  if (blogs.length === 0) {
    return <div>No blogs found</div>;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center flex-col w-[50%]">
        {blogs.map((blog) => (
          <BlogComp
            onClick={() => navigate("/blog/1")}
            key={blog.id}
            title={blog.title}
            content={blog.content}
            authorName={blog.author.name || ""}
            publishDate={"24 jan, 2025"}
          />
        ))}
      </div>
    </div>
  );
};
export default Blogs;
