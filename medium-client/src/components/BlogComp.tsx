interface BlogType {
  title: string;
  content: string;
  authorName: string;
  publishDate: string;
}
export const BlogComp = (props: BlogType) => {
  return (
    <div className="mt-10 border-b-[0.1px] border-[#6C6F7B] pb-10 w-full ">
      <div className="flex items-center gap-4 mb-4">
        <Avatar alphabet={props.authorName[0]} />
        <h1 className="text-xl font-bold">{props.authorName}</h1>
        <p className="py-1 text-[#6C6F7B] font-normal">{props.publishDate}</p>
      </div>

      <h1 className="text-4xl font-extrabold mb-4 capitalize">{props.title}</h1>

      <h2 className="text-xl  ">{props.content}</h2>
    </div>
  );
};

function Avatar(props: { alphabet: string }) {
  return (
    <span className="uppercase py-2 px-[0.9rem] rounded-full bg-slate-400 text-white">
      {props.alphabet}
    </span>
  );
}
