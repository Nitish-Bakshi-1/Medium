import { BlogComp } from "../components/BlogComp";

const Blogs = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="flex items-center flex-col w-[50%]">
        <BlogComp
          authorName="nitish"
          title="i met kanye"
          content="kanye isn't a man "
          publishDate="25 JAN, 2025"
        />
      </div>
    </div>
  );
};

export default Blogs;
