import {useState , useEffect} from "react";
import { CiLink } from "react-icons/ci";
import { IoIosSend } from "react-icons/io";
import {useLazyGetSummaryQuery} from "../config/articleSlice";
import { FaCopy } from "react-icons/fa";
import loader from '../loader.svg'
import { IoTicket } from "react-icons/io5";

function Normal(props) {

    const [article , setArticle] = useState({
        url: '',
        summary: ''
    })
    //  copy
    const [copy ,setCopy] =useState('')


    //  for storing history
    const [allArticles ,setAllArticles]   = useState([])

    const [getSummary , {error , isFetching}] = useLazyGetSummaryQuery();

    //  saving to local stoarge
    useEffect(()=>{
      const articlesFromLocalStorage = JSON.parse(
          localStorage.getItem('articles')
      )
        if(articlesFromLocalStorage){
            setAllArticles(articlesFromLocalStorage)
        }




    },[])


    const handleSubmit = async (e) =>{
      e.preventDefault()
        const { data } = await getSummary({
            articleUrl: article?.url
        })
        if(data?.summary){
            const newArticle = {
                ...article,summary: data?.summary
            }

            //  updating article url's (pushing articcles to array)
            const updatedAllArticles =  [newArticle , ...allArticles]


            setArticle(newArticle)
            setAllArticles(updatedAllArticles)

            //     set item
            localStorage.setItem('articles',JSON.stringify(updatedAllArticles))


            // console.log(newArticle)
        }
    }


    //  handle copy
    const handleCopy = (copyUrl) =>{
setCopy(copyUrl)
        navigator.clipboard.writeText(copyUrl)
        setTimeout(()=>{
            return setCopy(false)
        } , 3000)
    }



    return (
        <section className="mt-16 w-full max-w-xl">
        {/*    search*/}
            <div className="flex flex-col w-full gap-2">
                <form className="relative flex justify-center items-center" onSubmit={handleSubmit}>
                  <CiLink className="absolute left-0 my-2 ml-3 w-5"/>

                    <input type="url" placeholder="Enter a url" value={article?.url} onChange={(e)=>{
                        setArticle({
                            ...article , url: e.target.value
                        })
                    }} className="url_input peer"/>


                    <button type="submit" className="submit_btn  peer-focus:text-gray-700">
                        <IoIosSend/>
                    </button>

                </form>

            {/*     Browser url history */}

<div className="flex flex-col gap-1 max-h-60 overflow-y-auto">
    {
        allArticles.map((item , index)=>{
            return (
                <div className="link_card " key={`link-${index}`} onClick={()=>setArticle(item)}>


                {/*     copy option*/}

                    <div className="copy-btn" onClick={()=>{
                        return handleCopy(item.url)
                    }}>
                     <FaCopy src={copy===item.url ? <IoTicket/> : copy} className="w-[40%] h-[40%] object-contain"/>
                    </div>

                  {/* urls here*/}
                  <p className="flex-1 font-satoshi text-red-700 font-medium text-sm truncate">{item.url}</p>


                </div>
            )
        })
    }
</div>

            </div>


        {/*     displaying results here*/}
            <div className="my-10 max-w-full flex justify-center items-center">
                {
                    isFetching ? (
                        <div className="flex flex-col items-center ">
                            <img src={loader} alt="loading screen" className="w-10 h-20 object-contain"/>
                            <h1 className="font-inter font-bold text-black text-center">It takes some time , but can we take a moment to apperciate AI </h1>
                        </div>

                    ) : error ? (
                        <p className="font-inter font-bold text-black text-center">
                            Sorry, the backend has some problems. Don't worry, come back later and try.
                            <br />
                            <span className="font-satoshi font-medium text-gray-700">
                                {error?.data?.error}
                            </span>
                        </p>
                    ) : (
                        article.summary && (
                            <div className="flex flex-col gap-3">
                                       <h2 className="font-satoshi font-bold text-gray-500 text-xl">
                                           Article <span className="blue_gradient">Summary</span>
                                       </h2>

                            {/*    adding content that we recieved*/}
                                <div className="summary_box">
                                    <p>{article.summary}</p>
                                </div>



                            </div>
                        )
                    )
                }

            </div>



        </section>
    );
}

export default Normal;