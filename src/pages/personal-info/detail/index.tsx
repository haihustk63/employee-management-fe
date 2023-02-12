import AppButton from "@/components/AppButton";
import { showAppCommonConfirm } from "@/components/AppConfirm";
import AppTag from "@/components/AppTag";
import EmployeeProfile from "@/components/pages/employee/EmployeeProfile/Profile";
import { firebaseAuth } from "@/config/firebase";
import { useLinkFirebase, useUnlinkFirebase } from "@/hooks/firebase";
import { useTriggerNoti } from "@/hooks/useTriggerNoti";
import { currentUserAtom } from "@/modules/currentUser";
import { Space } from "antd";
import { useMemo } from "react";
import { useRecoilState } from "recoil";

const { getAuth, signInWithPopup, deleteUser, GoogleAuthProvider } =
  firebaseAuth;

const PersonalInfoDetail = () => {
  const [currentUser, setCurrentUser] = useRecoilState(currentUserAtom);

  const {
    mutate: linkFirebase,
    data: linkData,
    isSuccess,
    isError,
  } = useLinkFirebase() as any;

  const {
    mutate: unlinkFirebase,
    isSuccess: unlinkSuccess,
    isError: unlinkError,
    data: unlinkData,
  } = useUnlinkFirebase() as any;

  const afterSuccess = (data: any) => () => {
    const userInfo = data?.data;
    if (userInfo) {
      setCurrentUser(userInfo);
    }
  };

  useTriggerNoti({
    isError,
    isSuccess,
    messageSuccess: "Link google account successfully!",
    callbackSuccess: afterSuccess(linkData),
  });

  useTriggerNoti({
    isError: unlinkError,
    isSuccess: unlinkSuccess,
    messageSuccess: "Unlink google account successfully!",
    callbackSuccess: afterSuccess(unlinkData),
  });

  const uid = useMemo(() => {
    return currentUser.accountFirebase?.uid;
  }, [currentUser]);

  const onLinkFirebase = async () => {
    const auth = getAuth();
    const userCredential = await signInWithPopup(
      auth,
      new GoogleAuthProvider()
    );

    const {
      user: { uid, email },
    } = userCredential;

    linkFirebase({ uid, email });
  };

  const onUnLinkFirebase = async () => {
    unlinkFirebase({ uid });
  };

  const confirmUnlinkFirebase = () => {
    showAppCommonConfirm({
      callback: onUnLinkFirebase,
    });
  };

  const buttonGoogleAccountTitle = useMemo(() => {
    if (uid) return "Unlink Google Account";
    else return "Link Google Account";
  }, [uid]);

  return (
    <div className="personal-info">
      <EmployeeProfile employee={currentUser.employee} />
      <Space className="google">
        <AppButton
          onClick={uid ? confirmUnlinkFirebase : onLinkFirebase}
          buttonTitle={buttonGoogleAccountTitle}
        />
        {currentUser.accountFirebase?.googleEmail && (
          <AppTag color="#1e5ac7">
            {currentUser.accountFirebase?.googleEmail}
          </AppTag>
        )}
      </Space>
    </div>
  );
};

export default PersonalInfoDetail;
