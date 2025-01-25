export const BlogComp = ({ title, description }) => {
  return (
    <div className="">
      <h1 className="text-4xl font-extrabold mb-4 capitalize">{title}</h1>
      <p className="py-1 text-[#6C6F7B] font-normal">Posted on 12PM, today</p>
      <h2 className="text-xl  ">{description}</h2>
    </div>
  );
};
