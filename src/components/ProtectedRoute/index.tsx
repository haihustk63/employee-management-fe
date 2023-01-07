import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { APP_ROLES } from "@/constants/common";
import { APP_PAGE_NAME_ROUTES } from "@/constants/routes";
import { currentUserAtom } from "@/modules/currentUser";

const { LOGIN } = APP_PAGE_NAME_ROUTES;

const ProtectedRoute: FC<{ route: any; children: any }> = ({
  route,
  children,
}) => {
  const navigate = useNavigate();
  const currentUser = useRecoilValue(currentUserAtom);
  const [component, setComponent] = useState(null);

  useEffect(() => {
    if (Object.keys(currentUser).length === 0) {
      if (!/^\/login/g.test(route.path)) {
        return navigate(LOGIN, { replace: true });
      }
    } else {
      const currentUserRole =
        currentUser?.employee?.role || APP_ROLES.CANDIDATE.value;
      if (route.path === LOGIN || !route.roles.includes(currentUserRole)) {
        const navigatedRoute = Object.values(APP_ROLES).find(
          (role: any) => role.value === currentUserRole
        )?.entry as any;
        if (navigatedRoute) {
          return navigate(navigatedRoute, { replace: true });
        } else {
          return navigate(APP_ROLES.CANDIDATE.entry, { replace: true });
        }
      }
    }
    setComponent(children);
  }, [currentUser, route]);

  return component;
};

export default ProtectedRoute;
