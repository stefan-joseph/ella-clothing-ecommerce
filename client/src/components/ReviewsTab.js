import { useEffect } from "react";
import { useAppContext } from "../context/appContext";
import { Reviews } from ".";

const ReviewsTab = () => {
  const { userReviews, getAllUserReviews, forceRefresh } = useAppContext();

  useEffect(() => {
    getAllUserReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceRefresh]);

  return <Reviews type="user" reviews={userReviews} />;
};

export default ReviewsTab;
