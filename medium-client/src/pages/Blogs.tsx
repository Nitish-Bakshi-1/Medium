import { BlogComp } from "../components/BlogComp";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div className="w-full h-screen text-slate-900 font-[900] text-8xl">
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
            key={blog.id}
            title={blog.title}
            content={blog.content}
            authorName={blog.author.name || ""}
            publishDate={"24jan , 2025"}
          />
        ))}
      </div>
    </div>
  );
};
export default Blogs;
