import RequestList from "@/components/pages/request/List";
import { useGetRequests } from "@/hooks/request";
import { getRequestRows } from "@/utils";

const RequestManagement = () => {
  const { data = [], isFetching, isLoading } = useGetRequests();
  return (
    <div>
      <RequestList
        dataSource={getRequestRows(data)}
        loading={isFetching || isLoading}
      />
    </div>
  );
};

export default RequestManagement;
