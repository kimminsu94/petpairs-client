import { useDispatch, useSelector } from "react-redux";
import { userActionTypes } from "../interface/iUserActType";
import React, { useState, useCallback, useEffect } from "react";
import { RootState } from "../reducer";
import styles from "../styles/notificationModal.module.scss";
const NotificationModal = () => {
  const dispatch = useDispatch();
  const { me, matchedPet } = useSelector((state: RootState) => state.user);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    dispatch({
      type: userActionTypes.POST_MATCH_REQUEST,
      data: me?.pet?.matchedId,
    });
    // setImgPreviewUrls([]);
    // if (imgPreviewUrls || imgFileList) {
    // 	setImgPreviewUrls([]);
    // }
    console.log(matchedPet);
    // }
  }, [matchedPet]);

  let length = matchedPet.length;
  // let length = petImgs.length || imgPreviewUrls.length;
  console.log(matchedPet.length);
  if (!matchedPet.length) {
    length = 0;
  }

  console.log(length);
  const prevSlide = useCallback(
    (e) => {
      if (length) {
        setCurrent(current === 0 ? length - 1 : current - 1);
      }
    },
    [length, current]
  );

  const nextSlide = useCallback(
    (e) => {
      if (length) {
        setCurrent(current === length - 1 ? 0 : current + 1);
      }
    },
    [length, current]
  );

  if (me?.pet?.matchedId) {
    return (
      <>
        <div>♥️매칭에 성공하셨어요!♥️</div>
        <div>
          {matchedPet?.petName}짹스대마왕 시미켄님에게 연락을 해보세요!!
          {matchedPet?.email}
          <div className={styles.matchedPetSlider}>
            {matchedPet?.fileName &&
              matchedPet?.fileName.map(
                (matchedPetImg: any, index: React.Key | null | undefined) => {
                  return (
                    <>
                      <div
                        className={index === current ? "active slide" : "slide"}
                        key={index}
                      >
                        {index === current && (
                          <div
                            className={styles.matchedCard}
                            style={{
                              backgroundImage: `url(https://ec2-52-79-98-228.ap-northeast-2.compute.amazonaws.com/pet/${matchedPetImg.fileName})`,
                            }}
                          >
                            <div className={styles.directionArrows}>
                              <div
                                className={styles.toLeftArrow}
                                onClick={prevSlide}
                              >
                                &#8592;
                              </div>
                              <div
                                className={styles.toRightArrow}
                                onClick={nextSlide}
                              >
                                &#8594;
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </>
                  );
                }
              )}
          </div>
        </div>
      </>
    );
  } else {
    return;
    <div>❌매칭된 펫이 아직 없어요!❌</div>;
  }
};
export default NotificationModal;
