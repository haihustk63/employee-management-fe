import RequestList from "@/components/pages/request/List";
import { useGetRequests } from "@/hooks/request";

const RequestManagement = () => {
  const { data, isFetching, isLoading } = useGetRequests();
  return (
    <div>
      <RequestList dataSource={data} loading={isFetching || isLoading} />
    </div>
  );
};

export default RequestManagement;
