import TextEditor from "@/components/AppTextEditor";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const news = [
  {
    title: "<h1>Hello 1</h1>",
    excerpt: "<p>fefnjdsfsehrefwfh9ew</p>",
    id: 1,
  },
  {
    title: "<h1>Hello 2</h1>",
    excerpt: "<p>dfjweifjiewfiew</p>",
    id: 2,
  },
  {
    title: "<h1>Hello 3</h1>",
    excerpt: "<p>fefnjdsfsehrefwfh9ew</p>",
    id: 3,
  },
  {
    title: "<h1>Hello 4</h1>",
    excerpt: "<p>dfjweifjiewfiew</p>",
    id: 4,
  },
];

const UpdateEducationProgram = () => {
  const { newsId } = useParams();

  const [initialValue, setInitialValue] = useState("");

  useEffect(() => {
    if (newsId) {
      const ns = news.find((n) => n.id === Number(newsId));
      if (ns) {
        setInitialValue(ns?.title + ns?.excerpt);
      }
    }
  }, [newsId]);

  return (
    <div className="update-recruitment-news">
      <TextEditor onClickSave={() => {}} initialValue={initialValue} />
    </div>
  );
};

export default UpdateEducationProgram;
