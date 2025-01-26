import { BlogComp } from "../components/BlogComp";
const Blog = () => {
  return (
    <div className="w-full h-screen flex border">
      <div className="w-[70%] h-full flex justify-start  p-20 items-center flex-col">
        <BlogComp
          onClick={() => {}}
          title="hola hola"
          publishDate="25 Jan, 2025 "
          authorName="Kendrick"
          content="Kendrick lamar is also ok kendrick lamar is also ok v kendrick lamar is also ok kendrick lamar is also ok kendrick lamar is also ok kendrick lamar is also ok v kendrick lamar is also ok kendrick lamar is also o"
        />
      </div>
      <div className="w-[30%] h-full flex justify-start p-20 items-center flex-col">
        <h2 className="w-full ">Author</h2>
        <div className="w-full mt-4">
          <h1 className="w-full p-4 font-bold text-xl">Author name</h1>
          <p className="w-full ">
            bio of author bio of author bio of author bio of author
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
