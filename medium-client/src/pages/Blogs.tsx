import { BlogComp } from "../components/BlogComp";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();
  if (loading) {
    return (
      <div className="bg-red-400 w-full h-screen  text-white font-[900] text-8xl">
        ...Loading
      </div>
    );
  }
  return (
    <div className="">
      {blogs.map((blog) => (
        <BlogComp
          title={blog.title}
          content={blog.content}
          authorName={blog.author.name}
          publishDate={"24jan , 2025"}
        />
      ))}
    </div>
  );
  // <div className="flex justify-center items-center">
  //   <div className="flex items-center flex-col w-[50%]">
  //     <BlogComp
  //       authorName="nitish"
  //       title="i met kanye"
  //       content="kanye is a man "
  //       publishDate="25 JAN, 2025"
  //     />
  //   </div>
  // </div>
  //   );
};

export default Blogs;
