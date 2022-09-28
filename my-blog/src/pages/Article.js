import "whatwg-fetch";
import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import articles from "./article-content";
import Articles from "../components/Articles";
import { CommentsList } from "../components/CommentsList";

const Article = () => {
    const name = useParams();
    const article = articles.find((article) => article.name === name.name);
    
    const [articleInfo, setArticleInfo] = useState({ comments: [] });

    useEffect(() => {
        const fetchData = async () => {
            const result = await fetch(`/api/articles/${name.name}`);
            const body = await result.json();
            console.log(body);
            setArticleInfo(body);
        };
        fetchData();
    }, [name.name]);
    
    
    if(!article) return <h1>Article does not exist</h1>;
    const otherArticles = articles.filter((article) => article.name !== name.name);

  return (
    <div className="mb-20">
      <h1 className="sm:text-4xl text-2xl font-bold mt-6 text-gray-900">
      {article.title}
      </h1>
      {article.content.map((paragraph, index) =>
        <p className="mx-auto leading-relaxed text-base mb-4" key={index}>
            {paragraph}
        </p>
      )}
      <CommentsList comments={articleInfo.comments} />

      <h1 className="sm:text-2x text-xl font-bold mt-4 mb-4 text-gray-900">
        Other Articles:
      </h1>
      <div className="flex flex-wrap -m-4">
        <Articles articles={otherArticles} />
      </div>
    </div>
  );
};

export default Article;
