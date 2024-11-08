"use client";
import Styles from "./posts.module.css";

import { availableBooruTypes, useSettingsStore } from "../store/settings";
import { useUserStore } from "../store/auth";
import { CSSProperties, useEffect, useState } from "react";
import { SZ_ENDPOINTS } from "../booru/szbooru/endpoints";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { SZ_TYPE_Post } from "../booru/szbooru/types/api/post";

export default function PostPage() {
  const userStore = useUserStore();
  const settingsStore = useSettingsStore();
  const activeBooru = settingsStore.boorus[settingsStore.lastActiveBooru];

  const [postsData, setPostsData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [pageIndex, setPageIndex] = useState(0);
  const [previousPageData, setPreviousPageData] = useState<any>({});
  const [fetchHeaders, setFetchHeaders] = useState<any>({});
  const [offset, setOffset] = useState(0);
  const [gridRows, setGridRows] = useState<any>([]);

  if (activeBooru.type == "szurubooru") {
    function getKey(pageIndex: any, previousPageData: any) {
      if (
        Object.keys(previousPageData).length !== 0 &&
        previousPageData.results.length == 0
      ) {
        console.log("END OF RESULTS", previousPageData);
      }
      if (pageIndex === 0)
        return `api${SZ_ENDPOINTS.listPosts}/?limit=32&query=-rating%3Aunsafe`;
      return `api${SZ_ENDPOINTS.listPosts}/?offset=${offset}&limit=32&query=-rating%3Aunsafe`;
    }

    useEffect(() => {
      if (activeBooru) {
        let headers: any = {
          "X-HOST": activeBooru.host,
          "X-TYPE": "szurubooru",
          "X-PREFIX": "/api/",
        };

        if (activeBooru.username && activeBooru.token) {
          headers["X-CUSTOM"] = JSON.stringify({
            Authorization: `Token ${btoa(
              activeBooru.username + ":" + activeBooru.token
            )}`,
          });
        }

        setIsLoading(true);

        async function _getData() {
          await fetch(getKey(pageIndex, previousPageData), { headers })
            .then((res) => res.json())
            .then((data) => {
              setPreviousPageData(data);
              setPostsData([...postsData, ...data.results]);
              setOffset(offset + data.results.length);
            });
        }
        _getData();
      }
    }, [activeBooru, pageIndex]);

    useEffect(() => {
      const rows = [];
      let post = 0;

      for (let i = 0; i < postsData.length / 3; i++) {
        console.log("ROW:", i, "CUR POST:", post, postsData[post]);
        const row_items = [];
        for (let j = 0; j < 3; j++) {
          console.log("ROW ITEM:", j, "CUR POST:", post, postsData[post]);
          if (postsData[post]) {
            row_items.push(
              <div key={`grid-row-post-${post}`} className={Styles.card}>
                <img
                  className={Styles.card}
                  src={`${activeBooru.host}/${postsData[post].thumbnailUrl}`}
                />
              </div>
            );
          }
          post++;
        }

        rows.push(
          <div className={Styles.grid} key={`grid-row-${i}`}>
            {row_items}
          </div>
        );
      }

      setGridRows(rows);
    }, [postsData]);

    const scrollPosition = useScrollPosition();
    useEffect(() => {
      //   console.log("ScrollPOS: " + scrollPosition);
      if (Math.floor(scrollPosition) == 100) {
        setPageIndex(pageIndex + 1);
        console.log("Updated PageIndex: " + pageIndex);
      }
    }, [scrollPosition]);

    // for (let i = 0; i < numrows; i++) {
    //     // note: we are adding a key prop here to allow react to uniquely identify each
    //     // element in this array. see: https://reactjs.org/docs/lists-and-keys.html
    //     rows.push(<ObjectRow key={i} />);
    // }
    // return <tbody>{rows}</tbody>;

    return (
      <>
        {!postsData && !gridRows ? (
          <progress className="circle large center middle fixed"></progress>
        ) : (
          <>
            {/* <p>limit: {previousPageData.limit}</p>
            <p>offset: {previousPageData.offset}</p>
            <p>total: {previousPageData.total}</p> */}
            <div className={`${Styles.grid} ${Styles["grid-root"]}`}>
              {gridRows}
            </div>
          </>
        )}
      </>
    );
  }
}

// {postsData.map((post: SZ_TYPE_Post) => {

//     const aspectRatio = (post.canvasWidth / post.canvasHeight).toFixed(2)

//     return (
//       <article
//         // className={`no-padding round ${
//         //     Number(aspectRatio) > 1
//         //     ? Styles.horizontal
//         //     : Number(aspectRatio) < 1
//         //     ? Styles.vertical
//         //     : Styles.square
//         // }`}
//         key={post.checksumMD5}
//         // style={{"--aspect-ratio": aspectRatio} as CSSProperties}
//       >
//         {/* <p>ASPECT: {aspectRatio}</p> */}
//         <img
//           src={`${activeBooru.host}/${post.thumbnailUrl}`}
//         />
//         <div className="absolute bottom left right padding bottom-shadow bottom-round white-text">
//           <nav>
//             <h5>Title</h5>
//             <div className="max"></div>
//             {/* <button className="circle transparent">
//             <i>more_vert</i>
//           </button> */}
//           </nav>
//         </div>
//       </article>

//       // <img
//       //   key={post.checksumMD5}
//       //   src={`${activeBooru.host}/${post.thumbnailUrl}`}
//       // />
//     );
//   })}
