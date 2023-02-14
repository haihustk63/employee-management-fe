import { useNavigate } from "react-router-dom";
import { Typography } from "antd";

import AppWithCoverCard from "@/components/AppCard/WithCover";
import { DYNAMIC_APP_PAGE_ROUTES } from "@/constants/routes";

const { Title } = Typography;

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

const RecruitmentNewsManagement = () => {
  const navigate = useNavigate();

  const handleClickCard = (id: number) => () => {
    navigate(DYNAMIC_APP_PAGE_ROUTES.RECRUITMENT_NEWS_UPDATE(id));
  };

  return (
    <div className="recruitment-news-management">
      <Title level={3}>Recruitment News</Title>
      <div className="list">
        {news.map((item, key) => {
          return (
            <AppWithCoverCard
              horizontal
              key={key}
              title={item.title}
              imageUrl="https://demos.themeselection.com/sneat-bootstrap-html-admin-template-free/assets/img/elements/18.jpg"
              onClick={handleClickCard(item.id)}
              hasBoxShadow
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecruitmentNewsManagement;
