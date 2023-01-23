import { useCallback, useEffect, useState } from "react";
import PageList from "../../components/PageList/PageList";
import PageNavigatorBar from "../../components/PageNavigatorBar/PageNavigatorBar";
import environment from "../../configs/environment";

function Reader() {
    const [currentPageNo, setCurrentPageNo] = useState(1);
    const [isScrollMode, setIsScrollMode] = useState(false);
    const [pageWidth, setPageWidth] = useState(100);

    const [title, setTitle] = useState("");
    const [pages, setPages] = useState([]);
    const chapter_id = "62a9b27c1fdd0e50417fd2a1";

    // Calling API
    const fetchChapter = useCallback(async () => {
        const res = await fetch(
            environment.url + `/api/v1/chapters/${chapter_id}`
        );
        const { pages, comic_id, title: chapterTitle } = await res.json();
        setTitle(comic_id?.title + " / " + chapterTitle);
        pages && setPages(pages);
        setCurrentPageNo(1);
    }, [chapter_id]);

    // Use Effect for data fetching
    useEffect(() => {
        fetchChapter().catch(console.error);
    }, []);

    return (
        <>
            <PageNavigatorBar
                setCurrentPage={setCurrentPageNo}
                currentPage={currentPageNo}
                isScrollMode={isScrollMode}
                setIsScrollMode={setIsScrollMode}
                totalPages={pages.length}
                chapterTitle={title}
                pageWidth={pageWidth}
                setPageWidth={setPageWidth}
            />
            <PageList
                pages={pages}
                currentPage={pages[currentPageNo - 1]}
                scrollMode={isScrollMode}
                pageWidth={pageWidth}
            />
        </>
    );
}

export default Reader;
