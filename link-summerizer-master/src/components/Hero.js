import React from 'react';

function Hero(props) {
    return (
        <header className="w-full flex justify-center items-center flex-col">
           <nav className="flex justify-between items-center w-full mb-10 pt-3">
               <h2 className="font-bold text-3xl">Linkz</h2>
               <button type="button" onClick={()=>{
                 return  window.open('https://github.com/sagargouda')
               }} className="black_btn">Github</button>
           </nav>

            <h1 className="head_text">Summarize Articles <br className="max-md:hidden"/> with
            <span className="orange_gradient"> AI,</span> What are you <br className="max-md:hidden"/> <span className="orange_gradient">Waiting For?</span></h1>


        {/*     sub title*/}
            <h2 className="desc">
               Time is an asset , our attention spans are already at their lowest for that reason <span className="font-bold text-red-700">Linkz</span> will summerize articles for you,
            </h2>
        </header>
    );
}

export default Hero;